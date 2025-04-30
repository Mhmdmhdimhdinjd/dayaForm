// src/hooks/useDeleteUser.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';

const deleteUser = async (id) => {
  const response = await axios.delete(`http://localhost:3000/api?id=${id}`);
  return response.data;
};

const useDeleteUser = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError, error } = useMutation({
    mutationKey: ['deleteUser'],
    mutationFn: deleteUser,
    onError: (error) => {
      console.error('Error deleting user:', error);
    },
    onSuccess: () => {
      toast.error("کاربر با موفقیت حذف شد.")
      queryClient.invalidateQueries(['users']);
    },
  });

  return { mutate, isLoading, isError, error };
};

export default useDeleteUser;