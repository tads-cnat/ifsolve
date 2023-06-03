// Função para comparar a data e hora atual com uma string e retornar a diferença em dias ou horas
export default function CompareDateTime(dataHoraString) {
    // Converter a string para um objeto Date
    const dataHoraComparar = new Date(
        `${dataHoraString.split(' ')[0].split('/').reverse().join('-')}T${
            dataHoraString.split(' ')[1]
        }`
    );

    // Obter a data e hora atual
    const dataHoraAtual = new Date();

    // Calcular a diferença em milissegundos
    const diferenca = Math.abs(dataHoraAtual - dataHoraComparar);

    // Calcular a diferença em dias e horas
    // const diferencaDias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    const diferencaHoras = Math.floor(diferenca / (1000 * 60 * 60));

    // Retornar a diferença em dias ou horas, dependendo do valor
    // if (diferencaDias > 0) {
    //     return `${diferencaDias} dias`;
    // }
    // return `${diferencaHoras} horas`;
    return diferencaHoras;
}
