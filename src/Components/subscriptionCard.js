import "bootstrap/dist/css/bootstrap.min.css";
import "../Assets/Style Sheets/MovieCard.css";
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaRupeeSign } from "react-icons/fa";
import { Link } from "react-router-dom";

function SubscriptionCard({showSubscribeBtn,showScribeDate,data=[]}) {

  return (
    <Container>
      <Row >
         {data?.map((e)=>
         <Col xs={12} sm={6} md={6} lg={4} xl={3} className="mb-4" key={e?._id}>
         <Link to={`/plan-view-page/${e?._id}`} style={{ textDecoration: 'none', color: '#000' }} key={e?._id}>
            <Card style={{ width: '100%',height:280}} className="cardStyle">
              <Card.Body style={{color: '#fff',padding: 10}}>
                <Card.Title style={{fontSize: 25,marginBottom: 10,textAlign: 'left'}}>{e?.plan}</Card.Title>
                     <Card.Text style={{fontSize: 15, textAlign:'left'}}> {e?.description}</Card.Text>
                     <Card.Text style={{fontSize: 15, textAlign:'left'}}>Price:<FaRupeeSign/>{e?.price} </Card.Text>
                     <Card.Text style={{fontSize: 15, textAlign:'left'}}>Duration: {e?.duration}</Card.Text>
                     {showScribeDate &&<> <Card.Text style={{fontSize: 15, textAlign:'left'}}>Subscribed Date: {e?.subscribedDate}</Card.Text> 
                       <Card.Text style={{fontSize: 15, textAlign:'left'}}>validity To: {e?.validityTo}</Card.Text> </>}
                        {showSubscribeBtn &&  <button style={{marginTop : 20}}>Subscribe Now
                                    </button>}
              </Card.Body>
            </Card>
            </Link>
            </Col>
            )}
        </Row>
    </Container>
  );
}

export default SubscriptionCard;
