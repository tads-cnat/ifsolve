import { useState } from "react";
import { SidebarLayout, TagInput } from "../../components";
import { FiCheckSquare, FiAlignLeft } from "react-icons/fi";
import { useForm } from "react-hook-form";


export default function CriarItem() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    function formSubmit(e, data) {
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

                    {/* Tipo */}
                    <div className="mb-5">
                        <label>Tipo</label>
                        <select name="tipo" {...register("tipo")}>
                            <option value="DI">Discursiva</option>
                            <option value="ME">Multipla escolha</option>
                        </select>
                    </div>

                    {/* Visibilidade */}
                    <div className="mb-5">
                        <label>Visibilidade</label>
                        <select name="visibilidade" {...register("visibilidade")}>
                            <option value="PU">Publica</option>
                            <option value="PI">Privada</option>
                        </select>
                    </div>

                    {/* Assunto */}
                    <div className="mb-5">
                        <label>Assunto</label>
                        <input type="text" name="assunto" {...register("assunto")} />
                    </div>

                    {/* Titulo */}
                    <div className="mb-5">
                        <label>Titulo</label>
                        <input type="text" name="titulo" {...register("titulo")} />
                    </div>

                    {/* Texto base */}
                    <div className="mb-5">
                        <label>Texto base</label>
                        <textarea name="texto-base" {...register("texto-base")}></textarea>
                    </div>

                    {/* Enunciado */}
                    <div className="mb-5">
                        <label>Enunciado</label>
                        <textarea name="enunciado" {...register("enunciado")}></textarea>
                    </div>

                    {/* Expectativa resposta */}
                    <div className="mb-5">
                        <label>Expectativa de resposta</label>
                        <textarea name="expectativa-resposta" {...register("expectativa-resposta")}></textarea>
                    </div>

                    {/* Alternativa correta */}

                    {/* Alternativas */}

                    {/* Area */}
                    <div className="mb-5">
                        <label>Area</label>
                        <input type="text" name="area" {...register("area")} />
                    </div>

                    {/* Tags */}

                    <TagInput></TagInput>
                    <div className="mb-5">
                        <label>Tags</label>
                        <input type="text" name="tags" {...register("tags")} />
                    </div>

                    <button type="submit" className="px-5 py-2 bg-primary-80 hover:bg-primary-100">Cadastrar</button>
                </form>
            </div>

        </SidebarLayout>
    )
}