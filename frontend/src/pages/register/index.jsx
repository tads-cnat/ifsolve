import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FiAlertCircle } from "react-icons/fi";
import toast, { Toaster } from 'react-hot-toast';
import LoginBackground from "../../images/login-background.png"
import { PassowordInput, PrimaryButton } from "../../components";
import { AlunoRegister, ElaboradorRegister } from "../../api/config";

export default function Register() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            nome_completo: "",
            username: "",
            password: "",
            email: "",
            data_nascimento: "",
            tipo: "",
        },
        validationSchema: Yup.object({
            nome_completo: Yup.string().min(4, "Nome completo precisa ter no mínimo 4 caracteres.").required("Nome completo é obrigatório."),
            username: Yup.string().min(4, "Nome de usuário precisa ter no mínimo 4 caracteres.").trim('Nome de usuário não pode conter espaços').strict(true).required("Nome de usuário é obrigatório."),
            email: Yup.string().email('Formato de email inválido.').required('Email é obrigatório.'),
            password: Yup.string().min(8, "Senha deve ter no mínimo 8 caracteres.").required("Senha é obrigatório."),
            data_nascimento: Yup.date("Data inválida").required("Digite uma data de nascimento válida."),
            tipo: Yup.string().required("Tipo é obrigatório."),
        }),
        onSubmit: data => {
            if (data.tipo === "elaborador") {
                ElaboradorRegister(data)
                    .then((res) => {
                        navigate("/", { replace: true });
                        localStorage.setItem('ifsolve_success_alert', "Sua conta foi criada com sucesso.");
                    })
                    .catch(error => {
                        console.log(error);
                        toast.error("Não foi possivel criar sua conta.")
                    })
            }
            else {
                AlunoRegister(data).then((res) => {
                    navigate("/", { replace: true })
                    localStorage.setItem("ifsolve_success_alert", "Sua conta foi criada com sucesso.");
                }).catch(error => {
                    toast.error("Não foi possivel criar sua conta.")
                });
            }
        },
    })

    return (
        <div className="sm:container mx-auto grid grid-cols-1 lg:grid-cols-2">
            <img src={LoginBackground} alt="" className="hidden lg:block fixed h-screen w-1/2 object-cover top-0 right-0" />
            <div className="flex flex-col h-screen px-8 md:px-24">
                <form onSubmit={formik.handleSubmit} className="py-8">
                    <h1 className="text-5xl font-bold text-dark-100 pb-5">Criar nova conta</h1>
                    <FormArea>
                        <FormLabel>Nome completo</FormLabel>
                        <FormInput
                            type="text"
                            name="nome_completo"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.nome_completo}
                            placeholder="Digite seu nome completo"
                        />
                        {formik.errors.nome_completo && formik.touched.nome_completo ? <FormAlert> {formik.errors.nome_completo}</FormAlert> : null}
                    </FormArea>
                    <FormArea>
                        <FormLabel>Nome de usuário</FormLabel>
                        <FormInput
                            type="text"
                            name="username"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.username}
                            placeholder="Digite seu nome de usuário"
                        />
                        {formik.errors.username && formik.touched.username ? <FormAlert> {formik.errors.username}</FormAlert> : null}

                    </FormArea>

                    <FormArea>
                        <FormLabel>Email</FormLabel>
                        <FormInput
                            type="text"
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            placeholder="Digite seu email"
                        />
                        {formik.errors.email && formik.touched.email ? <FormAlert> {formik.errors.email}</FormAlert> : null}
                    </FormArea>

                    <FormArea>
                        <FormLabel>Senha</FormLabel>
                        <PassowordInput
                            name="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                        />
                        {formik.errors.password && formik.touched.password ? <FormAlert> {formik.errors.password}</FormAlert> : null}
                    </FormArea>

                    <FormArea>
                        <FormLabel>Data de nascimento</FormLabel>
                        <FormInput
                            type="date"
                            name="data_nascimento"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.data_nascimento}
                        />
                        {formik.errors.data_nascimento && formik.touched.data_nascimento ? <FormAlert> {formik.errors.data_nascimento}</FormAlert> : null}
                    </FormArea>

                    <div className="mb-5">
                        <FormLabel>Tipo da conta</FormLabel>
                        <div className="grid grid-cols-2 gap-4 ">
                            <FormRadio
                                label="Elaborador"
                                descripton="Elabore e disponibilize questões para seus alunos."
                                name="tipo"
                                value="elaborador"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <FormRadio
                                label="Aluno"
                                descripton="Responda testes e itens de plataforma."
                                name="tipo"
                                value="aluno"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        {formik.errors.tipo && formik.touched.tipo ? <FormAlert> {formik.errors.tipo}</FormAlert> : null}
                    </div>

                    <PrimaryButton type="submit" className="w-full mb-5">Criar conta</PrimaryButton>
                    <span>Tem uma conta? <Link to="/" className="text-primary-100 font-medium">Conecte-se</Link></span>
                </form>
            </div>
            <Toaster />
        </div>
    )
}
export function FormInput(props) {
    return (
        <input
            type={props.type}
            name={props.name}
            className="w-full px-4 py-2 border border-dark-20 rounded-lg hover:bg-dark-5 focus:outline focus:outline-4 focus:outline-primary-20 focus:bg-primary-5 transition-all duration-200"
            onChange={props.onChange}
            onBlur={props.onBlur}
            value={props.value}
            placeholder={props.placeholder}
        />
    )
}

export function FormArea(props) {
    return (
        <div className="mb-5">
            {props.children}
        </div>
    )
}

export function FormLabel(props) {
    return (
        <label className="text-sm font-medium text-dark-100">{props.children}</label>
    )
}

export function FormAlert(props) {
    return (
        <div className="flex text-sm font-medium text-rose-500 items-center gap-2 my-2">
            <FiAlertCircle />
            <span> {props.children}</span>
        </div>
    )
}

export function FormRadio(props) {
    return (
        <label className="flex border border-dark-10 px-4 py-2 gap-4 rounded-lg">
            <input name="tipo" type="radio" value={props.value} onChange={props.onChange} onBlur={props.onBlur} />
            <div className="flex flex-col justify-center">
                <p className="text-lg font-medium">{props.label}</p>
                <p>{props.descripton}</p>
            </div>
        </label>
    )
}