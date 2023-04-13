import { useEffect , useContext } from "react";

import { Navigate, useNavigate } from "react-router-dom";
import { GetUser, Logout } from "../../api/config";
import { GlobalContext } from "../../providers/context";
import Loading from "../loading";

export default function ProtectedRoute(props) {
    const { getUser, setUser } = useContext(GlobalContext);
    const navigate = useNavigate();

    useEffect(() => {

        if (localStorage.getItem("ifsolve_token") === null || localStorage.getItem("ifsolve_user") == null) {
            localStorage.clear();
            navigate("/");
        }

        setUser(null);

        GetUser().then(res => {
            console.log(res);
            setUser(res.data);
            localStorage.setItem('ifsolve_user', JSON.stringify(res.data))
        }).catch((error) => {
            localStorage.clear();
            navigate("/");
            Logout().then(res => {
                console.log(res);
            })
        })
    }, [])


    return (
        <>
            {getUser ? props.children : <Loading />}
        </>
    )
}