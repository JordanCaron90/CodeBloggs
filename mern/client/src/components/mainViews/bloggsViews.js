import React, { useEffect, useState } from 'react';
import { getCookie } from 'react-use-cookie';
import { useNavigate } from "react-router-dom";
import PostCard from '../modal/postcard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "bootstrap/dist/css/bootstrap.min.css";
import '../css/bloggsviews.css';

export default function NetworkView() {
  const [userId, setUserId] = useState(null);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const columnsPerRow = 3;

  useEffect(() => {
    const getUser = async () => {
      const token = getCookie('token');
      
      try {
        const fetchResponse = await fetch(`http://localhost:5000/session/${token}`);
        const data = await fetchResponse.json();
        if (data.type === "error") {
          throw new Error(data.message);
        }
        setUserId(data.data.user._id);
      } catch (e) {
        navigate("/");
      }   
    };
    getUser();
  }, [navigate]);

  useEffect(() => {
    const getUsersPostsExceptSelf = async () => {
      try {
        const fetchResponse = await fetch(`http://localhost:5000/posts`);
        const data = await fetchResponse.json();
        console.log(data.data);
        if (data.type === "error") {
          throw new Error(data.message);
        }
        setPosts(data.data);
      } catch (e) {
        console.error(e);

      }   
    };
    getUsersPostsExceptSelf();
  }, []);

 

  function PostList({ posts }) {
    return posts.map((post) => {
        return (
          <Col key={post._id} xs={12} md={4} lg={4} style={{marginBottom: '7.5px'}}>
            <PostCard post={post} key={post._id} />
          </Col>
        );
      });
  }

  return (
    <div style={{marginLeft: 50, marginRight: 50, marginTop: 100, marginBottom: 20}}>
      <Container fluid style={{maxWidth: '1200px'}}>
        <Row xs={1} md={columnsPerRow}>
          <PostList posts={posts} />
        </Row>
      </Container>
    </div>
  );
}
