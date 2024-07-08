<<<<<<< HEAD
import { account } from "./account"

export interface SponsorTable{
    No: number,
    Name: string,
    StaffEmail: string,
    ProfitPercent: number,
    Edit: React.ReactNode,
    Delete: React.ReactNode
    }

export interface SponsorProgram {
    title: String, 
    thumbnail: String, 
    link: String, 
    location: String, 
    description: String,
    state: StateProgram | null
}
enum StateProgram {
    PUBLISH,   // 0
    UNPUBLISH  // 1
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
=======
import { account } from "./account";

export interface SponsorTable {
  Name: string;
  Sponsor_Program: string;
  Email: string;
  Edit: React.ReactNode;
  Delete: React.ReactNode;
  Date: string;
}

export interface SponsorProgram {
  title: String;
  thumbnail: String;
  link: String;
  location: String;
  description: String;
  state: StateProgram | null;
}
enum StateProgram {
  PUBLISH, // 0
  UNPUBLISH, // 1
}

export interface SponsorInformation {
  id: number;
  information: string;
  companyName: string;
  companyID: string;
  fptStaffEmail: string;
  account: account;
}
>>>>>>> TienMerge
