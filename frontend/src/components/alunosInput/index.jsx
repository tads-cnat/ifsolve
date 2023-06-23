import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FiCheck, FiX } from 'react-icons/fi';
import { GetAlunos } from '../../api/config';

export default function AlunosInput({ get, set }) {
    const [getAlunos, setAlunos] = useState([]);
    const [getSearch, setSearch] = useState('');

    function AddAlunos(aluno) {
        if (!get.includes(aluno)) {
            set(() => [...get, aluno]);
            setSearch(' ');
        }
    }
    function RemoveAluno(aluno) {
        set(get.filter((alunos) => alunos.id !== aluno.id));
    }

    const filteredAlunos =
        getSearch.length > 0
            ? getAlunos.filter((alunos) => alunos.email.includes(getSearch.trim()))
            : getAlunos;

    useEffect(() => {
        GetAlunos().then((res) => {
            setAlunos(res.data);
        });
    }, []);

    return (
        <div className="w-full flex flex-col bg-white mx-auto px-8 py-8 rounded-lg gap-4">
            {/* <div className="flex flex-row flex-wrap gap-1">
                {get.map((aluno, i) => <span key={i} className="text-sm bg-primary-10 text-primary-80 px-2 py-1 rounded-lg">{aluno.email}</span>)}
            </div> */}
            <h2 className="text-lg text-dark-100 font-medium">Adicionar alunos</h2>
            <div className="flex relative items-center w-full flex-wrap bg-dark-5 px-4 py-2 gap-2 rounded-lg">
                {get.map((aluno) => (
                    <span
                        key={aluno.id}
                        className="flex flex-row gap-2 items-center text-sm bg-dark-10 text-dark-80 px-2 py-1 rounded-lg hover:bg-dark-20"
                    >
                        {aluno.username}
                        <FiX className="cursor-pointer" onClick={() => RemoveAluno(aluno)} />
                    </span>
                ))}

                <input
                    type="text"
                    className="bg-transparent flex-1 focus:outline-0"
                    placeholder="Busque por nome de usuário, email ou nome completo..."
                    autoComplete="new-password"
                    value={getSearch}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                        }
                    }}
                />
                {getSearch ? (
                    <ul
                        className="absolute top-full bg-white shadow first rounded-lg overflow-y-scroll z-10"
                        style={{ maxHeight: '200px' }}
                    >
                        {filteredAlunos.map((aluno) => (
                            <li className="px-4 py-2 first:bg-dark-10" key={aluno.id}>
                                <button
                                    type="button"
                                    className="w-full text-left"
                                    onClick={() => AddAlunos(aluno)}
                                    // onKeyDown={(event) => {
                                    //     if (event.key === "Enter") {
                                    //         event.preventDefault();
                                    //         if (filteredAlunos.length > 0) {
                                    //             AddAlunos(filteredAlunos[0]);
                                    //         }
                                    //     }
                                    // }}
                                >
                                    <p className="text-sm font-medium uppercase">
                                        {aluno.username}
                                    </p>
                                    <span className="text-sm">{aluno.email}</span>
                                    {get.includes(aluno) ? <FiCheck /> : null}
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : null}
            </div>
        </div>
    );
}

AlunosInput.propTypes = {
    get: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            email: PropTypes.string.isRequired,
        })
    ).isRequired,
    set: PropTypes.func.isRequired,
};
