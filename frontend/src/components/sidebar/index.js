import { useState } from "react";
import SidebarItem from "../sidebarItem";
import { FiHome, FiList, FiSettings } from "react-icons/fi";
import IFSolvelogo from "../../images/IFSolve-logo.svg";

export default function Sidebar(props) {
    return (
        <div id="Sidebar" className="flex flex-col bg-white basis-2/12 h-screen px-4 pt-5 pt-5 pb-8 border-r border-dark-10">
            <img className="h-6 mb-10" src={IFSolvelogo} alt="" />
            <div className="flex flex-col gap-4">
                <SidebarItem icon={<FiHome></FiHome>} title="Provas"></SidebarItem>
                <SidebarItem icon={<FiList></FiList>} title="Questões" link="/"></SidebarItem>
            </div>
            <div className="flex flex-col gap-4 mt-auto">
                <SidebarItem icon={<FiSettings></FiSettings>} title="Configurações" link="/settings"></SidebarItem>
            </div>
        </div>
    )
}