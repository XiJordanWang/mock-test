package com.mock_test.back.reading.service;

import com.mock_test.back.reading.dto.AddReadingDTO;
import com.mock_test.back.reading.dto.GradeReadingDTO;
import com.mock_test.back.reading.dto.QuestionDTO;
import com.mock_test.back.reading.dto.ReadingDTO;
import com.mock_test.back.reading.model.Article;
import com.mock_test.back.reading.model.Question;
import com.mock_test.back.reading.model.ReadingTest;
import com.mock_test.back.reading.model.Selection;
import com.mock_test.back.reading.repository.ArticlesRepository;
import com.mock_test.back.reading.repository.QuestionRepository;
import com.mock_test.back.reading.repository.SelectionRepository;
import com.mock_test.back.redis.service.RedisHashService;
import com.mock_test.back.test.service.TestService;
import com.mock_test.back.util.ParseHTML;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicReference;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static com.mock_test.back.reading.model.Question.Type.*;

@Service
public class ArticlesService {

    @Autowired
    ArticlesRepository articlesRepository;

    @Autowired
    QuestionRepository questionRepository;

    @Autowired
    SelectionRepository selectionRepository;

    @Autowired
    RedisHashService redisHashService;

    @Autowired
    TestService testService;

    public ReadingTest startReadingTest() {
        ReadingTest result = redisHashService.getReading();
        if (ObjectUtils.isEmpty(result) || ObjectUtils.isEmpty(result.getId())) {
            List<Article> articles = articlesRepository.findByIsDoneFalse();
            AtomicInteger index = new AtomicInteger(0);
            List<QuestionDTO> list = articles.stream().flatMap(item -> {
                List<Question> questions = questionRepository.findByArticleIdOrderBySequenceAsc(item.getId());
                return questions.stream().map(question -> {
                    int currentIndex = index.incrementAndGet();
                    return QuestionDTO.builder()
                            .articleId(item.getId())
                            .questionId(question.getId())
                            .question(question.getQuestion())
                            .index(currentIndex)
                            .sequence(question.getSequence())
                            .build();
                });
            }).toList();
            return redisHashService.createReadingTest(list);
        }
        this.resetRemainTime(result);
        redisHashService.saveOrUpdateReading(result);
        return result;
    }

    public ReadingTest review() {
        ReadingTest result = redisHashService.getReading();
        this.resetRemainTime(result);
        redisHashService.saveOrUpdateReading(result);
        return result;
    }

    public ReadingTest backToQuestion(Integer index) {
        ReadingTest result = redisHashService.getReading();
        result.setIndex(index);
        this.resetRemainTime(result);
        redisHashService.saveOrUpdateReading(result);
        return result;
    }

    public ReadingTest next(Integer index) {
        ReadingTest result = redisHashService.getReading();
        if (ObjectUtils.isEmpty(result) || ObjectUtils.isEmpty(result.getId())) {
            return null;
        }
        int nextIndex = index + 1;
        result.setIndex(nextIndex);
        result.setCurrentArticleId(result.getQuestions()
                .stream()
                .filter(item -> item.getIndex() == nextIndex)
                .findFirst()
                .orElseThrow()
                .getArticleId());
        this.resetRemainTime(result);
        redisHashService.saveOrUpdateReading(result);
        return result;
    }

    public ReadingTest back(Integer index) {
        ReadingTest result = redisHashService.getReading();
        if (ObjectUtils.isEmpty(result) || ObjectUtils.isEmpty(result.getId())) {
            return null;
        }
        int preIndex = index - 1;
        result.setIndex(preIndex);
        result.setCurrentArticleId(result.getQuestions()
                .stream()
                .filter(item -> item.getIndex() == preIndex)
                .findFirst()
                .orElseThrow()
                .getArticleId());
        this.resetRemainTime(result);
        redisHashService.saveOrUpdateReading(result);
        return result;
    }


    public ReadingDTO getByQuestionNum(Integer questionNum) {
        ReadingTest.QuestionDetail questionDetail = redisHashService.getReading().getQuestions()
                .stream()
                .filter(item -> questionNum.equals(item.getIndex()))
                .findFirst()
                .orElse(null);

        if (questionDetail != null) {
            Article article = articlesRepository.getReferenceById(questionDetail.getArticleId());
            Question question = questionRepository.getReferenceById(questionDetail.getId());
            List<Selection> selections = selectionRepository.findByQuestionId(question.getId());
            if (question.getType().equals(INSERTION)) {
                selections = selections.stream()
                        .sorted(Comparator.comparing(Selection::getOption))
                        .collect(Collectors.toList());
            }
            List<ReadingDTO.SelectionDTO> selectionDTOS = new ArrayList<>();
            selections.forEach(item -> selectionDTOS.add(ReadingDTO.SelectionDTO.builder()
                    .id(item.getId())
                    .information(item.getInformation())
                    .build()));
            return ReadingDTO.builder()
                    .id(article.getId())
                    .heading(article.getHeading())
                    .context(article.getContext())
                    .questionId(question.getId())
                    .paragraphNum(question.getParagraphNum())
                    .question(question.getQuestion())
                    .type(question.getType())
                    .mySelection(questionDetail.getMySelection())
                    .mySelections(questionDetail.getMySelections())
                    .selections(selectionDTOS)
                    .sequence(question.getSequence())
                    .build();
        }
        return null;
    }

    @Transactional
    public void add(AddReadingDTO dto) {
        AtomicReference<String> context = new AtomicReference<>(ParseHTML.formatTextToHtml(dto.getContext()));

        Article article = articlesRepository.save(Article.builder()
                .heading(dto.getHeading())
                .context(context.get())
                .isDone(false)
                .build());

        List<Selection> selections = new ArrayList<>();

        AtomicInteger paragraphNum = new AtomicInteger(1);
        dto.getQuestions().forEach(questionDTO -> {
            int currentParagraphNum = this.getParagraphNum(paragraphNum.get(), questionDTO);
            paragraphNum.set(currentParagraphNum);

            Question question = Question.builder()
                    .articleId(article.getId())
                    .paragraphNum(this.getParagraphNum(currentParagraphNum, questionDTO))
                    .question(StringUtils.capitalize(questionDTO.getQuestion()))
                    .sequence(questionDTO.getSequence())
                    .type(this.checkQuestionType(questionDTO))
                    .correctAnswer(questionDTO.getCorrectAnswer())
                    .build();

            context.set(this.modifyDom(question, context.get(), dto.getHighlightSentence()));

            questionRepository.save(question);

            questionDTO.getSelections().forEach(item -> {
                selections.add(Selection.builder()
                        .information(StringUtils.capitalize(item.getInformation()))
                        .questionId(question.getId())
                        .questionSequence(question.getSequence())
                        .option(item.getOption())
                        .myAnswer(false)
                        .isCorrect(questionDTO.getCorrectAnswer().contains(item.getOption().toString()))
                        .build());
            });
        });
        selectionRepository.saveAll(selections);
        articlesRepository.updateContextById(context.get(), article.getId());
    }

    @Transactional
    public void submit() {
        ReadingTest result = redisHashService.getReading();
        List<Integer> articleIds = result.getQuestions().stream()
                .map(ReadingTest.QuestionDetail::getArticleId)
                .distinct()
                .toList();

        List<Integer> ids = result.getQuestions().stream()
                .flatMap(item -> {
                    if (item.getMySelections() != null) {
                        return item.getMySelections().stream().filter(Objects::nonNull);
                    } else {
                        return Stream.ofNullable(item.getMySelection());
                    }
                })
                .filter(Objects::nonNull)
                .toList();
        List<Integer> questionIds = result.getQuestions().stream().map(ReadingTest.QuestionDetail::getId).toList();

        selectionRepository.updateMyAnswers(ids);
        List<Question> questions = questionRepository.findAllById(questionIds);

        AtomicInteger correct = new AtomicInteger(0);
        AtomicInteger total = new AtomicInteger(0);

        this.computeScore(questions, ids, correct, total);

        testService.saveReading(GradeReadingDTO.builder()
                .uuid(result.getId())
                .startTime(LocalDateTime.parse(result.getStartTime()))
                .readingArticleIds(articleIds)
                .readingScale(correct.get() + "/" + total.get())
                .readingScore((int) Math.round(((double) correct.get() / total.get()) * 30))
                .build());
        questionRepository.saveAll(questions);

        articlesRepository.updateIsDoneToTrue(articleIds);
        redisHashService.createListeningTest(result.getId());
        redisHashService.delReading();
    }

    private void computeScore(List<Question> questions,
                              List<Integer> ids,
                              AtomicInteger correct,
                              AtomicInteger total) {
        List<Selection> selections = selectionRepository.findAllById(ids);
        questions.forEach(item -> {
            long count = selections.stream()
                    .filter(selection -> selection.getQuestionId().equals(item.getId()))
                    .map(selection -> selection.getIsCorrect().equals(selection.getMyAnswer()))
                    .toList().stream().filter(correctness -> correctness).count();
            if (item.getType().equals(MULTIPLE_CHOICE)) {
                total.getAndAdd(2);
                if (count == 2) {
                    item.setCorrectness(true);
                    correct.getAndAdd(2);
                    return;
                }
                if (count == 1) {
                    item.setCorrectness(false);
                    correct.getAndAdd(1);
                    return;
                }
                item.setCorrectness(false);
                return;
            }
            if (item.getType().equals(DRAG)) {
                total.getAndAdd(2);
                if (count == 3) {
                    item.setCorrectness(true);
                    correct.getAndAdd(2);
                    return;
                }
                if (count == 2) {
                    item.setCorrectness(false);
                    correct.getAndAdd(2);
                    return;
                }
                item.setCorrectness(false);
                return;
            }
            item.setCorrectness(false);
            total.getAndAdd(1);
            if (count == 1) {
                correct.getAndAdd(1);
                item.setCorrectness(true);
            }
        });
    }

    public void select(Integer index, Integer option) {
        ReadingTest result = redisHashService.getReading();
        result.getQuestions().stream()
                .filter(item -> Objects.equals(item.getIndex(), index))
                .findFirst()
                .ifPresent(question -> {
                    if (option == 0) {
                        return;
                    }
                    Selection selection = selectionRepository.findById(option).orElse(null);
                    if (selection == null) {
                        return;
                    }
                    question.setMySelection(option);
                    question.setMyAnswer(selection.getOption().toString());
                    question.setSelected(true);
                });
        redisHashService.saveOrUpdateReading(result);
    }

    public void multipleSelect(Integer index, List<Integer> options) {
        ReadingTest result = redisHashService.getReading();
        result.getQuestions().stream()
                .filter(item -> Objects.equals(item.getIndex(), index))
                .findFirst()
                .ifPresent(question -> {
                    if (CollectionUtils.isEmpty(options)) {
                        return;
                    }
                    List<Selection> selections = selectionRepository.findAllById(options);
                    if (CollectionUtils.isEmpty(selections)) {
                        return;
                    }
                    question.setMySelections(options);
                    question.setMyAnswer(selections.stream()
                            .map(String::valueOf)
                            .collect(Collectors.joining(",")));
                    question.setSelected(true);
                });
        redisHashService.saveOrUpdateReading(result);
    }

    private int getParagraphNum(int paragraphNum, AddReadingDTO.QuestionDTO questionDTO) {
        if (questionDTO.getQuestion().contains("paragraph")) {
            paragraphNum = Integer.parseInt(Objects.requireNonNull(this.getParagraphNumber(questionDTO.getQuestion())));
        }
        if (questionDTO.getSequence() == 10) {
            paragraphNum = 0;
        }
        return paragraphNum;
    }

    private Question.Type checkQuestionType(AddReadingDTO.QuestionDTO questionDTO) {
        Question.Type type = Question.Type.SELECTION;
        if (questionDTO.getQuestion().contains("The word")) {
            type = Question.Type.VOCABULARY;
        }
        if (questionDTO.getQuestion().contains("refer")) {
            type = Question.Type.REFER;
        }
        if (questionDTO.getQuestion().contains("TWO")) {
            type = MULTIPLE_CHOICE;
        }
        if (questionDTO.getQuestion().contains("Which of the sentences below")) {
            type = Question.Type.SENTENCE;
        }
        if (questionDTO.getSequence() == 9) {
            type = Question.Type.INSERTION;
        }
        if (questionDTO.getSequence() == 10) {
            type = Question.Type.DRAG;
        }
        return type;
    }

    private String modifyDom(Question question, String context, String highlightSentence) {
        if (question.getType().equals(Question.Type.VOCABULARY)) {
            return ParseHTML.recognizeVocabulary(context, ParseHTML.extractWord(question.getQuestion()), question.getSequence());
        }
        if (question.getType().equals(Question.Type.REFER)) {
            return ParseHTML.recognizeRefer(context, ParseHTML.extractWord(question.getQuestion()), question.getSequence());
        }
        if (question.getType().equals(Question.Type.SENTENCE)) {
            return ParseHTML.recognizeSentence(context, highlightSentence, question.getSequence());
        }
        return context;
    }

    private String getParagraphNumber(String input) {
        Pattern pattern = Pattern.compile("\\d+");
        Matcher matcher = pattern.matcher(input);
        if (matcher.find()) {
            return matcher.group();
        }
        return null;
    }

    private void resetRemainTime(ReadingTest result) {
        long remainTime = (36 * 60) - Duration.between(LocalDateTime.parse(result.getStartTime()),
                LocalDateTime.now()).getSeconds();
        result.setRemainTime(remainTime);
    }
}
