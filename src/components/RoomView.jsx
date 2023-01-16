import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRoomId } from "../store/playerSlice";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { onValue, ref, set, update, get, child } from "firebase/database";
import { setAllPlayers } from "../store/allPlayersSlice";
import { database, auth } from "../utils/firebase";

const RoomView = () => {
  // for room nav
  const params = useParams("");
  const roomIdFromParams = params.id;
  setRoomId(roomIdFromParams);
  const player = auth.currentUser
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
  let playersInRoomRef = ref(database, "rooms/" + roomId + '/players/');
  const allPlayersRef = ref(database, "players/");
  let playerRef = ref(database, "players/" + playerId);

  


  useEffect(() => {
    console.log('in room view use effect')
    // on loading page if no room or name, send back to join page
    if (roomId === "" || username === "") {
      navigate("/");
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
        set(roomRef, {roomId: roomId, host: {playerId, username}, players: { [playerId]: {playerId, username }}})
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
    
  }, []);
 

  if (loading) return <p>...loading...</p>;
  return (
    <>
      Room id: {roomId}
      <br></br>
      players:
      {allPlayers?.map((player) => (
        <p key={player.id}>{player.username}</p>
      ))}

    </>
  );
};

export default RoomView;
