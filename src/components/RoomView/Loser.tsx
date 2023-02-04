import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { database } from '../../utils/firebase';
import { ref, get, onValue } from 'firebase/database';
import { useSelector } from 'react-redux';
import { setRoomId } from '../../store/playerSlice';
interface ReduxState {
  player: { playerId: string };
  game: { status: string; loser: string };
}
  const Loser: React.FC= () => {
    const { roomId } = useParams();
    const playerId= useSelector((state: ReduxState) => state.player)
    const gameStatus=useSelector((state:ReduxState)=>state.game.status)
    const loserRef = ref(database, `rooms/${roomId}/game/loser`);
    const[playerIdArray, setPlayerIdArray]=useState<string[]>([])
    useEffect(()=>{
      onValue(loserRef, async (loserSnapshot) => {
      
        if (loserSnapshot.exists()) {
           const teamLoser=loserSnapshot.val();
           const teamLoserRef = ref(database, `rooms/${roomId}/${teamLoser}/`);
           get(teamLoserRef).then (async(loserMemberSnapshot)=>{
            if(loserMemberSnapshot.exists())
            {const loserMember=loserMemberSnapshot.val()
              const getPlayerIds=(obj:any):string[] =>{
                let playerIds:string[] = [];
                for (const key in obj) {
                    if (obj[key].hasOwnProperty("playerId")) {
                        playerIds.push(obj[key].playerId);
                    } else {
                        playerIds = playerIds.concat(getPlayerIds(obj[key]));
                    }
                }
                return playerIds;}
           setPlayerIdArray(getPlayerIds(loserMember))
              console.log(playerIdArray)
           }})}} );},[])
           console.log(playerIdArray)
           console.log(playerId)
if(playerIdArray.includes(playerId.playerId)&&gameStatus==='complete')
    {return <h1> You are a loser, you should try again!</h1>;}
  else{return null}
  }
  export default Loser;