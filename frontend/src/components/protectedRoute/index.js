import { Navigate } from "react-router-dom";

export default function ProtectedRoute(props){
    if(localStorage.getItem("ifsolve_token") == null || localStorage.getItem("ifsolve_user") == null){
        localStorage.clear();
        return <Navigate to="/" replace />
    }   
    return props.children;
}