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
