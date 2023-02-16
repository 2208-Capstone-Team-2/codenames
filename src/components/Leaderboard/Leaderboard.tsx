import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { PageClickEvent, Player } from './leaderboard.types';
import './leaderboard.css';
import { Link } from 'react-router-dom';
import CustomLoader from '../CustomLoader/CustomLoader';
const Leaderboard = () => {
  // eslint-disable-next-line no-unused-vars
  const [allPlayers, setAllPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageNumColor, setPageNumColor] = useState<string>('pagination__link--active-red');
  const getPlayers = async () => {
    setLoading(true);
    // Grabbing players from the backend, later we could make this a little different
    // --- Maybe we wouldn't want to get players who have 0 wins, or you have to gave a certain number
    // --- of wins to be on the leaderboard?
    const { data } = await axios.get<Player[]>('/api/player');
    // Sort in place based on wins, then set it to local state, although this can later be redux state
    data.sort((a, b) => b.wins - a.wins);
    setAllPlayers(data);
    setLoading(false);
  };
  // PAGINATION
  // Hardcoded # of results, if in the future we wanted the user to be able to change the # of items per page
  // we would then could have state determine this.
  const PER_PAGE: number = 5;
  const offset: number = currentPage * PER_PAGE;
  const currentPageData: Player[] = allPlayers.filter((player) => player.wins > 1).slice(offset, offset + PER_PAGE);
  console.log(currentPageData);
  const pageCount: number = Math.ceil(allPlayers.filter((player) => player.wins > 1).length / PER_PAGE);
  //
  function handlePageClick({ selected: selectedPage }: PageClickEvent) {
    setCurrentPage(selectedPage);
    if (pageNumColor === 'pagination__link--active-red') {
      setPageNumColor('pagination__link--active-blue');
    } else {
      setPageNumColor('pagination__link--active-red');
    }
  }
  useEffect(() => {
    getPlayers();
  }, []);
  // if (loading) return <CustomLoader />;
  return (
    <div className="leaderboardContainer">
      <div className="homeButton">
        <Link to={'/'}>
          <button>&larr;&nbsp;Home</button>
        </Link>
      </div>
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
          activeClassName={pageNumColor}
        />
      </div>
    </div>
  );
};

export default Leaderboard;
