// import { useFormik } from "formik";
// import * as Yup from "yup";
import { useState, useEffect } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import ReactQuill from 'react-quill';
import { useNavigate, useParams } from 'react-router-dom';
import {
    AnswerAvaliacao,
    GetAvaliacaoRespostasByAluno,
    GetAvaliacaoByID,
    GetItemByID,
} from '../../../api/config';

export default function AvaliacaoResponder(props) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [avaliacao, setAvaliacao] = useState(null);
    const [respostas, setRespostas] = useState([]);
    const user = JSON.parse(localStorage.getItem('ifsolve_user'));

    useEffect(() => {
        GetAvaliacaoByID(id).then((res) => {
            setAvaliacao(res.data);
            // console.log(res.data);
        });
    }, [id]);

    useEffect(() => {
        if (user && avaliacao) {
            GetAvaliacaoRespostasByAluno(avaliacao.avaliacao.id, user.id).then((res) => {
                // console.log(res);
                if (res.data.resposta.respostas.length > 0) {
                    console.log('respondeu');
                    navigate(`/avaliacao/${avaliacao.avaliacao.id}/respostas`);
                }
            });
        }
    }, [user, avaliacao]);

    useEffect(() => {
        if (!respostas.length > 0 && avaliacao) {
            avaliacao.itens.map((item) =>
                setRespostas((respostas) => [
                    ...respostas,
                    { item_avaliacao: item.id, aluno: user.id, item: item.item, resposta: '' },
                ])
            );
        }
    }, [respostas, avaliacao, user]);

    function HandleSubmit(e) {
        e.preventDefault();
        AnswerAvaliacao(respostas).then((res) => {
            console.log(res);
            navigate(`/avaliacao/${avaliacao.avaliacao.id}/respostas`);
        });
        // alert(JSON.stringify(respostas, null, 2));
    }

    return (
        <div className="w-full min-h-screen bg-dark-5 flex justify-center">
            <form
                onSubmit={(e) => HandleSubmit(e)}
                className="container flex flex-col gap-4 py-8"
                style={{ maxWidth: '720px' }}
            >
                {/* Header */}
                <div className="flex flex-row items-center gap-4 w-full">
                    <div
                        className="flex items-center justify-center w-8 h-8 bg-dark-10 rounded-full cursor-pointer hover:bg-dark-20"
                        onClick={(e) => navigate(-1)}
                    >
                        <FiArrowLeft />
                    </div>
                    Voltar
                </div>
                {/* Header */}

                {avaliacao ? (
                    <>
                        <Container>
                            <Header2>{avaliacao.avaliacao.titulo}</Header2>
                            <p>{avaliacao.avaliacao.descricao}</p>
                        </Container>

                        {avaliacao.itens &&
                            avaliacao.itens.map((item, i) => (
                                <ItemForm item={item} i={i} key={i} respostas={respostas} />
                            ))}
                    </>
                ) : null}
                <div className="flex flex-row gap-4">
                    <button
                        type="submit"
                        className="bg-primary-80 px-4 py-2 rounded-lg hover:bg-primary-100"
                    >
                        Responder
                    </button>
                    <button
                        type="button"
                        className="px-4 py-2 rounded-lg hover:bg-dark-10"
                        onClick={(e) => navigate(-1)}
                    >
                        {' '}
                        Voltar{' '}
                    </button>
                </div>
            </form>
        </div>
    );
}

function Container(props) {
    return <div className="bg-white p-8 rounded-lg flex flex-col gap-2">{props.children}</div>;
}

function Header2(props) {
    return (
        <h2 className={`text-lg text-dark-100 font-medium ${props.className}`}>{props.children}</h2>
    );
}

function ItemForm(props) {
    const [item, setItem] = useState();

    useEffect(() => {
        GetItemByID(props.item.item).then((res) => {
            setItem(res.data);
            console.log(res.data);
        });
    }, [props.item.item]);

    function HandleChange(resposta) {
        console.log('here');
        props.respostas[props.i].resposta = resposta;
    }
    return (
        <>
            {item ? (
                <Container>
                    <Header2>{item.titulo}</Header2>
                    <RichText value={item.enunciado} />
                    {item.tipo === 'ME' ? (
                        <>
                            <ItemOption
                                name={`respostas.${props.i}.texto`}
                                value="a"
                                text={item.alternativa_a.texto}
                                onChange={(e) => HandleChange(e.target.value)}
                            />
                            <ItemOption
                                name={`respostas.${props.i}.texto`}
                                value="b"
                                text={item.alternativa_b.texto}
                                onChange={(e) => HandleChange(e.target.value)}
                            />
                            {item.alternativa_c && item.alternativa_c.texto ? (
                                <ItemOption
                                    name={`respostas.${props.i}.texto`}
                                    value="c"
                                    text={item.alternativa_c.texto}
                                    onChange={(e) => HandleChange(e.target.value)}
                                />
                            ) : null}

                            {item.alternativa_d && item.alternativa_d.texto ? (
                                <ItemOption
                                    name={`respostas.${props.i}.texto`}
                                    value="d"
                                    text={item.alternativa_d.texto}
                                    onChange={(e) => HandleChange(e.target.value)}
                                />
                            ) : null}
                            {item.alternativa_e && item.alternativa_e.texto ? (
                                <ItemOption
                                    name={`respostas.${props.i}.texto`}
                                    value="e"
                                    text={item.alternativa_e.texto}
                                    onChange={(e) => HandleChange(e.target.value)}
                                />
                            ) : null}
                        </>
                    ) : (
                        <input
                            onChange={(e) => HandleChange(e.target.value)}
                            placeholder="Digite sua resposta"
                        />
                    )}
                </Container>
            ) : null}
        </>
    );
}

function ItemOption(props) {
    return (
        <label className="flex flex-row items-center gap-2 px-4 py-2 rounded-lg border border-dark-10">
            <input
                type="radio"
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                onBlur={props.onBlur}
            />
            <p>{props.text}</p>
        </label>
    );
}

function RichText(props) {
    const modules = {
        toolbar: false,
    };
    return <ReactQuill modules={modules} value={props.value} readOnly />;
}
