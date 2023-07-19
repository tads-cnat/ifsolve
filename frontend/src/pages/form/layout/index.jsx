/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import { Button } from '@material-tailwind/react';
import { FiArrowRight, FiCheck, FiArrowLeft } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

export default function FormLayout() {
    const navigate = useNavigate();
    return (
        <div className="h-screen flex justify-center px-4 p-8 bg-dark-5">
            <div className="w-full md:w-1/2 lg:w-1/3 2xl:w-1/4 flex flex-col gap-2">
                <div className="flex flex-row gap-2">
                    <div
                        className="flex items-center justify-center w-8 h-8 bg-dark-10 rounded-full cursor-pointer hover:bg-dark-20"
                        onClick={() => navigate(-1)}
                        role="presentation"
                    >
                        <FiArrowLeft />
                    </div>
                    <h3 className="text-2xl text-dark-100 font-bold">Criar</h3>
                </div>
                <p>Defina se deseja criar uma questão ou avaliação</p>
                {/* Cards */}
                <div className="flex flex-col gap-2 p-4 bg-white border border-dark-20 rounded-lg shadow-sm">
                    <h5 className="font-semibold text-dark-90 text-xl">Avaliação</h5>
                    <p className="font-normal text-dark-60">
                        Crie avaliações personalizadas para avaliar o progresso dos seus alunos
                    </p>
                    <ul className="flex flex-col gap-4">
                        <li className="flex gap-2 items-center">
                            <span className="p-1 bg-emerald-100 rounded-full">
                                <FiCheck className="text-sm stroke-2 text-emerald-600" />
                            </span>
                            <span className="font-normal text-dark-60 ">
                                Adicionar diferentes tipos de questões
                            </span>
                        </li>
                        <li className="flex gap-2 items-center">
                            <span className="p-1 bg-emerald-100 rounded-full">
                                <FiCheck className="text-sm stroke-2 text-emerald-600" />
                            </span>
                            <span className="font-normal text-dark-60 ">
                                Definir o tempo prazo para a realização da avaliação
                            </span>
                        </li>
                    </ul>
                    <Link to="/elaborar/avaliacao/">
                        <Button color="teal" className="w-full mt-4">
                            Criar Avaliação
                        </Button>
                    </Link>
                </div>

                <div className="flex flex-col gap-2 p-4 bg-white border border-dark-20 rounded-lg shadow-sm">
                    <h5 className="font-semibold text-dark-90 text-xl">Questão</h5>
                    <p className="font-normal text-dark-60">
                        Crie uma variedade de questões para avaliar o conhecimento dos alunos
                    </p>
                    <ul className="flex flex-col gap-4">
                        <li className="flex gap-2 items-center">
                            <span className="p-1 bg-emerald-100 rounded-full">
                                <FiCheck className="text-sm stroke-2 text-emerald-600" />
                            </span>
                            <span className="font-normal text-dark-60 ">
                                Adicionar diferentes tipos de questões
                            </span>
                        </li>
                    </ul>
                    <Link to="/elaborar/item/">
                        <Button color="teal" className="w-full mt-4">
                            Criar Questão
                        </Button>
                    </Link>
                </div>

                {/* <form onSubmit=""">
                <RadioCard
                    label="Avaliação"
                    description="Criar questão discursiva ou multipla escolha"
                    name="tipo"
                    id="tipo-avaliacao"
                    value="avaliacao"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    />
                    <input
                    type="text"
                    name="tipo"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    />
                    
                {formik.errors.tipo ? 'true' : 'false'}
                
                <button type="submit">Continuar</button>
                <div className="flex flex-row justify-between mt-auto">
                    <ButtonPrimary disabled>Voltar</ButtonPrimary>
                    <ButtonPrimary disabled={!formik.errors.tipo}>Continuar</ButtonPrimary>
                </div>
            </form> */}
            </div>
        </div>
    );
}

function RadioCard({ label, description, value, name, id, icon, onChange, onBlur }) {
    return (
        <div>
            <input
                type="radio"
                id={id}
                name={name}
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                className="hidden peer"
            />
            <label
                htmlFor={id}
                className="flex flex-row justify-between items-center rounded-lg cursor-pointer bg-white border border-dark-10 p-4 peer-checked:outline"
            >
                <div className="block">
                    {icon}
                    <div className="w-full text-lg font-semibold">{label}</div>
                    <div className="w-full">{description}</div>
                </div>
                <FiArrowRight />
            </label>
        </div>
    );
}

RadioCard.propTypes = {
    label: PropTypes.string.isRequired,
    description: PropTypes.string,
    value: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    icon: PropTypes.element,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
};

RadioCard.defaultProps = {
    description: '',
    icon: null,
    onBlur: null,
    onChange: null,
};
