package com.mock_test.back.listening.model;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@ToString
@Builder
@Entity
@RequiredArgsConstructor
@Table(name = "listening")
@AllArgsConstructor
public class Listening {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private Type type;

    @Column(name = "path", nullable = false)
    private String path;

    @Column(name = "is_done")
    private Boolean isDone;

    public enum Type {
        CONVERSATION, LECTURE
    }
}
