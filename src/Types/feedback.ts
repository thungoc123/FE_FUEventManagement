import React from "react";
import { account } from "./account";

export interface FeedbackTable {
    No: number ,
    Name: string,
    Event: string,
    state: string,
    Detail: React.ReactNode,
    Publish: React.ReactNode,
    Delete: React.ReactNode
}

export interface Question {
    No: number,
    Question: string, 
    // Type: string, 
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
    // feedbackQuestions: feedbackQuestions[],
    // eventid: number
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
          deletedAt: null,
          modifiedAt: null,
          question_id?: 0
}

export interface feedbackQuestionQuery {
    feedbackQuestionID: number,
    typeQuestion: string,
    textQuestion: string,
    deletedAt: null,
    modifiedAt: null,
    answers: null,
    feedbackID: number
}