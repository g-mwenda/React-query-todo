import axios from 'axios';
import { API_URL } from '..';

// Define a function to toggle the completed status of a to-do
const toggleCompletedStatus = async (todoId, completed, queryClient, todosQueryKey) => {
  try {
    const response = await axios.patch(`${API_URL}/todos/${todoId}`, { completed: !completed });
    // Invalidate the todosQuery so it will refetch data
    queryClient.invalidateQueries(todosQueryKey);
    console.log(response.data);
  } catch (error) {
    console.error('Error toggling completed status:', error);
  }
};

export default toggleCompletedStatus;
