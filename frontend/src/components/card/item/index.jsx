import PropTypes from 'prop-types';
import { useContext } from 'react';
import { Button } from '@material-tailwind/react';
import { FiCheckSquare, FiAlignLeft, FiEye } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../../providers/context';

export default function CardItem({ data }) {
    const navigate = useNavigate();
    const { getUser } = useContext(GlobalContext);
    const { id, tipo, assunto, titulo, tags } = data;

    function handleButtonClick(buttonId) {
        if (buttonId === 'responder') {
            console.log('Resposder');
            navigate(`/item/${id}/responder/`);
        } else if (buttonId === 'minhas-respostas') {
            console.log('Minhas respostas');
            navigate(`/item/${id}/respostas/`);
        }
    }

    return (
        <div className="group flex flex-col p-4 gap-2 bg-white rounded-lg transition-all duration-200 linear outline outline-0 outline-dark-40">
            <div className="flex flex-row justify-between items-center mb-4">
                <span className="text-2xl bg-amber-100 p-2 rounded-lg text-amber-600 ">
                    {tipo === 'ME' ? <FiCheckSquare /> : <FiAlignLeft />}
                </span>
            </div>
            <h4 className="text-lg font-medium text-dark-80">{titulo}</h4>
            <p className="text-dark-60">{assunto}</p>
            <div className="flex flex-row gap-2 flex-nowrap overflow-x-hidden items-center mb-2">
                {tags.map((tag) => (
                    <span
                        className="text-sm px-2 py-1 bg-amber-100 text-amber-600 rounded-lg"
                        key={tag.id}
                    >
                        {tag.nome}
                    </span>
                ))}
            </div>
            {getUser.extra_data.tipo_usuario === 'aluno' ? (
                <div className="flex flex-row justify-between items-center mb-2">
                    <button
                        type="button"
                        onClick={() => handleButtonClick('responder')}
                        className="text-white border border-amber-600 hover:text-white bg-amber-600 hover:bg-amber-700 hover:border-amber-700 font-medium rounded-lg text-sm px-5 py-2.5 mr-2"
                    >
                        Responder
                    </button>

                    <button
                        type="button"
                        onClick={() => handleButtonClick('minhas-respostas')}
                        className="text-amber-600 bg-white border border-amber-200  hover:bg-amber-100 font-medium rounded-lg text-sm px-5 py-2.5 mr-2"
                    >
                        Minhas respostas
                    </button>
                </div>
            ) : (
                <Link to={`/item/${id}/visualizar/`}>
                    <Button variant="outlined" color="orange" className="flex items-center gap-3 ">
                        <FiEye />
                        Visualizar
                    </Button>
                </Link>
            )}
        </div>
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
