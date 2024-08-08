export interface TestDTO {
  id: number;
  uuid: string;
  startTime: string; // Formatted as yyyy-MM-dd
  overallScore: number;
  readingScore: number;
  readingIds: number[];
  listeningScore: number;
  listeningIds: number[];
  speakingScore: number;
  speakingIds: number[];
  writingScore: number;
  writingIds: number[];
}

export interface PaginatedTestResults {
  content: TestDTO[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

export interface ApiResponse {
  id: number;
  heading: string;
  context: string;
  paragraphNum: number;
  questionId: number;
  question: string;
  type: string;
  mySelection: number;
  mySelections: number[];
  sequence: number;
  selections: Selection[];
}

export interface Selection {
  id: number;
  information: string;
  selected: boolean;
}

export interface QuestionListDTO {
  id: number;
  articleId: number;
  correctness: boolean;
}

export interface ReadingReviewDTO {
  id: number;
  heading: string;
  context: string;
  questionId: number;
  paragraphNum: number;
  question: string;
  type: QuestionType;
  sequence: number;
  selections: SelectionDTO[];
}

export interface SelectionDTO {
  id: number;
  information: string;
  myAnswer: boolean;
  correctness: boolean;
  index: number;
}

export enum QuestionType {
  SELECTION = "SELECTION",
  VOCABULARY = "VOCABULARY",
  MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
  REFER = "REFER",
  SENTENCE = "SENTENCE",
  INSERTION = "INSERTION",
  DRAG = "DRAG",
}
