import Sidebar from "../sidebar"
export default function SidebarLayout(props) {
    return (
        <div className="w-full bg-dark-5 flex flex-row">
            <Sidebar></Sidebar>
            <div className="w-full px-5">
                {props.children}
            </div>
        </div>
    )
}