/* eslint-disable react/jsx-no-bind */
import { useEffect, useState } from 'react';
import { Button, Input, Typography } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FiAlertCircle, FiLoader } from 'react-icons/fi';

import IFSolvelogo from '../../images/IFSolve-logo.svg';
import LogoSuap from '../../images/logo-suap.svg';
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
        <div className="w-full min-h-screen flex justify-center items-center bg-teal-50">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-11/12 md:w-6/12 xl:w-3/12 flex flex-col gap-4 bg-white p-8 rounded-lg shadow-lg"
            >
                <img src={IFSolvelogo} className="h-8 mb-12" alt="" />
                <InputText
                    label="Usuário"
                    placeholder="Digite sua matrícula"
                    autoFocus="true"
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
                    <AlertDanger icon={<FiAlertCircle />}>{errors.password?.message}</AlertDanger>
                ) : null}

                {error ? <AlertDanger icon={<FiAlertCircle />}>{error}</AlertDanger> : null}
                {loading ? (
                    <Button
                        color="teal"
                        className="flex justify-center items-center gap-4"
                        disabled
                    >
                        <FiLoader className="animate-spin text-xl" />
                    </Button>
                ) : (
                    <Button
                        type="submit"
                        color="teal"
                        className="flex justify-center items-center gap-4"
                    >
                        Entrar com
                        <img src={LogoSuap} className="h-6" alt="Logo do suap" />
                    </Button>
                )}
            </form>
        </div>
        // <div className="grid grid-cols-1 lg:grid-cols-12 w-full h-screen">
        //     <div className="lg:col-span-5 xl:col-span-4 p-8 flex flex-col justify-center bg-white">
        //         <div className="flex gap-8 mb-12 ">
        //             <img src={IFSolvelogo} className="h-6" alt="" />
        //         </div>
        //         <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        //             <InputText
        //                 label="Usuário"
        //                 placeholder="Digite sua matrícula"
        //                 {...register('login')}
        //             />
        //             {errors.login ? (
        //                 <AlertDanger icon={<FiAlertCircle />}>{errors.login?.message}</AlertDanger>
        //             ) : null}

        //             <InputPassword
        //                 label="Senha"
        //                 placeholder="Digite sua senha"
        //                 {...register('password')}
        //             />
        //             {errors.password ? (
        //                 <AlertDanger icon={<FiAlertCircle />}>
        //                     {errors.password?.message}
        //                 </AlertDanger>
        //             ) : null}

        //             {error ? <AlertDanger icon={<FiAlertCircle />}>{error}</AlertDanger> : null}
        //             {loading ? (
        //                 <Button
        //                     color="teal"
        //                     className="flex justify-center items-center gap-4"
        //                     disabled
        //                 >
        //                     <FiLoader className="animate-spin text-xl" />
        //                 </Button>
        //             ) : (
        //                 <Button
        //                     type="submit"
        //                     color="teal"
        //                     className="flex justify-center items-center gap-4"
        //                 >
        //                     Entrar com
        //                     <img src={LogoSuap} className="h-6" alt="Logo do suap" />
        //                 </Button>
        //             )}
        //         </form>
        //     </div>
        //     {/* Background */}
        //     <div className="hidden lg:block lg:col-span-7 xl:col-span-8 bg-emerald-200 h-screen">
        //         <img src={LoginBackground} className="w-full h-full object-cover" alt="" />
        //     </div>
        // </div>
    );
}
