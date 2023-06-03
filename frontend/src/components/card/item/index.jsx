import PropTypes from 'prop-types';
import { FiCheckSquare, FiAlignLeft, FiArrowUpRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function CardItem({ data }) {
    const { id, tipo, assunto, titulo, tags } = data;
    return (
        <Link
            to={`/item/${id}`}
            className="group flex flex-col p-4 gap-2 bg-white rounded-lg transition-all duration-200 linear outline outline-0 outline-dark-40 hover:outline-4"
        >
            <div className="flex flex-row justify-between items-center mb-8">
                <span className="text-2xl bg-amber-100 p-2 rounded-lg text-amber-600 ">
                    {tipo === 'ME' ? <FiCheckSquare /> : <FiAlignLeft />}
                </span>
                <FiArrowUpRight className="text-4xl stroke-1 text-dark-20 group-hover:text-dark-60" />
            </div>
            <h4 className="text-lg font-medium text-dark-80">{titulo}</h4>
            <p className="text-dark-60">{assunto}</p>
            <div className="flex flex-row flex-wrap gap-2">
                {tags.map((tag) => (
                    <span
                        className="text-sm px-2 py-1 bg-amber-100 text-amber-600 rounded-lg"
                        key={tag.id}
                    >
                        {tag.nome}
                    </span>
                ))}
            </div>
        </Link>
    );
}

CardItem.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.number.isRequired,
        tipo: PropTypes.string.isRequired,
        assunto: PropTypes.string.isRequired,
        titulo: PropTypes.string.isRequired,
        tags: PropTypes.arrayOf(
            PropTypes.shape({
                nome: PropTypes.string.isRequired,
            })
        ),
    }).isRequired,
};
