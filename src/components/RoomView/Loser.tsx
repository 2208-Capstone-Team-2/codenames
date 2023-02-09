import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { database } from '../../utils/firebase';
import { ref, get, onValue } from 'firebase/database';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
interface TeamInfo {
  [property: string]: any;
   }
  const Loser: React.FC= () => {
    const { roomId } = useParams();
    const playerId= useSelector((state: RootState) => state.player.playerId)
    const gameStatus=useSelector((state: RootState)=>state.game.status)
    const loserRef = ref(database, `rooms/${roomId}/game/loser`);
    const [isVisible, setIsVisible] = useState(true);
    const[playerIdArray, setPlayerIdArray]=useState<string[]>([])
    useEffect(()=>{
      onValue(loserRef, async (loserSnapshot) => {
        if (loserSnapshot.exists()) {
           const teamLoser=loserSnapshot.val();
           const teamLoserRef = ref(database, `rooms/${roomId}/${teamLoser}/`);
           get(teamLoserRef).then (async(loserMemberSnapshot)=>{
            if(loserMemberSnapshot.exists())
            {const loserMember=loserMemberSnapshot.val()
              const getPlayerIds=(obj:TeamInfo):string[] =>{
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
           }})}} );},[])
    
return isVisible && playerIdArray.includes(playerId) && gameStatus === 'complete' ? (
  <div className="loser">
    <h1>You are a loser, you should try again!</h1>
    <button className="closeButton" onClick={() => setIsVisible(false)}>X</button>
  </div>): <div />;
  }
   
  export default Loser;