import { ReactNode } from "react"

export interface Event {
    name: string, 
    description: string, 
    price: number, 
    timeclosesale: string,
    timeend: string,
    timeopensale: string,
    timestart: string,
    state: string,
    image: string
}


export interface QuestionSurveyTable {
    No: number, 
    Question : string, 
    Number: number,
    Survey: string, 
    Date: string,
    View: React.ReactNode
}