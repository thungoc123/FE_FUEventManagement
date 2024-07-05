export interface StateEvent {
  id: number;
  name: string;
}

// src/Types/sponsor_program.ts

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

  