import "bootstrap/dist/css/bootstrap.min.css";
import { FaSearch } from "react-icons/fa";
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import Pagination from "./Pagination";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getMovieList } from "./redux/movieListRedux";

function MovieListingPage() {

  const dispatch = useDispatch()
  const {isLoading,movielist} = useSelector((states)=> states.movielistReducer);
  const [params,setParams]=useState({search:"",page:1});
  const [lastPage, setLastPage] = useState(1);

  useEffect(()=>{dispatch(getMovieList(params))},[dispatch,params])

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    if (searchTerm === "") {
      setParams({ search: "", page: lastPage }); 
    } else {
      setParams({ search: searchTerm, page: 1 });
    }
  };
  const handlePageChange = (newPage) => {
    if (params.search === "") {
      setLastPage(newPage); 
    }
    setParams((prev) => ({ ...prev, page: newPage }));
  };

  return (
    <div className="movie-list-body d-flex flex-column" style={{ minHeight: "100vh", backgroundColor: "#000" }}>
      <Navbar />
      <div className="container flex-grow-1" >
        <div className="mt-5 mb-3 mx-auto">
          <div className="row">
            <div className="col-sm-12 col-md-8">
              <div className="input-group" style={{ paddingBottom: 25 }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search movies..."
                  onChange={handleSearchChange}
                />
                <div className="input-group-append">
                  <button
                    className="input-group-text"
                    type="submit"
                    style={{
                      height: 38,
                      borderRadius: 0,
                      backgroundColor: '#adad85',
                    }}
                  >
                    <FaSearch />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
        <MovieCard showLaterBtn  data={movielist?.movies}/>
          </div>
        </div>
      </div>
      <div className="mt-auto">
        <Pagination 
        currentPage={params.page} 
        totalPages={movielist?.totalPages} 
        onPageChange={handlePageChange} 
        />
      </div>
    </div>
  );
}

export default MovieListingPage;
