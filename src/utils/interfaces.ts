// This is a file of TS interfaces that get used in multiple places
// So they live here so you can import them!

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
interface ClueType {
  clueString: string;
  clueNumber: number;
  playerSubmitting: string; // this is the player's ID (which is a string)
}

interface Card {
  ///
}
export { PlayerType, ClueType };
