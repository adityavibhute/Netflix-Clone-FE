import Spinner from 'react-bootstrap/Spinner';
import { useLoggedInUser } from '../utils';
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
    const { loading, data } = useLoggedInUser('http://localhost:3001/api/v1/dashboard');
    
    const loadingSpinner = () => {
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        )
    };

    return (
        loading ? loadingSpinner : data && data?.token ?  <Outlet /> : <Navigate to="/login" />
    )
};

export default ProtectedRoute;