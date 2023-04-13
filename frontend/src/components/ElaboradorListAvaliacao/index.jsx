import { useEffect, useState } from "react";

import { FiPlus, FiSearch } from "react-icons/fi";
import { TbReportSearch } from "react-icons/tb";
import { Link } from "react-router-dom";
import { GetAvaliacoes } from "../../api/config";

export default function ElaboradorListAvalicao() {
    const [getSearch, setSearch] = useState("");
    const [getData, setData] = useState();

    useEffect(() => {
        GetAvaliacoes().then((res) => {
            setData(res.data);
        });
    }, []);

    const filteredData =
        getSearch.length > 0
            ? getData.filter((data) => data.titulo.includes(getSearch))
            : getData;

    return (
        <div className="py-8">
            <div className="flex justify-start items-center gap-2 flex-wrap">
                {/* Titulo e subtitulo da página */}
                <div className="mr-auto order-first">
                    <h1 className="text-xl text-dark-100 font-bold">
                        Avaliacões
                    </h1>
                    <p className="text-sm text-dark-80">
                        Elaborado por você e seus colegas
                    </p>
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

                {/* Adicionar prova */}
                <Link
                    to="/avaliacao/criar"
                    className="flex items-center bg-primary-80 gap-2 rounded-lg  px-4 py-2 order-first lg:order-4 hover:bg-primary-100"
                >
                    <FiPlus className="" />
                    Nova avaliação
                </Link>
                {/* Adicionar prova */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 py-4 gap-4">
                {filteredData && filteredData.length > 0 ? (
                    filteredData.map((avalicao, i) => (
                        <CardAvalicao key={i} item={avalicao} />
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
                        <Link
                            to="/avaliacao/criar/"
                            className="flex flex-row items-center gap-2 bg-primary-100 px-4 py-2 rounded-lg text-sm"
                        >
                            <FiPlus /> Nova avaliação
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

function CardAvalicao({ item }) {
    return item ? (
        <Link
            to={`/avaliacao/${item.id}/respostas`}
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
