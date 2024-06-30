import { account } from "./account"
import { EOevent } from "./eo.type"
import { SponsorProgram } from "./sponsor"

export interface TableData {
    Name : string, 
    SponsorProgram: string,
    Email: string,
    Date: string,
    Delete: React.ReactNode
    // truyền vào 1 icon làm từ 1 component nên type là react node 
}

export interface SponsorProgramWithEvent {
    id: number,
    title: string,
    thumbnail: string,
    link: string,
    location: string,
    description: string,
    state: string,
    account: account[],
    events: EOevent[]
}

// [
//     {
//       "id": 0,
//       "title": "string",
//       "thumbnail": "string",
//       "link": "string",
//       "location": "string",
//       "description": "string",
//       "state": "PUBLISH",
//       "account": "string",
//       "events": [
//         "string"
//       ]
//     }
//   ]