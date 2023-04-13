import { useFormik } from "formik";
import * as Yup from "yup";
import { FiArrowLeft, FiInbox, FiPlus, FiSearch } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { GetAlunos, GetItems, PostAvaliacao } from "../../api/config";
import { AlunosInput, Container } from "../../components";



export default function CreateAvaliacao() {
    const [getAluno, setAluno] = useState([]);

    const [getItemList, setItemList] = useState([]);
    const [getItemSearch, setItemSearch] = useState("");
    const [getItemAvaliacao, setItemAvaliacao] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        GetItems().then(res => {
            setItemList(res.data);
        }).catch(error => {
            console.log(error);
        })
    }, [])


    const formik = useFormik({
        initialValues: {
            titulo: "",
            descricao: "",
            data_inicio: "",
            data_fim: "",
            nota: 100,
            visibilidade: "PU",
        },
        validationSchema: Yup.object({
            titulo: Yup.string().required("Título é obrigatório."),
            descricao: Yup.string().required("Descrição é obrigatória."),
            data_inicio: Yup.date().required("Data de início é obrigatória."),
            data_fim: Yup.date().required("Data de termino é obrigatória."),
        }),
        onSubmit: data => {
            // console.log(data);
            // console.log(getAluno.map(aluno => aluno.id));
            console.log(getItemAvaliacao);
            PostAvaliacao(data, getItemAvaliacao, getAluno.map(aluno => aluno.id)).then(res => {
                navigate("/avaliacao", { replace: true });
                localStorage.setItem('ifsolve_success_alert', "Avaliação criada com sucesso.");
            }).catch(error => {
                console.log(error);
                toast.error("Opss...Erro ao cadastrar avaliação.")
            })

        }
    })

    const filteredData = getItemSearch.length > 0 ? getItemList.filter(item => item.titulo.includes(getItemSearch)) : getItemList;

    function AddItemAvaliacao(item, i) {
        if (!getItemAvaliacao.includes(item)) {
            item.numero_item = i;
            item.nota_item = 10;
            item.item = item.id;
            setItemAvaliacao(getItemAvaliacao => [...getItemAvaliacao, item])
        } else {
            setItemAvaliacao(getItemAvaliacao.filter(itemAvaliacao => itemAvaliacao.id !== item.id))
        }
    }


    return (
        <div className="w-full min-h-screen flex flex-col items-center bg-dark-5 pt-4 pb-8 gap-4" >
            <form onSubmit={formik.handleSubmit} className="container flex flex-col py-8 gap-8" style={{ maxWidth: "720px" }}>
                <div className="flex flex-row items-center gap-4 w-full">
                    <div className="flex items-center justify-center w-8 h-8 bg-dark-10 rounded-full cursor-pointer hover:bg-dark-20" onClick={e => navigate(-1)}><FiArrowLeft /></div>
                    <h1 className="text-2xl font-medium text-dark-100">Nova avaliação</h1>
                </div>

                <div className="w-full flex flex-col bg-white mx-auto px-8 py-8 rounded-lg gap-8">
                    <h2 className="text-lg text-dark-100 font-medium">Informações gerais</h2>

                    <div className="flex flex-col">
                        <label htmlFor="">Titulo</label>
                        <input
                            type="text"
                            name="titulo"
                            value={formik.values.titulo}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            className="px-6 py-4 bg-dark-5 rounded-lg"
                            placeholder="Digite o titulo da avaliação"
                        />
                        {formik.errors.titulo && formik.touched.titulo ? <span>{formik.errors.titulo}</span> : null}
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="">Descrição</label>
                        <input
                            type="text"
                            className="px-6 py-4 bg-dark-5 rounded-lg"
                            placeholder="Digite a descrição da avaliação"
                            name="descricao"
                            value={formik.values.descricao}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.descricao && formik.touched.descricao ? <span>{formik.errors.descricao}</span> : null}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label htmlFor="">Começa em</label>
                            <input
                                type="datetime-local"
                                className="px-6 py-4 bg-dark-5 rounded-lg"
                                name="data_inicio"
                                value={formik.values.data_inicio}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.data_inicio && formik.touched.data_inicio ? <span>{formik.errors.data_inicio}</span> : null}

                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="">Termina em</label>
                            <input
                                type="datetime-local"
                                className="px-6 py-4 bg-dark-5 rounded-lg"
                                name="data_fim"
                                value={formik.values.data_fim}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.data_fim && formik.touched.data_fim ? <span>{formik.errors.data_fim}</span> : null}

                        </div>
                    </div>

                </div>

                {/* Input para selecionar alunos */}
                <AlunosInput get={getAluno} set={setAluno} />


                <div className="w-full flex flex-col bg-white mx-auto px-8 py-8 rounded-lg gap-4">
                    <h2 className="text-lg font-medium text-dark-100">Adicionar questões</h2>
                    <div className="relative flex items-center">
                        <FiSearch className="absolute left-4 " />
                        <input onChange={(e) => setItemSearch(e.target.value)} className="pl-12 pr-6 py-4 bg-dark-5 rounded-lg w-full" type="text" placeholder="Busque por titulo, assunto e tags..." />
                    </div>

                    <div className="grid overflow-auto gap-4" style={{ maxHeight: "400px" }}>
                        {filteredData.length > 0 ?
                            filteredData.map((item, i) =>
                                <CardItem key={i} item={item} onClick={(e) => AddItemAvaliacao(item, i)} />
                            )
                            :
                            <div className="flex flex-col items-center gap-4 bg-dark-5 p-8 rounded-lg">
                                <FiInbox className="text-4xl" />
                                <p>Desculpe, nenhuma questão foi encontrada.</p>
                                <Link to="/criar/item" className="flex flex-row items-center gap-2 bg-primary-100 px-4 py-2 rounded-lg text-sm"><FiPlus /> Nova questão</Link>
                            </div>
                        }
                    </div>
                </div>

                {getItemAvaliacao.length > 0 ?
                    getItemAvaliacao.map((item, i) =>
                        <div key={i} className="container flex flex-col bg-white mx-auto px-8 py-8 rounded-lg gap-4" style={{ maxWidth: "720px" }}>
                            <h2>{item.titulo}</h2>
                        </div>
                    )
                    : null}

                <div className="container flex flex-row mx-auto justify-start gap-4" style={{ maxWidth: "720px" }}>
                    <button className="bg-primary-100 px-6 py-2 rounded-lg font-medium text-dark-100">Cadastrar</button>
                    <button type="button" onClick={(e) => navigate(-1)}>Voltar</button>
                </div>

            </form>
            <Toaster />
        </div>
    )
}

function CardItem(props) {
    return (
        <div to={`/item/${props.item.id}/responder`} onClick={props.onClick} className="bg-dark-5 px-4 py-2 rounded-lg">
            <small className="text-sm">{props.item.assunto}</small>
            <h4 className="text-lg">{props.item.titulo}</h4>
            <div className="flex flex-row gap-4">
                {props.item.tags.filter((tag, i) => i < 3).map((tag, i) =>
                    <span key={i} className="text-sm bg-primary-10 text-primary-100 px-2 py-1 rounded-lg">{tag.nome}</span>
                )}
            </div>
        </div>
    )
}