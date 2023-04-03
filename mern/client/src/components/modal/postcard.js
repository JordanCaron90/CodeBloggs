import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';

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
        return ( <ListGroup.Item key={comment._id}>{comment.content}</ListGroup.Item>

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

  const handlePostComment = async (event) => {
    event.preventDefault();
    const content = event.target.elements.comment.value;
    const UserIDforComment = props.post._id;
    const PostIDforPost = props.user._id;
    try {
      const fetchResponse = await fetch(`http://localhost:5000/comment/add/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "content": content, "user_id": UserIDforComment, "post_id": PostIDforPost }),
      });
      const data = await fetchResponse.json();
      if (data.success) {
      
      } else {
   
      }
    } catch (e) {
      console.log(e);
    }
  };
  


  // export default function Registration() {
  //   const [form, setForm] = useState({
  //     first_name: "",
  //     last_name: "",
  //     email: "",
  //     birthday: "",
  //     password: "",
  //     occupation: "",
  //     location: "",
  //   });
  //   const navigate = useNavigate();
  //   function updateForm(value) {
  //     return setForm((prev) => {
  //       return { ...prev, ...value };
  //     });
  //   }
  //   async function onSubmit(e) {
  //     e.preventDefault();
  //     const newPerson = { ...form };
  //     console.log();
  //     await fetch("http://localhost:5000/user/register", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(newPerson),
  //     }).catch((error) => {
  //       window.alert(error);
  //       return;
  //     });
  //     setForm({
  //       first_name: "",
  //       last_name: "",
  //       email: "",
  //       birthday: "",
  //       password: "",
  //       occupation: "",
  //       location: "",
  //     });
  //     navigate("/");

  
  
//   return (
//     <Card style={{ width: '22rem', padding: '0rem' }} className="mt-5 mx-auto">
//       <Card.Header className="text-center">{user.first_name}</Card.Header>
//       <Card.Body style={{ padding: '1rem' }}>
//         <ListGroup variant="flush">
//           <ListGroup.Item>Post: {props.post.content}</ListGroup.Item>
//           <ListGroup.Item>Comments: {commentlist()} </ListGroup.Item>
//            <ListGroup.Item>Likes: {props.post.likes}</ListGroup.Item>
//         </ListGroup>
//         <Accordion>
//           <Accordion.Item eventKey="0">
//             <Accordion.Header>Write your mind</Accordion.Header>
//             <Accordion.Body className="text-center">
//               <Card.Footer className="text-muted text-center">{props.post.updatedAt}</Card.Footer>
//             <Button variant="primary" className="mx-2" onClick={handleLike}>
//                 Like
//             </Button>
//             <Button variant="danger" className="mx-2" onClick={handleUnlike}>
//                 Unlike
//             </Button>
//             <Button variant="success" className="mx-2" onClick={handleUnlike}>
//                 Post Comments
//             </Button>
//         </Accordion.Body>
//         </Accordion.Item>
//         </Accordion>
//         </Card.Body>
//     </Card>
//   );
// }


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
          <Accordion.Header>Write your mind</Accordion.Header>
          <Accordion.Body className="text-center">
            <Card.Footer className="text-muted text-center">{props.post.updatedAt}</Card.Footer>
            <Button variant="primary" className="mx-2" onClick={handleLike}>
              Like
            </Button>
            <Button variant="danger" className="mx-2" onClick={handleUnlike}>
              Unlike
            </Button>
            <Form onSubmit={handlePostComment}>
              <Form.Group controlId="comment">
                <Form.Label></Form.Label>
                <Form.Control name = "comment" id = "comment" type="text" placeholder="Enter your comment" />
              </Form.Group>
              <Button variant="success" className="mx-2" type="submit">
                Post Comment
              </Button>
            </Form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Card.Body>
  </Card>
);
}



export default PostCard;

