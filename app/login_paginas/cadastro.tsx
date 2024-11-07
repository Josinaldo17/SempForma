import React, { useState } from 'react';
import { useRouter, Stack } from 'expo-router';
import { View, TextInput, Button, Alert, Text, StyleSheet, ScrollView, TouchableOpacity, Picker, CheckBox } from 'react-native';
import { amazenar_noApp } from '@/assets/padroes/funçoes';
import { construirUrl } from '@/assets/padroes/apiConfig';
import estilo_padrao from '@/assets/padroes/estilo_padrao';


const CadastroAlunoScreen = () => {
    const router = useRouter();
    const [nome, setNome] = useState('');
    const [endereço, setEndereço] = useState('');
    const [número, setNúmero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [bairro, setBairro] = useState('');
    const [telefone, setTelefone] = useState('');
    const [datadenascimento, setDatadenascimento] = useState('');
    const [altura, setAltura] = useState('');
    const [peso, setPeso] = useState('');
    const [profissão, setProfissão] = useState(''); 
    const [objetivoPa, setObjetivoPa] = useState('');
    const [avaliaçao, setAvaliaçao] = useState('N');   
    const [dataAvaliçao, setDataAvaliçao] = useState('');
    const [objetivoOutros, setObjetivoOutros] = useState('');
    const [cadastroConcluido, setCadastroConcluido] = useState(false);    

    const [problemaCardiaco, setProblemaCardiaco] = useState('N');
    const [doresNoPeito, setDoresNoPeito] = useState('N');
    const [desmaiosVertigem, setDesmaiosVertigem] = useState('N');
    const [pressaoAlta, setPressaoAlta] = useState('N');
    const [problemasOsseos, setProblemasOsseos] = useState('N');
    const [sintomas, setSintomas] = useState({
        dorNasCostas: false,
        dorNasArticulacoes: false,
        doencaPulmonar: false,
    });
    const [familiaCardiaco, setFamiliaCardiaco] = useState('N');
    const [usoMedicamentos, setUsoMedicamentos] = useState('N');
    const [especificarMedicamentos, setEspecificarMedicamentos] = useState('');
    const [cirurgia, setCirurgia] = useState('N');
    const [especificarCirurgia, setEspecificarCirurgia] = useState('');
    const [anoCirurgia, setAnoCirurgia] = useState('');
    const [gravidez, setGravidez] = useState('N');
    const [tempoGravidez, setTempoGravidez] = useState('');
    const [fumante, setFumante] = useState('N');
    const [quantidadeCigarros, setQuantidadeCigarros] = useState('');
    const [bebidasAlcoolicas, setBebidasAlcoolicas] = useState('N');
    const [frequenciaBebidas, setFrequenciaBebidas] = useState('');
    const [atividadeFisica, setAtividadeFisica] = useState('N');
    const [quantasVezesPorSemana, setQuantasVezesPorSemana] = useState('');
    const [objetivos, setObjetivos] = useState({
        perderPeso: false,
        aptidaoCardiovascular: false,
        melhorarFlexibilidade: false,
        melhorarCondicionamentoFisico: false,
        reduzirDoresCostas: false,
        reduzirEstresse: false,
        diminuirColesterol: false,
        coordenacaoMotora: false,
    });

    const handleCadastro = async () => {
        if (!nome || !endereço || !número || !complemento || !bairro || !telefone || !datadenascimento || !altura || !peso || !profissão ) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
            return;
        }
        try {
            const response = await fetch(construirUrl('Cadastrar'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome, endereço, número, complemento, bairro, telefone, datadenascimento, altura, peso, profissão }),
            });

            const data = await response.json();
            if (response.ok) {
                amazenar_noApp('token', data.token);
                Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
                setCadastroConcluido(true);
            } else {
                Alert.alert('Erro', data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Erro', 'Ocorreu um erro ao realizar o cadastro.');
        }
    };

    if (cadastroConcluido) {
        return (
            <View style={styles.container}>
                <Text style={styles.successText}>Cadastro realizado com sucesso!</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <View style={styles.formContainer}>
                <Text style={styles.title}>Cadastro de Aluno</Text>
                <TextInput placeholder="Nome" value={nome} onChangeText={setNome} style={styles.input} />
                <TextInput placeholder="Endereço" value={endereço} onChangeText={setEndereço} style={styles.input} />
                <TextInput placeholder="Número" value={número} onChangeText={setNúmero} style={styles.input} />
                <TextInput placeholder="Complemento" value={complemento} onChangeText={setComplemento} style={styles.input} />
                <TextInput placeholder="Bairro" value={bairro} onChangeText={setBairro} style={styles.input} />
                <TextInput placeholder="Telefone" value={telefone} onChangeText={setTelefone} style={styles.input} />
                <TextInput placeholder="Data de nascimento" value={datadenascimento} onChangeText={setDatadenascimento} style={styles.input} />
                <TextInput placeholder="Altura" value={altura} onChangeText={setAltura} style={styles.input} />
                <TextInput placeholder="Peso" value={peso} onChangeText={setPeso} style={styles.input} />
                <TextInput placeholder="Profissão" value={profissão} onChangeText={setProfissão} style={styles.input} />

                <Text style={[styles.title, { marginBottom: 15 }]}>Voce deseja uma avalialçao Fisica?</Text>
                <Picker selectedValue={avaliaçao} onValueChange={setAvaliaçao} style={styles.picker}>
                    <Picker.Item label="Não" value="N" />
                    <Picker.Item label="Sim" value="S" />
                </Picker>
                {avaliaçao === 'S' && (
                    <TextInput
                        style={styles.input}
                        placeholder="Qual seria a melhor data?"
                        value={dataAvaliçao}
                        onChangeText={setDataAvaliçao}
                    />
                )}

                <Text style={[styles.title, { marginBottom: 15 }]}>Objetivo ao Praticar Atividade Física:</Text>           
                <Picker
                    selectedValue={objetivoPa}
                    onValueChange={ setObjetivoPa}
                    style={styles.picker}
                >
                <Picker.Item label="Convívio social" value="Convívio social" />
                <Picker.Item label="Condicionamento Físico (Prevenção / Saúde)" value="Condicionamento Físico (Prevenção / Saúde)" />
                <Picker.Item label="Necessidade Médica" value="Necessidade Médica" />
                <Picker.Item label="Outros" value="Outros" />
                </Picker>
                {objetivoPa === 'Outros' && (
                        <TextInput
                        style={styles.input}
                        placeholder="Quais? (especificar)"
                        value={objetivoOutros} // Use o novo estado
                        onChangeText={setObjetivoOutros} // Atualize o novo estado
                        />
                )}

                <Text style={[styles.title, { marginBottom: 15 }]}>O seu médico já lhe disse alguma vez que você tem um problema cardíaco?</Text>
                <Picker selectedValue={problemaCardiaco} onValueChange={setProblemaCardiaco} style={styles.picker}>
                    <Picker.Item label="Não" value="N" />
                    <Picker.Item label="Sim" value="S" />
                </Picker>

                <Text style={[styles.title, { marginBottom: 15 }]}>Você tem dores no peito com frequência?</Text>
                <Picker selectedValue={doresNoPeito} onValueChange={setDoresNoPeito} style={styles.picker}>
                    <Picker.Item label="Não" value="N" />
                    <Picker.Item label="Sim" value="S" />
                </Picker>

                <Text style={[styles.title, { marginBottom: 15 }]}>Você desmaia com frequência ou tem episódios importantes de vertigem?</Text>
                <Picker selectedValue={desmaiosVertigem} onValueChange={setDesmaiosVertigem} style={styles.picker}>
                    <Picker.Item label="Não" value="N" />
                    <Picker.Item label="Sim" value="S" />
                </Picker>

                <Text style={[styles.title, { marginBottom: 15 }]}>Algum médico já lhe disse que a sua pressão arterial estava muito alta?</Text>
                <Picker selectedValue={pressaoAlta} onValueChange={setPressaoAlta} style={styles.picker}>
                    <Picker.Item label="Não" value="N" />
                    <Picker.Item label="Sim" value="S" />
                </Picker>

                <Text style={[styles.title, { marginBottom: 15 }]}>Algum médico já lhe disse que você tem um problema ósseo ou articular, como, por exemplo, artrite?</Text>
                <Picker selectedValue={problemasOsseos} onValueChange={setProblemasOsseos} style={styles.picker}>
                    <Picker.Item label="Não" value="N" />
                    <Picker.Item label="Sim" value="S" />
                </Picker>

                <Text style={[styles.title, { marginBottom: 15 }]}>Você tem algum dos sintomas abaixo? (Marque todos que se aplicam)</Text>

                <View  style={{flexDirection: 'row'}}>

                <CheckBox
                    value={sintomas.dorNasArticulacoes}
                    onValueChange={() => setSintomas({ ...sintomas, dorNasArticulacoes: !sintomas.dorNasArticulacoes })}
                />
                <Text style={{color: '#fff'}} >Dor nas articulações, tendões ou músculos</Text>

                </View>


                <View  style={{flexDirection: 'row'}}>

                <CheckBox
                    value={sintomas.doencaPulmonar}
                    onValueChange={() => setSintomas({ ...sintomas, doencaPulmonar: !sintomas.doencaPulmonar })}
                />
                <Text  style={{color: '#fff'}} >Doença pulmonar (asma, enfisema, outra)</Text>

                </View>

                <View  style={{flexDirection: 'row', marginBottom: 30}}>
                    <CheckBox
                        value={sintomas.dorNasCostas}
                        onValueChange={() => setSintomas({ ...sintomas, dorNasCostas: !sintomas.dorNasCostas })}
                    />
                    <Text  style={{color: '#fff'}} >Dor nas costas</Text>
                
                
                    </View>    
                
                <Text style={[styles.title, { marginBottom: 15 }]}>Um parente próximo (pai, mãe, irmão ou irmã) teve ataque cardíaco ou outro problema relacionado com o coração antes dos 50 anos?</Text>
                <Picker selectedValue={familiaCardiaco} onValueChange={setFamiliaCardiaco} style={styles.picker}>
                    <Picker.Item label="Não" value="N" />
                    <Picker.Item label="Sim" value="S" />
                </Picker>

                <Text style={[styles.title, { marginBottom: 15 }]}>Você faz uso de medicamentos?</Text>
                <Picker selectedValue={usoMedicamentos} onValueChange={setUsoMedicamentos} style={styles.picker}>
                    <Picker.Item label="Não" value="N" />
                    <Picker.Item label="Sim" value="S" />
                </Picker>
                {usoMedicamentos === 'S' && (
                    <TextInput
                        style={styles.input}
                        placeholder="Quais? (especificar)"
                        value={especificarMedicamentos}
                        onChangeText={setEspecificarMedicamentos}
                    />
                )}

                <Text style={[styles.title, { marginBottom: 15 }]}>Você já fez alguma cirurgia?</Text>
                <Picker selectedValue={cirurgia} onValueChange={setCirurgia} style={styles.picker}>
                    <Picker.Item label="Não" value="N" />
                    <Picker.Item label="Sim" value="S" />
                </Picker>
                {cirurgia === 'S' && (
                    <>
                        <TextInput
                            style={styles.input}
                            placeholder="Qual? (especificar)"
                            value={especificarCirurgia}
                            onChangeText={setEspecificarCirurgia}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Ano:"
                            value={anoCirurgia}
                            onChangeText={setAnoCirurgia}
                        />
                    </>
                )}

                <Text style={[styles.title, { marginBottom: 15 }]}>Você está grávida?</Text>
                <Picker selectedValue={gravidez} onValueChange={setGravidez} style={styles.picker}>
                    <Picker.Item label="Não" value="N" />
                    <Picker.Item label="Sim" value="S" />
                </Picker>
                {gravidez === 'S' && (
                    <TextInput
                        style={styles.input}
                        placeholder="Há quanto tempo?"
                        value={tempoGravidez}
                        onChangeText={setTempoGravidez}
                    />
                )}

                <Text style={[styles.title, { marginBottom: 15 }]}>Você fuma?</Text>
                <Picker selectedValue={fumante} onValueChange={setFumante} style={styles.picker}>
                    <Picker.Item label="Não" value="N" />
                    <Picker.Item label="Sim" value="S" />
                </Picker>
                {fumante === 'S' && (
                    <TextInput
                        style={styles.input}
                        placeholder="Quantos cigarros por dia?"
                        value={quantidadeCigarros}
                        onChangeText={setQuantidadeCigarros}
                    />
                )}

                <Text style={[styles.title, { marginBottom: 15 }]}>Você ingere bebidas alcoólicas?</Text>
                <Picker selectedValue={bebidasAlcoolicas} onValueChange={setBebidasAlcoolicas} style={styles.picker}>
                    <Picker.Item label="Não" value="N" />
                    <Picker.Item label="Sim" value="S" />
                </Picker>
                {bebidasAlcoolicas === 'S' && (
                    <TextInput
                        style={styles.input}
                        placeholder="Com que frequência?"
                        value={frequenciaBebidas}
                        onChangeText={setFrequenciaBebidas}
                    />
                )}

                <Text style={[styles.title, { marginBottom: 15 }]}>Atualmente, você tem feito alguma atividade física?</Text>
                <Picker selectedValue={atividadeFisica} onValueChange={setAtividadeFisica} style={styles.picker}>
                    <Picker.Item label="Não" value="N" />
                    <Picker.Item label="Sim" value="S" />
                </Picker>
                {atividadeFisica === 'S' && (
                    <TextInput
                        style={styles.input}
                        placeholder="Quantas vezes por semana?"
                        value={quantasVezesPorSemana}
                        onChangeText={setQuantasVezesPorSemana}
                    />
                )}

                <Text style={[styles.title, { marginBottom: 15 }]}>Quais são os seus objetivos ao ingressar em um grupo de promoção de saúde? (Marque todos que se aplicam)</Text>

                <View style={styles.checkboxContainer}>
                    <CheckBox
                    value={objetivos.perderPeso}
                    onValueChange={() => setObjetivos({ ...objetivos, perderPeso: !objetivos.perderPeso })}
                    />
                    <Text style={styles.checkboxText}>Perder peso</Text>
                </View>

                <View style={styles.checkboxContainer}>
                    <CheckBox
                    value={objetivos.aptidaoCardiovascular}
                    onValueChange={() => setObjetivos({ ...objetivos, aptidaoCardiovascular: !objetivos.aptidaoCardiovascular })}
                    />
                    <Text style={styles.checkboxText}>Melhorar a aptidão cardiovascular</Text>
                </View>

                <View style={styles.checkboxContainer}>
                    <CheckBox
                    value={objetivos.melhorarFlexibilidade}
                    onValueChange={() => setObjetivos({ ...objetivos, melhorarFlexibilidade: !objetivos.melhorarFlexibilidade })}
                    />
                    <Text style={styles.checkboxText}>Melhorar a flexibilidade</Text>
                </View>

                <View style={styles.checkboxContainer}>
                    <CheckBox
                    value={objetivos.melhorarCondicionamentoFisico}
                    onValueChange={() => setObjetivos({ ...objetivos, melhorarCondicionamentoFisico: !objetivos.melhorarCondicionamentoFisico })}
                    />
                    <Text style={styles.checkboxText}>Melhorar o condicionamento físico</Text>
                </View>

                <View style={styles.checkboxContainer}>
                    <CheckBox
                    value={objetivos.reduzirDoresCostas}
                    onValueChange={() => setObjetivos({ ...objetivos, reduzirDoresCostas: !objetivos.reduzirDoresCostas })}
                    />
                    <Text style={styles.checkboxText}>Reduzir as dores nas costas</Text>
                </View>

                <View style={styles.checkboxContainer}>
                    <CheckBox
                    value={objetivos.reduzirEstresse}
                    onValueChange={() => setObjetivos({ ...objetivos, reduzirEstresse: !objetivos.reduzirEstresse })}
                    />
                    <Text style={styles.checkboxText}>Reduzir o estresse</Text>
                </View>

                <View style={styles.checkboxContainer}>
                    <CheckBox
                    value={objetivos.diminuirColesterol}
                    onValueChange={() => setObjetivos({ ...objetivos, diminuirColesterol: !objetivos.diminuirColesterol })}
                    />
                    <Text style={styles.checkboxText}>Diminuir o colesterol</Text>
                </View>

                <View style={styles.checkboxContainer}>
                    <CheckBox
                    value={objetivos.coordenacaoMotora}
                    onValueChange={() => setObjetivos({ ...objetivos, coordenacaoMotora: !objetivos.coordenacaoMotora })}
                    />
                    <Text style={styles.checkboxText}>Coordenação motora</Text>
                </View>

                

                
                <View  style={{flexDirection: 'row', marginBottom: 30}}>
                    <CheckBox
                        value={objetivos.coordenacaoMotora}
                        onValueChange={() => setObjetivos({ ...objetivos, coordenacaoMotora: !objetivos.coordenacaoMotora })}
                    />      
                        <TouchableOpacity onPress={() => Alert.alert('Termos de Uso')} style={styles.termsButton}>
                            <Text style={styles.termsText}>Termos de Uso !</Text>
                        </TouchableOpacity>
                
                </View>


                <TouchableOpacity style={styles.cadastroBnt} onPress={handleCadastro}>
                    <Text  style={styles.textocadastro} > CADASTRAR  </Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#282525',
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    formContainer: {
        alignItems: 'center',
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: estilo_padrao.Colors.primary,
        borderWidth: 3,
        backgroundColor: estilo_padrao.Colors.background,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 15,        
        color: 'white', 
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#C0C0C0',
        marginBottom: 20,
    },
    addButton: {
        backgroundColor: '#307E89',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 10,
    },
    evaluationButton: {
        backgroundColor: '#307E89',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 10,
    }, 
     checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  checkboxText: {
    color: '#FFF', 
    marginLeft: 8,
  },
    picker: {
        height: 50,
        width: '100%',
        backgroundColor: estilo_padrao.Colors.background,        
        borderColor: estilo_padrao.Colors.primary,        
        color: 'white', 
        borderRadius: 10,
        marginBottom: 15,
    },
    termsButton: {
        marginLeft: 10,
    },
    termsText: {
        color: '#C0C0C0',
        textDecorationLine: 'underline',
    },
    successText: {
        fontSize: 20,
        color: '#00FF00',
        textAlign: 'center',
    },
    cadastroBnt: {
        backgroundColor: estilo_padrao.Colors.primary,
        width: '100%',
        padding: 10,
        alignItems: 'center',
        margin: 15,
        borderRadius: 10
    },
    textocadastro: {
        fontSize: 30,
        fontWeight: 'bold',        
        color: '#fff'
    },
});

export default CadastroAlunoScreen;
