import { Formik, Form, Field, useFormik } from "formik";
import { FiAlertCircle } from "react-icons/fi";
import * as Yup from "yup";
import PassowordInput from "../passwordInput";
import PrimaryButton from "../primaryButton";

export default function RegisterForm(props) {

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
            data_nascimento: Yup.date().required("Data de nascimento é obrigatório."),
            tipo: Yup.string().required("Tipo é obrigatório."),
        }),
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
            // props.onSubmit(values);
        },
    })

    return (
        <div className="">
            <h1 className="text-5xl font-bold text-dark-100 mb-5">Criar nova conta</h1>

            <form onSubmit={formik.handleSubmit}>
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
                            value="Elaborador"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <FormRadio
                            label="Aluno"
                            descripton="Responda testes e itens de plataforma."
                            name="tipo"
                            value="Aluno"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    {formik.errors.tipo && formik.touched.tipo ? <FormAlert> {formik.errors.tipo}</FormAlert> : null}
                </div>
                <PrimaryButton className="w-full">Criar conta</PrimaryButton>
            </form>
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
        <div className="flex border border-dark-10 px-4 py-2 gap-4 rounded-lg">
            <input name="tipo" type="radio" value={props.value} onChange={props.onChange} onBlur={props.onBlur} />
            <div className="flex flex-col justify-center">
                <label className="text-lg font-medium">{props.label}</label>
                <p>{props.descripton}</p>
            </div>
        </div>
    )
}