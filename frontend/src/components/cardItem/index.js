import { FiCheckSquare, FiAlignLeft } from "react-icons/fi";

export default function CardItem(props) {
    return (
        <div className="card-item flex items-center gap-4 bg-white px-4 py-3 rounded-lg hover:outline hover:outline-3 hover:outline-offset-2 hover:outline-primary-80">
            <div className="bg-primary-20 w-10 h-10 flex items-center justify-center rounded-lg">
                {props.content.tipo === "DI" ? <FiCheckSquare /> : <FiAlignLeft />}
            </div>
            <div className="block">
                <span>{props.content.assunto}</span>
                <p className="text-lg font-medium">{props.content.titulo}</p>
            </div>
        </div>
    )
}