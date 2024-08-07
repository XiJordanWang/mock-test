package com.mock_test.back.test.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class DashboardDTO {
    private Integer reading;
    private Integer listening;
    private Integer speaking;
    private Integer writing;
    private Integer overall;
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private String startDate;
}
