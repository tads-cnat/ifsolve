import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import ReactQuill from 'react-quill';
import { FiAlignJustify, FiCheck, FiX } from 'react-icons/fi';
import { GetItemByID, GetRespostaByItem } from '../../../api/config';
import { GlobalAlert, SidebarLayout } from '../../../components';

export default function ItemResposta() {
    const [getItem, setItem] = useState([]);
    const [itemData, setItemData] = useState('');

    const { id } = useParams();

    const modules = {
        toolbar: false,
    };

    useEffect(() => {
        GetRespostaByItem(id).then((res) => {
            setItem(res.data);
        });
        GetItemByID(id).then((res) => {
            setItemData(res.data);
        });
    }, [id]);

    return (
        <SidebarLayout>
            <h2 className="text-2xl text-dark-100 font-medium mt-8 mb-4">Minhas respostas</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Dados do item */}
                {itemData ? (
                    <div className="flex flex-col gap-2 bg-white p-4 rounded-lg">
                        <h2 className="text-lg text-dark-100 font-medium">{itemData.titulo}</h2>
                        <ReactQuill
                            className="border-0 mb-4 text-lg font-medium"
                            modules={modules}
                            value={itemData.enunciado}
                            readOnly
                        />
                        <p>Resposta</p>
                        <div className="bg-dark-5 p-4 rounded-lg">
                            {itemData.tipo === 'ME'
                                ? itemData.alternativa_correta
                                : itemData.expectativa_resposta}
                        </div>
                    </div>
                ) : null}
                {/* Dados do item */}

                <div className="flex flex-col gap-2 bg-white p-4 rounded-lg mb-auto">
                    {getItem.length > 0 &&
                        itemData &&
                        getItem.map((resp) => (
                            <div className="flex flex-row px-4 py-2 gap-2">
                                <AlternativaCorreta key={itemData.id} item={itemData} resp={resp} />
                                <div className="flex-flex-col">
                                    <p className="text-sm text-dark-60">{}</p>
                                    <p className="text-xl">{resp.resposta}</p>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
            <br />

            <GlobalAlert />
        </SidebarLayout>
    );
}
function AlternativaCorreta({ item, resp }) {
    if (item.tipo === 'ME') {
        if (resp.resposta.toLowerCase() === item.alternativa_correta) {
            return (
                <div className="text-xl bg-primary-10 text-primary-100 p-2 rounded-lg my-auto">
                    <FiCheck />
                </div>
            );
        }
        return (
            <div className="text-xl bg-red-200 text-red-600 p-2 rounded-lg my-auto">
                <FiX />
            </div>
        );
    }
    return (
        <div className="text-xl bg-dark-10 text-dark-40 p-2 rounded-lg my-auto">
            <FiAlignJustify />
        </div>
    );
}
AlternativaCorreta.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number.isRequired,
        titulo: PropTypes.string,
        enunciado: PropTypes.string,
        tipo: PropTypes.string.isRequired,
        alternativa_correta: PropTypes.string,
        expectativa_resposta: PropTypes.string,
    }).isRequired,
    resp: PropTypes.shape({
        resposta: PropTypes.string,
    }).isRequired,
};
