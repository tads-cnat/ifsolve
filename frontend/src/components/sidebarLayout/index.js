import Navbar from "../navbar"
import Sidebar from "../sidebar"
export default function SidebarLayout(props) {
    return (
        <div className="w-full bg-white flex flex-row">
            <Sidebar></Sidebar>
            <div className="w-full h-screen">
                <Navbar />
                <div className="px-8 overflow-y-auto">
                    {props.children}
                </div>
            </div>
        </div>
    )
}