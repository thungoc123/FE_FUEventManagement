import React from "react";

export interface AccountTable {
    No: number,
    Name: string,
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