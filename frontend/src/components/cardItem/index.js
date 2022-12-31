import { FiCheckSquare, FiAlignLeft } from "react-icons/fi";

export default function CardItem(props) {
    return (
        <div className="card-item flex items-center gap-4 bg-white px-4 py-3 rounded-lg border border-dark-10 hover:outline hover:outline-3 hover:outline-primary-80">
            <div className="bg-primary-20 w-10 h-10 flex items-center justify-center rounded-lg">
                <div className="text-primary-100 text-xl">
                    {props.content.tipo === "ME" ? <FiCheckSquare /> : <FiAlignLeft />}
                </div>
            </div>
            <div className="block">
                <span>{props.content.assunto}</span>
                <p className="text-lg font-medium">{props.content.titulo}</p>
            </div>
        </div>
    )
}