import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { SidebarLayout } from '../../components';
import { Logout } from '../../api/config';
import { GlobalContext } from '../../providers/context';

export default function Settings() {
    const navigate = useNavigate();
    const { setCurrentPage } = useContext(GlobalContext);

    useEffect(() => {
        setCurrentPage('perfil');
    }, []);

    function HandleLogout(e) {
        e.preventDefault();
        Logout().then(() => {
            navigate('/');
        });
    }

    return (
        <SidebarLayout className="flex flex-col gap-4">
            <div className="md:container py-5">
                <h1 className="text-xl font-bold text-dark-100 mb-5">Configurações</h1>

                <div className="mb-3">
                    <h2 className="text-md font-medium text-dark-100 mb-2">Sair</h2>
                    <p className="text-dark-80 mb-2">Deseja realmente sair?</p>
                    <button
                        type="button"
                        onClick={(e) => HandleLogout(e)}
                        className="px-5 py-2 text-sm font-medium text-red-400 rounded-lg border-2 border-red-400 hover:bg-red-400 hover:text-white transition duration-300"
                    >
                        Quero sair
                    </button>
                </div>
            </div>
        </SidebarLayout>
    );
}
