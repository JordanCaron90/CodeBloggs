import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import {useState, useEffect} from 'react';

function UserCard(props) {
  const Name = props.user.first_name + " " + props.user.last_name;
  const Status = props.user.status;
  const Email = props.user.email;
  const Birthday = props.user.birthday;
  const Occupation = props.user.occupation;
  const Location = props.user.location;
  const [post, setPost] = useState({content: "Nothing yet.", updatedAt: ""});

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
      console.log(responseData.data)
      setPost(responseData.data);

  },[]);

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Header className="text-center">{Name}</Card.Header>
      <Card.Body>
      <Card.Title className="text-center">{Status}</Card.Title>
        <ListGroup variant="flush">
          <ListGroup.Item>Email: {Email}</ListGroup.Item>
          <ListGroup.Item>Birthday: {Birthday}</ListGroup.Item>
          <ListGroup.Item>Occupation: {Occupation}</ListGroup.Item>
          <ListGroup.Item>Location: {Location}</ListGroup.Item>
        </ListGroup>
      </Card.Body>
      <Card.Header className="text-center">Recent Post</Card.Header>
      <Card.Text className="text-center">
          {post.content}
        </Card.Text>
      <Card.Footer className="text-muted text-center">{post.updatedAt}</Card.Footer>
    </Card>
  );
}

export default UserCard;