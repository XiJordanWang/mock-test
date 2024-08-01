package com.mock_test.back.listening.model;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@ToString
@Builder
@Entity
@RequiredArgsConstructor
@Table(name = "listening_question")
@AllArgsConstructor
public class ListeningQuestion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "listening_id", nullable = false)
    private Integer listeningId;

    @Column(name = "sequence", nullable = false)
    private Integer sequence;

    @Column(name = "question_path", nullable = false)
    private String questionPath;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private ListeningQuestion.Type type;

    @Column(name = "question", nullable = false)
    private String question;

    @Column(name = "correctness")
    private Boolean correctness;

    @Column(name = "correct_answer", nullable = false)
    private String correctAnswer;

    public enum Type {
        SELECTION, MULTIPLE_CHOICE, TABLE
    }
}
