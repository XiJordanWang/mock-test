package com.mock_test.back.writing.servicei;

import com.mock_test.back.writing.model.Writing;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class WritingServiceTest {

    @Autowired
    WritingService writingService;

    @Test
    public void add() {
        writingService.add(List.of(Writing.builder()
                .reading("<p className=\"reading\">" +
                        "            Scientists have long believed that bees existed up to some 200" +
                        "            million years ago. This notion has recently come under some" +
                        "            speculation because of a lack of any significant evidence to support" +
                        "            this theory. Key missing evidence includes fossil records, the lack" +
                        "            of flowering plants to support bee life, and recently revealed" +
                        "            discrepancies in the fossil record." +
                        "          </p>" +
                        "          <p className=\"reading\">" +
                        "            To date, the oldest known bee discovered is a 100 million-year-old" +
                        "            specimen preserved in amber. This ancient specimen, trapped in tree" +
                        "            resin, is at least 35-45 million years older than any other known" +
                        "            bee fossil. What is concerning scientists is the lack of any fossil" +
                        "            evidence older than 100 million years. Fossil records for other" +
                        "            plant, animal and insect species are quite complete, however, the" +
                        "            bee is missing a similarly lengthy record." +
                        "          </p>" +
                        "          <p className=\"reading\">" +
                        "            The ancient world lacked flowering plants. This is important because" +
                        "            bees are pollen-dependent and rely on flower pollen and nectar for" +
                        "            energy, protein and other nutrients. Flora in the ancient world 200" +
                        "            million years ago were mostly dominated by conifers which did not" +
                        "            flower or produce the pollen and nectar necessary for bee survival." +
                        "            Lacking this food source, it is highly skeptical that bees could" +
                        "            have existed 200 million years ago." +
                        "          </p>" +
                        "          <p className=\"reading\">" +
                        "            Several of the fossil records being studied by scientists have also" +
                        "            brought to light major discrepancies that exist between modern" +
                        "            beehives and beehives of the ancient world. Specifically, ancient" +
                        "            beehives seem to have a different organization and structure" +
                        "            compared to that of modern beehives. This variance in evidence in" +
                        "            the fossil record has led experts to speculate that these fossils" +
                        "            are not fossils of beehives, but rather nests of another insect" +
                        "            species." +
                        "          </p>")
                .question("Summarize the points made in the lecture you just heard, explaining how they cast doubt on the specific theories discussed in the reading passage.")
                .listeningPath("/Volumes/Info/TOEFLActualQuestions/2020-2023Writing/2020/Audio/1/listening.mp3")
                .type(Writing.Type.INTEGRATED)
                .isDone(false)
                .build()));

        writingService.add(List.of(Writing.builder()
                .type(Writing.Type.ACADEMIC_DISCUSSION)
                .professorQuestion("Over the next few weeks, we'll begin discussing communication strategies in the workplace.These days there are many options for workplace communications. Sometimes people choose to communicate in writing through email or through messaging apps, while at other times they prefer talking to others face-to-face or by phone. What is the most important factor to consider when deciding whether to communicate in writing or by speaking in the workplace? Why?")
                .studentA("I think privacy is the biggest factor in choosing to communicate in writing or speaking at work. If it's personal or confidential, it's better to email or message instead of talking out loud where everyone can hear. My dad always emails his boss private stuff rather than discussing it in the open office. Written communication lets you control who sees what you say.")
                .studentB("I think the main factor in deciding to speak or write at work is how well you know someone. If you don't know a coworker that well, randomly showing up in their office to chat can interrupt their workflow. It's better to email new coworkers at first until you build more of a rapport. Once you're more familiar with each other, face-to-face talks are easier and less disruptive.")
                .isDone(false)
                .build()));
    }
}