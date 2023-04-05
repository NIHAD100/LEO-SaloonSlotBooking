import { Navigate } from 'react-router-dom';
import { checkIfUserLoggedIn } from '../redux/features/userSlice';


const AuthenticatedRoute = ({ children }) => {
  if (!checkIfUserLoggedIn()) {
    return <Navigate to='/signin' replace />;
  }
  return children;
};

export default AuthenticatedRoute;
