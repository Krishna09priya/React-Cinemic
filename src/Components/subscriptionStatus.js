import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar";
import Pagination from "./Pagination";
import SubscriptionCard from "./subscriptionCard";
import { useDispatch,useSelector } from "react-redux";
import { getStatus } from "./redux/subscriptionStatusRedux";
import { useState,useEffect } from "react";

function PlanStatusPage() {

  const dispatch = useDispatch()
  const {isLoading,planlist} = useSelector((states)=> states?.subscriptionStatusReducer);

  const [currentPage, setCurrentPage] = useState(1); 

  useEffect(() => {
    dispatch(getStatus(currentPage));
  }, [dispatch, currentPage]);
  
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="movie-list-body d-flex flex-column" style={{ minHeight: "100vh", backgroundColor:"#000"}} >
  <Navbar/>
  <div className="container flex-grow-1" >
    <div className="mt-5 mb-3 mx-auto">
    <div className="row">
        <div className="col">
            <h1 className="text-center" style={{paddingBottom:20,color:"#ff0000"}}>My Subscription Status</h1>
        </div>
      </div>
      <div className="row">
        <div className="col">
            <h1 className="text-left" style={{paddingBottom:20,color:"#ffffff"}}>Subscription Status</h1>
        </div>
      </div>
      <div className="row">
        <SubscriptionCard showScribeDate data={planlist?.data?.currentPlans}/>
      </div>
      <div className="row">
        <div className="col">
            <h1 className="text-left" style={{paddingBottom:20,color:"#ffffff"}}>Payment History</h1>
        </div>
      </div>
      <div className="row">
        <SubscriptionCard data={planlist?.data?.previousPlans}/>
      </div>
    </div>
    </div>
    {planlist?.data?.previousPlans && planlist?.data?.previousPlans.length > 0 && (
        <div className="mt-auto">
          <Pagination
            currentPage={currentPage}
            totalPages={planlist?.data?.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
</div>

  );
}

export default PlanStatusPage;
