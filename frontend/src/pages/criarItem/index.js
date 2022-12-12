import { useState } from "react";
import { SidebarLayout } from "../../components";
import { FiCheckSquare, FiAlignLeft } from "react-icons/fi";
import { useForm } from "react-hook-form";


export default function CriarItem() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    function formSubmit(data) {
        console.log(data);
    }

    return (
        <SidebarLayout>
            {/* <div className="preview w-full bg-dark-10 flex align-center justify-center p-5">
                <div className="card-item basis-6/12 flex items-center gap-4 bg-white px-4 py-3 rounded-lg hover:outline hover:outline-3 hover:outline-offset-2 hover:outline-primary-80">
                    <div className="bg-primary-20 w-10 h-10 flex items-center justify-center rounded-lg">
                        {getTipo == "DI" ? <FiCheckSquare /> : <FiAlignLeft />}
                    </div>
                    <div className="block">
                        <span>{getAssunto}</span>
                        <p className="text-lg font-medium">{getTitulo}</p>
                    </div>
                </div>
            </div> */}
            <div className="w-full">
                <h2 className="text-3xl">Nova questão</h2>
                <form onSubmit={handleSubmit(formSubmit)}>

                    <div className="mb-5">
                        <label>Tipo</label>
                        <select name="tipo" {...register("tipo")}>
                            <option value="DI">Discursiva</option>
                            <option value="ME">Multipla escolha</option>
                        </select>
                    </div>

                    <div className="mb-5">
                        <label>Visibilidade</label>
                        <select name="visibilidade" {...register("visibilidade")}>
                            <option value="PU">Publica</option>
                            <option value="PI">Privada</option>
                        </select>
                    </div>

                    <div className="mb-5">
                        <label>Titulo</label>
                        <input type="text" name="titulo" {...register("titulo")} />
                    </div>

                    <button type="submit">Cadastrar</button>
                    {/* Tipo */}
                    {/* Visibilidade */}
                    {/* Assunto */}
                    {/* Titulo */}
                    {/* Texto base */}
                    {/* Enunciado */}
                    {/* Expectativa resposta */}
                    {/* Alternativa correta */}
                    {/* Alternativas */}
                    {/* Area */}
                    {/* Tags */}
                </form>
            </div>

        </SidebarLayout>
    )
}