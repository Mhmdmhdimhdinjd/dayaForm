import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';

const createUser = async (newUserData) => {
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
      toast.success('!کاربر با موفقیت ایجاد شد')
      queryClient.invalidateQueries(['users']);
    },
  });

  return { mutate, isLoading, isError, error };
};

export default useCreateUser;