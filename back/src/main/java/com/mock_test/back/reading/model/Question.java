package com.mock_test.back.reading.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "question")
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "article_id", nullable = false)
    private Integer articleId;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private Type type = Type.SELECTION;

    @Column(name = "paragraph_num", nullable = false)
    private Integer paragraphNum;

    @Column(name = "question", nullable = false)
    private String question;

    @Column(name = "correctness")
    private Boolean correctness;

    public static enum Type {
        SELECTION, CHECKBOX, SENTENCE, INSERTION, DRAG
    }
}
