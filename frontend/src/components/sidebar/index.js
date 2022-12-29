import { useState } from "react";
import SidebarItem from "../sidebarItem";
import { FiHome, FiList } from "react-icons/fi"

import IFSolvelogo from "../../images/IFSolve-logo.svg";

export default function Sidebar(props) {
    return (
        <div id="Sidebar" className="bg-white basis-2/12 h-screen px-4 pt-5 py-5 border-r border-dark-10">
            <img className="h-6 mb-10" src={IFSolvelogo} alt="" />
            <div className="flex flex-col gap-4">
                <SidebarItem icon={<FiHome></FiHome>} title="Provas"></SidebarItem>
                <SidebarItem icon={<FiList></FiList>} title="Questões" link="/"></SidebarItem>
            </div>
        </div>
    )
}