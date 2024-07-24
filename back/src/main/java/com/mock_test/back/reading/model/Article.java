package com.mock_test.back.reading.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "article")
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "heading", nullable = false)
    private String heading;

    @Column(name = "context", nullable = false, length = 5000)
    private String context;
}