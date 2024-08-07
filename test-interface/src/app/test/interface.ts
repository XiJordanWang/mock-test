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

export interface ListeningTest {
  id: string;
  total: number;
  index: number;
  startTime: string;
  remainTime: number;
  currentListeningId: number;
  currentQuestionId: number;
  currentSection: string;
  section1: Array<ListeningDetail>;
  section2: Array<ListeningDetail>;
}

export interface ListeningDetail {
  id: number;
  type: string;
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

export interface ReadingProps {
  testData: ReadingTest;
  onSubmit: () => void;
}

// interface.ts
export interface HeaderProps {
  onNext?: () => void;
  onBack?: () => void;
  onReview?: () => void;
  onReturn?: () => void;
  onBegin?: () => void;
  onBackToQuestion?: () => void;
  onCountinue?: () => void;
  buttons: string;
  isReview?: boolean;
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

export interface ReadingHandles {
  resetReading: () => void;
}

export interface MiddleProps {
  type: string;
  remainTime: number;
  total: number;
  index: number;
  onSubmit: () => void;
  isPause?: boolean;
  isHiddenTime?: boolean;
}

export interface ListeningProps {
  path: string;
  onListeningEnded: () => void;
}

export interface ListeningQuestionProps {
  questionId: number;
  onEnded: () => void;
}

export interface ListeningQuestion {
  id: number;
  question: string;
  type: string;
  correctNumber: number;
  selections: Array<ListeningSelection>;
}

export interface ListeningSelection {
  id: number;
  information: string;
}

export interface SpeakingTest {
  section1Id: number;
  section2Id: number;
  section3Id: number;
  section4Id: number;
}

export interface SpeakingDetials {
  id: number;
  title: string;
  reading: string;
  question: string;
  type: string;
}

export interface SpeakingDirectionProps {
  onEnded: () => void;
  section: number;
}

export interface SectionProps {
  id: number;
  section: number;
  onUploadEnded: () => void;
  onReading: () => void;
  showArticle: boolean;
  isListening: boolean;
}

export interface IntegratedWritingProps {
  isDisable: boolean;
  id: number;
  onTextChange: (text: string) => void;
}

export interface AcademicDiscussionProps {
  id: number;
  onTextChange: (text: string) => void;
}

export interface WritingTest {
  integratedId: number;
  discussionId: number;
}

export interface Writing {
  id: number;
  reading: string;
  question: string;
  professorQuestion: string;
  studentA: string;
  studentB: string;
  type: string;
}

export interface TestResult {
  reading: number;         // Reading score, which is a number
  listening: number;       // Listening score, which is a number
  speaking: number;        // Speaking score, which is a number
  writing: number | null;  // Writing score, which can be a number or null
  overall: number;         // Overall score, which is a number
  startDate: string;       // Start date in "MM/DD/YYYY" format, which is a string
}