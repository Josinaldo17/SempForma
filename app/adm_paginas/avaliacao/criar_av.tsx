import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button, ScrollView, ProgressBarAndroid } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Verifique se este é o pacote correto
import estilo_padrao from '@/assets/padroes/estilo_padrao';
import * as Progress from 'react-native-progress';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { construirUrl } from '@/assets/padroes/apiConfig';
import { useRouter, Stack, Link } from 'expo-router';

import { useNavigation } from '@react-navigation/native';

export default function CadastroAvaliacao() {  
  const [dados, setData] = useState([]);
  const navigation = useNavigation();
  const router = useRouter();
  
  const [matricula, setMatricula] = useState('');
  const hoje = new Date();
  const formattedDate = hoje.toISOString().split('T')[0];
  const [matriculaBuscada, setMatriculaBuscada] = useState();
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [sexo, setSexo] = useState('');
  
  const [resultadoImc, setMostrarImc] = useState('');
  const [resultadoImcText, setMostrarImcText] = useState('');
  const [colorImc, setColorImc] = useState('');
  const [progressImc, setProgressImc] = useState(0);    

  const [resultadoGordura, setMostrarGordura] = useState('');
  const [resultadoGorduraText, setMostrarGorduraText] = useState('');  
  const [progressGordura, setProgressGordura] = useState(0);  
  const [colorGordura, setColorGordura] = useState('');

  const [MusculoEsqueleticoPercen , setMusculoEsqueleticoPercen] = useState('');
  const [MusculoEsqueleticoText, setMusculoEsqueleticoText] = useState('');  
  const [progressMuscle, setProgressMuscle] = useState(0);  
  const [colorMuscle, setColorMuscle] = useState('');

  const [resultadoRM, setMetabolismoRepouso] = useState('');  
  const [resultadoRMText, setMostrarRM] = useState('');  
  const [progressRM, setProgressRM] = useState(0);  
  const [colorRM, setColorRM] = useState('');

  const [resultadoGorduraVisceral, setGorduraVisceral] = useState('');
  const [resultadoVisceralText, setMostrarVisceralText] = useState('');  
  const [progressVisceral, setProgressVisceral] = useState(0);  
  const [colorVisceral, setColorVisceral] = useState('');

  const [resultadoIdadeBiologica, setIdadeBiologica] = useState('');

  const [form, setForm] = useState({
    matricula: '',
    nome: '',
    idade: '',
    sexo: '',
    data: formattedDate,
    altura: '',
    peso: '',
    bracoDC: '',
    bracoEC: '',
    bracoD: '',
    bracoE: '',
    coxaD: '',
    coxaE: '',
    ptD: '',
    ptE: '',
    cintura: '',
    torax: '',
    imc: '',
    gorduraCorporal: '',
    musculoEsqueletico: '40',
    metabolismoRepouso: '',
    idadeBiologica: '',
    gorduraVisceral: '',
    professorAvaliador: '',
    obs: '',
  });

  const handleInputChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  useEffect(() => {
    navigation.setOptions({
      title: 'Avaliaçoes',
      headerTitleAlign: 'center',
      
    });
  }, [navigation]);


  const calcularImc = () => {
    const alturaEmMetros = parseFloat(form.altura) / 100;
    const peso = parseFloat(form.peso);

    if (isNaN(alturaEmMetros) || isNaN(peso) || alturaEmMetros <= 0 || peso <= 0) {
      setMostrarImc('');
      setMostrarImcText('');
      return;
    }

    const imc = peso / (alturaEmMetros * alturaEmMetros);
    setMostrarImc(imc.toFixed(2));

    if (imc < 18.5) {
      setProgressImc(0.2);
      setColorImc('rgb(0 255 247)');
      setMostrarImcText('Abaixo do peso');
    } else if (imc < 25) {
      setProgressImc(0.5);
      setColorImc('rgb(4 255 0)');
      setMostrarImcText('Peso normal');
    } else if (imc < 30) {
      setProgressImc(0.7);
      setColorImc('rgb(255, 159, 64)');
      setMostrarImcText('Sobrepeso');
    } else if (imc < 35) {
      setProgressImc(0.9);
      setColorImc('rgb(255 31 31)');
      setMostrarImcText('Obesidade grau 1');
    } else if (imc < 40) {
      setProgressImc(1);
      setColorImc('rgb(255, 0, 0)');
      setMostrarImcText('Obesidade grau 2');
    } else {
      setProgressImc(1);
      setColorImc('rgb(255, 0, 0)');
      setMostrarImcText('Obesidade grau 3');
    }
    
    form.imc = imc.toFixed(2);
    
  };

  const calcularGordura = () => {
    const peso = parseFloat(form.peso);
    const idade = parseInt(form.idade);
    const sexo = form.sexo;
    const alturaEmMetros = parseFloat(form.altura) / 100;
  
    if (isNaN(peso) || isNaN(idade) || isNaN(alturaEmMetros) || peso <= 0 || idade <= 0 || alturaEmMetros <= 0) {
      setMostrarGordura('');
      setProgressGordura(0);
      return;
    }

    let percentualGordura = 0;

    if (sexo === 'M') {
      percentualGordura = (1.20 * (peso / (alturaEmMetros * alturaEmMetros))) + (0.23 * idade) - 16.2;
    } else if (sexo === 'F') {
      percentualGordura = (1.20 * (peso / (alturaEmMetros * alturaEmMetros))) + (0.23 * idade) - 5.4;
    }

    let progressGordura = 0;
    let classificacaoGordura = ''; 

    if (sexo === 'F') {
      if (idade >= 20 && idade <= 39) {
        if (percentualGordura < 21.0) {
          progressGordura = 0.2;
          classificacaoGordura = "Baixo";
        } else if (percentualGordura >= 21.0 && percentualGordura <= 32.9) {
          progressGordura = 0.5;
          classificacaoGordura = "Normal";
        } else if (percentualGordura >= 33.0 && percentualGordura <= 38.9) {
          progressGordura = 0.7;
          classificacaoGordura = "Alto";
        } else {
          progressGordura = 1.0;
          classificacaoGordura = "Muito Alto";
        }
      } else if (idade >= 40 && idade <= 59) {
        if (percentualGordura < 23.0) {
          progressGordura = 0.2;
          classificacaoGordura = "Baixo";
        } else if (percentualGordura >= 23.0 && percentualGordura <= 33.9) {
          progressGordura = 0.5;
          classificacaoGordura = "Normal";
        } else if (percentualGordura >= 34.0 && percentualGordura <= 39.9) {
          progressGordura = 0.7;
          classificacaoGordura = "Alto";
        } else {
          progressGordura = 1.0;
          classificacaoGordura = "Muito Alto";
        }
      } else if (idade >= 60 && idade <= 79) {
        if (percentualGordura < 24.0) {
          progressGordura = 0.2;
          classificacaoGordura = "Baixo";
        } else if (percentualGordura >= 24.0 && percentualGordura <= 35.9) {
          progressGordura = 0.5;
          classificacaoGordura = "Normal";
        } else if (percentualGordura >= 36.0 && percentualGordura <= 41.9) {
          progressGordura = 0.7;
          classificacaoGordura = "Alto";
        } else {
          progressGordura = 1.0;
          classificacaoGordura = "Muito Alto";
        }
      }
    } else if (sexo === 'M') {
      if ( idade <= 39) {
        if (percentualGordura < 8.0) {
          progressGordura = 0.2;
          classificacaoGordura = "Baixo";
        } else if (percentualGordura >= 8.0 && percentualGordura <= 19.9) {
          progressGordura = 0.5;
          classificacaoGordura = "Normal";
        } else if (percentualGordura >= 20.0 && percentualGordura <= 24.9) {
          progressGordura = 0.7;
          classificacaoGordura = "Alto";
        } else {
          progressGordura = 1.0;
          classificacaoGordura = "Muito Alto";
        }
      } else if (idade >= 40 && idade <= 59) {
        if (percentualGordura < 11.0) {
          progressGordura = 0.2;
          classificacaoGordura = "Baixo";
        } else if (percentualGordura >= 11.0 && percentualGordura <= 21.9) {
          progressGordura = 0.5;
          classificacaoGordura = "Normal";
        } else if (percentualGordura >= 22.0 && percentualGordura <= 27.9) {
          progressGordura = 0.7;
          classificacaoGordura = "Alto";
        } else {
          progressGordura = 1.0;
          classificacaoGordura = "Muito Alto";
        }
      } else if (idade >= 60 && idade <= 79) {
        if (percentualGordura < 13.0) {
          progressGordura = 0.2;
          classificacaoGordura = "Baixo";
        } else if (percentualGordura >= 13.0 && percentualGordura <= 24.9) {
          progressGordura = 0.5;
          classificacaoGordura = "Normal";
        } else if (percentualGordura >= 25.0 && percentualGordura <= 29.9) {
          progressGordura = 0.7;
          classificacaoGordura = "Alto";
        } else {
          progressGordura = 1.0;
          classificacaoGordura = "Muito Alto";
        }
      }
    }

    if (classificacaoGordura === "Baixo" ){      
      setColorGordura('rgb(0 255 247)');
    } else if (classificacaoGordura === "Normal" ) {      
      setColorGordura('rgb(4 255 0)');
    } else if (classificacaoGordura === "Alto" ) {      
      setColorGordura('rgb(255, 159, 64)');
    } else if (classificacaoGordura === "Muito Alto" ) {
      setColorGordura('rgb(255, 0, 0)');
    }

    setMostrarGordura(` ${percentualGordura.toFixed(2)}%`);
    setMostrarGorduraText(classificacaoGordura);
    setProgressGordura(progressGordura);

  };

  const calcularMusculoEsqueletico = () => {
    const alturaEmMetros = parseFloat(form.altura) / 100;
    const peso = parseFloat(form.peso);

    if (isNaN(alturaEmMetros) || isNaN(peso) || alturaEmMetros <= 0 || peso <= 0) {
      setMusculoEsqueleticoPercen('');
      setMusculoEsqueleticoText('');
      setProgressMuscle(0);
      setColorMuscle('');
      return;
    }

    const imc = peso / (alturaEmMetros * alturaEmMetros);

    // Estimativa de percentual de músculo com base no IMC (exemplo simplificado)
    let percentualMusculo;
    let classificacaoMusculo = "";
    let progressoMusculo = 0;
    let corMusculo = '';

    if (imc < 18.5) {
      percentualMusculo = 35; 
      classificacaoMusculo = "Baixo";
      progressoMusculo = 0.2;
      corMusculo = 'rgb(0 255 247)'; 
    } else if (imc < 25) {
      percentualMusculo = 40;
      classificacaoMusculo = "Normal";
      progressoMusculo = 0.5;
      corMusculo = 'rgb(4 255 0)'; 
    } else if (imc < 30) {
      percentualMusculo = 37; 
      classificacaoMusculo = "Acima do Normal";
      progressoMusculo = 0.7;
      corMusculo = 'rgb(255, 159, 64)'; 
    } else {
      percentualMusculo = 34; 
      classificacaoMusculo = "Alto";
      progressoMusculo = 1.0;
      corMusculo = 'rgb(255, 0, 0)'; 
    }

    // Atualizando os estados com o percentual e classificações
    setMusculoEsqueleticoPercen(`${percentualMusculo}%`);
    setMusculoEsqueleticoText(classificacaoMusculo);
    setProgressMuscle(progressoMusculo);
    setColorMuscle(corMusculo);
    form.gorduraCorporal = percentualMusculo.toFixed(2)
  }
  
  const calcularMetabolismoRepouso = () => {
    const peso = parseFloat(form.peso); 
    const altura = parseFloat(form.altura); 
    const idade = parseInt(form.idade, 10); 
    const sexo = form.sexo; 

    if (isNaN(peso) || isNaN(altura) || isNaN(idade) || (sexo !== 'M' && sexo !== 'F')) {
      console.log("Por favor, insira valores válidos para peso, altura, idade e sexo.");
      setMetabolismoRepouso(''); 
      setMostrarRM('');
      setProgressRM(0);
      setColorRM('');
      return;
    }

    let metabolismoRepouso = 0;

    if (sexo === 'M') {
      metabolismoRepouso = 88.362 + (13.397 * peso) + (4.799 * altura) - (5.677 * idade);
    } else if (sexo === 'F') {
      metabolismoRepouso = 447.593 + (9.247 * peso) + (3.098 * altura) - (4.330 * idade);
    }

    // Exibindo o valor de metabolismo em repouso
    setMetabolismoRepouso(`${metabolismoRepouso.toFixed(2)} kcal/dia`);

    // Definindo a progressão e cor com base no valor do metabolismo
    let progress = 0;
    let cor = '';
    if (metabolismoRepouso < 1200) {
      progress = 0.2; 
      cor = 'rgb(0 255 247)'; 
      setMostrarRM('Muito baixo');
    } else if (metabolismoRepouso < 1800) {
      progress = 0.5; 
      cor = 'rgb(4 255 0)'; 
      setMostrarRM('Normal');
    } else if (metabolismoRepouso < 2200) {
      progress = 0.7;  
      cor = 'rgb(255, 159, 64)'; 
      setMostrarRM('Acima da média');
    } else {
      progress = 1.0;  
      cor = 'rgb(255, 0, 0)';
      setMostrarRM('Muito alto');
    }
    // Atualizando os estados com o valor, progresso e cor
    form.metabolismoRepouso = metabolismoRepouso.toFixed(2);
    setProgressRM(progress);
    setColorRM(cor);
  }

  const calcularGorduraVisceral = () => {
    const imc = parseFloat(resultadoImc);  
    const idade = parseInt(form.idade, 10);
    const circunferenciaAbdominal = parseFloat(form.cintura);  
  
    if (isNaN(imc) || isNaN(idade) || isNaN(circunferenciaAbdominal) || circunferenciaAbdominal <= 0 || idade <= 0 || imc <= 0) {
      setGorduraVisceral('');
      setMostrarVisceralText('');
      setProgressVisceral(0);
      setColorVisceral('');
      return;
    }
  
    const gorduraVisceral = (imc * 0.5) + (circunferenciaAbdominal * 0.2) + (idade * 0.1);
    
    setGorduraVisceral(`${gorduraVisceral.toFixed(2)}%`);
  

    let nivelText = '';
    let progress = 0;
    let cor = '';
  
    if (gorduraVisceral <= 9) {
      nivelText = ' Normal';
      progress = 0.3; 
      cor = 'rgb(4 255 0)'; 
    } else if (gorduraVisceral >= 10 && gorduraVisceral <= 14) {
      nivelText = 'Alto';
      progress = 0.7;  
      cor = 'rgb(255, 159, 64)';  
    } else if (gorduraVisceral >= 15) {
      nivelText = 'Muito Alto';
      progress = 1;  
      cor = 'rgb(255, 0, 0)'
    }
  
    setMostrarVisceralText(nivelText);
    setProgressVisceral(progress);
    setColorVisceral(cor);
    form.gorduraVisceral = gorduraVisceral.toFixed(2);
  };
  

  const calcularIdadeBiologica = () => {
    const idade = parseInt(form.idade, 10); // Idade cronológica
    const imc = parseFloat(resultadoImc); // IMC calculado anteriormente
    const percentualGordura = parseFloat(resultadoGorduraVisceral); // Percentual de gordura corporal
  
    if (isNaN(idade) || isNaN(imc) || isNaN(percentualGordura)) {
      console.log("Por favor, insira valores válidos para idade, IMC e percentual de gordura corporal.");
      setIdadeBiologica(''); // Limpa o valor se os dados estiverem incorretos
      return;
    }
  
    // Estimativa simples para a idade biológica
    let idadeBiologica = idade;
  
    // Ajustes na idade biológica com base no IMC
    if (imc < 18.5) {
      idadeBiologica += 1; // Abaixo do peso -  aumenta ligeiramente a idade biológica
    } else if (imc > 25 && imc < 30) {
      idadeBiologica += 2; // Sobrepeso - ajusta idade biológica
    } else if (imc >= 30) {
      idadeBiologica += 5; // Obesidade - aumenta idade biológica mais significativamente
    }
  
    // Ajustes com base no percentual de gordura corporal
    if (percentualGordura < 15) {
      idadeBiologica -= 1; // Gordura corporal baixa - diminui ligeiramente a idade biológica
    } else if (percentualGordura > 25) {
      idadeBiologica += 3; // Gordura corporal alta - aumenta a idade biológica
    }
  
    setIdadeBiologica(`${idadeBiologica} Anos`);
    form.idadeBiologica = idadeBiologica;
  };

  const Buscar_dados = async () => {
    try {
      const response = await axios.get(construirUrl('alunos'));  // Faz a requisição à API
      setData(response);
      
    } catch (error) {
      console.error('Erro ao buscar dados:', error);  // Exibe o erro, se houver
    }


  };


    const Add_nome = () => {
      try {
        const matriculaBusca = parseInt(form.matricula, 10); // Pega o valor da matrícula diretamente
        setMatriculaBuscada(matriculaBusca); // Atualiza o estado de matriculaBuscada

        const aluno = dados['data'].find((aluno) => aluno.matricula === matriculaBusca);

        if (aluno) {
          setNome(aluno.nome);

          let nascimento = new Date(aluno.nive);
          const hoje = new Date();

          let aniver = hoje.getFullYear() - nascimento.getFullYear();
          const mes = hoje.getMonth() - nascimento.getMonth();

          if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
            aniver--;
          }

          setIdade(aniver);
          setSexo(aluno.sexo);
          
          form.nome = aluno.nome; 
          form.sexo = aluno.sexo;           
          form.idade = aniver; 
        } else {
          setNome('');
          setIdade('');
          setSexo('');
        }

      } catch (error) {
        console.error('Erro ao buscar dados:', error);  // Exibe o erro, se houver
      }
    };

  useEffect(() => {
    async function fetchMatricula() {
      const pegar_matricula = await AsyncStorage.getItem('matricula');
      const matriculaArmazenada = pegar_matricula || '';
      setMatricula(matriculaArmazenada);
      form.professorAvaliador = matriculaArmazenada;
    }
    fetchMatricula();
    Buscar_dados();    
  }, []);  
  
  useEffect(() => {
    calcularImc(); 
    calcularGordura();
    calcularMusculoEsqueletico();
    calcularMetabolismoRepouso();
    calcularGorduraVisceral();
    calcularIdadeBiologica();
    Add_nome();
  });  

const handleSubmit = async (e) => {
  e.preventDefault(); // Impede o comportamento padrão do formulário

  try {
    // Enviando os dados do formulário para a API
    const response = await axios.post(construirUrl('avaliaçao'), form);

    console.log('');

    console.log('Dados enviados com sucesso:', response.data);
    // Aqui você pode fazer o que for necessário após o envio
  } catch (error) {
    console.error('Erro ao enviar os dados:', error);
  }
};


  const imcProgress = resultadoImc
    ? Math.min((40 - 15) / (40 - 15), 1)
    : 0;
    
  return (
    <ScrollView style={{ backgroundColor: estilo_padrao.Colors.background, }}
      contentContainerStyle={{ alignItems: 'center', flex: 1 }}
    >
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Cadastro de Avaliação Física</Text>



      <View style={styles.containerInput}>
        
      <View style={styles.containerInputaligner} >
        <Text  style={styles.textInput} >Matricula:</Text>


              <TextInput
                style={styles.input}
                value={form.matricula}
                onChangeText={(value) => handleInputChange('matricula', value)}
              />
       </View>

       <View style={styles.containerInputaligner} >
        <Text  style={styles.textInput}>Idade:</Text>


              <TextInput
                style={styles.input}
                value={idade}
              />
       </View>

      </View>
      


      <View style={styles.containerInput}>
        
      <View style={styles.containerInputaligner} >

      <Text style={styles.textInput}>Nome:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={nome}
            onChangeText={(value) => handleInputChange('nome', value)}
          />


      </View>


        <View style={styles.containerInputaligner} >

          <Text style={styles.textInput}>Sexo</Text>
          <TextInput
            style={styles.input}
            value={sexo}
            onChangeText={(value) => handleInputChange('sexo', value)}
          />
          
      </View>

      </View>


      <View style={styles.containerInput}>


        
      <View style={styles.containerInputaligner} >

      <Text  style={styles.textInput}>Altura: (cm)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={form.altura}
            onChangeText={(value) => handleInputChange('altura', value)}
          />
      
      
      </View>

      
        <View style={styles.containerInputaligner} >

          <Text style={styles.textInput}>Peso: (kg)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={form.peso}
            onChangeText={(value) => handleInputChange('peso', value)}
          />
          
      </View>



    
   </View>

   <View style={styles.containerInput}> 

       <View style={styles.containerInputaligner} >

          <Text>Braço D.C.: (cm)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={form.bracoDC}
            onChangeText={(value) => handleInputChange('bracoDC', value)}
          />

        
        </View>

    
        <View style={styles.containerInputaligner} >

          <Text>Braço E.C.: (cm)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={form.bracoEC}
            onChangeText={(value) => handleInputChange('bracoEC', value)}
          />

        
      </View>
        
  </View>


      <View style={styles.containerInput}>

        
      <View style={styles.containerInputaligner} >

          <Text>Braço D.: (cm)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={form.bracoD}
            onChangeText={(value) => handleInputChange('bracoD', value)}
          />

        
      </View>


        <View style={styles.containerInputaligner} >

          <Text>Braço E.: (cm)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={form.bracoE}
            onChangeText={(value) => handleInputChange('bracoE', value)}
          />

        
      </View>

   </View>

      <View style={styles.containerInput}>

        
      <View style={styles.containerInputaligner} >
            
          <Text>Coxa D.: (cm)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={form.coxaD}
            onChangeText={(value) => handleInputChange('coxaD', value)}
          />

      
      </View>

          
        <View style={styles.containerInputaligner} >

          <Text>Coxa E.: (cm)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={form.coxaE}
            onChangeText={(value) => handleInputChange('coxaE', value)}
          />
          
        </View>

      </View>

      <View style={styles.containerInput}>


      <View style={styles.containerInputaligner} >


          <Text>PT. D:  (cm)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={form.ptD}
            onChangeText={(value) => handleInputChange('ptD', value)}
          />

        
      </View>


        <View style={styles.containerInputaligner} >

          <Text>PT. E:  (cm)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={form.ptE}
            onChangeText={(value) => handleInputChange('ptE', value)}
          />

          
      </View>

      </View>

      <View style={styles.containerInput}>

        <View style={styles.containerInputaligner} >

          <Text>Cintura: (cm)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={form.cintura}
            onChangeText={(value) => handleInputChange('cintura', value)}
          />
        </View>

        <View style={styles.containerInputaligner} >     

          <Text>Tórax: (cm)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={form.torax}
            onChangeText={(value) => handleInputChange('torax', value)}
          />

        </View>  

      </View>

      <View style={styles.containerCalculos} >     

          <Text>IMC</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={resultadoImc}
            onChangeText={(value) => handleInputChange('imc', value)}
          />
          <Text>Situaçao: {resultadoImcText}</Text>
           <Progress.Bar style={{borderColor: estilo_padrao.Colors.primary}} color= {colorImc} progress={progressImc} width={300} />

        </View>  

        <View style={styles.containerCalculos} >     

        <Text>BODY FAT</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={resultadoGordura}          
          onChangeText={(value) => handleInputChange('gorduraCorporal', value)}
        />
        <Text>Situaçao: {resultadoGorduraText}</Text>
        <Progress.Bar style={{borderColor: estilo_padrao.Colors.primary}} color= {colorGordura} progress={progressGordura} width={300} />

        </View>

        <View style={styles.containerCalculos} >     

        <Text>MUSCLE</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={MusculoEsqueleticoPercen}
          onChangeText={(value) => handleInputChange('musculoEsqueletico', value)}
        />
        <Text>Situaçao: {MusculoEsqueleticoText}</Text>
        <Progress.Bar style={{borderColor: estilo_padrao.Colors.primary}} color= {colorMuscle} progress={progressMuscle} width={300} />

        </View>  

        <View style={styles.containerCalculos} >     

        <Text>RM</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={resultadoRM}
          onChangeText={(value) => handleInputChange('metabolismoRepouso', value)}
        />
        <Text>Situaçao: {resultadoRMText}</Text>
        <Progress.Bar style={{borderColor: estilo_padrao.Colors.primary}} color= {colorRM} progress={progressRM} width={300} />

        </View>


        <View style={styles.containerCalculos} >     

          <Text>BODY AGE</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={resultadoIdadeBiologica}
            onChangeText={(value) => handleInputChange('idadeBiologica', value)}
          />
        </View>  


        <View style={styles.containerCalculos} >     

        <Text>VISCERAL FAT</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={resultadoGorduraVisceral}
          onChangeText={(value) => handleInputChange('gorduraVisceral', value)}
        />
        <Text>Situaçao: {resultadoVisceralText}</Text>
        <Progress.Bar style={{borderColor: estilo_padrao.Colors.primary}} color= {colorVisceral} progress={progressVisceral} width={300} />

        </View>     

      <Text>Observações:</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        multiline
        value={form.obs}
        onChangeText={(value) => handleInputChange('obs', value)}
      />

      {/* Botão para salvar */}
      <Button title="Salvar Avaliação" onPress={handleSubmit} />
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  input: {
    width: '80%',
    height: 50,
    borderColor: estilo_padrao.Colors.primary,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,  
    alignItems: 'center',
    textAlign: 'center',
    padding: 5,
    color: '#fff',
    fontSize: 15
  },
  textInput:{
    color: '#fff',
  },
  containerInput: {
    flexDirection: 'row',
  },
  containerInputaligner: {
    alignItems: 'center',
    flexDirection: 'column',
    paddingVertical: 5,
  },
  resultContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  containerCalculos: {
    alignItems: 'center',
    flexDirection: 'column',
    paddingVertical: 5,
  }
});
