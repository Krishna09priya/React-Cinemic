import "bootstrap/dist/css/bootstrap.min.css";
import "../Assets/Style Sheets/MovieViewPage.css";
import Navbar from "./Navbar";
import { FaPlusCircle } from "react-icons/fa";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"; // For getting id from URL
import { getMovieView } from "./redux/movieViewPageRedux";
import Notifications from '../utils/notifications';
import {postWatchlater} from "./redux/watchLaterRedux";

function MovieViewPage() {
  const { id } = useParams();
  
  const dispatch = useDispatch();
  const { movie, isLoading, movieViewErrorMessage } = useSelector((state) => state?.movieViewReducer);
  console.log('movie',movie);

  useEffect(() => {
    if (id) {
      dispatch(getMovieView(id)); // Dispatch API call with id
    }
  }, [dispatch, id]);

  useEffect(()=>{
    if(movieViewErrorMessage){
      Notifications(movieViewErrorMessage)}
  },[movieViewErrorMessage])

  const handleAddToWatchLater = (e, id) => {
    dispatch(postWatchlater({ id })); 
  };

  return (
    <div className="movie-view-page d-flex flex-column" style={{ minHeight: "100vh", backgroundColor: "#000" }}>
      <Navbar />

      <div className="container mt-4 flex-grow-1">
        <div className="row">
          <div className="col-12 text-left">
          {movie.thumbnail ? (
              <img 
                src={movie.thumbnail} 
                alt="Movie Thumbnail" 
                className="movie-thumbnail"
                width={300}
                height={300}
              />
            ) : (
              <p>No thumbnail available</p>
            )}
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12 text-left">
            <h1 className="movie-title" style={{color:"#0000ff"}}>{movie.title || 'Unknown Title'}</h1>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-12 text-left">
            <p className="movie-description" style={{color:"#ffffff"}}>
            {movie.description || 'No description available.'}
            </p>
          </div>
        </div>
        
        {/* Movie Video Section */}
        <div className="row mt-3">
          <div className="col-12 text-left">
          {/* {movie.video ? (
              <video
                className="movie-video"
                controls
                width="100%"
                style={{ maxWidth: "600px" }}
              >
                <source src={movie.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <p>No video available</p>
            )} */}
            <iframe width="560" height="315" 
            src={movie.video} 
            title="YouTube video player" frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-12 text-left">
            <button className="btn plus-icon btn-watchlist ml-4" style={{marginTop:-20}}>
              <FaPlusCircle className="plus-icon" title="Add to watch later" onClick={(ev) => handleAddToWatchLater(ev, movie?._id)}/>
            </button> 
          </div>
        </div>
        
        {/* Rating and Submit Button Section */}
        <div className="row mt-4">
          <div className="col-12 text-left d-flex align-items-center">
            <label htmlFor="rating" className="rating-label mr-2" style={{color:"#ffffff"}}>
              Rate this movie:
            </label>
            <input
              type="number"
              id="rating"
              className="rating-input"
              min="0"
              max="5"
              step="1"
              placeholder="0-5"
              style={{ width: "60px", marginRight: "10px" }}
            />
            <button className="btn btn-primary btn-submit-rating">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieViewPage;
