export default function SidebarItem(props) {
    return (
        <div className="sidebar-item flex flex-row items-center gap-3 px-5 py-2 rounded-md hover:bg-primary-100">
            {props.icon}
            <span className="font-medium text-dark-100">{props.title}</span>
        </div>
    )
}