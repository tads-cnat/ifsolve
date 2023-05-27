import PropTypes from 'prop-types';
import { FiHome, FiList, FiUser } from 'react-icons/fi';
import Navbar from '../navbar';
import SidebarMobile from '../sidebar/mobile';
import SidebarItemMobile from '../sidebarItem/mobile';
import SidebarDefault from '../sidebar/default';
import SidebarItemDefault from '../sidebarItem/default';

export default function SidebarLayout({ children }) {
    return (
        <div className="w-full bg-dark-5 flex flex-row overflow-hidden">
            <SidebarDefault>
                <SidebarItemDefault
                    label="Avaliações"
                    icon={<FiHome />}
                    itemKey="avaliacao"
                    link="/avaliacao"
                />
                <SidebarItemDefault
                    label="Questões"
                    icon={<FiUser />}
                    itemKey="questoes"
                    link="/"
                />
                <SidebarItemDefault
                    label="Perfil"
                    icon={<FiList />}
                    itemKey="settings"
                    link="/settings"
                    className="mt-auto"
                />
            </SidebarDefault>

            <SidebarMobile>
                <SidebarItemMobile
                    label="Avaliações"
                    icon={<FiHome />}
                    itemKey="avaliacao"
                    link="/avaliacao"
                />
                <SidebarItemMobile label="Questões" icon={<FiList />} itemKey="questoes" link="/" />
                <SidebarItemMobile label="Perfil" icon={<FiUser />} itemKey="perfil" />
            </SidebarMobile>

            <div className="w-full h-screen overflow-y-scroll box-content">
                <Navbar />
                <div className="px-8">{children}</div>
            </div>
        </div>
    );
}

SidebarLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
