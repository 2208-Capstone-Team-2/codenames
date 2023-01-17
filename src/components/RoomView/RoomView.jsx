import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRoomId } from "../../store/playerSlice";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { onValue, ref, set, get, child, onDisconnect, update } from "firebase/database";
import { database } from "../../utils/firebase";
import { setAllPlayers } from "../../store/allPlayersSlice";
import { Container } from "@mui/material";
import ResponsiveAppBar from "../ResponsiveAppBar.jsx";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import styles from "./Room.styles";
import Popup from "reactjs-popup";
import SetupGame from "./setupGame.jsx";
import Button from "@mui/material/Button";
import {setTurn} from '../../store/gameSlice'


import Board from "./Board.jsx";
const RoomView = () => {
  // for room nav
  const params = useParams("");
  const roomIdFromParams = params.id;
  setRoomId(roomIdFromParams);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // frontend state
  const roomId = useSelector((state) => state.player.roomId);
  const playerId = useSelector((state) => state.player.playerId);
  const username = useSelector((state) => state.player.username);
  const allPlayers = useSelector((state) => state.allPlayers.allPlayers);
  const whosTurn = useSelector((state) => state.game.turn);
  const team1RemainingCards = useSelector((state) => state.game.team1RemainingCards);
  const team2RemainingCards = useSelector((state) => state.game.team2RemainingCards);
  const [loading, setLoading] = useState(false);

 // firebase room  & players reference
 let roomRef = ref(database, "rooms/" + roomId);
 let playerNestedInRoom = ref(database, "rooms/" + roomId + "/players/" + playerId);
 let playersInRoomRef = ref(database, "rooms/" + roomId + "/players/");
 let gameRef = ref(database, "rooms/" + roomId + "/game/");



  useEffect(() => {
    console.log('in room view use effect')
    // on loading page if no room or name, send back to join page
    if (roomId === "" || username === "") {
      navigate("/");
      return;
    } else {
      console.log("joined room!");
    }

    //when a user joins room, this checks to see if it exists 
    get(roomRef).then((snapshot) => {
      const doesRoomExist = snapshot.exists()
        if (doesRoomExist) {
          console.log("room already created, just add the player!");
          // playerId is key in the room/roomId/players/playerId, so we creating new player obj
          set(child(playersInRoomRef, playerId), { playerId, username })
        } else {
          // create the room, with players and host
          console.log('room not created yet. make one!')
          set(roomRef, {roomId: roomId, host: {playerId, username}, players: { [playerId]: {playerId, username }}, game: {gameStatus: 'not playing', team1RemainingCards, team2RemainingCards}})
        }})
      

      // whenever users are added to specific room, update frontend redux store
      onValue(playersInRoomRef, (snapshot) => {
        if (snapshot.exists()) {
          const players = snapshot.val();
          const values = Object.values(players)
          dispatch(setAllPlayers(values));
        } else {
          console.log('no players in room yet!')
        }
      })

      onValue(playerNestedInRoom, (snapshot) => {
        if (snapshot.exists()) {
          // if the player disconnects, remove them from the room
          onDisconnect(playerNestedInRoom).remove(playersInRoomRef+ '/' + playerId);
        } 
      })

       onValue(gameRef, (snapshot) => {
          const game = snapshot.val();
          console.log(gameStatus)
          if (game.gameStatus === 'team1SpyTurn') {
            // dispatch(setTurn('team1Spy'))
          } else if (game.gameStatus === 'team2SpyTurn') {
            // dispatch(setTurn('team2Spy'))
         } else if (game.gameStatus === 'team1OpsTurn') {
            // dispatch(setTurn('team2Spy'))
         } else if (game.gameStatus === 'team2OpsTurn') {
            // dispatch(setTurn('team2Spy'))
         } else if (game.gameStatus === 'gameOver') {
            // dispatch(setTurn(''))
            //   find winner from firebase
            // dispatch(setWinner(teamThatWon))
      }
      })

  }, []);

  console.log('whos turn?', whosTurn)

  const startGame = () => {
    console.log('startingGame')
      // firebase updates
      // gamestatus should be set to 'not playing' as default value
      // setGameStatus in firebase to 'team1SpyTurn'
      update(gameRef, {gameStatus: 'team1SpyTurn'})

      // setting cards first might help us avoid ui rendering of certain components after the game ends
      // set Team1 cards remaining to 9
      // set Team2 cards remaining to 8
  }

  const submitClue = () => {
    console.log('submitting clue')
    // if the team1spy submits clue, setTurn('team1Ops)
    // if the team2spy submits clue, setTurn('team2Ops)
    // setClue(team1Spy, 'magic', 2) /* dummy data */

  }

  const endTurn = () => {
    console.log("ending turn")  
    // update card remaining ammounts for each team
    // if team1CardRemaining && team2CardsRemaining -->
        // if the team1Ops endsTurn --> setTurn('team2Spy)
        // if the team2Ops endsTurn --> setTurn('team2Spy)
    // if team1CardsRemaining === 0 || team2CardsRemaining === 0 {
      // set winner to the team with 0 cards remaining
    }

  
console.log(allPlayers)



  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  if (loading) return <p>...loading...</p>;
  return (
    <>
      <ResponsiveAppBar />
      <Container style={styles.sx.RoomContainer}>
        <Grid container spacing={2} style={styles.sx.RoomGrid}>
          <Grid item xs={12} style={styles.sx.RoomAndPlayers}>
            <Item style={styles.sx.PlayerContainer}>Room id: {roomId}</Item>
            <Item style={styles.sx.PlayerContainer}>
              Players:
              {allPlayers?.map((player) => (
                <p key={player.playerId}>{player.username}</p>
              ))}
            </Item>
          </Grid>
          <Grid item xs={3} md={4} zeroMinWidth>
            <Item>Red Team</Item>
          </Grid>
          <Grid item xs={3} md={3} zeroMinWidth>
            <Item>Game History</Item>
          </Grid>
          <Grid item xs={3} md={4} zeroMinWidth>
            <Item>Blue Team</Item>
          </Grid>

          <Grid item xs={8} md={10} style={styles.sx.BoardGrid} zeroMinWidth>
            <Item>Board</Item>
          </Grid>
        </Grid>
      </Container>

      <Popup
        trigger={
          <button
            style={{
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {" "}
            Set Up
          </button>
        }
      >
        <SetupGame />
      </Popup>
      <Board />

      <Button variant ="contained" onClick={startGame}>start game</Button>
      <Button variant ="contained" onClick={submitClue}>submit clue</Button>
      <Button variant ="contained" onClick={endTurn}>end turn</Button>
    </>
  );
};

export default RoomView;
