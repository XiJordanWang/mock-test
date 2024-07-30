package com.mock_test.back.util;

public class ParseHTML {

    public static String formatTextToHtml(String text) {
        StringBuilder formattedText = new StringBuilder();
        int count = 1;
        for (char c : text.toCharArray()) {
            if (c == '▋') {
                String id = "square" + count;
                formattedText.append("<span id=\"").append(id).append("\" class=\"square-default\"></span>");
                count++;
            } else {
                formattedText.append(c);
            }
        }
        String[] paragraphs = formattedText.toString().split("\\$");
        formattedText.setLength(0); // 清空 StringBuilder，以便重新构建格式化后的HTML
        for (String paragraph : paragraphs) {
            formattedText.append("<div style=\"white-space: normal;\"><br/></div>\n<p>\n  ")
                    .append(paragraph)
                    .append("\n</p>\n");
        }
        return formattedText.toString();
    }

    public static String recognizeVocabulary(String text, String vocabulary, Integer sequence) {
        text = text.replace(vocabulary, "<span id=\"vocabulary" + sequence + "\">" + vocabulary + "</span>");
        return text;
    }

    public static String recognizeRefer(String text, String phrase, Integer sequence) {
        text = text.replace(phrase, "<span id=\"refer" + sequence + "\">" + phrase + "</span>");
        return text;
    }

    public static String recognizeSentence(String text, String sentence, Integer sequence) {
        text = text.replace(sentence, "<span id=\"sentence" + sequence + "\">" + sentence + "</span>");
        return text;
    }

    public static String extractWord(String prompt) {
        if (prompt.contains("\"")) {
            int startIndex = prompt.indexOf("\"") + 1;
            int endIndex = prompt.indexOf("\"", startIndex);
            return prompt.substring(startIndex, endIndex);
        }
        if (prompt.contains("'")) {
            int startIndex = prompt.indexOf("'") + 1;
            int endIndex = prompt.indexOf("'", startIndex);
            return prompt.substring(startIndex, endIndex);
        }
        return prompt;
    }
}
