import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setTeam1Id } from '../../store/teamOneSlice';
import { setTeam2Id } from '../../store/teamTwoSlice';
import { setBystanderTeamId, setAssassinTeamId } from '../../store/assassinAndBystanderSlice';
import { setRoomId } from '../../store/playerSlice';

function FetchRoom() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const fetchRoom = async () => {
    setLoading(true);
    try {
      const room = await axios.get(`/api/room/${roomId}`);
      setLoading(false);

      // Now that we have room from backend, set all the redux pieces relevant to it.
      dispatch(setRoomId(room.data.name)); //***** i still want to change this to roomname and have it not live on player slice */
      dispatch(setTeam1Id(room.data.team1id));
      dispatch(setTeam2Id(room.data.team2id));
      dispatch(setBystanderTeamId(room.data.team3id));
      dispatch(setAssassinTeamId(room.data.team4id));
    } catch (err) {
      setLoading(false);
      // if we didn't find a room in the backend with this name, or something else went wrong,
      // give them a 404
      console.log(err);
      return navigate('/404');
    }
  };

  useEffect(() => {
    fetchRoom();
  });

  if (loading) return <p>loading room information...</p>;
  else return <div></div>;
}

export default FetchRoom;
