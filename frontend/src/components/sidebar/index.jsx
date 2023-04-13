import { FiHome, FiList, FiSettings } from "react-icons/fi";
import SidebarItem from "../sidebarItem";
import IFSolvelogo from "../../images/IFSolve-logo.svg";

export default function Sidebar(props) {
    return (
        <div id="Sidebar" className="flex flex-col bg-white basis-2/12 h-screen px-4 pt-5 pt-5 pb-8">
            <img className="h-6 mb-10" src={IFSolvelogo} alt="" />
            <div className="flex flex-col gap-4">
                <SidebarItem icon={<FiHome />} itemKey="avaliacao" title="Avaliações" link="/avaliacao" />
                <SidebarItem icon={<FiList />} itemKey="questoes" title="Questões" link="/" />
            </div>
            <div className="flex flex-col gap-4 mt-auto">
                <SidebarItem icon={<FiSettings />} itemKey="settings" title="Configurações" link="/settings" />
            </div>
        </div>
    )
}