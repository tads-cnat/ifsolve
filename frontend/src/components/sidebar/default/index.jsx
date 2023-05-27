import PropTypes from 'prop-types';
import IFSolvelogo from '../../../images/IFSolve-logo.svg';

export default function SidebarDefault({ children }) {
    return (
        <div
            id="Sidebar"
            className="hidden md:flex flex-col items-start bg-white basis-2/12 h-screen px-4 pt-5 pb-8"
        >
            <img className="h-6 mb-10" src={IFSolvelogo} alt="" />
            <div className="flex flex-col gap-4 w-full h-full">{children}</div>
        </div>
    );
}

SidebarDefault.propTypes = {
    children: PropTypes.node.isRequired,
};
