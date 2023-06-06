/* eslint-disable react/jsx-no-bind */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FiAlertCircle, FiLoader } from 'react-icons/fi';

import IFSolvelogo from '../../images/IFSolve-logo.svg';
import IFRNLogo from '../../images/ifrn-logo.png';
import LoginBackground from '../../images/login-background.png';
import { loginApi } from '../../api/config';
import { AlertDanger, InputPassword, InputText } from '../../components';

const schema = yup
    .object({
        login: yup.string().required('Digite seu usuário'),
        password: yup.string().required('Digite sua senha'),
    })
    .required();

export default function Login() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    function onSubmit(data) {
        setLoading(true);
        loginApi(data)
            .then((res) => {
                localStorage.setItem('ifsolve_token', res.data.token);
                localStorage.setItem('ifsolve_user', JSON.stringify(res.data));
                navigate('/avaliacao');
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                setError(
                    'Não foi possível fazer login. Verifique se digitou corretamente sua Matrícula e senha'
                );
            });
    }

    useEffect(() => {
        if (
            localStorage.getItem('ifsolve_token') !== null ||
            localStorage.getItem('ifsolve_user') !== null
        ) {
            navigate('/item');
        }
    }, []);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 w-full h-screen">
            <div className="lg:col-span-5 xl:col-span-4 p-8 flex flex-col justify-center bg-white">
                <div className="flex gap-8 mb-12 ">
                    <img src={IFSolvelogo} className="h-6" alt="" />
                    <img src={IFRNLogo} className="h-6" alt="" />
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <InputText
                        label="Usuário"
                        placeholder="Digite sua matrícula"
                        {...register('login')}
                    />
                    {errors.login ? (
                        <AlertDanger icon={<FiAlertCircle />}>{errors.login?.message}</AlertDanger>
                    ) : null}

                    <InputPassword
                        label="Senha"
                        placeholder="Digite sua senha"
                        {...register('password')}
                    />
                    {errors.password ? (
                        <AlertDanger icon={<FiAlertCircle />}>
                            {errors.password?.message}
                        </AlertDanger>
                    ) : null}

                    {error ? <AlertDanger icon={<FiAlertCircle />}>{error}</AlertDanger> : null}
                    <button
                        type="submit"
                        className="w-full flex justify-center text-white font-semibold px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 focus:outline focus:outline-4 focus:outline-emerald-700"
                    >
                        {loading ? <FiLoader className="animate-spin text-xl" /> : 'Entrar'}
                    </button>
                </form>
            </div>
            {/* Background */}
            <div className="hidden lg:block lg:col-span-7 xl:col-span-8 bg-emerald-200 h-screen">
                <img src={LoginBackground} className="w-full h-full object-cover" alt="" />
            </div>
        </div>
        // <div className="flex flex-col w-full h-screen justify-center items-center">
        //     <form
        //         onSubmit={handleSubmit(onSubmit)}
        //         className="flex flex-col items-center w-full md:w-1/2 lg:w-1/3 p-8"
        //     >
        //         <div className="flex gap-2">
        //             <img src={IFSolvelogo} className="mb-12 h-6" alt="" />
        //             <img src={IFRNLogo} className="mb-12 h-6" alt="" />
        //         </div>
        //         <h3 className="text-lg font-semibold">Entre com sua matrícula do SUAP</h3>
        //         <div className="mb-6 w-full">
        //             <InputText
        //                 label="Usuário"
        //                 placeholder="Digite sua matrícula"
        //                 {...register('login')}
        //             />
        //             <p>{errors.login?.message}</p>
        //         </div>
        //         <div className="mb-6 w-full">
        //             <InputPassword
        //                 label="Senha"
        //                 placeholder="Digite sua senha"
        //                 {...register('password')}
        //             />
        //             <p>{errors.password?.message}</p>
        //         </div>
        //         {error ? <p>{error}</p> : null}
        //         <button
        //             type="submit"
        //             className="w-full flex justify-center text-white font-semibold px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 focus:outline focus:outline-4 focus:outline-emerald-700"
        //         >
        //             {loading ? <FiLoader className="animate-spin text-xl" /> : 'Login'}
        //         </button>
        //     </form>
        // </div>
    );
}
