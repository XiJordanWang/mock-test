export interface ReadingTest {
  id: string;
  total: number;
  index: number;
  startTime: string;
  remainTime: number;
  currentArticleId: number;
  questions: Array<QuestionDetail>;
}

export interface QuestionDetail {
  articleId: number;
  id: number;
  index: number;
  isSelected: boolean;
  mySelection: number;
  question: string;
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
  selections: Selection[];
}

export interface Selection {
  id: number;
  information: string;
  selected: boolean;
}

export interface ReadingProps {
  testData: ReadingTest;
  onOptionChange?: (option: number) => void;
}

export interface HeaderProps {
  onNext: () => void; // Callback function for Next button
  onBack: () => void; // Callback function for Back button
}
