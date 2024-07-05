
export interface StateEvent {
  id: number;
  name: string;
}

export interface EventImage {
  id: number;
  url: string;
  event: string;
}

export interface TimeStart {
  hour: number;
  minute: number;
  second: number;
  nano: number;
}

export interface Duration {
  hour: number;
  minute: number;
  second: number;
  nano: number;
}

export interface EventSchedule {
  id: number;
  name: string;
  actor: string;
  date: string;
  timestart: TimeStart;
  duration: Duration;
  eventType: string;
  description: string;
  location: string;
  event: string;
}

export interface Role {
  id: number;
  roleName: string;
  accounts: string[];
}

export interface Visitor {
  id: number;
  information: string;
  account: string;
}

export interface EventOperator {
  id: number;
  information: string;
  account: string;
}

export interface Sponsor {
  id: number;
  information: string;
  companyName: string;
  companyID: string;
  fptStaffEmail: string;
  account: string;
}

export interface Account {
  id: number;
  role: Role;
  email: string;
  password: string;
  visitors: Visitor[];
  eventOperators: EventOperator[];
  sponsors: Sponsor[];
  checkingStaffs: string[];
}

export interface EventCheckingStaff {
  id: number;
  account: Account;
  event: string;
}

export interface SponsorProgram {
  id: number;
  title: string;
  thumbnail: string;
  link: string;
  location: string;
  description: string;
  state: string;
  events: string[];
}

export interface Event {
  id: number;
  name: string; 
  description: string;
  price: number;
  timestart: string;
  timeend: string;
  timeopensale: string;
  timeclosesale: string;
  stateEvent: StateEvent;
  quantity:string;
  eventImages: EventImage[];
  eventSchedules: EventSchedule[];
  eventCheckingStaffs: EventCheckingStaff[];
  sponsorPrograms: SponsorProgram[];
}
