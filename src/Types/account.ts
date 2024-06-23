import React from "react";

export interface AccountTable {
    Name: string, 
    Email: string, 
    Role: string,
    Password: string, 
    Edit: React.ReactNode,
    Delete: React.ReactNode    
}