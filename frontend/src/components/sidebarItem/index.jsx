import { useContext } from "react"
import { Link } from "react-router-dom"
import { GlobalContext } from "../../providers/context"

export default function SidebarItem(props) {
    const {getCurrentPage} = useContext(GlobalContext);

    return (
        <Link to={props.link} className={`group flex flex-row items-center gap-3 px-5 py-2 rounded-md hover:bg-primary-100 transition duration-200`+` ${getCurrentPage === props.itemKey ? "bg-primary-80" :""}` }>
            <div className="text-dark-100">{props.icon}</div> 
            <span className="font-medium text-dark-100">{props.title}</span>
        </Link>
    )
}