import { useEffect } from "react"
import toast, { Toaster } from 'react-hot-toast';

export default function GlobalAlert() {
    useEffect(() => {
        if (localStorage.getItem("ifsolve_success_alert") != null) {
            toast.success(localStorage.getItem("ifsolve_success_alert"));
            localStorage.removeItem("ifsolve_success_alert");
        }

    })

    return (<Toaster />)
}