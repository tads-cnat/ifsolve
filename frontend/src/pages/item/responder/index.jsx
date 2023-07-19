import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FiArrowLeft } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';
import { Container } from '../../../components';
import { AnswerItem, GetItemByID } from '../../../api/config';

export default function ItemResponder() {
    const { id } = useParams();
    const [getData, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        GetItemByID(id).then((res) => {
            setData(res.data);
        });
    }, [id]);

    const modules = {
        toolbar: false,
    };

    // Definidos dados do formulário e função onSubmit
    const formik = useFormik({
        initialValues: {
            resposta: '',
            nota_obtida: '0',
            item: id,
        },
        validationSchema: Yup.object({
            resposta: Yup.string().required('É obrigatório fornecer uma reposta.'),
        }),
        onSubmit: (values) => {
            // Cadastrando resposta na API
            AnswerItem(values)
                .then(() => {
                    navigate(`/item/${id}/respostas/`);
                    localStorage.setItem('ifsolve_success_alert', 'Sua resposta foi registrada.');
                })
                .catch(() => {
                    toast.error('Não foi possivel registrar sua resposta.');
                });
        },
    });

    return (
        <div className="min-h-screen bg-dark-5 py-5">
            <Container className="flex flex-col gap-4" style={{ maxWidth: '720px' }}>
                <div className="flex flex-row items-center gap-4 w-full">
                    <button
                        type="button"
                        className="flex items-center justify-center w-8 h-8 bg-dark-10 rounded-full cursor-pointer hover:bg-dark-20"
                        onClick={() => navigate(-1)}
                    >
                        <FiArrowLeft />
                    </button>
                </div>

                <div className="bg-white p-4 rounded-lg">
                    <h1 className="text-3xl font-medium">{getData.titulo}</h1>
                    <ReactQuill
                        className="border-0 mb-4 text-lg font-medium"
                        modules={modules}
                        value={getData.enunciado}
                        readOnly
                    />
                </div>

                <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
                    <div className="bg-white p-4 rounded-lg">
                        {getData.tipo === 'ME' ? (
                            <div className="flex flex-col gap-2">
                                {getData.alternativa_a &&
                                getData.alternativa_a.texto !== (undefined || null || '') ? (
                                    <Label>
                                        <input
                                            type="radio"
                                            value="A"
                                            name="resposta"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {getData.alternativa_a.texto}
                                    </Label>
                                ) : null}
                                {getData.alternativa_b &&
                                getData.alternativa_b.texto !== (undefined || null || '') ? (
                                    <Label>
                                        <input
                                            type="radio"
                                            value="B"
                                            name="resposta"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {getData.alternativa_b.texto}
                                    </Label>
                                ) : null}
                                {getData.alternativa_c &&
                                getData.alternativa_c.texto !== (undefined || null || '') ? (
                                    <Label>
                                        <input
                                            type="radio"
                                            value="C"
                                            name="resposta"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {getData.alternativa_c.texto}
                                    </Label>
                                ) : null}
                                {getData.alternativa_d &&
                                getData.alternativa_d.texto !== (undefined || null || '') ? (
                                    <Label>
                                        <input
                                            type="radio"
                                            value="D"
                                            name="resposta"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {getData.alternativa_d.texto}
                                    </Label>
                                ) : null}
                                {getData.alternativa_e &&
                                getData.alternativa_e.texto !== (undefined || null || '') ? (
                                    <Label>
                                        <input
                                            type="radio"
                                            value="E"
                                            name="resposta"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {getData.alternativa_e.texto}
                                    </Label>
                                ) : null}
                            </div>
                        ) : (
                            <input
                                name="resposta"
                                type="text"
                                className="w-full"
                                onChange={formik.handleChange}
                                value={formik.values.resposta}
                                placeholder="Escreva sua resposta"
                            />
                        )}

                        {formik.errors.resposta && formik.touched.resposta ? (
                            <span className="text-red-500">{formik.errors.resposta}</span>
                        ) : null}
                    </div>

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
                            onClick={() => navigate(-1)}
                        >
                            {' '}
                            Voltar{' '}
                        </button>
                    </div>
                </form>
            </Container>
            <Toaster />
        </div>
    );
}

function Label({ children }) {
    return (
        <label className="w-full flex flex-row gap-2 px-4 py-2 border border-dark-5 rounded-lg hover:bg-dark-5">
            {children}
        </label>
    );
}

Label.propTypes = {
    children: PropTypes.node.isRequired,
};
