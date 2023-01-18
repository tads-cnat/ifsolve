import { loginApi } from "../../api/config";
import { FormLabel, FormControl, GlobalAlert } from "../../components";
import { Formik, Form } from "formik";
import LoginBackground from "../../images/login-background.png"
import { Link, Navigate, useNavigate } from "react-router-dom";
import IFSolvelogo from "../../images/IFSolve-logo.svg";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import * as Yup from "yup";

export default function Login() {
    const navigate = useNavigate();
    const [getPassword, setPassword] = useState(true);
    const [getError, setError] = useState();

    const LoginSchema = Yup.object().shape({
        login: Yup.string().required(),
        password: Yup.string().required(),
    })

    const initialValues = {
        login: "",
        password: "",
    }

    async function formSubmit(data) {
        await loginApi(data)
            .then((res) => {
                localStorage.setItem('ifsolve_token', res.data.token)
                localStorage.setItem('ifsolve_user', JSON.stringify(res.data))
                navigate("/item");
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    setError("Usuário e/ou senha inválidos");
                }
            })
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12">
            <img src={LoginBackground} alt="" className="hidden lg:block fixed h-screen w-7/12 object-cover top-0 right-0" />
            <div className="col-span-5 flex flex-col justify-center h-screen px-8 md:px-24">
                <img className="h-6 mb-12 self-start" src={IFSolvelogo} alt="" />

                <Formik initialValues={initialValues} validationSchema={LoginSchema} onSubmit={formSubmit}>
                    {({ values, errors, touched }) =>
                        <Form >
                            <h1 className="text-xl font-bold text-dark-100 mb-5">Entrar no IFSolve</h1>

                            <div className="mb-5">
                                <FormLabel label="Email ou usuário"></FormLabel>
                                <FormControl name="login" placeholder="Digite seu email ou nome de usuário" />
                                {errors.login && touched.login ? <div className="">{errors.login}</div> : null}
                            </div>
                            <div className="mb-5">
                                <FormLabel label="Senha"></FormLabel>
                                <div className="relative">
                                    <FormControl name="password" className="pr-32" type={getPassword ? "password" : "text"} placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;" />
                                    {values.password.trim().length > 0 ?
                                        <i className="absolute bottom-2/4 translate-y-2/4 right-0 mr-4 text-sm px-2 py-1 hover:bg-dark-5 rounded-lg cursor-pointer" onClick={e => setPassword(!getPassword)}>
                                            {getPassword ? <FiEye></FiEye> : <FiEyeOff></FiEyeOff>}
                                        </i>
                                        :
                                        null}
                                </div>
                                {errors.password && touched.password ? <div className="">{errors.password}</div> : null}

                            </div>
                            {getError ? getError : null}
                            <button type="submit" className="w-full bg-primary-100 px-4 py-2 rounded-lg text-md font-medium text-dark-100 mb-5">Entrar</button>
                        </Form>
                    }
                </Formik>
                <span>Não tem uma conta? <Link to="/registro" className="font-medium text-primary-100">Cadastre-se</Link></span>
                {localStorage.getItem("ifsolve_token") !== null ? <Navigate to="/item" replace={true}></Navigate> : null}

            </div>
            <GlobalAlert></GlobalAlert>
        </div>
    )
}