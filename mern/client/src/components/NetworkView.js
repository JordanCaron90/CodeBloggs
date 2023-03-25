import React from 'react'
import { useEffect, useState } from 'react';
import { getCookie } from 'react-use-cookie';
import UserCard from './UserCard';

export default function NetworkView() {
    const [userId, setUserId] = useState();
    const [users, setUsers] = useState([]);

    useEffect(async() => {

        const getUser = async () => {
            const token = getCookie('token');
            
            try {
                const fetchResponse = await fetch(`http://localhost:5000/session/${token}`);
                const data = await fetchResponse.json();
                return data;
            } catch (e) {
                return e;
            }   

        };

        const response = await getUser();
        setUserId(response.data.user._id);
        console.log(response.data.user._id)

    },[]);

    useEffect(async() => {

        const getUsersExceptSelf = async () => {
            try {
                const fetchResponse = await fetch(`http://localhost:5000/users/${userId}`);
                const data = await fetchResponse.json();
                return data;
            } catch (e) {
                return e;
            }   
        };
        if(userId){
            const response = await getUsersExceptSelf();
            setUsers(response.data);
            console.log(response.data)
        }

    },[userId]);

    function userList() {
        return users.map((user) => {
          return (
            <UserCard user={user} key={user._id} />
          );
        });
    }

  return (
    <div style={{marginLeft: 200}}>
      {userList()}
    </div>
  )
}
