import React from "react";

export interface FeedbackTable {
    Name: string, 
    Date: string,
    Detail: React.ReactNode,
    State: string,
    Delete: React.ReactNode
}

export interface Question {
    No: number,
    Question: string, 
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