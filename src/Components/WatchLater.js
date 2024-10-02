import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import Pagination from "./Pagination";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {getWatchlater} from "./redux/getWatchLaterRedux";
import {deleteResetMsg} from "./redux/deleteRedux";
import Notifications from "../utils/notifications";

function Watchlater() {
  const dispatch = useDispatch()
  const {isLoading,watchlaterlist} = useSelector((states)=> states?.getWatchLaterReducer);
  const {deleteMovieSuccessMessage} = useSelector((states)=> states?.deleteReducer);

  const [currentPage, setCurrentPage] = useState(1); 

  useEffect(() => {
    dispatch(getWatchlater(currentPage));
  }, [dispatch, currentPage]);
  
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(()=>{
    if(deleteMovieSuccessMessage){
      Notifications(deleteMovieSuccessMessage,'success')}
      dispatch(deleteResetMsg())
      dispatch(getWatchlater(currentPage))
  },[deleteMovieSuccessMessage,dispatch])

  return (
    <div className="watchlist-body d-flex flex-column" style={{ minHeight: "100vh", backgroundColor:"#000"}} >
  <Navbar/>
  <div className="container flex-grow-1" >
    <div className="mt-5 mb-3 mx-auto">
        <div className="row">
            <div className="col text-center" style={{color:'#0000ff'}}>
                <h1>Watch Later</h1>
            </div>
        </div>
        <div className="row">
        <MovieCard showRemoveBtn data={watchlaterlist?.data}/>
      </div>
    </div>
    </div>
    {watchlaterlist?.data && watchlaterlist.data.length > 0 && (
        <div className="mt-auto">
          <Pagination
            currentPage={currentPage}
            totalPages={watchlaterlist?.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
  </div>

  );
}

export default Watchlater;
