import "bootstrap/dist/css/bootstrap.min.css";
import "../Assets/Style Sheets/MovieViewPage.css";
import Navbar from "./Navbar";
import { FaRupeeSign } from "react-icons/fa";

function MovieViewPage() {
  return (
    <div className="movie-view-page d-flex flex-column" style={{ minHeight: "100vh", backgroundColor: "#000" }}>
      <Navbar />

      <div className="container mt-5 flex-grow-1">
        <div className="row">
          <div className="col-12 text-left">
           <h1 style={{color:"#0000ff"}}>Premium</h1>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12 text-left">
            <h5 style={{color:"#fff"}}>There are other things to consider, apart from the features, while building an OTT video streaming service. 
              There is the concern of video hosting—whether to choose cloud or host on company's server. 
              Then comes the concern of setting up a centralized video content management system. And finally, you will have to figure out the technology to optimize content encoding and delivery, and ways to manage traffic to your site. 
              A little ignorance towards a single aspect can lead to a major flaw in your platform.</h5>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-12 text-left">
          <h2 style={{color:"#00ff00"}}><FaRupeeSign/>699 </h2>
          </div>
        </div>
        
        <div className="row mt-3">
          <div className="col-12 text-left">
           <h4 style={{color:"#fff"}}>Duration:84 days</h4> 
          </div>
        </div>
        </div>
    </div>
  );
}

export default MovieViewPage;
