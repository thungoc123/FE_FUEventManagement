import React from "react";

export interface FeedbackTable {
    No: number ,
    Name: string,
    Event: string,
    state: string,
    Question: React.ReactNode,
    Edit: React.ReactNode,
    // Publish: React.ReactNode,
    Delete: React.ReactNode
}

export interface Question {
    No: number,
    Question: string, 
    Answer: React.ReactNode,
    Edit: React.ReactNode,
    Delete: React.ReactNode
}

export interface Answer {
    No: number, 
    Answer: string, 
    Question: string, 
    Edit : React.ReactNode,
    Delete: React.ReactNode,
}


export interface Feedback {
    // feedbackID: number,
    title: string, 
    deleteAt: null, 
    modifiedAt: null, 
    state: number,
    feedbackQuestions: feedbackQuestions[],
    eventid: number
}
export interface FeedbackQuery {
    feedbackID: number,
    title: string, 
    eventName?:string,
    deleteAt: null, 
    modifiedAt: null, 
    state: state | null,
}


export interface state {
    stateId: number,
    stateName: string, 
    feedbacks: []
}
export interface feedbackQuestions {
    typeQuestion: string | null, 
    textQuestion: string | null,
    answers?: feedbackAnswer[]
}

export interface feedbackAnswer {
          answer: string,
          deleteAt: null,
          modifiedAt: null,
          question_id?: 0
}

export interface feedbackQuestionQuery {
    feedbackQuestionID: number,
    typeQuestion: string,
    textQuestion: string,
    deleteAt: null,
    modifiedAt: null,
    answers: null,
    feedbackID: number
}