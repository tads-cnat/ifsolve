import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { FiArrowLeft, FiUser } from "react-icons/fi";
import ReactQuill from "react-quill";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from 'react-hot-toast';
import { GetAlunoById, GetAlunos, GetAvaliacaoDetails, GetAvaliacaoRespostasByAluno, GetItemByID, PatchResposta } from "../../api/config";

export default function AvaliacaoRespostas() {
    const { id } = useParams();
    const [getAvalicao, setAvaliacao] = useState(null);
    const [getAlunos, setAlunos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        GetAvaliacaoDetails(id).then(res => {
            setAvaliacao(res.data);
            // console.log(res.data);
        });

        GetAlunos().then(res => {
            setAlunos(res.data);
        });

    }, [id]);

    return (
        <div className="bg-dark-5 min-h-screen flex flex-col items-center">
            <div className="container flex flex-col gap-4 py-8 px-4 items-center" style={{ maxWidth: "720px" }}>
                <div className="flex flex-row items-center gap-4 w-full">
                    <div className="flex items-center justify-center w-8 h-8 bg-dark-10 rounded-full cursor-pointer hover:bg-dark-20" onClick={e => navigate(-1)}><FiArrowLeft /></div>
                    Voltar
                </div>
                {getAvalicao !== null ?
                    <>
                        <GroupContent>
                            <h2 className="text-2xl text-dark-100 font-medium">{getAvalicao.avaliacao.titulo}</h2>
                            <h3 className="text-dark-80">{getAvalicao.avaliacao.descricao}</h3>
                        </GroupContent>

                        <GroupContent>
                            <h2>Respostas</h2>
                            {getAvalicao.avaliacao.alunos.map((aluno, i) =>
                                <AlunoRespostas key={i} avaliacao={id} aluno={getAlunos.find(alunos => alunos.id === aluno)} items={getAvalicao.itens} />
                            )}
                        </GroupContent>
                    </>
                    : null
                }
                <button className="px-4 py-2 rounded-lg hover:bg-dark-10" onClick={e => navigate(-1)}>Voltar</button>
            </div>
        </div>
    )
}

function GroupContent(props) {
    return (
        <div className="flex flex-col w-full bg-white p-6 gap-4 rounded-lg">{props.children}</div>
    )
}

function AlunoRespostas({ avaliacao, aluno, items }) {
    const [getRespostas, setRespostas] = useState(null);

    console.log(avaliacao);
    console.log(aluno);

    useEffect(() => {
        if (aluno) {
            GetAvaliacaoRespostasByAluno(avaliacao, aluno.id).then(res => {
                console.log(res.data);
                setRespostas(res.data.resposta);
            })
        }
    }, [aluno, avaliacao]);

    return (
        aluno !== undefined ?
            <div className="flex flex-col gap-6 p-4 bg-dark-5 rounded-lg">
                {/* Dados do usuário */}
                <div className="flex flex-row items-center gap-2">
                    <div className="flex items-center justify-center bg-dark-40 rounded-full w-10 h-10">
                        <FiUser />
                    </div>
                    <div className="div">
                        <h5 className="text-sm text-dark-100 font-medium uppercase">{aluno.username}</h5>
                        <p className="text-sm text-dark-80">{aluno.email}</p>

                    </div>
                </div>
                {/* Dados do usuário */}

                {/* Lista de respostas */}
                {getRespostas && getRespostas.respostas.length > 0 ?
                    getRespostas.respostas.map((resposta, i) =>
                        <RespostaForm key={i} resposta={resposta} itemAvaliacao={items.find(items => items.id === resposta.item_avaliacao)} />
                    )
                    : "Nenhuma resposta encontrada"
                }
                {/* Lista de respostas */}
            </div >
            : null
    )
}

function RespostaForm({ resposta, itemAvaliacao }) {
    const [getItem, setItem] = useState(null)
    // console.log(resposta);
    const formik = useFormik({
        initialValues: {
            nota_obtida: resposta.nota_obtida ? resposta.nota_obtida : 0
        },
        validationSchema: Yup.object({
            nota_obtida: Yup.number().min(0, "Nota mínima: 0(zero)").max(itemAvaliacao.nota_item, `Nota máxima: ${itemAvaliacao.nota_item}`)
        }),
        onSubmit: data => {
            PatchResposta(resposta.id, data.nota_obtida).then(res => {
                console.log(res.data);
                toast.success('Nota salva com sucesso!');
                formik.setTouched({});
            }).catch(error => {
                toast.error('Não foi possível salvar a nota. 😬')
            })
        }
    })

    const modules = {
        toolbar: false
    }

    useEffect(() => {
        GetItemByID(itemAvaliacao.item).then(res => {
            setItem(res.data)
        })
    }, [itemAvaliacao]);

    return (
        <div>
            {/* Informações do item */}
            {getItem !== null ?
                <div>
                    <h2 className="text-lg text-dark-100 font-medium">{getItem.titulo}</h2>
                    <ReactQuill className="border-0 mb-4 text-lg font-medium" modules={modules} value={getItem.enunciado} readOnly />
                    <h4 className="text-dark-80 font-medium">Expectativa de resposta:</h4>
                    {getItem.tipo === "ME" ?
                        <p>{getItem.alternativa_correta}</p>
                        :
                        <p>{getItem.expectativa_resposta}</p>
                    }
                </div>
                : null
            }
            {/* Informações do item */}

            <form onSubmit={formik.handleSubmit}>

                <div className="bg-dark-10 p-4 rounded-lg">
                    <div className="flex flex-row items-center justify-between">
                        <h4 className="text-dark-80 font-medium">Resposta:</h4>
                        <label>
                            <input
                                type="number"
                                name="nota_obtida"
                                className="bg-transparent border-b border-dark-100"
                                value={formik.values.nota_obtida}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                min="0"
                                max={itemAvaliacao.nota_item}
                            /> / {itemAvaliacao.nota_item}
                        </label>
                    </div>
                    {resposta !== null ?
                        <div className="">
                            <p>{resposta.resposta}</p>
                        </div>
                        : null
                    }
                </div>
                {formik.errors.nota_obtida && formik.touched.nota_obtida ? <p className="text-red-500">{formik.errors.nota_obtida}</p> : null}
                {formik.touched.nota_obtida && !formik.errors.nota_obtida ? <button type="submit" className="w-full px-4 py-2 bg-primary-80 font-medium rounded-lg  mt-4">Salvar</button> : null}
            </form>
            <Toaster />
        </div>
    )
}