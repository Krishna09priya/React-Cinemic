import "bootstrap/dist/css/bootstrap.min.css";
import "../Assets/Style Sheets/MovieCard.css";
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaPlusCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import {postWatchlater, resetMsg} from "./redux/watchLaterRedux";
import { useDispatch, useSelector } from "react-redux";
import { useEffect} from 'react';
import Notifications from '../utils/notifications';

function MovieCard({showRemoveBtn,showLaterBtn,data=[]}) {
  const dispatch = useDispatch();
  const {watchLaterSuccessMessage} = useSelector((states)=> states?.watchLaterReducer);

  const handleAddToWatchLater = (e, movie_id) => {
    e.preventDefault();
    e.stopPropagation(); // Prevents event from bubbling up to the card link
    dispatch(postWatchlater({ movie_id })); 
  };

  useEffect(()=>{
    if(watchLaterSuccessMessage){
      Notifications(watchLaterSuccessMessage,'success')}
      dispatch(resetMsg())
  },[watchLaterSuccessMessage,dispatch])


return (
    <Container>
      <Row >   
         {data?.map((e)=><Col xs={12} sm={6} md={6} lg={4} xl={2} className="mb-4" key={e?._id}>
         <Link to={`/movie-view-page/${e?._id}`} style={{ textDecoration: 'none', color: '#000' }} key={e?._id}>
            <Card className="cardStyle">
              <Card.Img variant="top" src={e?.thumbnail} />
              <Card.Body style={{color: '#fff',padding: 10}}>
                <Card.Title style={{fontSize: 15,marginBottom: 10,textAlign: 'left'}}>{e?.title}</Card.Title>
                {showLaterBtn &&  <button className="plus-icon" title="Add to watch later" onClick={(ev) => handleAddToWatchLater(ev, e?._id)}>
                                    <FaPlusCircle className="plus-icon"/>
                                </button>}
                         {showRemoveBtn &&  <button class="btn btn-danger btn-sm">
                                    Remove
                                </button>}      
                                <Card.Text style={{fontSize: 15, textAlign:'left', paddingTop:10}}>Rating: 4.4 </Card.Text>
              </Card.Body>
            </Card>
            </Link> </Col>)} 
         
      </Row>
    </Container>
  );
}

export default MovieCard;
