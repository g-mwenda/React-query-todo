import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { QueryClient, QueryClientProvider } from 'react-query';
import './../../App.css'
import {
  useDisclosure,
  Button,
  List,
  ListItem,
  Text,
  Checkbox, 
  CheckboxGroup,
  IconButton} from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons';
import AddTodo from './Actions/AddTodo';
import deleteTodo from './Actions/DeleteTodo';
import toggleCompletedStatus from './Actions/ToggleCompleteStatus';

const queryClient = new QueryClient();

export { queryClient, QueryClientProvider };

export const API_URL = 'https://jsonplaceholder.typicode.com'; // Dummy JSON API URL

export function Todos({ selectedUserId }) {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [newTodo, setNewTodo] = useState('');
  const [showModal, setShowModal] = useState(false);
  const queryClient = useQueryClient(); // Get the query client to invalidate queries

  const usersQuery = useQuery('users', () =>
    axios.get(`${API_URL}/users`).then((response) => response.data)
  );

  const todosQueryKey = ['todos', selectedUserId];

  const todosQuery = useQuery(
    todosQueryKey,
    () =>
      axios
        .get(`${API_URL}/todos?userId=${selectedUserId}`)
        .then((response) => response.data)
  );

  







  if (selectedUserId && todosQuery.data) {
    todosQueryKey.push(...todosQuery.data.map(todo => todo.id));
  }

  return (
    <div className=''>
      {selectedUserId && <Button onClick={onOpen}>Add Todo</Button>}
      <AddTodo isOpen={isOpen} onClose={onClose} selectedUserId={selectedUserId} />

      {todosQuery.data && (
  <List spacing={3}>
    {todosQuery.data.map((todo) => (
      <ListItem key={todo.id} display="flex" color="white" alignItems="center">
         <Checkbox
         marginRight="10px"
                isChecked={todo.completed}
                onChange={() => toggleCompletedStatus(todo.id, todo.completed)}
              />
        <Text fontSize="lg">{todo.title}</Text>
      

        <IconButton
        ml="auto"
  colorScheme='red'
  aria-label='Search database'
  icon={<DeleteIcon />}
  onClick={() => deleteTodo(todo.id)}
/>
      </ListItem>
    ))}
  </List>
)}

    </div>
  );
}

export default Todos;
