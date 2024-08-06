package com.mock_test.back.speaking.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class SpeakingTest {
    @JsonProperty("id")
    private String id;
    @JsonProperty("section1Id")
    private Integer section1Id;
    @JsonProperty("section2Id")
    private Integer section2Id;
    @JsonProperty("section3Id")
    private Integer section3Id;
    @JsonProperty("section4Id")
    private Integer section4Id;
}
