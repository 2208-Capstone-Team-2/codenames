// This is a file of TS interfaces that get used in multiple places
// So they live here so you can import them!

interface Card {
  id: number;
  isVisibleToAll: boolean;
  wordString: string;
  wordId: number;
  boardId: number;
  teamId: null | number;
}

interface ClueType {
  clueString: string;
  clueNumber: null | number;
  playerSubmitting: string; // this is the player's ID (which is a string)
}

interface SingleHistoryObject {
  clueString: string;
  clueNumber: number;
}
interface PlayerType {
  playerId: string;
  username: string;
  roomId: string;
  isHost: boolean;
}

interface Spy {
  playerId: string;
  username: string;
}
export { PlayerType, ClueType, Card, SingleHistoryObject };
