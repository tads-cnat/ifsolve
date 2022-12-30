import { useContext } from "react";
import { loginApi } from "../../api/config";
import { GlobalContext } from "../../providers/context";
import { FormLabel, FormControl } from "../../components";
import { Formik, Field, Form } from "formik";
import LoginBackground from "../../images/login-background.png"
import { Link, Navigate } from "react-router-dom";

export default function Login() {
    const { getAccess, setAccess, setUser } = useContext(GlobalContext)
    const initialValues = {
        login: "",
        password: "",
    }

    function formSubmit(data) {
        loginApi(data, setAccess, setUser);
    }

    return (
        <div className="sm:container mx-auto grid grid-cols-1 lg:grid-cols-2">
            <img src={LoginBackground} alt="" className="hidden lg:block fixed h-screen w-1/2 object-cover top-0 right-0" />
            <div className="flex flex-col justify-center h-screen px-8 md:px-24">

                <Formik initialValues={initialValues} onSubmit={formSubmit}>
                    {({ values }) =>
                        <Form >
                            <h1>login</h1>
                            <div className="mb-3">
                                <FormLabel label="Email ou usuário"></FormLabel>
                                <FormControl name="login" placeholder="Digite seu email ou nome de usuário" />
                            </div>
                            <div className="mb-3">
                                <FormLabel label="Senha"></FormLabel>
                                <FormControl name="password" type="password" placeholder="**********" />
                            </div>

                            <button type="submit" className="w-full bg-primary-100 px-4 py-2 rounded-lg text-md font-medium text-dark-100">Entrar</button>
                        </Form>
                    }
                </Formik>
                <span>Não tem uma conta? <Link to="/registro">Cadastre-se</Link></span>
                {localStorage.getItem("ifsolve_token") ? <Navigate to="/item" replace={true}></Navigate> : null}

            </div>
        </div>
    )
}