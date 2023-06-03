/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// import { useFormik } from 'formik';
// import { useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { ButtonPrimary } from '../../../components';

const schema = yup.object({
    tipo: yup.string().required(),
});

export default function FormLayout() {
    const {
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    function onSubmit(data) {
        console.log(data);
    }

    return (
        <div className="flex flex-col px-4 md:px-16 lg:px-48 xl:px-64 py-8 gap-2 w-full h-screen bg-dark-5">
            <h3 className="text-xl text-dark-100 font-medium">Criar</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius id voluptatem</p>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 h-full">
                <button type="submit">Continuar</button>
            </form>

            {/* <form onSubmit=""">
                <RadioCard
                    label="Questão"
                    description="Criar questão discursiva ou multipla escolha"
                    name="tipo"
                    id="tipo-questao"
                    value="questao"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                />
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
