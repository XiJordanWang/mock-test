package com.mock_test.back.speaking.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@ToString
@Entity
@Builder
@NoArgsConstructor
@Table(name = "speaking")
@AllArgsConstructor
public class Speaking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "title", length = 1000)
    private String title;
    @Column(name = "reading", length = 5000)
    private String reading;
    @Column(name = "heading", length = 500)
    private String question;
    @JsonIgnore
    @Column(name = "question_path", length = 500)
    private String questionPath;
    @JsonIgnore
    @Column(name = "listening_path", length = 500)
    private String listeningPath;
    @Column(name = "response_path", length = 500)
    private String responsePath;
    @Column(name = "type")
    private Type type;
    @JsonIgnore
    @Column(name = "is_done")
    private Boolean isDone;

    public enum Type {
        SECTION1, SECTION2, SECTION3, SECTION4
    }
}
