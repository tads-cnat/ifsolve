import Sidebar from "../sidebar"
export default function SidebarLayout(props) {
    return (
        <div className="w-full bg-white flex flex-row">
            <Sidebar></Sidebar>
            <div className="w-full h-screen px-5 overflow-y-scroll">
                {props.children}
            </div>
        </div>
    )
}