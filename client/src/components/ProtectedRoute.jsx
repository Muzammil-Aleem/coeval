import {Navigate,Outlet} from 'react-router-dom';
import {useAuth} from '../context/AuthContext.jsx';
export default function ProtectedRoute(){const {admin,loading}=useAuth();if(loading)return <p className="state">Checking session…</p>;return admin?<Outlet/>:<Navigate to="/login" replace/>;}
