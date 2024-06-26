import React from "react";

export interface ButtonDashboard {
    dialog: React.ReactNode
}
export interface Search {
    search: React.ReactNode
}
export interface State {
    name: string, 
    url: string,
    number: number,
    icon: React.ReactNode
}

export interface NavigationProps {
    Name: string, 
    Url: string,
    icon: React.ReactNode
    State? : State[]
}
