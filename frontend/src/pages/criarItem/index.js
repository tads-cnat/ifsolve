import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TagInput, FormControl, InputGroup, PrimaryButton, FormLabel, SelectInput } from "../../components";
import { PostItemDI, PostItemME, GetAreas } from "../../api/config";
import { Formik, Field, Form, FieldArray } from "formik";

// React Quill
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { FiArrowLeft, FiX } from "react-icons/fi";

export default function CriarItem() {
    const navigate = useNavigate();
    const [getTags, setTags] = useState([]);
    const [getTipo, setTipo] = useState("ME");
    const [quillValue, setQuillValue] = useState('');
    const [getAreas, setAreas] = useState();
    const [getSelectedArea, setSelectedArea] = useState(1);

    const initialValues = {
        titulo: "",
        enunciado: "",
        assunto: "",
        area: "",
        expectativa_resposta: "",
        alternativa_correta: "",
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
    };

    useEffect(() => {
        GetAreas().then((res) => {
            setAreas(res.data)
        })
    }, [])

    function formSubmit(data) {
        data.tags = getTags;
        data.enunciado = quillValue;
        data.tipo = getTipo;
        data.area = getSelectedArea;
        if (data.tipo === "ME") {
            PostItemME(data).then(navigate("/item"));
        }
        else {
            PostItemDI(data).then(navigate("/item"));
        }
    }

    return (
        <div className="sm:container mx-auto px-8 md:px-24 lg:px-64 xl:px-80">
            <div className="flex gap-4 items-center py-4">
                <button className="w-8 h-8 flex items-center justify-center bg-dark-5 rounded-full" onClick={() => navigate(-1)}><FiArrowLeft></FiArrowLeft></button>
                <h2 className="text-3xl">Nova questão</h2>

            </div>
            <Formik
                initialValues={initialValues}
                onSubmit={formSubmit}
            >
                {({ values }) =>
                    <Form>
                        <div className="mb-3">
                            <FormLabel label="Título"></FormLabel>
                            <FormControl name="titulo" placeholder="Título da questão" />
                        </div>

                        <div className="mb-3">
                            <FormLabel label="Enunciado"></FormLabel>
                            <ReactQuill theme="snow" value={quillValue} onChange={setQuillValue}></ReactQuill>
                        </div>

                        <div className="mb-3">
                            <FormLabel label="Áreas"></FormLabel>
                            <select onChange={(e) => { setSelectedArea(e.target.value) }} className="w-full rounded-lg px-4 py-2 border border-dark-10 focus:outline-5 focus:outline-primary-100 text-sm font-medium text-dark-60">
                                {getAreas !== undefined ?
                                    getAreas.map((item, i) =>
                                        <option key={i} value={item.id}>{item.nome}</option>
                                    )
                                    : null}
                            </select>
                        </div>

                        <div className="mb-3">
                            <FormLabel label="Tipo de questão"></FormLabel>
                            <SelectInput data={[{ "value": "ME", "title": "Multipla escolha" }, { "value": "DI", "title": "Discursiva" }]} onChange={(e) => { setTipo(e.target.value) }}></SelectInput>
                        </div>

                        {getTipo === "ME" ?
                            <FieldArray name="alternativas">
                                {({ insert, remove, push }) => (
                                    <div className="mb-3">
                                        <div className="">
                                            {values.alternativas.length > 0 && values.alternativas.map((alternativa, i) =>
                                                <div key={i} className="mb-3">
                                                    <FormLabel label={i + 1 + " º Alternativa"}></FormLabel>
                                                    <FormControl name={`alternativas.${i}.texto`} placeholder="texto"></FormControl>
                                                    <FormControl name={`alternativas.${i}.justificativa`} placeholder="justificativa"></FormControl>
                                                    {values.alternativas.length > 2 ?
                                                        <button onClick={() => remove(i)}><FiX /></button>
                                                        : null
                                                    }
                                                </div>
                                            )}
                                        </div>
                                        {values.alternativas.length < 5 ?
                                            <button type="button" onClick={() => push({ texto: '', justificativa: '' })}> Adicionar alternativa</button>
                                            : null
                                        }

                                        <div className="mb-3">
                                            <FormLabel label="Alternativa correta"></FormLabel>
                                            <Field as="select" defaultValue="a" name="alternativa_correta" >
                                                <option value="" selected disabled hidden>Escolhar a alternativa correta</option>
                                                {values.alternativas.map((alternativa, i) =>
                                                    <option key={i} value={(i + 10).toString(36)}>{(i + 10).toString(36)}</option>
                                                )}
                                            </Field>
                                        </div>
                                    </div>
                                )}

                            </FieldArray>
                            :
                            <div className="mb-3">
                                <FormLabel label="Resposta esperada"></FormLabel>
                                <FormControl name="expectativa_resposta" placeholder="Resposta da questão" />
                            </div>
                        }

                        <InputGroup label="3. Informações adicionais">
                            <div className="mb-3">
                                <FormLabel label="Assunto"></FormLabel>
                                <FormControl name="assunto" placeholder="Digite aqui o assunto" />
                            </div>
                            <div className="mb-3">
                                <FormLabel label="Tags"></FormLabel>
                                <TagInput get={getTags} set={setTags}></TagInput>
                            </div>
                        </InputGroup>

                        <div className="flex gap-5">
                            <PrimaryButton type="submit">Cadastrar</PrimaryButton>
                            <button className="px-4 py-2 bg-dark-5 rounded-lg" onClick={() => navigate(-1)}>Cancelar</button>
                        </div>
                    </Form>
                }

            </Formik>
        </div>
    )
}