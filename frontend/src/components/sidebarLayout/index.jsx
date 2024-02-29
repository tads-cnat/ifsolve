import { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FiCheckSquare, FiFile, FiFileText, FiHome, FiList, FiUser } from 'react-icons/fi';
import Navbar from '../navbar';
import SidebarMobile from '../sidebar/mobile';
import SidebarItemMobile from '../sidebarItem/mobile';
import SidebarDefault from '../sidebar/default';
import SidebarItemDefault from '../sidebarItem/default';
import IFSolvelogo from '../../images/IFSolve-logo.svg';
import { GlobalContext } from '../../providers/context';

export default function SidebarLayout({ children, className }) {
    const { getUser } = useContext(GlobalContext);

    return (
        <div className="w-full h-screen bg-dark-5 flex flex-row overflow-hidden">
            <SidebarDefault>
                <SidebarItemDefault
                    label="Avaliações"
                    icon={<FiFileText />}
                    itemKey="avaliacoes"
                    link="/avaliacao"
                />
                <SidebarItemDefault
                    label="Questões"
                    icon={<FiCheckSquare />}
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

            <div className="w-full flex flex-col overflow-y-hidden box-content">
                <Navbar />
                <div
                    className={`flex h-full overflow-y-auto px-4 md:px-8 py-4 ${className} mb-64 md:mb-0`}
                >
                    <div className="flex md:hidden flex-row justify-between items-center mb-8 overflow-y-auto">
                        <img src={IFSolvelogo} alt="" className="h-6" />
                        <Link to="/perfil">
                            <div className="h-12 w-12 bg-teal-700 text-white font-bold flex justify-center items-center rounded-full">
                                {Array.from(getUser.extra_data.nome_completo)[0]}
                            </div>
                        </Link>
                    </div>
                    {children}
                </div>
                <SidebarMobile>
                    <SidebarItemMobile
                        label="Avaliações"
                        icon={<FiFileText />}
                        itemKey="avaliacoes"
                        link="/avaliacao"
                    />
                    <SidebarItemMobile
                        label="Questões"
                        icon={<FiCheckSquare />}
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
