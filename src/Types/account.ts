import React from "react";

export interface AccountTable {
<<<<<<< HEAD
    No: number,
    Name: string,
    Email:  string,
    Role: string,
    Password: string,
    State: string,
    Edit: React.ReactNode,
=======
    Name: string, 
    Email: string, 
    Role: string,
    Password: string, 
    Edit: React.ReactNode,
    Delete: React.ReactNode    
>>>>>>> TienMerge
}

export interface account {
    id: number,
    role: role,
    email: string,
    password: string,
<<<<<<< HEAD
    enabled: boolean,
=======
>>>>>>> TienMerge
    feedbacks: [] | null,
    visitors: [] | null,
    eventOperators: [] | null,
    sponsors: [] | null,
    checkingStaffs: [] | null,
    sponsorPrograms: [] | null,
    events: [] | null
}
export interface role {
    id: number,
    roleName: string,
    accounts: [] | null
<<<<<<< HEAD
}

export interface visitor {
    id: 3,
    information: null,
    account: account,
}

export interface visitorTable {
    No: number,
    Name: string,
    Attendance: React.ReactNode,
    SendFeedback: React.ReactNode,
    // Delete: React.ReactNode,
=======
>>>>>>> TienMerge
}