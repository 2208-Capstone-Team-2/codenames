import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRoomId } from "../store/playerSlice";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { onValue, ref, set, update } from "firebase/database";
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
  let hostRef = ref(database, "rooms/" + roomId + "/host/");
  const allPlayersRef = ref(database, "players/");
  let playerRef = ref(database, "players/" + playerId);

  
  function makeSpymaster(e, player, username) {  
    let redSpymaster;
    let blueSpymaster;
    if (e.target.value === 'red') {
      redSpymaster = {
        playerId: player.uid,
        username
      };
      update(roomRef, {redSpymaster: redSpymaster});
    } else if (e.target.value === 'blue'){
        blueSpymaster = {
          playerId: player.uid,
          username
        };
      update(roomRef, {blueSpymaster: blueSpymaster});
    }
  }

  useEffect(() => {
    // on loading page if no room or name, send back to join page
    if (roomId === "" || username === "") {
      navigate("/");
    } else {
      console.log("joined room!");
    }

    // whenever users are added (need to change this to when theyre added to ROOM)
    
    onValue(allPlayersRef, (snapshot) => {
      setLoading(true);
      const data = snapshot.val();

      let playersInRoom = [];
      // whenever a player joins room, push them into room array
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

     



    // onValue(roomRef, (snapshot) => {
    //   const roomData = snapshot.val();
      // // next steps: 
      // // make roomInfo redux store to hold all room data!
      // // dispatch(setRoomInfo(roomInfo));
    // });
  }, []);

  console.log(allPlayers)

  if (loading) return <p>...loading...</p>;
  return (
    <>
      Room id: {roomId}
      <br></br>
      players:
      {allPlayers?.map((player) => (
        <p key={player.id}>{player.username}</p>
      ))}

      <button onClick={(e) => {makeSpymaster(e, player, username)}} value="red">red</button>
      <button onClick={(e) => {makeSpymaster(e, player, username)}} value="blue">blue</button>
    </>
  );
};

export default RoomView;
