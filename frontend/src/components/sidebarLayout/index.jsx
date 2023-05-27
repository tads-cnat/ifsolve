import PropTypes from 'prop-types';

import Navbar from '../navbar';
import Sidebar from '../sidebar';
import SidebarMobile from '../sidebar/mobile';

export default function SidebarLayout({ children }) {
    return (
        <div className="w-full bg-dark-5 flex flex-row overflow-hidden">
            <Sidebar />
            <div className="w-full h-screen overflow-y-scroll box-content">
                <Navbar />
                <SidebarMobile>SidebarMobile</SidebarMobile>
                <div className="px-8">{children}</div>
            </div>
        </div>
    );
}

SidebarLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
