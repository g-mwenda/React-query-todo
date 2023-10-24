import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { Select } from "@chakra-ui/react";
import Todos, { API_URL } from "../index";
import { color } from "framer-motion";

function Users() {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const usersQuery = useQuery('users', () =>
    axios.get(`${API_URL}/users`).then((response) => response.data)
  );

  const todosQuery = useQuery(['todos', selectedUserId], () =>
    selectedUserId
      ? axios.get(`${API_URL}/todos?userId=${selectedUserId}`).then((response) => response.data)
      : []
  );

  const handleUserChange = (event) => {
    const userId = event.target.value;
    setSelectedUserId(userId);
  };

  

  return (
    <div>
      {usersQuery.isLoading ? (
        <div>Loading users...</div>
      ) : usersQuery.isError ? (
        <div>Error loading users: {usersQuery.error.message}</div>
      ) : (
        <div>
            <h1 marginLeft="50px" style={{color:"black", fontSize:"50px"}}>Todo-List</h1>
          <h2 style={{color:"white"}}>Select a User</h2>
          <Select style={{color:"white" , backgroundColor:"black"}}  onChange={handleUserChange} selectedUserId={selectedUserId}value={selectedUserId}>
            <option  value={null}></option>
            {usersQuery.data.map((user) => (
              <option  style={{color:"white" , backgroundColor:"black"}}key={user.id} value={user.id} >
                {user.name}
              </option>
            ))}
          </Select>
       
        </div>
      )}
      <Todos selectedUserId= {selectedUserId}/>
        
    </div>
  );
}

export default Users;
