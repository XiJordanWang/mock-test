package com.mock_test.back.listening.model;

import com.mock_test.back.reading.model.Selection;
import jakarta.persistence.*;
import lombok.*;

@Builder
@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Entity
@Table(name = "listening_selection")
@AllArgsConstructor
public class ListeningSelection {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "question_id", nullable = false)
    private Integer questionId;
    @Column(name = "question_sequence", nullable = false)
    private Integer questionSequence;
    @Enumerated(EnumType.STRING)
    @Column(name = "option", nullable = false)
    private Selection.Option option;
    @Column(name = "information", nullable = false)
    private String information;
    @Column(name = "is_correct", nullable = false)
    private Boolean isCorrect = false;
    @Column(name = "my_answer")
    private Boolean myAnswer;

    public enum Option {
        A, B, C, D, E, F
    }
}
