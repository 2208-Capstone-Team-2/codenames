import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRoomId } from "../store/playerSlice";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { onValue, ref, set } from "firebase/database";
import { database } from "../utils/firebase";
import { setAllPlayers } from "../store/allPlayersSlice";
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

    // whenever users are added (not working for disconnecting users yet)
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

  if (loading) return <p>...loading...</p>;
  return (
    <>
      Room id: {roomId}
      <br></br>
      players:
      {allPlayers?.map((player) => (
        <p>{player.username}</p>
      ))}
    </>
  );
};

export default RoomView;
