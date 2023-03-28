import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import "../Style.css";
import profile from "../assets/images/CodeBloggs graphic.png";


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
  
  const recordList = () => (
    postList && postList.length > 0 ? (
      postList.map((post) => (
        <tr key={post._id}>
          <td>{post.content}</td>
          <td>{post.comments}</td>
          <td>
          
            <button className="btn btn-link"
              onClick={() => {
                // handleShow(post._id)
                // setRecordToDelete(post._id)
              }}
            >
              Delete
            </button>
          </td>
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
                     <Card.Title>{user.first_name}</Card.Title>
                     <Card.Text>{user.birthday}</Card.Text> 
                     <button onClick={() => navigate(`/user/${user._id}`)}>View User</button>
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
                    </tr>
                  </thead>
                  <tbody>
                  {recordList()}
                  </tbody>
                </table>
            </Card.Body>
          </Card>
        </div>
        <div className="button-container">
          <Link className="btn btn-primary" to="/add">Add Post</Link>
        </div>
      </div>
    </div>
    </div>
  );
}





// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Card from 'react-bootstrap/Card';
// import Cookies from 'js-cookie';
// import { Link } from 'react-router-dom';
// import "../Style.css";
// import profile from "../assets/images/CodeBloggs graphic.png";


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
  
//   const recordList = () => (
//     postList && postList.length > 0 ? (
//       postList.map((post) => (
//         <tr key={post._id}>
//           <td>{post.content}</td>
//           <td>{post.comments}</td>
//           <td>
          
//             <button className="btn btn-link"
//               onClick={() => {
//                 // handleShow(post._id)
//                 // setRecordToDelete(post._id)
//               }}
//             >
//               Delete
//             </button>
//           </td>
//         </tr>
//       ))
//     ) : (
//       <tr>
//         <td colSpan="2">No posts found.</td>
//       </tr>
//     )
//   );

//   const formatBirthday = () => {
//     const [year, month, day] = user.birthday.split("-");
//     return `${parseInt(year, 10)}/${parseInt(month, 10)}/${parseInt(day, 10)}`;
//   }

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
//                      <Card.Text>{formatBirthday()}</Card.Text>
//                      <button onClick={() => navigate(`/user/${user._id}`)}>View User</button>
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
//                     </tr>
//                   </thead>
//                   <tbody>
//                   {recordList()}
//                   </tbody>
//                 </table>
//             </Card.Body>
//           </Card>
//         </div>
//         <div className="button-container">
//           <Link className="btn btn-primary" to="/add">Add Post</Link>
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// }


