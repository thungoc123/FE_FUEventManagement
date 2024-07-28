import { account } from "./account"
import { EOevent } from "./eo.type";

export interface SponsorTable{
    No: number,
    Name: string,
    StaffEmail: string,
    ProfitPercent: number,
    Edit: React.ReactNode,
    Delete: React.ReactNode
    }

export interface SponsorProgram {
    id: number,
    title: String, 
    thumbnail: String, 
    link: String, 
    location: String, 
    description: String,
    state: StateProgram | null,
    sponsorProgramEvents: SponsorProgramEvent[]
}
enum StateProgram {
    PUBLISHED,   // 0
    UNPUBLISHED  // 1
  }

export interface SponsorInformation {
    id: number, 
    information: string,
    companyName: string, 
    companyID: string, 
    fptStaffEmail: string, 
    account: account
}

export interface Sponsor {
    id: number;
    information: string;
    companyName: string;
    companyID: string;
    fptStaffEmail: string;
    account: account;
};
export interface SponsorProgramEvent {
    eventId: number,
        sponsorProgramId: number,
        sponsorProgram: string,
        event: EOevent
}