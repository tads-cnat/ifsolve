import {useState} from "react";

import IFSolvelogo from "../../images/IFSolve-logo.svg";

export default function Sidebar(props){

    

    return(
        <div id="Sidebar" className="bg-white basis-[12%] h-screen rounded-md px-4 pt-5 py-5">
            <img className="h-6 mb-10" src={IFSolvelogo} alt=""/>
            <div className="flex flex-col gap-4">
                {props.children}
            </div>
        </div>
    )
}