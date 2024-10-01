import "bootstrap/dist/css/bootstrap.min.css";
import "../Assets/Style Sheets/MovieViewPage.css";
import Navbar from "./Navbar";
import { FaRupeeSign } from "react-icons/fa";
import { useDispatch,useSelector } from "react-redux";
import { getPlanView } from "./redux/planViewPageRedux";
import { useParams} from "react-router-dom";
import { useEffect } from "react";

function MovieViewPage() {

  const { plan_id } = useParams();
  
  const dispatch = useDispatch();
  const { plan, isLoading} = useSelector((state) => state?.planViewPageReducer);

  useEffect(() => {
    if (plan_id) {
      dispatch(getPlanView(plan_id)); // Dispatch API call with id
    }
  }, [dispatch, plan_id]);

  return (
    <div className="movie-view-page d-flex flex-column" style={{ minHeight: "100vh", backgroundColor: "#000" }}>
      <Navbar />

      <div className="container mt-5 flex-grow-1">
        <div className="row">
          <div className="col-12 text-left">
           <h1 style={{color:"#0000ff"}}>{plan?.plan}</h1>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12 text-left">
            <h5 style={{color:"#fff"}}>{plan?.detailedDescription}</h5>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-12 text-left">
          <h2 style={{color:"#00ff00"}}><FaRupeeSign/>{plan?.price} </h2>
          </div>
        </div>
        
        <div className="row mt-3">
          <div className="col-12 text-left">
           <h4 style={{color:"#fff"}}>Duration: <span style={{color:"#00ff00"}}>{plan?.duration}</span></h4> 
          </div>
        </div>
        </div>
    </div>
  );
}

export default MovieViewPage;
