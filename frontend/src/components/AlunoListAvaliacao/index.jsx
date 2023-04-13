import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FiSearch } from "react-icons/fi";
import { TbReportSearch } from "react-icons/tb";
import { Link } from "react-router-dom";
import { GetAvaliacoesAluno } from "../../api/config";

export default function AlunoListAvalicao() {
    const [getSearch, setSearch] = useState("");
    const [getData, setData] = useState();

    const filteredData =
        getSearch.length > 0
            ? getData.filter((data) => data.titulo.includes(getSearch))
            : getData;

    useEffect(() => {
        GetAvaliacoesAluno().then((res) => {
            setData(res.data);
        });
    }, []);

    return (
        <div className="py-8">
            <div className="flex justify-start items-center gap-2 flex-wrap">
                {/* Titulo e subtitulo da página */}
                <div className="mr-auto order-first">
                    <h1 className="text-xl text-dark-100 font-bold">
                        Avaliacões
                    </h1>
                </div>
                {/* Titulo e subtitulo da página */}

                {/* Barra de busca */}
                <div className="flex items-center relative">
                    <FiSearch className="absolute left-3 text-dark-80" />
                    <input
                        type="text"
                        value={getSearch}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-dark-10 pl-10 pr-4 py-2 rounded-lg focus:outline-primary-100"
                        placeholder="Buscar avaliações..."
                    />
                </div>
                {/* Barra de busca */}

                {/* Ordenação */}
                <select className="p-2 text-normal rounded-lg">
                    <option value="volvo">Mais recentes</option>
                    <option value="saab">Mais antigos</option>
                </select>
                {/* Ordenação */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 py-4 gap-4">
                {filteredData && filteredData.length > 0 ? (
                    filteredData.map((avalicao) => (
                        <CardAvalicao key={avalicao.id} item={avalicao} />
                    ))
                ) : (
                    <div className="flex flex-col items-center py-12 gap-4 col-span-full">
                        <div className="text-8xl text-dark-80">
                            <TbReportSearch />
                        </div>
                        <h2 className="text-2xl text-dark-80 font-medium">
                            Oops!
                        </h2>
                        <p className="text-dark-80">
                            Desculpe, nenhuma avaliacão foi encontrada.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

function CardAvalicao({ item }) {
    return item ? (
        <Link
            to={`/avaliacao/${item.id}/responder`}
            className="w-full bg-white p-6 rounded-lg hover:outline hover:outline-4 hover:outline-primary-80"
        >
            <h2 className="text-lg text-dark-100 font-medium break-all">
                {item.titulo}
            </h2>
            <p className="text-dark-80 break-all">{item.descricao}</p>
            <p>Termina em: {item.data_fim}</p>
        </Link>
    ) : null;
}
CardAvalicao.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number,
        titulo: PropTypes.string,
        descricao: PropTypes.string,
        data_fim: PropTypes.string,
    }).isRequired,
};
