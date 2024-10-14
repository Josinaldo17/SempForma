import AsyncStorage from '@react-native-async-storage/async-storage';


// Formatar datas com nome
export const formatarData = (dataString) => {
    const date = new Date(dataString);
    const dia = String(date.getDate()).padStart(2, '0'); // Dia
    const mes = String(date.getMonth() + 1).padStart(2, '0'); // Mês
    const ano = date.getFullYear(); // Ano
    return `${dia}/${mes}/${ano}`; // Formato DD/MM/AAAA
  };

export const amazenar_noApp = async (nome_doDado, value) => {
   try {
     await AsyncStorage.setItem(nome_doDado, value);
     console.log("Dados armazenados com sucesso!");
   } catch (e) {
     console.error("Erro ao armazenar dados", e);
   }
  };

{/*
export const pegar_dados_app = async (nome_doDado) => {
  try {
    const value = await AsyncStorage.getItem(nome_doDado);
    if (value !== null) {

      console.log("Dados recuperados:", value);
      return value;
    }
  } catch (e) {
    console.error("Erro ao recuperar dados", e);
  }
};
*/}

// Função para apagara os dados
const removeData = async (nome) => {
  try {
    await AsyncStorage.removeItem(nome);
    console.log("Dados removidos com sucesso!");
  } catch (e) {
    console.error("Erro ao remover dados", e);
  }
};