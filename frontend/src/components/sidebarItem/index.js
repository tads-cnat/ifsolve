import { Link } from "react-router-dom"

export default function SidebarItem(props) {
    return (
        <Link to={props.link} className="sidebar-item flex flex-row items-center gap-3 px-5 py-2 rounded-md hover:bg-primary-100">
            {props.icon}
            <span className="font-medium text-dark-100">{props.title}</span>
        </Link>
    )
}