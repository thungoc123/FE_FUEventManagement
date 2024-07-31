// This interface defines the structure of each survey question
export interface SurveyQuestion {
    No: number,            // The question number
    Question: string,      // The question text
    Answer: React.ReactNode,  // The answer element (could be a text field, select, etc.)
    Edit: React.ReactNode,    // The edit button or element
    Delete: React.ReactNode   // The delete button or element
}

// This interface defines the structure of the survey table
export interface SurveyTable {
    No: number;
    Name: string;
    Event: string; // Đảm bảo rằng eventName được khai báo ở đây
    State: string;
    Question: React.ReactNode;
    Edit: React.ReactNode;
    Delete: React.ReactNode;
  }
// This interface defines the structure of a survey query
export interface SurveyQuery {
    surveyId: number;
    title: string;
    eventName?: string; // Đảm bảo rằng eventName được khai báo ở đây
    deleteAt: null;
    modifiedAt: null;
    state: State | null;
  }
// This interface defines the state structure
export interface State {
    stateId: number,        // The state ID
    stateName: string,      // The state name
    surveys: []             // The list of surveys in this state
}

// This interface defines the structure of survey questions
export interface SurveyQuestions {
    typeQuestion: string | null,  // The type of question, if any
    textQuestion: string | null,  // The text of the question, if any
    answers?: SurveyAnswer[]      // The list of answers for the question, if any
}

// This interface defines the structure of survey answers
export interface SurveyAnswer {
    answer: string,        // The answer text
    deletedAt: null,       // The deletion timestamp, if any
    modifiedAt: null,      // The last modification timestamp, if any
    question_id?: number   // The ID of the question this answer belongs to, if any
}

// This interface defines the structure of survey question queries
export interface SurveyQuestionQuery {
    surveyQuestionID: number,  // The survey question ID
    typeQuestion: string,      // The type of question
    textQuestion: string,      // The text of the question
    deletedAt: null,           // The deletion timestamp, if any
    modifiedAt: null,          // The last modification timestamp, if any
    answers: null,             // The list of answers, if any
    surveyID: number           // The ID of the survey this question belongs to
}
