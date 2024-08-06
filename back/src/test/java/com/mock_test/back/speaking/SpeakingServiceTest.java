package com.mock_test.back.speaking;

import com.mock_test.back.speaking.model.Speaking;
import com.mock_test.back.speaking.service.SpeakingService;
import jakarta.annotation.Resource;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
class SpeakingServiceTest {

    @Resource
    SpeakingService speakingService;

    @Test
    void add() {
        speakingService.add(List.of(
                Speaking.builder()
                        .question("Nowadays, some people use extreme methods, including surgery, to change their appearance-\n" +
                                "usually because they are trying to look more attractive in some way. Do you think this is a\n" +
                                "good idea? Explain why you agree or disagree with people using such methods to change\n" +
                                "how they look. Support your opinion with details.")
                        .type(Speaking.Type.SECTION1)
                        .questionPath("/Volumes/Info/TOEFLActualQuestions/2020-2023Speaking/2020/Audio/402/question.mp3")
                        .build(),
                Speaking.builder()
                        .title("Saturday Business Courses")
                        .reading("Currently, university students studying business are only able to take classes during the week, from\n" +
                                "Monday to Friday. The business program announced today that next semester it will begin offering\n" +
                                "classes on Saturdays as well. Program administrators believe that providing an alternative to\n" +
                                "weekday classes will better accommodate students and their already busy schedules. In order to\n" +
                                "generate interest in these new Saturday classes, the university will give a small discount or\n" +
                                "reduction in tuition to students who register to take these courses.")
                        .question("The woman expresses her opinion about the plan described in the article. Briefly summarize the\n" +
                                "plan. Then state her opinion about the plan and explain the reasons she gives for holding that\n" +
                                "opinion.")
                        .type(Speaking.Type.SECTION2)
                        .questionPath("/Volumes/Info/TOEFLActualQuestions/2020-2023Speaking/2020/Audio/403/question.mp3")
                        .listeningPath("/Volumes/Info/TOEFLActualQuestions/2020-2023Speaking/2020/Audio/403/listening.mp3")
                        .build(),
                Speaking.builder()
                        .title("Ambient Advertising")
                        .reading("Companies often advertise products using a traditional approach, creating advertisements that\n" +
                                "appear, for example, on television or radio. In contrast to this approach, some companies use a\n" +
                                "strategy called ambient advertising . This involves advertising products in creative or unexpected\n" +
                                "ways, by integrating the advertisements into the surrounding environment. Since the\n" +
                                "advertisements become part of the environment and consumers encounter them by surprise, they\n" +
                                "may be more likely to notice and pay attention to the advertisements. Ambient advertising is most\n" +
                                "effective when used near a location where consumers are able to purchase the products, so they\n" +
                                "can purchase them soon after seeing the advertisements.")
                        .question("Explain how the example from the professor's lecture illustrates the concept of ambient advertising.")
                        .type(Speaking.Type.SECTION3)
                        .questionPath("/Volumes/Info/TOEFLActualQuestions/2020-2023Speaking/2020/Audio/404/question.mp3")
                        .questionPath("/Volumes/Info/TOEFLActualQuestions/2020-2023Speaking/2020/Audio/404/listening.mp3")
                        .build(), Speaking.builder()
                        .question("Using points and examples from the lecture, explain why and how marine mammals herd fish.")
                        .type(Speaking.Type.SECTION4)
                        .questionPath("/Volumes/Info/TOEFLActualQuestions/2020-2023Speaking/2020/Audio/405/question.mp3")
                        .listeningPath("/Volumes/Info/TOEFLActualQuestions/2020-2023Speaking/2020/Audio/405/listening.mp3")
                        .build()));
    }
}