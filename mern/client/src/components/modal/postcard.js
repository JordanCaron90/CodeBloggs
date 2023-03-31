import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Accordion from 'react-bootstrap/Accordion';

function PostCard(props) {

  const [post, setPost] = useState([]);
  const [user, setUser] = useState({});

  const setupPost = (post) => {
    let updatedString = post.updatedAt.split('.')[0].split('T');
    const updatedPost = {
      ...post,
      updatedAt: updatedString[0] + ' - ' + updatedString[1]
    };
    setPost(updatedPost);
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
       
        const fetchUserResponse = await fetch(`http://localhost:5000/user/${props.post.user_id}`);
        const userData = await fetchUserResponse.json();
        if (userData.type === "error") {
          throw new Error(userData.message);
        }
        setUser(userData.data);
      } catch (e) {
        console.error(e);
      }   
    };
    fetchPost();
  }, []);

 const commentlist = () => {
    return props.post.comments.map((comment)=>{
        return ( <ListGroup.Item key={comment._id}>Comment: {comment.content}</ListGroup.Item>

        )
    })
   
 }



  const handleLike = async () => {
    try {
      const fetchResponse = await fetch(`http://localhost:5000/post/like/${props.post._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await fetchResponse.json();
      console.log(data)
      if (data.success) {
        setPost({ ...post, likes: post.likes + 1 });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleUnlike = async () => {
    try {
      const fetchResponse = await fetch(`http://localhost:5000/post/unlike/${props.post._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await fetchResponse.json();
      if (data.success) {
        setPost({ ...post, likes: post.likes - 1 });
      }
    } catch (e) {
      console.log(e);
    }
  };
  
  return (
    <Card style={{ width: '22rem', padding: '0rem' }} className="mt-5 mx-auto">
      <Card.Header className="text-center">{user.first_name}</Card.Header>
      <Card.Body style={{ padding: '1rem' }}>
        <ListGroup variant="flush">
          <ListGroup.Item>Post: {props.post.content}</ListGroup.Item>
          <ListGroup.Item>Comments: {commentlist()} </ListGroup.Item>
           <ListGroup.Item>Likes: {props.post.likes}</ListGroup.Item>
        </ListGroup>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header></Accordion.Header>
            <Accordion.Body className="text-center">
              <Card.Footer className="text-muted text-center">{props.post.updatedAt}</Card.Footer>
            <Button variant="primary" className="mx-2" onClick={handleLike}>
                Like
            </Button>
            <Button variant="danger" className="mx-2" onClick={handleUnlike}>
                Unlike
            </Button>
        </Accordion.Body>
        </Accordion.Item>
        </Accordion>
        </Card.Body>
    </Card>
  );
}

export default PostCard;

