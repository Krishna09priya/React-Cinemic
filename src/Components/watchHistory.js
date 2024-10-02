import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import Pagination from "./Pagination";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {getWatchHistory} from "./redux/getWatchHistoryRedux";

function WatchHistory() {
  const dispatch = useDispatch()
  const {isLoading,watchHistorylist} = useSelector((states)=> states?.getWatchHistoryReducer);

  const [currentPage, setCurrentPage] = useState(1); 

  useEffect(() => {
    dispatch(getWatchHistory(currentPage));
  }, [dispatch, currentPage]);
  
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="watchlist-body d-flex flex-column" style={{ minHeight: "100vh", backgroundColor:"#000"}} >
  <Navbar/>
  <div className="container flex-grow-1">
    <div className="mt-5 mb-3 mx-auto">
        <div className="row">
            <div className="col text-center" style={{color:'#0000ff'}}>
                <h1>Watch History</h1>
            </div>
        </div>
        <div className="row">
        <MovieCard data={watchHistorylist?.data}/>
      </div>
    </div>
    </div>
    {watchHistorylist?.data && watchHistorylist.data.length > 0 && (
        <div className="mt-auto">
          <Pagination
            currentPage={currentPage}
            totalPages={watchHistorylist?.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
</div>

  );
}

export default WatchHistory;
