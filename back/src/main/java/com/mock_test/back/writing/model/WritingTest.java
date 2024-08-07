package com.mock_test.back.writing.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class WritingTest {
    @JsonProperty("id")
    private String id;
    @JsonProperty("integratedId")
    private Integer integratedId;
    @JsonProperty("discussionId")
    private Integer discussionId;
}
