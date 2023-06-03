/* eslint-disable react/jsx-no-bind */
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import IFSolvelogo from '../../images/IFSolve-logo.svg';
import IFRNLogo from '../../images/ifrn-logo.png';
// import LoginBackground from '../../images/login-background.png';
import { loginApi } from '../../api/config';
import { InputPassword, InputText } from '../../components';
// import logoSuap from '../../images/logo-suap.svg';

const schema = yup
    .object({
        login: yup.string().required(),
        password: yup.string().required(),
    })
    .required();

export default function Login() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    function onSubmit(data) {
        console.log(data);
        loginApi(data)
            .then((res) => {
                localStorage.setItem('ifsolve_token', res.data.token);
                localStorage.setItem('ifsolve_user', JSON.stringify(res.data));
                navigate('/avaliacao');
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className="flex flex-col w-full h-screen justify-center items-center">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col items-center w-full md:w-1/2 lg:w-1/3 p-8"
            >
                <img src={IFRNLogo} className="mb-12 h-8" alt="" />
                <img src={IFSolvelogo} className="mb-12 h-8" alt="" />
                <h3 className="text-lg font-semibold">Entre com sua matrícula do SUAP</h3>
                <div className="mb-6 w-full">
                    <InputText
                        label="Usuário"
                        placeholder="Digite sua matrícula"
                        {...register('login')}
                    />
                    <p>{errors.login?.message}</p>
                </div>
                <div className="mb-6 w-full">
                    <InputPassword
                        label="Senha"
                        placeholder="Digite sua senha"
                        {...register('password')}
                    />
                    <p>{errors.password?.message}</p>
                </div>

                <button
                    type="submit"
                    className="w-full text-white font-semibold px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 focus:outline focus:outline-4 focus:outline-emerald-700"
                >
                    Login
                </button>
            </form>
        </div>
    );
}
