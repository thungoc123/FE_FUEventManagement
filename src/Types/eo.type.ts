import { account } from "./account"
import { FeedbackQuery } from "./feedback"
import { Sponsor, SponsorInformation, SponsorProgram } from "./sponsor"

export interface EOevent {
    id: number,
    name: string,
    description: string,
    price: number,
    timestart: string,
    timeend: string,
    timeopensale: string,
    timeclosesale: string,
    stateEvent: StateEvent,
    feedbacks: FeedbackQuery[] | null,
    eventImages: EventImage[] | null,
    eventSchedules: EventSchedule[] | null,
    eventCheckingStaffs: eventCheckingStaff[] | null,
    sponsorEvents:sponsorEvent[] | null,
    sponsorProgramEvents: sponsorProgramEvent[] | null,
    tickets: []
}

export interface StateEvent {
    id: number,
    name: string,
}
export interface sponsorProgramEvent {
    eventId: number,
    sponsorProgramId: number
}
export interface sponsorEvent {
    eventId: number,
    sponsorId: number,
    sponsor: Sponsor,
    profitPercent: number
}
export interface EventImage {
    id: number,
    url: string
}
export interface EventSchedule {
    id: string,
    name: string,
    actor: string,
    date: string,
    timestart: string,
    duration: string,
    eventType: string,
    description: string,
    location: string
}
export interface eventCheckingStaff {
    id: number,
    account: account
}

export interface EventInprogress {
    No: number,
    Name: string,
    Date: string,
    Attendance: React.ReactNode,
    Detail: React.ReactNode,
    Delete: React.ReactNode
}
