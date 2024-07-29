import { ComponentType, SVGProps } from "react";

export interface ReadingTest {
  id: string;
  total: number;
  index: number;
  startTime: string;
  remainTime: number;
  currentArticleId: number;
  type: string;
  sequence: number;
  questions: Array<QuestionDetail>;
}

export interface QuestionDetail {
  articleId: number;
  id: number;
  index: number;
  isSelected: boolean;
  mySelection: number;
  myAnswer: string;
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
  sequence: number;
  selections: Selection[];
}

export interface Selection {
  id: number;
  information: string;
  selected: boolean;
}

export interface ReadingProps {
  testData: ReadingTest;
  onSubmit: () => void;
}

// interface.ts
export interface HeaderProps {
  onNext: () => void;
  onBack: () => void;
  onReview: () => void;
  onReturn: () => void;
  onBackToQuestion: () => void;
  buttons: string;
  isReview: boolean;
}

export interface Button {
  name: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  backgroundColor?: string;
  textColor?: string;
}

export interface ReviewProps {
  onSelectedQuestionIndex: (index: number) => void;
  onSubmit: () => void;
}
