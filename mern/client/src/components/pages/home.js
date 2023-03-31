// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Card from 'react-bootstrap/Card';
// import Cookies from 'js-cookie';
// import { Link } from 'react-router-dom';
// import "../css/Style.css";
// import '../css/home.css';
// import profile from "../../assets/images/CodeBloggsgraphic.png";


// export default function User() {
//   const session_id = Cookies.get('token');
//   const [user, setUser] = useState({});
//   const [postList, setPostList] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     async function getRecords() {
//       try {
//         const response = await fetch(`http://localhost:5000/session/${session_id}`);
//         if (!response.ok) {
//           const message = `An error occurred: ${response.statusText}`;
//           throw new Error(message);
//         }
//         const responseData = await response.json();
//         console.log(responseData);
//         const user = responseData.data.user;
//         user.birthday = user.birthday.split("T")[0]
//         console.log(user);
//         setUser(user);
//         console.log("user obj" , user)
//         console.log("responseData obj" , responseData)
//         console.log("user id" + user._id)
//       } catch (error) {
//         console.error(error);
//         window.alert("Error fetching records");
//       }
//     }
//     getRecords();
//   }, [session_id]);
  
//   useEffect(() => {
//     async function getPosts() {
//       try {
//         console.log("user id real " + user._id)
//         const response = await fetch(`http://localhost:5000/post/${user._id}`); // add this line to fetch post data
//         if (!response.ok) {
//           const message = `An error occurred: ${response.statusText}`;
//           throw new Error(message);
//         }
//         const responseData = await response.json();
//         console.log(responseData.data);
    
//         setPostList(responseData.data);
//       } catch (error) {
//         console.error(error);
//         window.alert("Error fetching posts");
//       }
//     }
//     if (user._id) {
//       getPosts();
//     }
//   }, [user._id]);
  
 
//   const commentlist = () => {
//     return props.post.comments.map((comment)=>{
//         return ( <ListGroup.Item key={comment._id}>Comment: {comment.content}</ListGroup.Item>

//         )
//     })
   
//  }

//   const recordList = () => (
//     postList && postList.length > 0 ? (
//       postList.map((post) => (
//         <tr key={post._id}>
//           <td>{post.content}</td>
//           <td>{commentlist()}</td>
//           <td>{post.likes}</td>
//         </tr>
//       ))
//     ) : (
//       <tr>
//         <td colSpan="2">No posts found.</td>
//       </tr>
//     )
//   );  

//   return (
//     <div className="main">
//       <div className="sub-main1">
//          <div className="blog">
//            <div className="container-images">
//              <img src={profile} alt="profile" className="profile" />
//            </div>
//            <div className="card-container">
//              {user && (
//                  <Card style={{ width: '30rem', margin: '1rem', height: '20rem' }} key={user._id}>
//                  <Card.Body>
//                      <Card.Title>{user.first_name}</Card.Title>
//                      <Card.Text>{user.birthday}</Card.Text> 
//                      <Card.Text>{user.location}</Card.Text>
//                      <Card.Text>{user.occupation}</Card.Text>
//                      <Card.Text>{user.status}</Card.Text>
//                  </Card.Body>
//                  </Card>
//               )}
//            </div>
//          </div>
//       <div className="sub-main2">
//         <div className="table-container">
//         <Card style={{ width: '30rem', margin: '1rem', height: '30rem' }}>
//             <Card.Body>
//               <Card.Title>Bloggs</Card.Title>
//                 <table>
//                   <thead>
//                     <tr>
//                       <th>Content</th>
//                       <th>Comments</th>
//                       <th>Likes</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                   {recordList()}
//                   </tbody>
//                 </table>
//             </Card.Body>
//           </Card>
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// }








import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import "../css/Style.css";
import '../css/home.css';
import profile from "../../assets/images/CodeBloggsgraphic.png";
import ListGroup from "react-bootstrap/ListGroup";

export default function User() {
  const session_id = Cookies.get('token');
  const [user, setUser] = useState({});
  const [postList, setPostList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getRecords() {
      try {
        const response = await fetch(`http://localhost:5000/session/${session_id}`);
        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          throw new Error(message);
        }
        const responseData = await response.json();
        console.log(responseData);
        const user = responseData.data.user;
        user.birthday = user.birthday.split("T")[0]
        console.log(user);
        setUser(user);
        console.log("user obj" , user)
        console.log("responseData obj" , responseData)
        console.log("user id" + user._id)
      } catch (error) {
        console.error(error);
        window.alert("Error fetching records");
      }
    }
    getRecords();
  }, [session_id]);
  
  useEffect(() => {
    async function getPosts() {
      try {
        console.log("user id real " + user._id)
        const response = await fetch(`http://localhost:5000/post/${user._id}`); // add this line to fetch post data
        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          throw new Error(message);
        }
        const responseData = await response.json();
        console.log(responseData.data);
    
        setPostList(responseData.data);
      } catch (error) {
        console.error(error);
        window.alert("Error fetching posts");
      }
    }
    if (user._id) {
      getPosts();
    }
  }, [user._id]);
  
 
  const commentlist = (comments) => {
    return comments.map((comment)=>{
        return ( <ListGroup.Item key={comment._id}>{comment.content}</ListGroup.Item>
        )
    })
  }

  const recordList = () => (
    postList && postList.length > 0 ? (
      postList.map((post) => (
        <tr key={post._id}>
          <td><ListGroup>{post.content}</ListGroup></td>
          <td>
            <ListGroup>
              {commentlist(post.comments)}
            </ListGroup>
          </td>
          <td><ListGroup>{post.likes}</ListGroup></td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="2">No posts found.</td>
      </tr>
    )
  );  

  
  return (
    <div className="main">
      <div className="sub-main1">
         <div className="blog">
           <div className="container-images">
             <img src={profile} alt="profile" className="profile" />
           </div>
           <div className="card-container">
             {user && (
                 <Card style={{ width: '30rem', margin: '1rem', height: '20rem' }} key={user._id}>
                 <Card.Body>
                     <Card.Title>{user.first_name +''+ user.last_name}</Card.Title>
                     <Card.Title>{user.birthday}</Card.Title>
                     <Card.Title>{user.location}</Card.Title>
                     <Card.Title>{user.occupation}</Card.Title>
                     <Card.Title>{user.status}</Card.Title>
                 </Card.Body>
                 </Card>
              )}
           </div>
         </div>
      <div className="sub-main2">
        <div className="table-container">
        <Card style={{ width: '30rem', margin: '1rem', height: '30rem' }}>
            <Card.Body>
              <Card.Title>Bloggs</Card.Title>
                <table>
                  <thead>
                    <tr>
                      <th>Content</th>
                      <th>Comments</th>
                      <th>Likes</th>
                    </tr>
                  </thead>
                  <tbody>
                  {recordList()}
                  </tbody>
                </table>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
    </div>
  );
}






