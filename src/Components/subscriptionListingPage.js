import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar";
import Pagination from "./Pagination";
import { useDispatch, useSelector } from "react-redux";
import { useState,useEffect } from "react";
import SubscriptionCard from "./subscriptionCard";
import { getPlanList } from "./redux/subscriptionListingRedux";

function PlanListingPage() {
  const dispatch = useDispatch()
  const {isLoading,planlist} = useSelector((states)=> states?.subscriptionListingReducer);

  const [currentPage, setCurrentPage] = useState(1); 

  useEffect(() => {
    dispatch(getPlanList(currentPage));
  }, [dispatch, currentPage]);

  
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="movie-list-body d-flex flex-column" style={{minHeight: "100vh", backgroundColor:"#000"}} >
  <Navbar/>
  <div className="container flex-grow-1" >
    <div className="mt-5 mb-3 mx-auto">
    <div className="row">
        <div className="col">
            <h1 className="text-center" style={{paddingBottom:20,color:"#ff0000"}}>Subscription Plans</h1>
        </div>
      </div>
      <div className="row">
        <SubscriptionCard showSubscribeBtn data ={planlist?.data}/>
      </div>
    </div>
    </div>
    <div className="mt-auto">
    <Pagination
    currentPage={planlist?.page} 
    totalPages={planlist?.totalPages} 
    onPageChange={handlePageChange} />
    </div>
</div>

  );
}

export default PlanListingPage;
