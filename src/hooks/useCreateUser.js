// src/hooks/useCreateUser.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const createUser = async (newUserData) => {
  console.log('nnnnn',newUserData)
  const response = await axios.post('http://localhost:3000/api', newUserData);
  return response.data.user;
};

const useCreateUser = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError, error } = useMutation({
    mutationKey: ['addUser'],
    mutationFn: createUser,
    onError: (error) => {
      console.error('Error creating user:', error);
    },
    onSuccess: () => {
      console.log('User created successfully');
      queryClient.invalidateQueries(['users']);
    },
  });

  return { mutate, isLoading, isError, error };
};

export default useCreateUser;