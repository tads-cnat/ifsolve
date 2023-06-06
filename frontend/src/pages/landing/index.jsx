import { FiCheck } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import logo from '../../images/IFSolve-logo.svg';
import screeenshot from '../../images/screenshot.png';

export default function Landing() {
    return (
        <div className="w-full min-h-screen relative">
            <div className="grid p-4 lg:pr-0 grid-cols-1 md:grid-cols-2 items-center    ">
                <div className="container flex flex-col justify-center items-start gap-4 min-h-screen">
                    <img src={logo} alt="" className="h-6 mb-12" />
                    <h1 className="text-4xl text-dark-100 font-bold">
                        Simplifique o processo de criação e aplicação de provas
                    </h1>

                    <p className="text-dark-80">
                        Um sistema intuitivo e eficiente para professores e alunos
                    </p>
                    <div className="flex flex-row justify-start gap-4">
                        <Link
                            to="/login"
                            className="flex justify-center text-white font-semibold px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 focus:outline focus:outline-4 focus:outline-emerald-700"
                        >
                            Entrar com SUAP
                        </Link>
                        <button type="button">Saber mais</button>
                    </div>
                </div>
                <img
                    src={screeenshot}
                    className="aspect-{4/3} object-cover object-left-top border border-dark-20 rounded-lg md:rounded-l-lg shadow-lg"
                    alt=""
                />
            </div>
            <div className="container px-4 pt-16 pb-8">
                <h5 className="text-lg font-medium text-emerald-600">
                    Recursos poderosos para professores e alunos
                </h5>
                <h2 className="text-xl md:text-3xl font-bold text-dark-100 mb-12">
                    Simplifique o processo de criação e aplicação de provas
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-4">
                    <CardFeature />
                    <CardFeature />
                    <CardFeature />
                </div>
            </div>
        </div>
    );
}

function CardFeature() {
    return (
        <div className="flex flex-col items-start gap-2">
            <span className="bg-emerald-400 text-white text-xl p-2 rounded-lg">
                <FiCheck />
            </span>
            <h6 className="text-lg font-medium">Cadastro de Questões Detalhadas</h6>
            <p className="text-dark-80">
                Cadastre questões discursivas e múltipla escolha com informações detalhadas
            </p>
        </div>
    );
}
