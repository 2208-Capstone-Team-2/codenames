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
    console.log('in room view use effect')
    // on loading page if no room or name, send back to join page
    if (roomId === "" || username === "") {
      navigate("/");
    } else {
      console.log("joined room!");
    }

  get(roomRef).then((snapshot) => {
    const doesRoomExist = snapshot.exists()
      if (doesRoomExist) {
        console.log("room already created");
        // playerId is key in the room/roomId/players/playerId, so we creating new player obj
        set(child(playersInRoomRef, playerId), { playerId, username })
      } else {
        // create the room, with players and host
        console.log('setting room ref')
        set(roomRef, {roomId: roomId, host: {playerId, username}, players: { [playerId]: {playerId, username }}})
      }})
      

    // whenever users are added (need to change this to when theyre added to ROOM)
    
    onValue(playersInRoomRef, (snapshot) => {
      if (snapshot.exists()) {
        console.log('players in room updating: ', snapshot.val())
        const players = snapshot.val();
        const values = Object.values(players)
        console.log('the values',values)
        dispatch(setAllPlayers(values));
      } else {
        console.log('no players in room yet!')
      }
    })
    
    
    
    

     
// console.log(allPlayers)


    // onValue(roomRef, (snapshot) => {
    //   const roomData = snapshot.val();
      // // next steps: 
      // // make roomInfo redux store to hold all room data!
      // // dispatch(setRoomInfo(roomInfo));
    // });
  }, []);

  console.log('redux', {allPlayers})

 

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
