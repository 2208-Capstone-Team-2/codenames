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
import TeamOneBox from "../teamBoxes/TeamOneBox";
import TeamTwoBox from "../teamBoxes/TeamTwoBox";

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
 let gameStatusRef = ref(database, "rooms/" + roomId + "/game/gameStatus/");



  useEffect(() => {
    console.log("in room view use effect");
    // on loading page if no room or name, send back to join page
    if (roomId === "" || username === "") {
      navigate("/");
      return; //immediately kick them!
    } else {
      console.log("joined room!");
    }

    console.log("hit here");

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


      // setting the 'turn' on the frontend will help determine what users are seeing depending on their role
      // for example, if its team1spymasters turn, they'll see the input clue box and number dropdown
       onValue(gameRef, (snapshot) => {
        if (snapshot.exists()) {
          const game = snapshot.val();
          if (game.team1RemainingCards && game.team2RemainingCards) {
            if (game.gameStatus === 'team1SpyTurn') {
              // dispatch(setTurn('team1Spy'))
            } else if (game.gameStatus === 'team2SpyTurn') {
              // dispatch(setTurn('team2Spy'))
           } else if (game.gameStatus === 'team1OpsTurn') {
              // dispatch(setTurn('team2Spy'))
           } else if (game.gameStatus === 'team2OpsTurn') {
              // dispatch(setTurn('team2Spy'))
           } 
          }
         
         else if (game.gameStatus === 'gameOver') {
            // havent gotten here yet really, but presumably we'd want to:
                // dispatch(setTurn('')) --> its no ones turn anymore
                // set and get winning team from firebase so that we can...
                    // dispatch(setWinner(teamThatWon))
      }
      }})

  }, []);

  const startGame = () => {
    console.log('startingGame')
      // gamestatus default value in firebase is 'not playing'.
      // when startGame is clicked, firebase gamestatus changes to 'team1SpyTurn'
      update(gameRef, {gameStatus: 'team1SpyTurn'})
  }


  // only spymaster whos turn it is should see the button that triggers this fxn
  // when the spymaster submits the clue, the corresponding operatives team gets to guess next
  const submitClue = () => {
    console.log('submitting clue')
    // haven't done any clue validation. this is just changing 'turns'

    // store the clue in clueHistory and as current clue
    // will have {teamSubmittingClue: team-1, clue: string, numOfGuesses: 3}

    // get the gameStatus
    get(gameRef).then((snapshot) => {
        if (snapshot.exists()) {
          let currentGameStatus = snapshot.val().gameStatus
          let nextGameStatus;
          // if its team1spy submission, team1Ops goes next
          if (currentGameStatus === 'team1SpyTurn') {
            nextGameStatus = 'team1OpsTurn'
            update(gameRef, {gameStatus: nextGameStatus})
            // update clue data in redux and firebase
          }
          // if its team2spy submission, team2Ops goes next
          if (currentGameStatus === 'team2SpyTurn') {
            nextGameStatus = 'team2OpsTurn'
            update(gameRef, {gameStatus: nextGameStatus})
           // update clue data in redux and firebase

          }
        } else {
          console.log('there should always be a game status so this should never get hit!')
        }})
  }


  // right now, this is just changing turns depending on who clicks on the end turn button.
  // only operatives should see this button when its their 'turn'
  const endTurn = () => {
    console.log("ending turn")  

    get(gameRef).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val())
        let currentGameStatus = snapshot.val().gameStatus
        let team1RemainingCards = snapshot.val().team1RemainingCards
        let team2RemainingCards = snapshot.val().team2RemainingCards
        let nextStatus;

        // if cards remain on both sides, swap to the next teams turn
        if (team1RemainingCards && team2RemainingCards) {
          if (currentGameStatus === 'team1OpsTurn') {
            nextStatus = 'team2SpyTurn'
            update(gameRef, {gameStatus: nextStatus})
            // dispatch(setTurn(nextStatus))
            // update cards remaining in redux and firebase
          }
          if (currentGameStatus === 'team2OpsTurn') {
            nextStatus = 'team1SpyTurn'
            update(gameRef, {gameStatus: nextStatus})
           // dispatch(setTurn(nextStatus))
           // update cards remaining in redux and firebase
          }
        }
        else {
          // if someone has 0 cards remaining, that means that someone won the game
        }

      }})
    }

  




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
            <TeamOneBox/>
          </Grid>
          <Grid item xs={3} md={3} zeroMinWidth>
            <Item>Game History</Item>
          </Grid>
          <Grid item xs={3} md={4} zeroMinWidth>
            <TeamTwoBox/>
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
