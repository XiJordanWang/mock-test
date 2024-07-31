package com.mock_test.back.test.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@ToString
@Builder
@Entity
@RequiredArgsConstructor
@Table(name = "test")
@AllArgsConstructor
public class Test {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "uuid", nullable = false)
    private String uuid;

    @Column(name = "start_time")
    private LocalDateTime startTime;

    @Column(name = "reading_article_ids")
    private List<Integer> readingArticleIds;

    @Column(name = "reading_scale")
    private String readingScale;

    @Column(name = "reading_score")
    private Integer readingScore;

    @Column(name = "listening_scale")
    private String listeningScale;

    @Column(name = "listening_score")
    private Integer listeningScore;
}
