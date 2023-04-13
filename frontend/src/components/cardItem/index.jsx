import { FiCheckSquare, FiAlignLeft } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function CardItem(props) {
    return (
        <Link to={`/item/${  props.content.id}`} className="card-item flex items-center gap-4 bg-white px-4 py-3 rounded-lg hover:outline hover:outline-3 hover:outline-primary-80">
            <div className="bg-primary-20 w-10 h-10 flex items-center justify-center rounded-lg">
                <div className="text-primary-100 text-xl">
                    {props.content.tipo === "ME" ? <FiCheckSquare /> : <FiAlignLeft />}
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <span className="text-sm text-dark-80">{props.content.assunto}</span>
                <p className="text-lg font-medium">{props.content.titulo}</p>
                <div className="flex flex-row gap-4">
                    {props.content.tags.filter((tag, i) => i < 3).map((tag, i) =>
                        <span className="text-sm bg-primary-10 text-primary-100 px-2 py-1 rounded-lg">{tag.nome}</span>
                    )}
                </div>
            </div>

        </Link>
    )
}