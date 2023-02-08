export interface Player {
    id: string;
    username: string;
    role: string;
    wins: number;
    roomId: string | null;
    teamId: string | null;
    isSpectator: boolean;
    createdAt: string;
    updatedAt: string;
  }
  export interface PageClickEvent {
    selected: number;
  }