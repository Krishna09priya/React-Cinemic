import "bootstrap/dist/css/bootstrap.min.css";
import "../Assets/Style Sheets/MovieCard.css";
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaRupeeSign } from "react-icons/fa";
import { Link } from "react-router-dom";

function SubscriptionCard({showSubscribeBtn}) {

  return (
    <Container>
      <Row >
          
         <Col xs={12} sm={6} md={6} lg={4} xl={3} className="mb-4">
         <Link to="/plan-view-page" style={{ textDecoration: 'none', color: '#000' }}>
            <Card style={{ width: '100%' }} className="cardStyle">
              <Card.Body style={{color: '#fff',padding: 10}}>
                <Card.Title style={{fontSize: 25,marginBottom: 10,textAlign: 'left'}}>Premium</Card.Title>
                     <Card.Text style={{fontSize: 15, textAlign:'left'}}> Now, get access to over 38 OTT platforms and watch movies, web series, sports and TV shows using a single app starting at 149rs only. OTTplay Premium gives you access to the following streaming platforms: * Sony LIV app. * ZEE5 app. * Lionsgate Play app.</Card.Text>
                     <Card.Text style={{fontSize: 15, textAlign:'left'}}>Price:<FaRupeeSign/>699 </Card.Text>
                     <Card.Text style={{fontSize: 15, textAlign:'left'}}>Duration:84 days</Card.Text>
                        {showSubscribeBtn &&  <button>Subscribe Now
                                    </button>}
              </Card.Body>
            </Card>
            </Link>
            </Col>
        </Row>
    </Container>
  );
}

export default SubscriptionCard;
