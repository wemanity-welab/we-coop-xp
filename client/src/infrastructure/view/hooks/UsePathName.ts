import { useLocation } from 'react-router-dom';

export const usePathName = () => {
  const location = useLocation();
  return location.pathname;
};
