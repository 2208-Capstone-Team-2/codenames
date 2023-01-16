import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRoomId } from "../../store/playerSlice";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { onValue, ref, set } from "firebase/database";
import { database } from "../../utils/firebase";
import { setAllPlayers } from "../../store/allPlayersSlice";
import { Container } from "@mui/material";
import ResponsiveAppBar from "../ResponsiveAppBar.jsx";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import NestedGrid from "./Board.jsx";
import styles from "./Room.styles";

const RoomView = () => {
  // for room nav
  const params = useParams("");
  const roomIdFromParams = params.id;
  setRoomId(roomIdFromParams);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // frontend state
  const roomId = useSelector((state) => state.player.roomId);
  const username = useSelector((state) => state.player.username);
  const allPlayers = useSelector((state) => state.allPlayers.allPlayers);
  const [loading, setLoading] = useState(false);

  // firebase room  & players reference
  let roomRef = ref(database, "rooms/" + roomId);
  const allPlayersRef = ref(database, "players/");

  useEffect(() => {
    // on loading page if no room or name, send back to join page
    if (roomId === "" || username === "") {
      navigate("/");
    } else {
      console.log("joined room!");
    }

    // whenever users are added
    onValue(allPlayersRef, (snapshot) => {
      setLoading(true);
      const data = snapshot.val();

      // moving fb data into array on frontend so easier to work with
      let playersInRoom = [];
      Object.values(data).forEach((player) => {
        if (player.roomId === roomId) {
          playersInRoom.push(player);
        }
      });
      dispatch(setAllPlayers(playersInRoom));
      // setting players in the room to the 'players' key on firebase
      set(roomRef, { players: playersInRoom });
      setLoading(false);
      console.log("new player!");
    });
  }, []);
  console.log({ allPlayers });

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
                <p key={player.id}>{player.username}</p>
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
            <NestedGrid />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default RoomView;
