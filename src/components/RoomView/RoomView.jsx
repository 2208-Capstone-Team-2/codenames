import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRoomId } from "../../store/playerSlice";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { onValue, ref, set, get, child, onDisconnect } from "firebase/database";
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
  const [loading, setLoading] = useState(false);

  // firebase room  & players reference
  let roomRef = ref(database, "rooms/" + roomId);
  let playersInRoomRef = ref(database, "rooms/" + roomId + "/players/");
  let playerNestedInRoomRef = ref(
    database,
    "rooms/" + roomId + "/players/" + playerId
  );
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
      const doesRoomExist = snapshot.exists();
      if (doesRoomExist) {
        console.log("room already created, just add the player!");
        // playerId is key in the room/roomId/players/playerId, so we creating new player obj
        set(child(playersInRoomRef, playerId), { playerId, username });
      } else {
        // create the room, with players and host
        console.log("room not created yet. make one!");
        set(roomRef, {
          roomId: roomId,
          host: { playerId, username },
          players: { [playerId]: { playerId, username } },
        });
      }
    });

    // whenever users are added to specific room, update frontend redux store
    onValue(playersInRoomRef, (snapshot) => {
      if (snapshot.exists()) {
        const players = snapshot.val();
        const values = Object.values(players);
        dispatch(setAllPlayers(values));
      } else {
        console.log("no players in room yet!");
      }
    });

    // if the player disconnects, remove them from the room
    onValue(playerNestedInRoomRef, (snapshot) => {
      if (snapshot.exists()) {
        console.log("hit here");
        onDisconnect(playerNestedInRoomRef).remove(
          playersInRoomRef + "/" + playerId
        );
      }
    });
  }, []);

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
    </>
  );
};

export default RoomView;
