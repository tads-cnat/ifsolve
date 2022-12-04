import IFSolvelogo from "../../images/IFSolve-logo.svg";

export default function Sidebar(props){
    return(
        <div id="Sidebar" className="bg-white basis-[12%] h-screen rounded-md px-3 pt-5 py-3">
            <img className="h-6 mb-10" src={IFSolvelogo} alt=""/>
            {props.children}
        </div>
    )
}