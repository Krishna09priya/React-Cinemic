import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar";
import Pagination from "./Pagination";
import SubscriptionCard from "./subscriptionCard";

function PlanListingPage() {

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
        <SubscriptionCard showSubscribeBtn/>
      </div>
    </div>
    </div>
    <div className="mt-auto">
    <Pagination/>
    </div>
</div>

  );
}

export default PlanListingPage;
