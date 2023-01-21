import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useNavigate, useParams } from "react-router-dom";
import { AnswerItem, GetItemByID } from "../../api/config";
import { Container } from "../../components";
import { useFormik } from 'formik';
import * as Yup from "yup";


export default function ResponderItem(props) {
    const { id } = useParams();
    const [getData, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        GetItemByID(id).then(res => {
            // console.log(res.data);
            setData(res.data)
        })
    }, [id])

    const modules = {
        toolbar: false
    }

    // Definidos dados do formulário e função onSubmit
    const formik = useFormik({
        initialValues: {
            resposta: "",
            nota_obtida: "0",
            item: id,
        },
        validationSchema: Yup.object({
            resposta: Yup.string().required("É obrigatório fornecer uma reposta."),
        }),
        onSubmit: values => {
            // Cadastrando resposta na API
            AnswerItem(values).then(
                res => {
                    console.log(res)
                    navigate(`/item/${id}/resposta`)
                }
            )
        },
    });


    return (
        <div className="min-h-screen bg-dark-5 py-5">
            <Container className="">
                <div className="flex flex-col gap-4 mx-auto bg-white px-8 py-4 rounded-lg mb-4" style={{ maxWidth: "720px" }}>
                    <h1 className="text-3xl font-medium">{getData.titulo}</h1>
                    <ReactQuill className="border-0 mb-4 text-lg font-medium" modules={modules} value={getData.enunciado} readOnly={true}></ReactQuill>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <div className="flex flex-col gap-4 mx-auto bg-white px-8 py-4 rounded-lg mb-4" style={{ maxWidth: "720px" }}>
                        {getData.tipo === "ME" ?
                            <div className="flex flex-col">

                                {getData.alternativa_a && getData.alternativa_a.texto !== (undefined || null || "") ?
                                    <label>
                                        <input type="radio" value="A" name="resposta" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                        {getData.alternativa_a.texto}
                                    </label>
                                    : null}
                                {getData.alternativa_b && getData.alternativa_b.texto !== (undefined || null || "") ?
                                    <label>
                                        <input type="radio" value="B" name="resposta" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                        {getData.alternativa_b.texto}
                                    </label>
                                    : null}
                                {getData.alternativa_c && getData.alternativa_c.texto !== (undefined || null || "") ?
                                    <label>
                                        <input type="radio" value="C" name="resposta" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                        {getData.alternativa_c.texto}
                                    </label>
                                    : null}
                                {getData.alternativa_d && getData.alternativa_d.texto !== (undefined || null || "") ?
                                    <label>
                                        <input type="radio" value="D" name="resposta" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                        {getData.alternativa_d.texto}
                                    </label>
                                    : null}
                                {getData.alternativa_e && getData.alternativa_e.texto !== (undefined || null || "") ?
                                    <label>
                                        <input type="radio" value="E" name="resposta" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                        {getData.alternativa_e.texto}
                                    </label>
                                    : null}

                            </div>

                            :
                            <input
                                name="resposta"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.resposta}
                                placeholder="Resposta"
                            />
                        }

                        {formik.errors.resposta && formik.touched.resposta ? <span className="text-red-500">{formik.errors.resposta}</span> : null}
                    </div>
                    <div className="flex flex-row gap-4">
                        <button type="submit">Submit</button>
                        <button type="buttun" onClick={e=>navigate(-1)}> Voltar </button>
                    </div>
                </form>

            </Container>

        </div>
    )
}
