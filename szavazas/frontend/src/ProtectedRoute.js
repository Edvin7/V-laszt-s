import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, isAdmin }) => {
  if (!isAdmin) {
    console.log('User is not admin, redirecting to login page...');
    return <Navigate to="/" />;  // Itt átirányíthatod egy login oldalra, ha nincs jogosultsága
  }
  return element;  // Ha admin, akkor az AdminPanel jelenik meg
};

export default ProtectedRoute;
