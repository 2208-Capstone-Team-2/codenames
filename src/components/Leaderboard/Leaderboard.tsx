import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import './leaderboard.css';
interface Player {
  id: string;
  username: string;
  role: string;
  wins: number;
  roomId: string | null;
  teamId: string | null;
  createdAt: string;
  updatedAt: string;
}
interface PageClickEvent {
  selected: number;
}
const Leaderboard = () => {
  // eslint-disable-next-line no-unused-vars
  const [allPlayers, setAllPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const getPlayers = async () => {
    setLoading(true);
    // Grabbing players from the backend, later we could make this a little different
    // --- Maybe we wouldn't want to get players who have 0 wins, or you have to gave a certain number
    // --- of wins to be on the leaderboard?
    const { data } = await axios.get('/api/player');
    // Sort in place based on wins, then set it to local state, although this can later be redux state
    data.sort((a:Player, b:Player) => b.wins - a.wins);
    setAllPlayers(data);
    setLoading(false);
  };
  // PAGINATION
  // Hardcoded # of results, if in the future we wanted the user to be able to change the # of items per page
  // we would then could have state determine this.
  const PER_PAGE = 5;
  const offset = currentPage * PER_PAGE;
  const currentPageData = allPlayers.filter((player) => player.wins > 1).slice(offset, offset + PER_PAGE);
  const pageCount = Math.ceil(allPlayers.filter((player) => player.wins > 1).length / PER_PAGE);
  //
  function handlePageClick({ selected: selectedPage }: PageClickEvent) {
    setCurrentPage(selectedPage);
  }
  useEffect(() => {
    getPlayers();
  }, []);
  if (loading) return 'Loading...';
  return (
    <div className="leaderboardContainer">
      <h1>LEADERBOARD</h1>
      <div className="players">
        <div id="headers">
          <span>Username</span> <span>Wins</span>
        </div>
        {currentPageData.map((player, index) => {
          return (
            <div key={index} className="playerRow">
              <div className="playerUsername">{player.username}</div>
              <div className="playerWins">{player.wins}</div>
            </div>
          );
        })}
      </div>
      <div className="paginateContainer">
        <ReactPaginate
          previousLabel={'← Previous'}
          nextLabel={'Next →'}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          previousLinkClassName={'pagination__link'}
          nextLinkClassName={'pagination__link'}
          disabledClassName={'pagination__link--disabled'}
          activeClassName={'pagination__link--active'}
        />
      </div>
    </div>
  );
};

export default Leaderboard;
