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
<<<<<<< HEAD
    number?: number,
=======
    number: number,
>>>>>>> TienMerge
    icon: React.ReactNode
}
export interface Time {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  }
export interface NavigationProps {
    Name: string, 
    Url: string,
    icon: React.ReactNode
    State? : State[]
}
