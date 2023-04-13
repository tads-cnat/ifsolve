import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TagInput } from "../../components";
import { PostItemDI, PostItemME, GetAreas } from "../../api/config";
import { FieldArray, useFormik, FormikProvider } from "formik";
import * as Yup from "yup";

// React Quill
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { FiAlertCircle, FiArrowLeft, FiPlus, FiTrash, FiX } from "react-icons/fi";
import { toast, Toaster } from "react-hot-toast";

export default function CriarItem() {
    const navigate = useNavigate();
    const [getTags, setTags] = useState([]);
    const [quillValue, setQuillValue] = useState('');
    const [getAreas, setAreas] = useState();
    // const [getSelectedArea, setSelectedArea] = useState(1);

    useEffect(() => {
        GetAreas().then((res) => {
            setAreas(res.data)
        })
    }, [])

    const formik = useFormik({
        initialValues: {
            titulo: "",
            enunciado: "",
            assunto: "",
            area: "",
            tipo: "ME",
            expectativa_resposta: "",
            alternativa_correta: "a",
            alternativas: [
                {
                    texto: "",
                    justificativa: "",
                },
                {
                    texto: "",
                    justificativa: "",
                }
            ],
        },
        validationSchema: Yup.object({
            titulo: Yup.string().required("Título é um campo obrigatório."),
            assunto: Yup.string().required("Assunto é um campo obrigatório."),
            expectativa_resposta: Yup.string().when("tipo", { is: "DI", then: Yup.string().required("É obrigatório cadastar uma resposta.") }),
        }),
        onSubmit: data => {
            data.tags = getTags;
            data.enunciado = quillValue;
            if (data.tipo === "ME") {
                PostItemME(data).then(res => {
                    navigate("/item");
                    localStorage.setItem('ifsolve_success_alert', "Item criado com sucesso.");
                }).catch(error => {
                    console.log(error);
                    toast.error("Opss...Erro ao cadastrar o item.")
                })
            }
            else {
                PostItemDI(data).then(res => {
                    navigate("/item");
                    localStorage.setItem('ifsolve_success_alert', "Item criado com sucesso.");
                }).catch(error => {
                    console.log(error);
                    toast.error("Opss...Erro ao cadastrar o item.")
                })
            }
        },
    })

    return (
        <div className="w-full min-h-screen flex flex-col items-center bg-dark-5 pt-4 pb-8 gap-4">
            <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit} className="container flex flex-col py-8 gap-8" style={{ maxWidth: "720px" }}>
                    {/* Header */}
                    <div className="flex gap-4 items-center py-4">
                        <button type="button" className="flex items-center justify-center w-8 h-8 bg-dark-10 rounded-full cursor-pointer hover:bg-dark-20" onClick={() => navigate(-1)}><FiArrowLeft /></button>
                        <h2 className="text-2xl font-medium text-dark-100">Nova questão</h2>
                    </div>
                    {/* Header */}

                    {/* Form */}
                    <div className="w-full flex flex-col bg-white mx-auto px-8 py-8 rounded-lg gap-8">
                        {/* Titulo */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="">Titulo</label>
                            <input
                                type="text"
                                name="titulo"
                                value={formik.values.titulo}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                className="px-6 py-4 bg-dark-5 rounded-lg"
                                placeholder="Digite o titulo da questão"
                            />
                            {formik.errors.titulo && formik.touched.titulo ? <Alert>{formik.errors.titulo}</Alert> : null}
                        </div>
                        {/* Titulo */}

                        {/* Enunciado */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="">Enunciado</label>
                            <ReactQuill theme="snow" value={quillValue} onChange={setQuillValue} />
                            {formik.errors.enunciado && formik.touched.enunciado ? <Alert>{formik.errors.enunciado}</Alert> : null}
                        </div>
                        {/* Enunciado */}

                        <div className="grid grid-cols-2 gap-4">


                            {/* Área */}
                            <div className="flex flex-col gap-2">
                                <label>Área</label>
                                <select
                                    className="px-6 py-4 bg-dark-5 rounded-lg"
                                    name="area"
                                    value={formik.values.area}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                >
                                    {getAreas !== undefined ?
                                        getAreas.map((item, i) =>
                                            <option key={i} value={item.id}>{item.nome}</option>
                                        )
                                        : null
                                    }
                                </select>
                                {formik.errors.area && formik.touched.area ? <Alert>{formik.errors.area}</Alert> : null}
                            </div>
                            {/* Área */}

                            {/* Tipo */}
                            <div className="flex flex-col gap-2">
                                <label>Tipo</label>
                                <select
                                    className="px-6 py-4 bg-dark-5 rounded-lg"
                                    name="tipo"
                                    value={formik.values.tipo}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                >
                                    <option value="DI">
                                        Discursiva
                                    </option>
                                    <option value="ME">
                                        Multipla escolha
                                    </option>
                                </select>
                                {formik.errors.tipo && formik.touched.tipo ? <Alert>{formik.errors.tipo}</Alert> : null}
                            </div>
                            {/* Tipo */}
                        </div>

                        {/* Assunto */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="">Assunto</label>
                            <input
                                type="text"
                                name="assunto"
                                className="px-6 py-4 bg-dark-5 rounded-lg"
                                placeholder="Digite o assunto da questão"
                                value={formik.values.assunto}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.assunto && formik.touched.assunto ? <Alert>{formik.errors.assunto}</Alert> : null}
                        </div>
                        {/* Assunto */}

                        <div className="flex flex-col gap-2">
                            <label>Tags</label>
                            <TagInput get={getTags} set={setTags} />
                        </div>
                    </div>

                    {formik.values.tipo === "ME" ?
                        <FieldArray
                            name="alternativas"
                            render={(arrayHelpers) => (
                                <>
                                    {formik.values.alternativas.map((alternativa, index) => (
                                        <div key={index} className="w-full flex flex-col bg-white mx-auto px-8 py-8 rounded-lg gap-2 relative">
                                            <div className="flex flex-col gap-2">
                                                <h2 className="text-lg text-dark-80 font-medium">Alternativa {(index + 10).toString(36)}</h2>
                                                <label>Texto</label>
                                                <input
                                                    name={`alternativas[${index}].texto`}
                                                    className="px-6 py-4 bg-dark-5 rounded-lg"
                                                    placeholder="Digite o texto da alternativa"
                                                    value={formik.values.alternativas[index].texto}
                                                    onChange={formik.handleChange}
                                                />

                                                <label>Justificativa</label>
                                                <input
                                                    name={`alternativas.${index}.justificativa`}
                                                    className="px-6 py-4 bg-dark-5 rounded-lg"
                                                    placeholder="Digite a justificativa da alternativa"
                                                    value={formik.values.alternativas[index].justificativa}
                                                    onChange={formik.handleChange}
                                                />
                                            </div>
                                            {formik.values.alternativas.length > 2 ?
                                                <button
                                                    type="button"
                                                    className="absolute top-0 left-full rounded-full p-2 border border-red-100 bg-red-100 -translate-y-1/2 -translate-x-1/2"
                                                    onClick={() => arrayHelpers.remove(index)}><FiTrash /></button>
                                                : null
                                            }

                                        </div>
                                    ))}
                                    {formik.values.alternativas.length < 5 ?
                                        <button type="button" className="flex flex-row items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-dark-20 rounded-lg text-sm text-dark-80 font-medium hover:bg-dark-10" onClick={() => arrayHelpers.push({ texto: "", justificativa: "" })}>
                                            <FiPlus />Adicionar alternativa
                                        </button>
                                        : null
                                    }
                                    <div className="w-full flex flex-col bg-white mx-auto px-8 py-8 rounded-lg gap-2 relative">
                                        <h2 className="text-lg text-dark-80 font-medium">Alternativa correta</h2>
                                        <select
                                            className="px-6 py-4 bg-dark-5 rounded-lg"
                                            name="alternativa_correta"
                                            value={formik.values.alternativa_correta}
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                        >
                                            {formik.values.alternativas.map((alternativa, i) => (
                                                <option key={i} value={(i + 10).toString(36)}>Alternativa {(i + 10).toString(36)}</option>
                                            ))}
                                        </select>
                                        {formik.errors.alternativa_correta && formik.touched.alternativa_correta ? <Alert>{formik.errors.alternativa_correta}</Alert> : null}

                                    </div>
                                </>
                            )}
                        />
                        :
                        <div className="w-full flex flex-col bg-white mx-auto px-8 py-8 rounded-lg gap-2">
                            <label htmlFor="">Expectativa de resposta</label>
                            <input
                                type="text"
                                name="expectativa_resposta"
                                className="px-6 py-4 bg-dark-5 rounded-lg"
                                placeholder="Digite a resposta da questão"
                                value={formik.values.expectativa_resposta}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.expectativa_resposta && formik.touched.expectativa_resposta ? <Alert>{formik.errors.expectativa_resposta}</Alert> : null}
                        </div>
                    }
                    <div className="container flex flex-row mx-auto justify-start gap-4">
                        <button type="submit" className="bg-primary-100 px-6 py-2 rounded-lg font-medium text-dark-100">Cadastrar</button>
                        <button type="button" onClick={(e) => navigate(-1)}>Voltar</button>
                    </div>
                </form>
            </FormikProvider>
            <Toaster />
        </div >
    )
}

export function Alert(props) {
    return (
        <p className="flex items-center gap-2 text-sm text-red-800 bg-red-100 px-4 py-2 rounded-lg"><FiAlertCircle />{props.children}</p>
    )
}