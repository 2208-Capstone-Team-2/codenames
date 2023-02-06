import React, { useEffect, useState } from 'react';
import { setCurrentClue } from '../../store/clueSlice';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { database } from '../../utils/firebase';
import { ref, get, push, update, onValue } from 'firebase/database';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { setRoomId } from '../../store/playerSlice';
import { RootState } from '../../store';

  const Winner:React.FC= () => {
    const { roomId } = useParams();
    setRoomId(roomId);
    const playerId= useSelector((state: RootState) => state.player.playerId)
    const gameStatus=useSelector((state:RootState)=>state.game.status)
    const winnerRef = ref(database, `rooms/${roomId}/game/winner`);
    const[playerIdArray, setPlayerIdArray]=useState<string[]>([]);
    const [isVisible, setIsVisible] = useState(true);
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
          
           return isVisible && playerIdArray.includes(playerId) && gameStatus === 'complete' ? (
            <div className="winner">
              <h1>Congratulations! You won the game! How about play again?</h1>
              <button className="closeButton" onClick={() => setIsVisible(false)}>X</button>
            </div>): <div />;
  }
  export default Winner;