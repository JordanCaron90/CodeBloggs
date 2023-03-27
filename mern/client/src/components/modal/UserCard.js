import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Accordion from 'react-bootstrap/Accordion';
import {useState, useEffect} from 'react';

function UserCard(props) {
  const Name = props.user.first_name + " " + props.user.last_name;
  const Status = props.user.status;
  const Email = props.user.email;
  const Birthday = props.user.birthday.split('T')[0];
  const Occupation = props.user.occupation;
  const Location = props.user.location;
  const [post, setPost] = useState({content: "Nothing yet.", updatedAt: "N/A"});

  const setupPost = (post) => {

    let updatedString = post.updatedAt.split('.')[0].split('T');
    post.updatedAt = updatedString[0] + " - " + updatedString[1];
    console.log(post);
    setPost(post);

  };

  useEffect(async () => {

    const getLatestPost = async () => {
      try {
          const fetchResponse = await fetch(`http://localhost:5000/post/latest/${props.user._id}`);
          const data = await fetchResponse.json();
          return data;
      } catch (e) {
          return e;
      }   
    };
      const responseData = await getLatestPost();
      if(responseData.data)
        setupPost(responseData.data);

  },[]);

  return (
    <Card style={{ width: '22rem', padding: "0rem" }} className='mt-5 mx-auto'>
      <Card.Header className="text-center">{Name}</Card.Header>
      <Card.Body style={{padding: "1rem"}}>
      <Card.Title className="text-center">Status: {Status}</Card.Title>
        <ListGroup variant="flush">
          <ListGroup.Item>Email: {Email}</ListGroup.Item>
          <ListGroup.Item>Birthday: {Birthday}</ListGroup.Item>
          <ListGroup.Item>Occupation: {Occupation}</ListGroup.Item>
          <ListGroup.Item>Location: {Location}</ListGroup.Item>
        </ListGroup>
        <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Recent Post</Accordion.Header>
          <Accordion.Body className="text-center">
            {post.content}
            <Card.Footer className="text-muted text-center">{post.updatedAt}</Card.Footer>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      </Card.Body>
    </Card>
  );
}

export default UserCard;