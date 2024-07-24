package com.mock_test.back.reading.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "selection")
public class Selection {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "question_id", nullable = false)
    private Integer questionId;

    @Column(name = "information", nullable = false)
    private String information;

    @Column(name = "is_correct", nullable = false)
    private Boolean isCorrect = false;

    @Column(name = "my_answer")
    private Boolean myAnswer;
}
