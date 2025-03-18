import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, isAdmin }) => {
  if (!isAdmin) {
    console.log('User is not admin, redirecting to login page...');
    return <Navigate to="/" />;  
  }
  return element; 
};

export default ProtectedRoute;
