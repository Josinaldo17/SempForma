
// Formatar datas com nome

export const formatarData = (dataString) => {
    const date = new Date(dataString);
    const dia = String(date.getDate()).padStart(2, '0'); // Dia
    const mes = String(date.getMonth() + 1).padStart(2, '0'); // Mês
    const ano = date.getFullYear(); // Ano
    return `${dia}/${mes}/${ano}`; // Formato DD/MM/AAAA
  };