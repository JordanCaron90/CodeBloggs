// import React from 'react';
// import { useState, useEffect} from 'react';
// import { getCookie } from 'react-use-cookie';
// import { useNavigate } from "react-router";
// import {Link} from "react-router-dom";
// import Form from 'react-bootstrap/Form';
// import Container from 'react-bootstrap/Container';
// import Button from 'react-bootstrap/Button';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Pagination from 'react-bootstrap/Pagination';
// import Modal from 'react-bootstrap/Modal'
// // import '../css/usermanagerview.css'
// function User(props) {
//   const [show, setShow] = useState(false);
//   const handleClose = () => setShow(false);
//   const handleShow = () => {setShow(true)};
//   return(
//     <>
//     <>
//     <Modal show={show} onHide={handleClose}>
//       <Modal.Header closeButton>
//         <Modal.Title>Deleting Post</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>Are you sure you want to delete this post?</Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={handleClose}>
//           Close
//         </Button>
//         <Button variant="primary" onClick={() => {props.deletePost(props.post._id)}}>
//           Delete User
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   </>
//     <tr>
//       <td>{props.post.content}</td>
//       <td>
//         <button className="btn btn-link"onClick={handleShow}>
//           Delete
//         </button>
//       </td>
//     </tr>
//     </>
//   );
// }
// export default function UserManagerView() {
//   const [users,setUsers] = useState([]);
//   const [userId, setUserId] = useState();
//   const [page, setPage] = useState(()=> {return 1});
//   const [numPages, setNumPages] = useState(()=>{return 1});
//   const [numUsers, setNumUsers] = useState(() => {return 0});
//   const limit = 4;
//   const navigate = useNavigate();
//   const handlePaginationClick = (i) => {
//     if(i >= 1 && i <= numPages){
//       setPage(i);
//     }
//   };
//   useEffect(async() => {
//     const getUser = async () => {
//       const token = getCookie('token');
//       try {
//           const fetchResponse = await fetch(`http://localhost:5000/session/${token}`);
//           const data = await fetchResponse.json();
//           return data;
//       }
//       catch (e) {
//         navigate("/");
//       }
//     };
//     const response = await getUser();
//     if(response.type == "error"){
//         navigate("/");
//     }
//     console.log("success");
//     setUserId(response.data.post._id);
//   });
//   useEffect(async() => {
//     const getUserCount = async () => {
//         try {
//             const fetchResponse = await fetch(`http://localhost:5000/post-count`);
//             const data = await fetchResponse.json();
//             return data;
//         } catch (e) {
//             return e;
//         }
//     };
//     const getUsersPaginated = async () => {
//       try {
//         const fetchResponse = await fetch(`http://localhost:5000/all-users/${page}/${limit}`);
//         const data = await fetchResponse.json();
//         return data;
//       }
//       catch (e) {
//         return e;
//       }
//     }
//       const countResponse = await getUserCount();
//       setNumUsers(parseInt(countResponse.data));
//       setNumPages(Math.ceil(numUsers/limit));
//       const usersResponse = await getUsersPaginated();
//       setUsers(usersResponse.data);
//   },[numPages, page]);
//   function displayPagination(){
//     let pagination = [];
//     console.log("Num pages: " + numPages)
//     for(let i = 1; i <= numPages; i++){
//       pagination.push(<Pagination.Item key={i} active={i === page} onClick={() => handlePaginationClick(i)}>{i}</Pagination.Item>);
//     }
//     return pagination
//   }
//   function userList() {
//     let filtered = [];
//     if(page != numPages)
//     for(let i = 0; i < 10; i++){
//       }
//       return users.map((user) => {
//         return (
//           <User
//             user={user}
//             deletePost={() => deletePost(user._id)}
//             key={user._id}
//           />
//         );
//       });
//     }
//     async function deletePost(id) {
//       await fetch(`http://localhost:5000/post/delete/${id}`, {
//         method: "DELETE"
//       });
//       const newUsers = users.filter((el) => el._id !== id);
//       setUsers(newUsers);
//     }
//   return (
//     <div>
//       <Container>
//         <Row xs={1} md={3}>
//             <Col className='w-50' style={{padding: "10px"}}>
//                 <Form.Control  type="text" placeholder="First Name" />
//             </Col>
//             <Col className='w-50' style={{padding: "10px"}}>
//                 <Form.Control type="text" placeholder="Last Name" />
//             </Col>
//             <Col>
//             <Button variant="primary">Search</Button>
//             </Col>
//         </Row>
//         <div>
//           <h3>Users</h3>
//             <table className="table table-striped" style={{ marginTop: 20 }}>
//               <thead>
//                 <tr>
//                   <th>Post</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>{userList()}</tbody>
//             </table>
//         </div>
//         <Row>
//           <Pagination>
//             <Pagination.First onClick={() => handlePaginationClick(1)} />
//             <Pagination.Prev onClick={() => handlePaginationClick(page - 1)}/>
//               {displayPagination()}
//             <Pagination.Next onClick={() => handlePaginationClick(page + 1)}/>
//             <Pagination.Last onClick={() => handlePaginationClick(numPages)}/>
//           </Pagination>
//         </Row>
//       </Container>
//     </div>
//   )
// }








import React from 'react';
import { useState, useEffect} from 'react';
import { getCookie } from 'react-use-cookie';
import { useNavigate } from "react-router";
import {Link} from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Pagination from 'react-bootstrap/Pagination';
import Modal from 'react-bootstrap/Modal'
// import '../css/usermanagerview.css'

function Post(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {setShow(true)};
  return(
    <>
    <>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Deleting Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this post?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={() => {props.deletePost(props.post._id)}}>
          Delete Post
        </Button>
      </Modal.Footer>
    </Modal>
  </>
    <tr>
      <td>{props.post.content}</td>
      <td>
        <button className="btn btn-link" onClick={handleShow}>
          Delete
        </button>
      </td>
    </tr>
    </>
  );
}

export default function PostManagerView() {
  const [posts,setPosts] = useState([]);
  const [postId, setPostId] = useState();
  const [page, setPage] = useState(() => 1);
  const [numPages, setNumPages] = useState(() => 1);
  const [numPosts, setNumPosts] = useState(() => 0);
  const limit = 4;
  const navigate = useNavigate();
  const handlePaginationClick = (i) => {
    if(i >= 1 && i <= numPages){
      setPage(i);
    }
  };
  useEffect(async() => {
    const getUser = async () => {
      const token = getCookie('token');
      try {
          const fetchResponse = await fetch(`http://localhost:5000/session/${token}`);
          const data = await fetchResponse.json();
          return data;
      }
      catch (e) {
        navigate("/");
      }
    };
    const response = await getUser();
    if(response.type == "error"){
        navigate("/");
    }
    console.log("success");
    setPostId(response.data.post._id);
  });


  useEffect(async() => {
    const getPostCount = async () => {
        try {
            const fetchResponse = await fetch(`http://localhost:5000/post-count`);
            const data = await fetchResponse.json();
            return data;
        } catch (e) {
            return e;
        }
    };
    const getPostsPaginated = async () => {
      try {
        const fetchResponse = await fetch(`http://localhost:5000/all-posts/${page}/${limit}`);
        const data = await fetchResponse.json();
        return data;
      }
      catch (e) {
        return e;
      }
//     }
//     const countResponse = await getPostCount();
//     setNumPosts(parseInt(countResponse.data));
//     console.log(countResponse.data);
//     setNumPages(Math.ceil(parseInt(countResponse.data)/limit)); // Update numPages based on updated numPosts
//     const postsResponse = await getPostsPaginated();
//     setPosts(postsResponse.data);
//   }, [page, numPosts]);



        }
        const countResponse = await getPostCount();
        setNumPosts(parseInt(countResponse.data));
        setNumPages(Math.ceil(numPosts/limit));
        const postsResponse = await getPostsPaginated();
        setPosts(postsResponse.data);
        },[numPages, page]);


  

  function displayPagination(){
    let pagination = [];
    console.log("Num pages: " + numPages)
    for(let i = 1; i <= numPages; i++){
      pagination.push(<Pagination.Item key={i} active={i === page} onClick={() => handlePaginationClick(i)}>{i}</Pagination.Item>);
    }
    return pagination
  }


function postList() {
    let filtered = [];
    if(page != numPages)
    for(let i = 0; i < 10; i++){
      }
      return posts.map((post) => {
        return (
          <Post
            post={post}
            deletePost={() => deletePost(post._id)}
            key={post._id}
          />
        );
      });
    }


    async function deletePost(id) {
      await fetch(`http://localhost:5000/post/delete/${id}`, {
        method: "DELETE"
      });
      const newPosts = posts.filter((el) => el._id !== id);
      setPosts(newPosts);
    }
  return (
    <div>
      <Container>
        <Row xs={1} md={3}>
            <Col className='w-50' style={{padding: "10px"}}>
                <Form.Control  type="text" placeholder="First Name" />
            </Col>
            <Col className='w-50' style={{padding: "10px"}}>
                <Form.Control type="text" placeholder="Last Name" />
            </Col>
            <Col>
            <Button variant="primary">Search</Button>
            </Col>
        </Row>
        <div>
          <h3>Posts</h3>
            <table className="table table-striped" style={{ marginTop: 20 }}>
              <thead>
                <tr>
                  <th>Post</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>{postList()}</tbody>
            </table>
        </div>
        <Row>
          <Pagination>
            <Pagination.First onClick={() => handlePaginationClick(1)} />
            <Pagination.Prev onClick={() => handlePaginationClick(page - 1)}/>
              {displayPagination()}
            <Pagination.Next onClick={() => handlePaginationClick(page + 1)}/>
            <Pagination.Last onClick={() => handlePaginationClick(numPages)}/>
          </Pagination>
        </Row>
      </Container>
    </div>
  )
}




