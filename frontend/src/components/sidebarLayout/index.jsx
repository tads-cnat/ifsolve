import PropTypes from 'prop-types';
import { FiHome, FiList, FiUser } from 'react-icons/fi';
import Navbar from '../navbar';
import SidebarMobile from '../sidebar/mobile';
import SidebarItemMobile from '../sidebarItem/mobile';
import SidebarDefault from '../sidebar/default';
import SidebarItemDefault from '../sidebarItem/default';

export default function SidebarLayout({ children, className }) {
    return (
        <div className="w-full h-screen bg-dark-5 flex flex-row overflow-hidden">
            <SidebarDefault>
                <SidebarItemDefault
                    label="Avaliações"
                    icon={<FiHome />}
                    itemKey="avaliacoes"
                    link="/avaliacao"
                />
                <SidebarItemDefault
                    label="Questões"
                    icon={<FiList />}
                    itemKey="questoes"
                    link="/item"
                />
                <SidebarItemDefault
                    label="Perfil"
                    icon={<FiUser />}
                    itemKey="settings"
                    link="/perfil"
                    className="mt-auto"
                />
            </SidebarDefault>

            <div className="w-full min-h-screen flex flex-col overflow-y-hidden box-content">
                <Navbar />
                <div className={`flex h-full overflow-y-auto px-4 md:px-8 py-4 ${className}`}>
                    {children}
                </div>
                <SidebarMobile>
                    <SidebarItemMobile
                        label="Avaliações"
                        icon={<FiHome />}
                        itemKey="avaliacoes"
                        link="/avaliacao"
                    />
                    <SidebarItemMobile
                        label="Questões"
                        icon={<FiList />}
                        itemKey="questoes"
                        link="/item"
                    />
                    <SidebarItemMobile
                        label="Perfil"
                        icon={<FiUser />}
                        itemKey="perfil"
                        link="/perfil"
                    />
                </SidebarMobile>
            </div>
        </div>
    );
}

SidebarLayout.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};
SidebarLayout.defaultProps = {
    className: '',
};
