import React from "react";

export interface AccountTable {
    Name: string, 
    Email: string, 
    Role: string,
    Password: string, 
    Edit: React.ReactNode,
    Delete: React.ReactNode    
}

export interface account {
    id: number,
    role: role,
    email: string,
    password: string,
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