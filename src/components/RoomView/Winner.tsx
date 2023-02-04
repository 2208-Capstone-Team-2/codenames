import React, { useEffect, useState } from 'react';
import { setCurrentClue } from '../../store/clueSlice';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { database } from '../../utils/firebase';
import { ref, get, push, update, onValue } from 'firebase/database';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { setRoomId } from '../../store/playerSlice';
interface ReduxState {
    player: { playerId: string };
    game: { status: string; winner: string };
  }
  const Winner:React.FC= () => {
    const { roomId } = useParams();
    setRoomId(roomId);
    const playerId= useSelector((state: ReduxState) => state.player)
    const gameStatus=useSelector((state:ReduxState)=>state.game.status)
    const winnerRef = ref(database, `rooms/${roomId}/game/winner`);
    const[playerIdArray, setPlayerIdArray]=useState<string[]>([])
    useEffect(()=>{
      onValue(winnerRef, async (winnerSnapshot) => {
      
        if (winnerSnapshot.exists()) {
           const teamWinner=winnerSnapshot.val();
           const teamWinnerRef = ref(database, `rooms/${roomId}/${teamWinner}/`);
           get(teamWinnerRef).then (async(winnerMemberSnapshot)=>{
            if(winnerMemberSnapshot.exists())
            {const winnerMember=winnerMemberSnapshot.val()
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
           setPlayerIdArray(getPlayerIds(winnerMember))
              console.log(playerIdArray)
           }})}} );},[])
          
if(playerIdArray.includes(playerId.playerId)&&gameStatus==='complete')
    {return <h1> Congradulations! You won the game! How about beat them again?</h1>;}
    else{return null}
  }
  export default Winner;