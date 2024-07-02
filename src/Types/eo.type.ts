import { account } from "./account"
import { SponsorInformation, SponsorProgram } from "./sponsor"

export interface EOevent {
    id: number, 
    name: string, 
    description: string, 
    price: number,
    timestart: string,
    timeend: string, 
    timeopensale: string, 
    timeclosesale: string,
    sponsor: null | SponsorInformation[], 
    stateEvent: StateEvent
    eventImages: EventImage[] | null,
    eventSchedules: EventSchedule[] | null,
    eventCheckingStaffs: eventCheckingStaff[] | null,
    sponsorPrograms: SponsorProgram[] | null
}

export interface StateEvent {
    id: number,
    name: string, 
    // events: null | []
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

// export interface sponsor {
//     id: number, 
//     compa
// }
// {
//     "id": 33,
//     "name": "test",
//     "description": "test",
//     "price": 33.0,
//     "timestart": "2024-06-28T16:18:00",
//     "timeend": "2024-06-29T16:18:00",
//     "timeopensale": "2024-06-26T18:18:00",
//     "timeclosesale": "2024-06-27T16:18:00",
//     "sponsor": null,
//     "stateEvent": {
//         "id": 1,
//         "name": "PUBLISH",
//         "events": []
//     },
//     "eventImages": [
//         {
//             "id": 15,
//             "url": "https://swpproject.s3.ap-southeast-2.amazonaws.com/386377032_3580711562245329_2467948678721076993_n.jpg"
//         }
//     ],
//     "eventSchedules": [
//         {
//             "id": 31,
//             "name": "Quarterly Review Meeting",
//             "actor": "John Doe",
//             "date": "2024-07-15",
//             "timestart": "10:00:00",
//             "duration": "00:00:02",
//             "eventType": "Meeting",
//             "description": "Annual company meeting to discuss quarterly results and future plans",
//             "location": "Main Conference Room"
//         }
//     ],
//     "eventCheckingStaffs": [
//         {
//             "id": 15,
//             "account": {
//                 "id": 39,
//                 "role": {
//                     "id": 4,
//                     "roleName": "ROLE_CHECKING_STAFF",
//                     "accounts": []
//                 },
//                 "email": "aaa@gmail.com",
//                 "password": "123",
//                 "feedbacks": [],
//                 "visitors": [],
//                 "eventOperators": [],
//                 "sponsors": [],
//                 "checkingStaffs": [],
//                 "sponsorPrograms": [],
//                 "events": []
//             }
//         }
//     ],
//     "sponsorPrograms": []
// }
// ]