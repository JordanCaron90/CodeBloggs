import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Accordion from 'react-bootstrap/Accordion';

function PostCard(props) {
//   const Name = props.user.first_name + ' ' + props.user.last_name;
//   const Status = props.user.status;

  const [post, setPost] = useState({ content: 'Nothing yet.', updatedAt: 'N/A', likes: 0 });

  const setupPost = (post) => {
    let updatedString = post.updatedAt.split('.')[0].split('T');
    post.updatedAt = updatedString[0] + ' - ' + updatedString[1];
    setPost(post);
  };



  const handleLike = async () => {
    try {
      const fetchResponse = await fetch(`http://localhost:5000/post/like/${post._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await fetchResponse.json();
      if (data.success) {
        setPost({ ...post, likes: post.likes + 1 });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleUnlike = async () => {
    try {
      const fetchResponse = await fetch(`http://localhost:5000/post/unlike/${post._id}`, {
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
      <Card.Header className="text-center">{}</Card.Header>
      <Card.Body style={{ padding: '1rem' }}>
        <Card.Title className="text-center">Status: {}</Card.Title>
        <ListGroup variant="flush">
          <ListGroup.Item>Post: {post.content}</ListGroup.Item>
          <ListGroup.Item>Comment: {post.comments ? post.comments : null}</ListGroup.Item>
          <ListGroup.Item>Likes: {post.likes}</ListGroup.Item>
        </ListGroup>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header></Accordion.Header>
            <Accordion.Body className="text-center">
              {post.content}
              <Card.Footer className="text-muted text-center">{post.updatedAt}</Card.Footer>
              <Button onClick={handleLike} variant="primary" className="mt-3">
                Like
              </Button>
              <Button onClick={handleUnlike} variant="secondary" className="ms-3 mt-3">
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
