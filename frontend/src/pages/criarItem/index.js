import { useState } from "react";
import { SidebarLayout } from "../../components";
import { FiCheckSquare, FiAlignLeft } from "react-icons/fi";


export default function CriarItem() {
    const [getTitulo, setTitulo] = useState("Título")
    const [getAssunto, setAssunto] = useState("Assunto")
    const [getTags, setTags] = useState([])
    const [getTipo, setTipo] = useState("DI")

    return (
        <SidebarLayout>
            <div className="preview w-full bg-dark-10 flex align-center justify-center p-5">
                <div className="card-item basis-6/12 flex items-center gap-4 bg-white px-4 py-3 rounded-lg hover:outline hover:outline-3 hover:outline-offset-2 hover:outline-primary-80">
                    <div className="bg-primary-20 w-10 h-10 flex items-center justify-center rounded-lg">
                        {getTipo == "DI" ? <FiCheckSquare /> : <FiAlignLeft />}
                    </div>
                    <div className="block">
                        <span>{getAssunto}</span>
                        <p className="text-lg font-medium">{getTitulo}</p>
                    </div>
                </div>
            </div>

        </SidebarLayout>
    )
}