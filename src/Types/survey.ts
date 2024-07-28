import React from "react";

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
    No: number,            // The survey number
    Survey: string,        // The survey name
    State: string,         // The state of the survey
    Question: React.ReactNode,  // The question element (could be a link to the list of questions)
    Edit: React.ReactNode,    // The edit button or element
    Delete: React.ReactNode   // The delete button or element
}

// This interface defines the structure of a complete survey
export interface Survey {
    title: string,          // The survey title
    deleteAt: null,         // The deletion timestamp, if any
    modifiedAt: null,       // The last modification timestamp, if any
    state: number,          // The state of the survey (e.g., draft, published)
    surveyQuestions: SurveyQuestion[],  // The list of questions in the survey
    eventid: number         // The ID of the event associated with the survey
}

// This interface defines the structure of a survey query
export interface SurveyQuery {
    surveyID: number,       // The survey ID
    title: string,          // The survey title
    eventName?: string,     // The event name, if available
    deleteAt: null,         // The deletion timestamp, if any
    modifiedAt: null,       // The last modification timestamp, if any
    state: State | null,    // The state of the survey, or null if not set
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
