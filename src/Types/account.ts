import React from "react";

export interface AccountTable {
    No: number,
    // Name: string,
    Email:  string,
    Role: string,
    Password: string,
    State: string,
    Edit: React.ReactNode,
}

export interface account {
    id: number,
    role: role,
    email: string,
    password: string,
    enabled: boolean,
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
    ViewFeedback: React.ReactNode,
    // Delete: React.ReactNode,
}