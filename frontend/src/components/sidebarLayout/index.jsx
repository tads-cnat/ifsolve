import Navbar from "../navbar"
import Sidebar from "../sidebar"

export default function SidebarLayout(props) {
    return (
        <div className="w-full bg-dark-5 flex flex-row overflow-hidden">
            <Sidebar />
            <div className="w-full h-screen overflow-y-scroll box-content">
                <Navbar />
                <div className="px-8">
                    {props.children}
                </div>
            </div>
        </div>
    )
}