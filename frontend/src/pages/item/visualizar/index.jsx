import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiInfo, FiX } from 'react-icons/fi';
import { GetItemByID } from '../../../api/config';
import { Container } from '../../../components';
import './style.css';

export default function ItemVisualizar() {
    const [getItem, setItem] = useState();
    const [getEnunciado, setEnunciado] = useState('');
    const [getInfo, setInfo] = useState(false);
    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        GetItemByID(id).then((res) => {
            setItem(res.data);
            setEnunciado(res.data.enunciado);
        });
    }, [id]);

    const modules = {
        toolbar: false,
    };

    return (
        <div className="">
            {getItem ? (
                <div className="min-h-screen bg-dark-5">
                    <Container className="py-8 bg-white">
                        <div className="flex justify-between items-center mb-4">
                            <button
                                type="button"
                                className="w-8 h-8 flex items-center justify-center bg-dark-5 rounded-full"
                                onClick={() => navigate(-1)}
                            >
                                <FiArrowLeft />
                            </button>
                            <button
                                type="button"
                                className="w-8 h-8 flex items-center justify-center bg-dark-5 rounded-full"
                                onClick={() => setInfo(!getInfo)}
                            >
                                {getInfo ? <FiX /> : <FiInfo />}
                            </button>
                        </div>
                        {getInfo ? (
                            <div className="flex flex-col">
                                <div className="flex bg-dark-5 p-8 items-center justify-evenly gap-10 rounded-lg flex-col md:flex-row mb-4">
                                    <span>{getItem.tipo}</span>
                                    <span>{getItem.assunto}</span>
                                    <span>{getItem.data_publicacao}</span>
                                </div>

                                <div className="flex flex-row items-center justify-center gap-4">
                                    {getItem.tags.length > 0
                                        ? getItem.tags.map((tag) => (
                                              <span
                                                  className="bg-primary-10 text-primary-100 rounded-lg px-4 py-2"
                                                  key={tag.id}
                                              >
                                                  {tag.nome}
                                              </span>
                                          ))
                                        : null}
                                </div>
                            </div>
                        ) : null}
                    </Container>

                    <Container className="bg-dark-5 min-h-full py-8">
                        <h2 className="text-3xl font-bold mb-4">{getItem.titulo}</h2>
                        <ReactQuill
                            className="border-0 mb-4 text-lg font-medium"
                            modules={modules}
                            value={getEnunciado}
                            readOnly
                        />
                        {getItem.tipo === 'DI' ? (
                            <>
                                <h4 className="text-lg font-medium mb-4">
                                    Expectativa de resposta
                                </h4>
                                <p className="p-8 bg-white rounded-lg">
                                    {getItem.expectativa_resposta}
                                </p>
                            </>
                        ) : (
                            <div className="">
                                <h4 className="text-lg font-medium mb-4">Alternativas</h4>

                                {getItem.alternativa_a ? (
                                    <CardAlternativa
                                        key="a"
                                        correct={getItem.alternativa_correta === 'a'}
                                        item={getItem.alternativa_a}
                                    />
                                ) : null}
                                {getItem.alternativa_b ? (
                                    <CardAlternativa
                                        key="b"
                                        correct={getItem.alternativa_correta === 'b'}
                                        item={getItem.alternativa_b}
                                    />
                                ) : null}
                                {getItem.alternativa_c ? (
                                    <CardAlternativa
                                        key="c"
                                        correct={getItem.alternativa_correta === 'c'}
                                        item={getItem.alternativa_c}
                                    />
                                ) : null}
                                {getItem.alternativa_d ? (
                                    <CardAlternativa
                                        key="d"
                                        correct={getItem.alternativa_correta === 'd'}
                                        item={getItem.alternativa_d}
                                    />
                                ) : null}
                                {getItem.alternativa_e ? (
                                    <CardAlternativa
                                        key="e"
                                        correct={getItem.alternativa_correta === 'e'}
                                        item={getItem.alternativa_e}
                                    />
                                ) : null}
                            </div>
                        )}
                    </Container>
                </div>
            ) : null}
        </div>
    );
}

function CardAlternativa({ correct, item }) {
    return (
        <div
            className={`flex bg-white mb-4 px-4 py-2 rounded-lg gap-4 ${
                correct ? 'outline outline-4 outline-primary-60' : ''
            }`}
        >
            {correct ? <input type="radio" checked /> : <input type="radio" disabled />}
            <div className="flex flex-col">
                <h5 className="text-lg font-medium">{item.texto}</h5>
                <p className="">{item.justificativa}</p>
            </div>
        </div>
    );
}

CardAlternativa.propTypes = {
    correct: PropTypes.string.isRequired,
    item: PropTypes.shape({
        texto: PropTypes.string,
        justificativa: PropTypes.string,
    }).isRequired,
};
