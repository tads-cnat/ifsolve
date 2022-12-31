import { Link } from "react-router-dom"

export default function SidebarItem(props) {
    return (
        <Link to={props.link} className="group flex flex-row items-center gap-3 px-5 py-2 rounded-md hover:bg-primary-20 transition duration-200">
            <div className="text-dark-100 group-hover:text-primary-100">{props.icon}</div> 
            <span className="font-medium text-dark-100 group-hover:text-primary-100">{props.title}</span>
        </Link>
    )
}