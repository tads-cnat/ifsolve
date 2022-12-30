import { useContext } from "react";
import { AlunoRegister, ElaboradorRegister } from "../../api/config";
import { GlobalContext } from "../../providers/context";
import { FormLabel, FormControl } from "../../components";
import { Formik, Field, Form } from "formik";
import LoginBackground from "../../images/login-background.png"
import { Link } from "react-router-dom";

export default function Register() {
    const { getAccess, setAccess } = useContext(GlobalContext)
    const initialValues = {
        username: "",
        password: "",
        email: "",
        data_nascimento: "",
        verificado: true,
        tipo: "aluno"
    }

    function formSubmit(data) {
        if(data.tipo == "elaborador"){
            ElaboradorRegister(data);
        }
        else{
            AlunoRegister(data)
        }
    }

    return (
        <div className="sm:container mx-auto grid grid-cols-1 lg:grid-cols-2">
            <img src={LoginBackground} alt="" className="hidden lg:block fixed h-screen w-1/2 object-cover top-0 right-0" />
            <div className="flex flex-col justify-center h-screen px-8 md:px-24">

                <Formik initialValues={initialValues} onSubmit={formSubmit}>
                    {({ values }) =>
                        <Form >
                            <h1>Criar conta</h1>
                            <div className="mb-3">
                                <FormLabel label="Nome de usuário"></FormLabel>
                                <FormControl name="username" placeholder="Digite seu nome de usuário" />
                            </div>

                            <div className="mb-3">
                                <FormLabel label="Email"></FormLabel>
                                <FormControl name="email" type="email" placeholder="Digite seu email" />
                            </div>

                            <div className="mb-3">
                                <FormLabel label="Senha"></FormLabel>
                                <FormControl name="password" type="password" placeholder="**********" />
                            </div>

                            
                            <div className="mb-3">
                                <FormLabel label="Data de nascimento"></FormLabel>
                                <FormControl name="data_nascimento" type="date" placeholder="Digite sua data de nascimento" />
                            </div>

                            <div className="mb-3">
                                <FormLabel label="Tipo de conta"></FormLabel>
                                <label>
                                    <Field type="radio" name="tipo" value="elaborador" />
                                    Elaborador
                                </label>
                                <label>
                                    <Field type="radio" name="tipo" value="aluno" />
                                    Aluno
                                </label>
                            </div>

                            <button type="submit" className="w-full bg-primary-100 px-4 py-2 rounded-lg text-md font-medium text-dark-100">Entrar</button>
                        </Form>
                    }
                </Formik>
                <span>Tem uma conta? <Link to="/">Conecte-se</Link></span>
            </div>
        </div>
    )
}