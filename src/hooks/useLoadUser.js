// src/hooks/useLoadUser.js
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const loadUser = async () => {
  try {
    const res = await axios.get('http://localhost:3000/api');
    return res.data;
  } catch (error) {
    throw new Error('خطا در دریافت داده‌ها');
  }
};

const useLoadUser = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: loadUser,
  });
};

export default useLoadUser;