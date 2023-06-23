import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, SidebarLayout } from '../../../components';
import { GetRespostasAlunoAvaliacao, GetAvaliacaoByID } from '../../../api/config';

export default function AvaliacaoResposta() {
    const [getRespostas, setRespostas] = useState([]);
    const [getAvaliacao, setAvaliacao] = useState([]);

    let notaTotal = 0;
    const { id } = useParams();

    function total(valor) {
        notaTotal += valor;
    }

    useEffect(() => {
        GetRespostasAlunoAvaliacao(id).then((res) => {
            setRespostas(res.data);
        });
    }, [id]);

    useEffect(() => {
        GetAvaliacaoByID(id).then((res) => {
            setAvaliacao(res.data);
        });
    }, [id]);

    return (
        <SidebarLayout>
            {getAvaliacao && getAvaliacao.avaliacao && getAvaliacao.itens && (
                <h1 className="bg-green-100 text-2xl text-center text-gray-500 mt-3 font-semibold p-4">
                    {' '}
                    {getAvaliacao.avaliacao.titulo}{' '}
                </h1>
            )}
            <Container>
                {getRespostas.length > 0 &&
                    getRespostas.map((res) => (
                        <div key={res.id} className="mt-8">
                            <div className="font-semibold text-lg">
                                {' '}
                                Item: {res.item_avaliacao}{' '}
                            </div>
                            <div className="py-1">
                                {' '}
                                <span className="font-medium"> Sua resposta: </span> {res.resposta}{' '}
                            </div>
                            {total(res.nota_obtida)}

                            {res.resposta.trim().length > 1 ? (
                                // É discursiva
                                <div className="p-1.5 bg-gray-200 text-gray-500 rounded-lg w-max">
                                    {' '}
                                    Aguardando Correção{' '}
                                </div>
                            ) : (
                                (() => {
                                    if (res.nota_obtida > 0) {
                                        // Acertou
                                        <div className="p-1.5 bg-green-100 text-green-500 rounded-lg w-max">
                                            {' '}
                                            Correta! + {res.nota_obtida} pontos{' '}
                                        </div>;
                                    } else {
                                        // Errou
                                        <div className="p-1.5 bg-red-100 text-red-500 rounded-lg w-max">
                                            {' '}
                                            Incorreta{' '}
                                        </div>;
                                    }
                                })()
                            )}
                        </div>
                    ))}

                <div className="pt-5 text-lg font-semibold">
                    {' '}
                    <span className="font-semibold"> Nota Total: </span>{' '}
                    <span className="text-green-500"> {notaTotal} </span>{' '}
                </div>
            </Container>
        </SidebarLayout>
    );
}
