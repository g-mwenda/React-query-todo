import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import { Checkbox, CheckboxGroup, Text} from '@chakra-ui/react'
import axios from 'axios';
import React from 'react'
import { useMutation, useQueryClient } from 'react-query';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Users from '../Users/Users';



const API_URL = 'https://jsonplaceholder.typicode.com';

export default function AddTodo({isOpen, onClose, selectedUserId}) {

  const {
    register,
    handleSubmit,
    formState:{errors},
    trigger
  } = useForm()
  
  
 
  const [newTodo, setNewTodo] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  
  const verify = handleSubmit((data) => {
    console.log(data)
  })
  
  
  const queryClient = useQueryClient();
 
  const addTodoMutation = useMutation(
    (newTodo) =>
      axios
        .post(`${API_URL}/todos`, newTodo)
        .then((response) => {
          console.log(response.data)
          // response.data
        }
    ),
        
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['todos', selectedUserId]);
        onClose();
        
       
        
      },
      onError: (error) => {
        console.error('Error adding todo:', error);
      },
    }
  );
    const handleAddTodo = () => {
      
      verify();
      
      if (!newTodo.trim()) {
        // If newTodo is empty or only contains whitespace, do nothing
        return;
      }
      if (newTodo.trim().length<5) {
        // If newTo verify();do is empty or only contains whitespace, do nothing
        return;
      }
     
        
        addTodoMutation.mutate(
          {
            userId: selectedUserId,
            title: newTodo,
            completed: isCompleted,
          },
          {
            onSuccess: () => {
              queryClient.invalidateQueries(['todos', selectedUserId]);
              setNewTodo('');
              setShowModal(false);
              setIsCompleted(false);
              onClose();
              
            },
          }
        );
      };

  return (
  

    <Modal isOpen={isOpen} onClose={onClose} >
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Add Todo</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
      <Checkbox defaultChecked={isCompleted} onChange={()=>setIsCompleted(!isCompleted)}>Check if Completed</Checkbox>
      <Input
             {...register("task", {required: "You want to do Nothing ??", minLength: {
              value:5,
              message: "Min length is 5"
            },
          maxLength: {
            value : 20 ,
            message: "Cannot exceed 20 Characters"
          }})}

            placeholder='Enter Todo Title'
            value={newTodo} // Bind value to newTodo state
            onChange={(e) => setNewTodo(e.target.value)} // Update newTodo state on input change
            size='lg'
          />
           
          <Text marginTop="15px" marginLeft="100px"
        color="red"> {errors.task?.message} </Text>
     
      </ModalBody>

      <ModalFooter>
        <Button colorScheme='blue' mr={3} onClick={onClose}>
          Close
        </Button>
        <Button variant='ghost' onClick={handleAddTodo} 
        isLoading={addTodoMutation?.isLoading} loadingText='Submitting...'
        >Submit</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
  )
}
