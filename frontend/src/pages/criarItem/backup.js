<form>

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

                    <TagInput get={getTags} set={setTags}></TagInput>

                    <button className="px-5 py-2 bg-primary-80 hover:bg-primary-100" onClick={handleSubmit(formSubmit)}>Cadastrar</button>
                </form>
            </div>