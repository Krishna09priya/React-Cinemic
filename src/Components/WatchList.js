import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import Pagination from "./Pagination";

function Watchlist() {

  return (
    <div className="watchlist-body d-flex flex-column" style={{ minHeight: "100vh", backgroundColor:"#000"}} >
  <Navbar/>
  <div className="container flex-grow-1" >
    <div className="mt-5 mb-3 mx-auto">
        <div className="row">
            <div className="col text-center p-3" style={{color:'#0000ff'}}>
                <h1>Watch Later</h1>
            </div>
        </div>
        <div className="row">
        <MovieCard showRemoveBtn/>
      </div>
    </div>
    <Pagination/>
  </div>
</div>

  );
}

export default Watchlist;
