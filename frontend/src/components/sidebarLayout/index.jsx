import PropTypes from 'prop-types';
import { FiHome, FiList, FiUser } from 'react-icons/fi';

import Navbar from '../navbar';
import Sidebar from '../sidebar';
import SidebarMobile from '../sidebar/mobile';
import SidebarItem2 from '../sidebar/sidebarItem';

export default function SidebarLayout({ children }) {
    return (
        <div className="w-full bg-dark-5 flex flex-row overflow-hidden">
            <Sidebar />
            <div className="w-full h-screen overflow-y-scroll box-content">
                <Navbar />
                <SidebarMobile>
                    <SidebarItem2
                        label="Avaliações"
                        icon={<FiHome />}
                        itemKey="avaliacao"
                        link="/avaliacao"
                    />
                    <SidebarItem2 label="Questões" icon={<FiList />} itemKey="questoes" link="/" />
                    <SidebarItem2 label="Perfil" icon={<FiUser />} itemKey="perfil" />
                </SidebarMobile>
                <div className="px-8">{children}</div>
            </div>
        </div>
    );
}

SidebarLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
