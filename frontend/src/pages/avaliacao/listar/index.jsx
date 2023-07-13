import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { CardAvalicacao, SearchInput, SidebarLayout } from '../../../components';
import { GlobalContext } from '../../../providers/context';
import { GetAvaliacoes, GetAvaliacoesAluno } from '../../../api/config';

export default function AvaliacaoListar() {
    const { setCurrentPage, getUser } = useContext(GlobalContext);
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('desc');
    const [sortedData, setSortedData] = useState([]);

    useEffect(() => {
        // Define página atual
        setCurrentPage('avaliacoes');

        // Verifica o tipo de usuario e busca as avaliações.
        if (getUser.extra_data.tipo_usuario === 'elaborador') {
            // Caso seja elaborador
            GetAvaliacoes()
                .then((res) => {
                    setData(res.data);
                    // console.log(res.data);
                })
                .catch(() => {
                    toast.error('Opss... Questão não encontrada');
                });
        } else {
            // Caso seja aluno
            GetAvaliacoesAluno()
                .then((res) => {
                    setData(res.data);
                    // console.log(res.data);
                })
                .catch(() => {
                    toast.error('Opss... Questão não encontrada');
                });
        }
    }, []);

    useEffect(() => {
        const filteredData = data.filter(
            (item) =>
                item.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.descricao.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const sortData = filteredData.sort((a, b) => {
            const dateA = new Date(
                `${a.data_inicio.split(' ')[0].split('/').reverse().join('-')}T${
                    a.data_inicio.split(' ')[1]
                }`
            );
            const dateB = new Date(
                `${b.data_inicio.split(' ')[0].split('/').reverse().join('-')}T${
                    b.data_inicio.split(' ')[1]
                }`
            );
            if (sortOrder === 'asc') {
                return dateA - dateB;
            }
            return dateB - dateA;
        });

        setSortedData(sortData);
    }, [data, searchTerm, sortOrder]);

    return (
        <SidebarLayout className="flex flex-col gap-4">
            <h3 className="text-2xl font-medium text-dark-100">Avaliações</h3>
            <SearchInput
                get={searchTerm}
                set={setSearchTerm}
                placeholder="Pesquisar avaliações por título ou palavras-chave"
            />
            <div className="flex flex-row">
                <select
                    className="p-2 bg-transparent border border-dark-20 rounded-full text-sm"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                >
                    <option value="desc">Mais recente</option>
                    <option value="asc">Mais antigo</option>
                </select>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {sortedData.map((item) => (
                    <CardAvalicacao key={item.id} data={item} />
                ))}
            </div>
        </SidebarLayout>
    );
}
