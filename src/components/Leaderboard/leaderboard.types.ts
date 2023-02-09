export interface Player {
  id: string;
  username: string;
  role: string;
  wins: number;
  roomId: string | null;
  teamId: string | null;
  createdAt: string;
  updatedAt: string;
}
export interface PageClickEvent {
  selected: number;
}
