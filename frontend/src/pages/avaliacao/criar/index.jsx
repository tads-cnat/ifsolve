import { useFormik } from 'formik';
import { Button, Typography } from '@material-tailwind/react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { FiArrowLeft, FiInbox, FiPlus, FiSearch, FiTrash } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { GetItems, PostAvaliacao } from '../../../api/config';
import { AlunosInput, AlertDanger } from '../../../components';

export default function CreateAvaliacao() {
    const [getAluno, setAluno] = useState([]);
    const today = new Date();
    const dataMinima = `${today.getFullYear()}-${`0${today.getMonth() + 1}`.slice(
        -2
    )}-${`0${today.getDate()}`.slice(-2)}T${`0${today.getHours()}`.slice(
        -2
    )}:${`0${today.getMinutes()}`.slice(-2)}`;

    const [getItemList, setItemList] = useState([]);
    const [getItemSearch, setItemSearch] = useState('');
    const [getItemAvaliacao, setItemAvaliacao] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        GetItems()
            .then((res) => {
                setItemList(res.data);
            })
            .catch((error) => {
                throw new Error(error);
            });
    }, []);

    const formik = useFormik({
        initialValues: {
            titulo: '',
            descricao: '',
            data_inicio: '',
            data_fim: '',
            nota: 100,
            visibilidade: 'PU',
        },
        validationSchema: Yup.object({
            titulo: Yup.string().required('Título é obrigatório.'),
            descricao: Yup.string().required('Descrição é obrigatória.'),
            data_inicio: Yup.date()
                .required('Data de início é obrigatória.')
                .min(new Date(), 'A data de início NÃO pode ser no passado!'),
            data_fim: Yup.date()
                .required('Data de termino é obrigatória.')
                .min(
                    Yup.ref('data_inicio'),
                    'A data de término deve ser posterior à data de início!'
                ),
        }),
        onSubmit: (data) => {
            PostAvaliacao(
                data,
                getItemAvaliacao,
                getAluno.map((aluno) => aluno.id)
            )
                .then(() => {
                    navigate('/avaliacao', { replace: true });
                    localStorage.setItem('ifsolve_success_alert', 'Avaliação criada com sucesso.');
                })
                .catch(() => {
                    toast.error('Opss...Erro ao cadastrar avaliação.');
                });
        },
    });

    const filteredData =
        getItemSearch.length > 0
            ? getItemList.filter((item) => item.titulo.includes(getItemSearch))
            : getItemList;

    function AddItemAvaliacao(item, i) {
        if (!getItemAvaliacao.includes(item)) {
            const itens = item;
            itens.numero_item = i;
            itens.nota_item = 10;
            itens.item = item.id;
            setItemAvaliacao((itemAvaliacao) => [...itemAvaliacao, item]);
        } else {
            setItemAvaliacao(
                getItemAvaliacao.filter((itemAvaliacao) => itemAvaliacao.id !== item.id)
            );
        }
    }

    return (
        <div className="w-full min-h-screen bg-dark-5">
            <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col gap-8 py-8 mx-auto w-11/12 sm:w-4/5 xl:w-2/4 2xl:w-1/3"
                style={{ maxWidth: '720px' }}
            >
                <div className="flex flex-row items-center gap-4 w-full">
                    <div
                        className="flex items-center justify-center w-8 h-8 bg-dark-10 rounded-full cursor-pointer hover:bg-dark-20"
                        onClick={() => navigate(-1)}
                        role="presentation"
                    >
                        <FiArrowLeft />
                    </div>
                    <h1 className="text-2xl font-medium text-dark-100">Nova avaliação</h1>
                </div>

                <div className="w-full flex flex-col bg-white mx-auto px-8 py-8 rounded-lg gap-8">
                    <h2 className="text-lg text-dark-100 font-medium">Informações gerais</h2>

                    <label htmlFor="titulo">
                        Titulo
                        <div className="flex flex-col">
                            <input
                                type="text"
                                name="titulo"
                                value={formik.values.titulo}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                required
                                className="px-6 py-4 bg-dark-5 rounded-lg"
                                placeholder="Digite o titulo da avaliação"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') e.preventDefault();
                                }}
                            />
                            {formik.errors.titulo && formik.touched.titulo ? (
                                <AlertDanger>{formik.errors.titulo}</AlertDanger>
                            ) : null}
                        </div>
                    </label>

                    <label htmlFor="descricao">
                        Descrição
                        <div className="flex flex-col">
                            <input
                                type="text"
                                className="px-6 py-4 bg-dark-5 rounded-lg"
                                placeholder="Digite a descrição da avaliação"
                                name="descricao"
                                required
                                value={formik.values.descricao}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') e.preventDefault();
                                }}
                            />
                            {formik.errors.descricao && formik.touched.descricao ? (
                                <AlertDanger>{formik.errors.descricao}</AlertDanger>
                            ) : null}
                        </div>
                    </label>

                    <div className="grid grid-cols-2 gap-4">
                        <label htmlFor="data_inicio">
                            Começa em
                            <div className="flex flex-col">
                                <input
                                    type="datetime-local"
                                    className="px-6 py-4 bg-dark-5 rounded-lg"
                                    name="data_inicio"
                                    id="data_inicio"
                                    required
                                    min={dataMinima}
                                    value={formik.values.data_inicio}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') e.preventDefault();
                                    }}
                                />
                                {formik.errors.data_inicio && formik.touched.data_inicio ? (
                                    <AlertDanger>{formik.errors.data_inicio}</AlertDanger>
                                ) : null}
                            </div>
                        </label>
                        <label htmlFor="data_fim">
                            Termina em
                            <div className="flex flex-col">
                                <input
                                    type="datetime-local"
                                    className="px-6 py-4 bg-dark-5 rounded-lg"
                                    name="data_fim"
                                    required
                                    min={
                                        document.getElementById('data_inicio')
                                            ? document.getElementById('data_inicio').value
                                            : dataMinima
                                    }
                                    value={formik.values.data_fim}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') e.preventDefault();
                                    }}
                                />
                                {formik.errors.data_fim && formik.touched.data_fim ? (
                                    <AlertDanger>{formik.errors.data_fim}</AlertDanger>
                                ) : null}
                            </div>
                        </label>
                    </div>
                </div>

                {/* Input para selecionar alunos */}
                <AlunosInput get={getAluno} set={setAluno} />

                <div className="w-full flex flex-col bg-white mx-auto px-8 py-8 rounded-lg gap-4">
                    <h2 className="text-lg font-medium text-dark-100">Adicionar questões</h2>
                    <div className="relative flex items-center">
                        <FiSearch className="absolute left-4 " />
                        <input
                            onChange={(e) => setItemSearch(e.target.value)}
                            className="pl-12 pr-6 py-4 bg-dark-5 rounded-lg w-full"
                            type="text"
                            placeholder="Busque por titulo, assunto e tags..."
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') e.preventDefault();
                            }}
                        />
                    </div>

                    <div className="grid overflow-auto gap-4" style={{ maxHeight: '400px' }}>
                        {filteredData.length > 0 ? (
                            filteredData.map((item) => (
                                <CardItem
                                    key={item.id}
                                    item={item}
                                    onClick={() => AddItemAvaliacao(item, item.id)}
                                />
                            ))
                        ) : (
                            <div className="flex flex-col items-center gap-4 bg-dark-5 p-8 rounded-lg">
                                <FiInbox className="text-4xl" />
                                <p>Desculpe, nenhuma questão foi encontrada.</p>
                                <Link
                                    to="/elaborar/item/"
                                    className="flex flex-row items-center gap-2 bg-primary-100 px-4 py-2 rounded-lg text-sm"
                                >
                                    <FiPlus /> Nova questão
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {getItemAvaliacao.length > 0
                    ? getItemAvaliacao.map((item) => (
                          <div
                              key={item.id}
                              className="container flex flex-col bg-white mx-auto px-8 py-8 rounded-lg gap-2 justify-start items-start"
                              style={{ maxWidth: '720px' }}
                          >
                              <Typography variant="text">{item.assunto}</Typography>
                              <Typography variant="h5">{item.titulo}</Typography>

                              <Button
                                  onClick={() => AddItemAvaliacao(item, item.id)}
                                  variant="outlined"
                                  color="red"
                                  className="flex items-center gap-3 mt-4"
                              >
                                  <FiTrash />
                                  Remover
                              </Button>
                          </div>
                      ))
                    : null}

                <div
                    className="container flex flex-row mx-auto justify-start gap-4"
                    style={{ maxWidth: '720px' }}
                >
                    <button
                        type="submit"
                        className="bg-primary-100 px-6 py-2 rounded-lg font-medium text-dark-100"
                    >
                        Cadastrar
                    </button>
                    <button type="button" onClick={() => navigate(-1)}>
                        Voltar
                    </button>
                </div>
            </form>
            <Toaster />
        </div>
    );
}

function CardItem({ item, onClick }) {
    return (
        <div
            to={`/item/${item.id}/responder`}
            className="bg-dark-5 px-4 py-2 rounded-lg"
            role="presentation"
        >
            <small className="text-sm">{item.assunto}</small>
            <h4 className="text-lg">{item.titulo}</h4>
            <div className="flex flex-row gap-4">
                {item.tags
                    .filter((tag) => tag.id < 3)
                    .map((tag) => (
                        <span
                            key={tag.id}
                            className="text-sm bg-primary-10 text-primary-100 px-2 py-1 rounded-lg"
                        >
                            {tag.nome}
                        </span>
                    ))}
            </div>
            <Button
                onClick={onClick}
                variant="outlined"
                color="teal"
                className="flex items-center gap-3 mt-4"
            >
                <FiPlus />
                Adicionar
            </Button>
        </div>
    );
}
CardItem.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.string,
        titulo: PropTypes.string,
        assunto: PropTypes.string,
        tipo: PropTypes.string,
        tags: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string,
                nome: PropTypes.string,
            })
        ),
    }).isRequired,
    onClick: PropTypes.func.isRequired,
};
