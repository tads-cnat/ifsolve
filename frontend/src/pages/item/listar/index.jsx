import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { CardItem, SearchInput, SidebarLayout } from '../../../components';
import { GlobalContext } from '../../../providers/context';
import { GetItems } from '../../../api/config';

export default function ItemListar() {
    const { setCurrentPage } = useContext(GlobalContext);
    const [items, setItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('desc');
    const [sortedItems, setSortedItems] = useState([]);

    // Executa quando o componente é carregado
    useEffect(() => {
        // Define página atual
        setCurrentPage('questoes');

        GetItems()
            .then((res) => {
                setItems(res.data);
                // console.log(res.data);
            })
            .catch(() => {
                toast.error('Opss... Questão não encontrada');
            });
    }, []);

    useEffect(() => {
        const filteredItems = items.filter(
            (item) =>
                item.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.assunto.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const csortedItems = filteredItems.sort((a, b) => {
            const dateA = new Date(
                `${a.data_publicacao.split(' ')[0].split('/').reverse().join('-')}T${
                    a.data_publicacao.split(' ')[1]
                }`
            );
            const dateB = new Date(
                `${b.data_publicacao.split(' ')[0].split('/').reverse().join('-')}T${
                    b.data_publicacao.split(' ')[1]
                }`
            );

            if (sortOrder === 'asc') {
                return dateA - dateB;
            }
            return dateB - dateA;
        });

        setSortedItems(csortedItems);
    }, [items, searchTerm, sortOrder]);

    return (
        <SidebarLayout className="flex flex-col gap-4">
            <h3 className="text-2xl font-medium text-dark-100">Questões</h3>
            <SearchInput
                get={searchTerm}
                set={setSearchTerm}
                placeholder="Pesquisar questões por título ou palavras-chave"
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
                {sortedItems.map((item) => (
                    <CardItem key={item.id} data={item} />
                ))}
            </div>
        </SidebarLayout>
    );
}
