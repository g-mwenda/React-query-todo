import axios from 'axios';
import { API_URL } from '..';

// Define a function to delete a to-do
const deleteTodo = async (todoId, queryClient, todosQueryKey) => {
  try {
    const response = await axios.delete(`${API_URL}/todos/${todoId}`);
    console.log(response.data);

    // Invalidate the todosQuery so it will refetch data
    queryClient.invalidateQueries(todosQueryKey);
  } catch (error) {
    console.error('Error deleting todo:', error);
  }
};

export default deleteTodo;







