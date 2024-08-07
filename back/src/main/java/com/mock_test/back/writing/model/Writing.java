package com.mock_test.back.writing.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@ToString
@Entity
@Builder
@NoArgsConstructor
@Table(name = "writing")
@AllArgsConstructor
public class Writing {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "reading", length = 5000)
    private String reading;
    @Column(name = "question", length = 500)
    private String question;
    @JsonIgnore
    @Column(name = "listening_path", length = 500)
    private String listeningPath;
    @Column(name = "professor_question", length = 500)
    private String professorQuestion;
    @Column(name = "studentA", length = 500)
    private String studentA;
    @Column(name = "studentB", length = 500)
    private String studentB;
    @Column(name = "type")
    private Type type;
    @Column(name = "my_response", length = 1000)
    private String myResponse;
    @JsonIgnore
    @Column(name = "is_done")
    private Boolean isDone;

    public enum Type {
        INTEGRATED, ACADEMIC_DISCUSSION
    }
}
