// Sistema de debug
const Debug = {
    ativo: true,
    
    log(mensagem, tipo = 'info') {
        if (!this.ativo) return;
        
        const styles = {
            info: 'color: #2196f3',
            sucesso: 'color: #4caf50',
            erro: 'color: #f44336',
            aviso: 'color: #ff9800'
        };
        
        console.log(`%c${mensagem}`, styles[tipo]);
    },
    
    verificarElemento(id, descricao) {
        const elemento = document.getElementById(id);
        if (!elemento) {
            this.log(`Elemento não encontrado: ${descricao} (${id})`, 'erro');
            return false;
        }
        return true;
    }
};

// Variáveis globais
let modo = 'cores';
let atual = 0;
let nivel = 1;
let conquistasDesbloqueadas = [];
let avatarAtual = '👧';

// Função segura para localStorage
function getLocalStorage(key, defaultValue) {
    try {
        return localStorage.getItem(key) || defaultValue;
    } catch (e) {
        console.warn('localStorage não disponível:', e);
        return defaultValue;
    }
}

function setLocalStorage(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch (e) {
        console.warn('Erro ao salvar no localStorage:', e);
    }
}

// Inicializar variáveis com valores seguros
try {
    nivel = parseInt(getLocalStorage('nivel', '1')) || 1;
    conquistasDesbloqueadas = JSON.parse(getLocalStorage('conquistas', '[]')) || [];
    avatarAtual = getLocalStorage('avatar', '👧') || '👧';
} catch (e) {
    console.warn('Erro ao carregar dados salvos:', e);
}

// Sistema Avançado de Configurações
let configuracoesTEA = {};
try {
    configuracoesTEA = JSON.parse(getLocalStorage('configuracoesTEA', '{}')) || {};
} catch (e) {
    console.warn('Erro ao carregar configurações:', e);
    configuracoesTEA = {};
}

// Configurações padrão
const configuracoesDefault = {
    tema: 'blue',
    altoContraste: false,
    textoGrande: false,
    animacoesReduzidas: false,
    espacamentoAumentado: false,
    interfaceSimplificada: false,
    navegacaoPrevisivel: true,
    assistenteFoco: false,
    indicadorProgresso: true,
    celebracoes: true,
    encorajamentoGentil: true,
    autoPlay: false,
    animations: true,
    highContrast: false,
    biggerText: false,
    showGuide: true,
    repeatAudio: false,
    showProgress: true,
    useKeyboard: true,
    emojiSize: 1
};

// Mesclar configurações padrão com as salvas
configuracoesTEA = { ...configuracoesDefault, ...configuracoesTEA };
let configuracoes = configuracoesTEA;

// Jogos funcionais
const jogosFuncionais = [
    { 
        item: '🎮', 
        nome: 'ESCOLHER JOGO', 
        descricao: 'Clique para ver os jogos disponíveis! 🎯🎪🎲',
        tipo: 'menu'
    }
];

// Dados de conteúdo educacional
const conteudo = {
    cores: [
        { item: '🔴', nome: 'VERMELHO', descricao: 'A cor vermelha como o morango 🍓' },
        { item: '🔵', nome: 'AZUL', descricao: 'A cor azul como o céu ☁️' },
        { item: '🟢', nome: 'VERDE', descricao: 'A cor verde como a grama 🌱' },
        { item: '🟡', nome: 'AMARELO', descricao: 'A cor amarela como o sol ☀️' },
        { item: '🟠', nome: 'LARANJA', descricao: 'A cor laranja como a laranja 🍊' },
        { item: '🟣', nome: 'ROXO', descricao: 'A cor roxa como a uva 🍇' },
        { item: '🟤', nome: 'MARROM', descricao: 'A cor marrom como o chocolate 🍫' },
        { item: '⚫', nome: 'PRETO', descricao: 'A cor preta como a noite 🌙' },
        { item: '⚪', nome: 'BRANCO', descricao: 'A cor branca como a nuvem ☁️' }
    ],
    alfabeto: [
        { item: '🐝', nome: 'A', descricao: 'A de ABELHA 🐝 - primeira letra do alfabeto!' },
        { item: '⚽', nome: 'B', descricao: 'B de BOLA ⚽ - segunda letra do alfabeto!' },
        { item: '🏠', nome: 'C', descricao: 'C de CASA 🏠 - terceira letra do alfabeto!' },
        { item: '🎲', nome: 'D', descricao: 'D de DADO 🎲 - quarta letra do alfabeto!' },
        { item: '🐘', nome: 'E', descricao: 'E de ELEFANTE 🐘 - quinta letra do alfabeto!' },
        { item: '🌸', nome: 'F', descricao: 'F de FLOR 🌸 - sexta letra do alfabeto!' },
        { item: '🐱', nome: 'G', descricao: 'G de GATO 🐱 - sétima letra do alfabeto!' },
        { item: '🦛', nome: 'H', descricao: 'H de HIPOPÓTAMO 🦛 - oitava letra do alfabeto!' },
        { item: '⛪', nome: 'I', descricao: 'I de IGREJA ⛪ - nona letra do alfabeto!' },
        { item: '🐞', nome: 'J', descricao: 'J de JOANINHA 🐞 - décima letra do alfabeto!' },
        { item: '🥝', nome: 'K', descricao: 'K de KIWI 🥝 - décima primeira letra!' },
        { item: '🦁', nome: 'L', descricao: 'L de LEÃO 🦁 - décima segunda letra!' },
        { item: '🐒', nome: 'M', descricao: 'M de MACACO 🐒 - décima terceira letra!' },
        { item: '☁️', nome: 'N', descricao: 'N de NUVEM ☁️ - décima quarta letra!' },
        { item: '🥚', nome: 'O', descricao: 'O de OVO 🥚 - décima quinta letra!' },
        { item: '🐧', nome: 'P', descricao: 'P de PINGUIM 🐧 - décima sexta letra!' },
        { item: '🧀', nome: 'Q', descricao: 'Q de QUEIJO 🧀 - décima sétima letra!' },
        { item: '🌹', nome: 'R', descricao: 'R de ROSA 🌹 - décima oitava letra!' },
        { item: '☀️', nome: 'S', descricao: 'S de SOL ☀️ - décima nona letra!' },
        { item: '🐢', nome: 'T', descricao: 'T de TARTARUGA 🐢 - vigésima letra!' },
        { item: '🍇', nome: 'U', descricao: 'U de UVA 🍇 - vigésima primeira letra!' },
        { item: '🐄', nome: 'V', descricao: 'V de VACA 🐄 - vigésima segunda letra!' },
        { item: '🧸', nome: 'W', descricao: 'W de URSO WASHINGTON 🧸 - vigésima terceira letra!' },
        { item: '🌿', nome: 'X', descricao: 'X de XAXIM 🌿 - vigésima quarta letra!' },
        { item: '🧘', nome: 'Y', descricao: 'Y de YOGA 🧘 - vigésima quinta letra!' },
        { item: '🦓', nome: 'Z', descricao: 'Z de ZEBRA 🦓 - última letra do alfabeto!' }
    ],
    vogais: [
        { item: '🅰️', nome: 'A', descricao: 'A de ABELHA 🐝 - primeira vogal!' },
        { item: '🇪', nome: 'E', descricao: 'E de ELEFANTE 🐘 - segunda vogal!' },
        { item: '🇮', nome: 'I', descricao: 'I de IGREJA ⛪ - terceira vogal!' },
        { item: '🅾️', nome: 'O', descricao: 'O de OVO 🥚 - quarta vogal!' },
        { item: '🇺', nome: 'U', descricao: 'U de UVA 🍇 - quinta vogal!' }
    ],
    animais: [
        { item: '🐶', nome: 'CACHORRO', descricao: 'O melhor amigo do homem! Faz AU AU 🐕' },
        { item: '🐱', nome: 'GATO', descricao: 'Bichinho carinhoso que faz MIAU 😸' },
        { item: '🐰', nome: 'COELHO', descricao: 'Saltitante e fofo, come cenoura 🥕' },
        { item: '🐹', nome: 'HAMSTER', descricao: 'Pequenino e corre na roda 🎡' },
        { item: '🐦', nome: 'PASSARINHO', descricao: 'Voa pelo céu e canta PIO PIO 🎵' },
        { item: '🐢', nome: 'TARTARUGA', descricao: 'Devagar e sempre, vive muito tempo ⏰' }
    ],
    alimentos: [
        { item: '🍎', nome: 'MAÇÃ', descricao: 'Fruta vermelha, crocante e doce 🌟' },
        { item: '🍌', nome: 'BANANA', descricao: 'Fruta amarela, macia e nutritiva 💪' },
        { item: '🍊', nome: 'LARANJA', descricao: 'Fruta cítrica, cheia de vitamina C ☀️' },
        { item: '🍇', nome: 'UVA', descricao: 'Frutinhas roxas em cachos 🍷' },
        { item: '🥕', nome: 'CENOURA', descricao: 'Legume laranja, bom para os olhos 👀' },
        { item: '🍯', nome: 'MEL', descricao: 'Doce natural feito pelas abelhas 🐝' }
    ],
    transportes: [
        { item: '🚗', nome: 'CARRO', descricao: 'Transporte de 4 rodas, faz VRUM VRUM 🛣️' },
        { item: '🚌', nome: 'ÔNIBUS', descricao: 'Transporte coletivo, leva muitas pessoas 👥' },
        { item: '🚲', nome: 'BICICLETA', descricao: 'Duas rodas, pedalamos para andar 🚴' },
        { item: '✈️', nome: 'AVIÃO', descricao: 'Voa pelo céu, faz UIIIIIII ☁️' },
        { item: '🚂', nome: 'TREM', descricao: 'Anda nos trilhos, faz CHOO CHOO 🛤️' }
    ],
    silabas: [
        // Família do B
        { item: '🍌', nome: 'BA', descricao: 'BA como em BANANA 🍌 - Exemplos: BANANA, BALA, BACIA, BARATA, BATATA' },
        { item: '👶', nome: 'BE', descricao: 'BE como em BEBÊ 👶 - Exemplos: BEBÊ, BEIJO, BELA, BECO, BERÇO' },
        { item: '🚲', nome: 'BI', descricao: 'BI como em BICICLETA 🚲 - Exemplos: BICICLETA, BICO, BIBLIOTECA, BIGODE, BISCOITO' },
        { item: '⚽', nome: 'BO', descricao: 'BO como em BOLA ⚽ - Exemplos: BOLA, BOCA, BONECA, BOLO, BORBOLETA' },
        { item: '🌻', nome: 'BU', descricao: 'BU como em BUQUÊ 🌻 - Exemplos: BUQUÊ, BURACO, BUZINA, BUCHADA, BUTIQUE' },
        
        // Família do C
        { item: '🏠', nome: 'CA', descricao: 'CA como em CASA 🏠 - Exemplos: CASA, CARRO, CACHORRO, CAMELO, CADEIRA' },
        { item: '🥕', nome: 'CE', descricao: 'CE como em CENOURA 🥕 - Exemplos: CENOURA, CERCA, CEREBRO, CERTEZA, CENTRO' },
        { item: '🎪', nome: 'CI', descricao: 'CI como em CIRCO 🎪 - Exemplos: CIRCO, CIDADE, CINEMA, CINCO, CINTO' },
        { item: '🐰', nome: 'CO', descricao: 'CO como em COELHO 🐰 - Exemplos: COELHO, CORAÇÃO, COBRA, COPO, COMIDA' },
        { item: '🧊', nome: 'CU', descricao: 'CU como em CUBO 🧊 - Exemplos: CUBO, CURVA, CUIDADO, CULTURA, CURSO' },
        
        // Família do D
        { item: '🎲', nome: 'DA', descricao: 'DA como em DADO 🎲 - Exemplos: DANÇA, DADO, DAMA, DATA, DANILO' },
        { item: '👆', nome: 'DE', descricao: 'DE como em DEDO 👆 - Exemplos: DEDO, DESENHO, DENTISTA, DESEJO, DEPRESSA' },
        { item: '💰', nome: 'DI', descricao: 'DI como em DINHEIRO 💰 - Exemplos: DINHEIRO, DIREITA, DIFERENTE, DIFÍCIL, DICIONÁRIO' },
        { item: '🍬', nome: 'DO', descricao: 'DO como em DOCE 🍬 - Exemplos: DOCE, DOUTOR, DOMINGO, DONINHA, DORMINDO' },
        { item: '🦆', nome: 'DU', descricao: 'DU como em PATO 🦆 - Exemplos: DUENDE, DURANTE, DUPLA, DUREZA, DURAÇÃO' },
        
        // Família do F
        { item: '👨‍👩‍👧‍👦', nome: 'FA', descricao: 'FA como em FAMÍLIA 👨‍👩‍👧‍👦 - Exemplos: FAMÍLIA, FACA, FANTASIA, FARINHA, FARMÁCIA' },
        { item: '🎉', nome: 'FE', descricao: 'FE como em FESTA 🎉 - Exemplos: FESTA, FERRO, FELIZ, FEIJÃO, FERRAMENTA' },
        { item: '🎀', nome: 'FI', descricao: 'FI como em FITA 🎀 - Exemplos: FITA, FIGO, FILHO, FIGURA, FILTRO' },
        { item: '🔥', nome: 'FO', descricao: 'FO como em FOGO 🔥 - Exemplos: FOGO, FOLHA, FORMIGA, FORTE, FOTOGRAFIA' },
        { item: '⚽', nome: 'FU', descricao: 'FU como em FUTEBOL ⚽ - Exemplos: FUTEBOL, FURIOSO, FUMAÇA, FUTURO, FUZIL' },
        
        // Família do G
        { item: '🐔', nome: 'GA', descricao: 'GA como em GALINHA 🐔 - Exemplos: GALINHA, GATO, GARRAFA, GARFO, GASOLINA' },
        { item: '🧊', nome: 'GE', descricao: 'GE como em GELO 🧊 - Exemplos: GELO, GENTE, GENERAL, GEOGRAFIA, GEOMETRIA' },
        { item: '🦒', nome: 'GI', descricao: 'GI como em GIRAFA 🦒 - Exemplos: GIRAFA, GIGANTE, GINÁSTICA, GIRA, GINCANA' },
        { item: '💧', nome: 'GO', descricao: 'GO como em GOTA 💧 - Exemplos: GOTA, GORRO, GOSTAR, GOVERNO, GORDURA' },
        { item: '☂️', nome: 'GU', descricao: 'GU como em GUARDA-CHUVA ☂️ - Exemplos: GUARDA-CHUVA, GUERRA, GUITARRA, GUIA, GULOSO' },
        
        // Família do H
        { item: '🎵', nome: 'HA', descricao: 'HA como em HARPA 🎵 - Exemplos: HARPA, HARMONIA, HASTE, HABITAÇÃO, HÁBITO' },
        { item: '🍃', nome: 'HE', descricao: 'HE como em HERA 🍃 - Exemplos: HERÓI, HERANÇA, HELICÓPTERO, HEMISFÉRIO, HEMATOMA' },
        { item: '🎭', nome: 'HI', descricao: 'HI como em HISTÓRIA 🎭 - Exemplos: HISTÓRIA, HIDROGÊNIO, HIPOPÓTAMO, HIENA, HIGIENE' },
        { item: '⏰', nome: 'HO', descricao: 'HO como em HORA ⏰ - Exemplos: HORA, HOJE, HOMEM, HORIZONTE, HOSPITAL' },
        { item: '👨', nome: 'HU', descricao: 'HU como em HUGO 👨 - Exemplos: HUMOR, HUMANO, HUMILDE, HÚMUS, HÚNGARO' },
        
        // Família do J
        { item: '🐊', nome: 'JA', descricao: 'JA como em JACARÉ 🐊 - Exemplos: JACARÉ, JANELA, JARDIM, JARRA, JAMAIS' },
        { item: '🚙', nome: 'JE', descricao: 'JE como em JEEP 🚙 - Exemplos: JEEP, JEANS, JEITO, JEJUM, JESUS' },
        { item: '🚗', nome: 'JI', descricao: 'JI como em JIPE 🚗 - Exemplos: JIPE, JIRAFA, JINGLE, JILÓ, JIQUIÁ' },
        { item: '🎮', nome: 'JO', descricao: 'JO como em JOGO 🎮 - Exemplos: JOGO, JORNAL, JOELHO, JOVEM, JÓIA' },
        { item: '👨‍⚖️', nome: 'JU', descricao: 'JU como em JUIZ 👨‍⚖️ - Exemplos: JUIZ, JUNHO, JUNTO, JUSTIÇA, JUVENTUDE' },
        
        // Família do K
        { item: '🥋', nome: 'KA', descricao: 'KA como em KARATÊ 🥋 - Exemplos: KARATÊ, KARAOKÊ, KARMA, KAMIKAZE, KANGURU' },
        { item: '🍅', nome: 'KE', descricao: 'KE como em KETCHUP 🍅 - Exemplos: KETCHUP, KERMES, KERALA, KERMIT, KELVIN' },
        { item: '🥝', nome: 'KI', descricao: 'KI como em KIWI 🥝 - Exemplos: KIWI, KILOGRAMA, KIMONO, KITKAT, KINDLE' },
        { item: '🐨', nome: 'KO', descricao: 'KO como em KOALA 🐨 - Exemplos: KOALA, KOSOVO, KODAK, KOREA, KOBE' },
        { item: '🏆', nome: 'KU', descricao: 'KU como em KUNG FU 🏆 - Exemplos: KUNG FU, KURDO, KUWAIT, KUBRICK, KUTCHER' },
        
        // Família do L
        { item: '🌊', nome: 'LA', descricao: 'LA como em LAGO 🌊 - Exemplos: LAGO, LARANJA, LÁPIS, LAVADORA, LATA' },
        { item: '🦁', nome: 'LE', descricao: 'LE como em LEÃO 🦁 - Exemplos: LEÃO, LETRA, LENDA, LEGUME, LEITURA' },
        { item: '📖', nome: 'LI', descricao: 'LI como em LIVRO 📖 - Exemplos: LIVRO, LIMA, LINHA, LIMÃO, LIBERDADE' },
        { item: '🐺', nome: 'LO', descricao: 'LO como em LOBO 🐺 - Exemplos: LOBO, LOJA, LONGE, LOUSA, LOCOMOTIVA' },
        { item: '🌙', nome: 'LU', descricao: 'LU como em LUA 🌙 - Exemplos: LUA, LUGAR, LUPA, LUXO, LÚDICO' },
        
        // Família do M
        { item: '👩', nome: 'MA', descricao: 'MA como em MAMÃE 👩 - Exemplos: MAMÃE, MAÇÃ, MALA, MAPA, MASSA' },
        { item: '🍯', nome: 'ME', descricao: 'ME como em MEL 🍯 - Exemplos: MEL, MESA, MÉDICO, MERGULHO, MEMÓRIA' },
        { item: '🐱', nome: 'MI', descricao: 'MI como em MIAU 🐱 - Exemplos: MIAU, MILHO, MINUTO, MINGAU, MINHOCA' },
        { item: '🍓', nome: 'MO', descricao: 'MO como em MORANGO 🍓 - Exemplos: MORANGO, MOCHILA, MODELO, MOEDA, MONTANHA' },
        { item: '🎵', nome: 'MU', descricao: 'MU como em MÚSICA 🎵 - Exemplos: MÚSICA, MURO, MUITO, MUNDO, MUSEU' },
        
        // Família do N
        { item: '🏊', nome: 'NA', descricao: 'NA como em NATAÇÃO 🏊 - Exemplos: NATAÇÃO, NARIZ, NASCIMENTO, NATUREZA, NAVEGAÇÃO' },
        { item: '☁️', nome: 'NE', descricao: 'NE como em NEVOEIRO ☁️ - Exemplos: NEVOEIRO, NERVOSO, NECESSÁRIO, NEGÓCIO, NEUTRO' },
        { item: '🪺', nome: 'NI', descricao: 'NI como em NINHO 🪺 - Exemplos: NINHO, NÍVEL, NICKNAME, NIGÉRIA, NITIDEZ' },
        { item: '🌃', nome: 'NO', descricao: 'NO como em NOITE 🌃 - Exemplos: NOITE, NOME, NORTE, NOVELA, NÚMERO' },
        { item: '☁️', nome: 'NU', descricao: 'NU como em NUVEM ☁️ - Exemplos: NUVEM, NÚCLEO, NÚMERO, NUTRIÇÃO, NUCA' },
        
        // Família do P
        { item: '👨', nome: 'PA', descricao: 'PA como em PAPAI 👨 - Exemplos: PAPAI, PALHAÇO, PATO, PAREDE, PAPEL' },
        { item: '🦶', nome: 'PE', descricao: 'PE como em PÉ 🦶 - Exemplos: PÉ, PEIXE, PESSOA, PEQUENO, PERGUNTAR' },
        { item: '🐧', nome: 'PI', descricao: 'PI como em PINGUIM 🐧 - Exemplos: PINGUIM, PIPOCA, PIANO, PINTURA, PILHA' },
        { item: '🐷', nome: 'PO', descricao: 'PO como em PORCO 🐷 - Exemplos: PORCO, PORTA, POLVO, POMAR, POLÍTICA' },
        { item: '🦘', nome: 'PU', descricao: 'PU como em PULAR 🦘 - Exemplos: PULAR, PULMÃO, PUXAR, PÚBLICO, PUREZA' },
        
        // Família do Q
        { item: '🖼️', nome: 'QUA', descricao: 'QUA como em QUADRO 🖼️ - Exemplos: QUADRO, QUANDO, QUANTIDADE, QUARTO, QUALIDADE' },
        { item: '🧀', nome: 'QUE', descricao: 'QUE como em QUEIJO 🧀 - Exemplos: QUEIJO, QUENTE, QUEBRAR, QUERIDO, QUESTÃO' },
        { item: '🍳', nome: 'QUI', descricao: 'QUI como em QUINDIM 🍳 - Exemplos: QUINDIM, QUINTAL, QUÍMICA, QUILO, QUIROPRAXIA' },
        { item: '📊', nome: 'QUO', descricao: 'QUO como em QUOTA 📊 - Exemplos: QUOTA, QUOTIDIANO, QUORUM, QUOTIENTE, QUOCIENTE' },
        
        // Família do R
        { item: '👸', nome: 'RA', descricao: 'RA como em RAINHA 👸 - Exemplos: RAINHA, RATO, RÁPIDO, RAPOSA, RABANETE' },
        { item: '⏰', nome: 'RE', descricao: 'RE como em RELÓGIO ⏰ - Exemplos: RELÓGIO, REDE, REGRA, RECEITA, RESTAURANTE' },
        { item: '😂', nome: 'RI', descricao: 'RI como em RISO 😂 - Exemplos: RISO, RIO, RICO, RITMO, RINOCERONTE' },
        { item: '🌹', nome: 'RO', descricao: 'RO como em ROSA 🌹 - Exemplos: ROSA, ROUPA, RODA, ROBÔ, ROMANCE' },
        { item: '🛣️', nome: 'RU', descricao: 'RU como em RUA 🛣️ - Exemplos: RUA, RUÍDO, RUGBY, RUSSO, RURAL' },
        
        // Família do S
        { item: '🐸', nome: 'SA', descricao: 'SA como em SAPO 🐸 - Exemplos: SAPO, SAPATO, SALA, SABER, SANGUE' },
        { item: '🌱', nome: 'SE', descricao: 'SE como em SEMENTE 🌱 - Exemplos: SEMENTE, SEGUNDO, SEGREDO, SETEMBRO, SEREIA' },
        { item: '🤫', nome: 'SI', descricao: 'SI como em SILÊNCIO 🤫 - Exemplos: SILÊNCIO, SIMPLES, SINO, SISTEMA, SÍMBOLO' },
        { item: '☀️', nome: 'SO', descricao: 'SO como em SOL ☀️ - Exemplos: SOL, SORRISO, SOFÁ, SOLDADO, SONHO' },
        { item: '🧃', nome: 'SU', descricao: 'SU como em SUCO 🧃 - Exemplos: SUCO, SUJO, SURPRESA, SUCESSO, SUAVIDADE' },
        
        // Família do T
        { item: '🏆', nome: 'TA', descricao: 'TA como em TAÇA 🏆 - Exemplos: TAÇA, TARTARUGA, TATU, TALVEZ, TARTARO' },
        { item: '📺', nome: 'TE', descricao: 'TE como em TELEVISÃO 📺 - Exemplos: TELEVISÃO, TELA, TERRA, TEMPO, TELEFONE' },
        { item: '🐅', nome: 'TI', descricao: 'TI como em TIGRE 🐅 - Exemplos: TIGRE, TIPO, TIJOLO, TÍTULO, TINTA' },
        { item: '🍅', nome: 'TO', descricao: 'TO como em TOMATE 🍅 - Exemplos: TOMATE, TORRE, TOURO, TOTAL, TORNADO' },
        { item: '🦈', nome: 'TU', descricao: 'TU como em TUBARÃO 🦈 - Exemplos: TUBARÃO, TUDO, TULIPA, TURBINA, TURMA' },
        
        // Família do V
        { item: '🐄', nome: 'VA', descricao: 'VA como em VACA 🐄 - Exemplos: VACA, VASO, VARINHA, VAPOR, VALOR' },
        { item: '🕯️', nome: 'VE', descricao: 'VE como em VELA 🕯️ - Exemplos: VELA, VERDE, VERDADE, VEADO, VELOCIDADE' },
        { item: '🍇', nome: 'VI', descricao: 'VI como em VIDA 🍇 - Exemplos: VIDA, VIAGEM, VIDRO, VIOLÃO, VINTE' },
        { item: '✈️', nome: 'VO', descricao: 'VO como em VOAR ✈️ - Exemplos: VOAR, VOZ, VOVÔ, VOLUME, VOLANTE' },
        { item: '🌋', nome: 'VU', descricao: 'VU como em VULCÃO 🌋 - Exemplos: VULCÃO, VULNERÁVEL, VULGAR, VULTO, VULCANOLOGIA' },
        
        // Família do W
        { item: '🧸', nome: 'WA', descricao: 'WA como em WASHINGTON 🧸 - Exemplos: WASHINGTON, WAFFLE, WALKMAN, WALMART, WALLACE' },
        { item: '🌐', nome: 'WE', descricao: 'WE como em WEB 🌐 - Exemplos: WEBSITE, WESTERN, WEEKEND, WELCOME, WELLINGTON' },
        { item: '📱', nome: 'WI', descricao: 'WI como em WIFI 📱 - Exemplos: WIFI, WINDOWS, WILMINGTON, WISCONSIN, WILLIAM' },
        { item: '🌍', nome: 'WO', descricao: 'WO como em WORLD 🌍 - Exemplos: WORKSHOP, WORLD, WOMAN, WONDERFUL, WORKOUT' },
        
        // Família do X
        { item: '☕', nome: 'XA', descricao: 'XA como em XAROPE ☕ - Exemplos: XAROPE, XAMPU, XALE, XAXIM, XAMÃ' },
        { item: '🤠', nome: 'XE', descricao: 'XE como em XERIFE 🤠 - Exemplos: XERIFE, XEROX, XEQUE, XENOFOBIA, XERETA' },
        { item: '☕', nome: 'XI', descricao: 'XI como em XÍCARA ☕ - Exemplos: XÍCARA, XINGAR, XINXIM, XILOGRAVURA, XIITA' },
        { item: '🍫', nome: 'XO', descricao: 'XO como em CHOCOLATE 🍫 - Exemplos: XODÓ, XONGAS, XOQUE, XOXOTA, XOTE' },
        { item: '🥬', nome: 'XU', descricao: 'XU como em XUXA 🥬 - Exemplos: XUXA, XUXU, XUCRUTE, XUCRO, XUPA' },
        
        // Família do Y
        { item: '🧘', nome: 'YA', descricao: 'YA como em YOGA 🧘 - Exemplos: YACHT, YAHOO, YAKULT, YAMAHA, YANDEX' },
        { item: '🧊', nome: 'YE', descricao: 'YE como em YETI 🧊 - Exemplos: YELLOW, YESTERDAY, YEMEN, YELTSIN, YEAST' },
        { item: '☯️', nome: 'YI', descricao: 'YI como em YIN ☯️ - Exemplos: YINYANG, YIDDISH, YITZHAK, YIDDISH, YIPS' },
        { item: '🧘', nome: 'YO', descricao: 'YO como em YOGA 🧘 - Exemplos: YOGA, YOUTUBE, YOUNG, YOUR, YOGURT' },
        
        // Família do Z
        { item: '🦓', nome: 'ZA', descricao: 'ZA como em ZEBRA 🦓 - Exemplos: ZANGADO, ZARABATANA, ZARPAR, ZAGUEIRO, ZANGAR' },
        { item: '🦓', nome: 'ZE', descricao: 'ZE como em ZEBRA 🦓 - Exemplos: ZEBRA, ZEPPELIN, ZELO, ZEPELIM, ZENITE' },
        { item: '🤐', nome: 'ZI', descricao: 'ZI como em ZIPER 🤐 - Exemplos: ZIPER, ZINCO, ZIGUEZAGUE, ZINCO, ZIPADO' },
        { item: '🦓', nome: 'ZO', descricao: 'ZO como em ZOOLÓGICO 🦓 - Exemplos: ZOOLÓGICO, ZONA, ZODÍACO, ZOOM, ZOMBARIA' },
        { item: '🐝', nome: 'ZU', descricao: 'ZU como em ZUMBIDO 🐝 - Exemplos: ZUMBIDO, ZUNIR, ZURETA, ZURRAR, ZUAVO' }
    ],
    numeros: [
        { item: '1️⃣', nome: 'UM', descricao: 'Número 1 - Um patinho 🦆' },
        { item: '2️⃣', nome: 'DOIS', descricao: 'Número 2 - Dois olhinhos 👀' },
        { item: '3️⃣', nome: 'TRÊS', descricao: 'Número 3 - Três ursinhos 🧸🧸🧸' },
        { item: '4️⃣', nome: 'QUATRO', descricao: 'Número 4 - Quatro patas do gato 🐱' },
        { item: '5️⃣', nome: 'CINCO', descricao: 'Número 5 - Cinco dedos da mão ✋' }
    ],
    emocoes: [
        { item: '😊', nome: 'FELIZ', descricao: 'Sentimento de alegria e satisfação 😊' },
        { item: '😢', nome: 'TRISTE', descricao: 'Sentimento de tristeza e melancolia 😢' },
        { item: '😠', nome: 'BRAVO', descricao: 'Sentimento de raiva e irritação 😠' },
        { item: '😨', nome: 'MEDO', descricao: 'Sentimento de susto e apreensão 😨' },
        { item: '😴', nome: 'SONO', descricao: 'Sentimento de cansaço e sonolência 😴' }
    ],
    rotina: [
        { item: '🌅', nome: 'ACORDAR', descricao: 'Levantar da cama de manhã 🌅' },
        { item: '🦷', nome: 'ESCOVAR DENTES', descricao: 'Higiene bucal matinal 🦷' },
        { item: '🚿', nome: 'TOMAR BANHO', descricao: 'Higiene pessoal matinal 🚿' },
        { item: '🍳', nome: 'CAFÉ DA MANHÃ', descricao: 'Primeira refeição do dia 🍳' },
        { item: '📚', nome: 'ESTUDAR', descricao: 'Aprender coisas novas 📚' },
        { item: '😴', nome: 'DORMIR', descricao: 'Descansar à noite 😴' }
    ],
    frases: [
        { item: '👋', nome: 'OLÁ!', descricao: 'Cumprimento amigável 👋' },
        { item: '😊', nome: 'BOM DIA!', descricao: 'Saudação matinal ☀️' },
        { item: '❤️', nome: 'EU TE AMO', descricao: 'Expressão de amor ❤️' },
        { item: '🙏', nome: 'OBRIGADO', descricao: 'Agradecimento sincero 🙏' },
        { item: '🍽️', nome: 'VAMOS COMER', descricao: 'Convite para comer 🍽️' },
        { item: '🎮', nome: 'VAMOS BRINCAR', descricao: 'Convite para brincar 🎮' }
    ],
    jogos: jogosFuncionais
};

const silabasData = {
    'BA': {
        silaba: 'BA',
        emoji: '🍌',
        exemplos: ['BANANA', 'BALA', 'BACIA', 'BARATA', 'BATATA']
    },
    'BE': {
        silaba: 'BE',
        emoji: '👶',
        exemplos: ['BEBÊ', 'BEIJO', 'BELA', 'BECO', 'BERÇO']
    },
    'BI': {
        silaba: 'BI',
        emoji: '🚲',
        exemplos: ['BICICLETA', 'BICO', 'BIBLIOTECA', 'BIGODE', 'BISCOITO']
    },
    'BO': {
        silaba: 'BO',
        emoji: '⚽',
        exemplos: ['BOLA', 'BOCA', 'BONECA', 'BOLO', 'BORBOLETA']
    },
    'BU': {
        silaba: 'BU',
        emoji: '🌻',
        exemplos: ['BUQUÊ', 'BURACO', 'BUZINA', 'BUCHADA', 'BUTIQUE']
    },
    'CA': {
        silaba: 'CA',
        emoji: '🏠',
        exemplos: ['CASA', 'CARRO', 'CACHORRO', 'CAMELO', 'CADEIRA']
    },
    'CE': {
        silaba: 'CE',
        emoji: '🥕',
        exemplos: ['CENOURA', 'CERCA', 'CEREBRO', 'CERTEZA', 'CENTRO']
    },
    'GE': {
        silaba: 'GE',
        emoji: '🧊',
        exemplos: ['GELO', 'GENTE', 'GENERAL', 'GEOGRAFIA', 'GEOMETRIA']
    },
    'GI': {
        silaba: 'GI',
        emoji: '🦒',
        exemplos: ['GIRAFA', 'GIGANTE', 'GINÁSTICA', 'GIRA', 'GINCANA']
    },
    'GO': {
        silaba: 'GO',
        emoji: '💧',
        exemplos: ['GOTA', 'GORRO', 'GOSTAR', 'GOVERNO', 'GORDURA']
    },
    'GU': {
        silaba: 'GU',
        emoji: '☂️',
        exemplos: ['GUARDA-CHUVA', 'GUERRA', 'GUITARRA', 'GUIA', 'GULOSO']
    },
    'JA': {
        silaba: 'JA',
        emoji: '🐊',
        exemplos: ['JACARÉ', 'JANELA', 'JARDIM', 'JARRA', 'JAMAIS']
    },
    'JE': {
        silaba: 'JE',
        emoji: '🚙',
        exemplos: ['JEEP', 'JEANS', 'JEITO', 'JEJUM', 'JESUS']
    },
    'JI': {
        silaba: 'JI',
        emoji: '🦒',
        exemplos: ['JIPE', 'JIRAFA', 'JINGLE', 'JILÓ', 'JIQUIÁ']
    },
    'JO': {
        silaba: 'JO',
        emoji: '🎮',
        exemplos: ['JOGO', 'JORNAL', 'JOELHO', 'JOVEM', 'JÓIA']
    },
    'JU': {
        silaba: 'JU',
        emoji: '👨‍⚖️',
        exemplos: ['JUIZ', 'JUNHO', 'JUNTO', 'JUSTIÇA', 'JUVENTUDE']
    },
    'KA': {
        silaba: 'KA',
        emoji: '🥋',
        exemplos: ['KARATÊ', 'KARAOKÊ', 'KARMA', 'KAMIKAZE', 'KANGURU']
    },
    'KE': {
        silaba: 'KE',
        emoji: '🍅',
        exemplos: ['KETCHUP', 'KERMES', 'KERALA', 'KERMIT', 'KELVIN']
    },
    'KI': {
        silaba: 'KI',
        emoji: '🥝',
        exemplos: ['KIWI', 'KILOGRAMA', 'KIMONO', 'KITKAT', 'KINDLE']
    },
    'KO': {
        silaba: 'KO',
        emoji: '🐨',
        exemplos: ['KOALA', 'KOSOVO', 'KODAK', 'KOREA', 'KOBE']
    },
    'KU': {
        silaba: 'KU',
        emoji: '🏆',
        exemplos: ['KUNG FU', 'KURDO', 'KUWAIT', 'KUBRICK', 'KUTCHER']
    },
    'LA': {
        silaba: 'LA',
        emoji: '🌊',
        exemplos: ['LAGO', 'LARANJA', 'LÁPIS', 'LAVADORA', 'LATA']
    },
    'LE': {
        silaba: 'LE',
        emoji: '🦁',
        exemplos: ['LEÃO', 'LETRA', 'LENDA', 'LEGUME', 'LEITURA']
    },
    'LI': {
        silaba: 'LI',
        emoji: '📖',
        exemplos: ['LIVRO', 'LIMA', 'LINHA', 'LIMÃO', 'LIBERDADE']
    },
    'LO': {
        silaba: 'LO',
        emoji: '🐺',
        exemplos: ['LOBO', 'LOJA', 'LONGE', 'LOUSA', 'LOCOMOTIVA']
    },
    'LU': {
        silaba: 'LU',
        emoji: '🌙',
        exemplos: ['LUA', 'LUGAR', 'LUPA', 'LUXO', 'LÚDICO']
    },
    'MA': {
        silaba: 'MA',
        emoji: '👩',
        exemplos: ['MAMÃE', 'MAÇÃ', 'MALA', 'MAPA', 'MASSA']
    },
    'ME': {
        silaba: 'ME',
        emoji: '🍯',
        exemplos: ['MEL', 'MESA', 'MÉDICO', 'MERGULHO', 'MEMÓRIA']
    },
    'MI': {
        silaba: 'MI',
        emoji: '🐱',
        exemplos: ['MIAU', 'MILHO', 'MINUTO', 'MINGAU', 'MINHOCA']
    },
    'MO': {
        silaba: 'MO',
        emoji: '🦋',
        exemplos: ['MORANGO', 'MOCHILA', 'MODELO', 'MOEDA', 'MONTANHA']
    },
    'MU': {
        silaba: 'MU',
        emoji: '🎵',
        exemplos: ['MÚSICA', 'MURO', 'MUITO', 'MUNDO', 'MUSEU']
    },
    'NA': {
        silaba: 'NA',
        emoji: '🏊',
        exemplos: ['NATAÇÃO', 'NARIZ', 'NASCIMENTO', 'NATUREZA', 'NAVEGAÇÃO']
    },
    'NE': {
        silaba: 'NE',
        emoji: '☁️',
        exemplos: ['NEVOEIRO', 'NERVOSO', 'NECESSÁRIO', 'NEGÓCIO', 'NEUTRO']
    },
    'NI': {
        silaba: 'NI',
        emoji: '🥜',
        exemplos: ['NINHO', 'NÍVEL', 'NICKNAME', 'NIGÉRIA', 'NITIDEZ']
    },
    'NO': {
        silaba: 'NO',
        emoji: '🌃',
        exemplos: ['NOITE', 'NOME', 'NORTE', 'NOVELA', 'NÚMERO']
    },
    'NU': {
        silaba: 'NU',
        emoji: '☁️',
        exemplos: ['NUVEM', 'NÚCLEO', 'NÚMERO', 'NUTRIÇÃO', 'NUCA']
    },
    'PA': {
        silaba: 'PA',
        emoji: '👨',
        exemplos: ['PAPAI', 'PALHAÇO', 'PATO', 'PAREDE', 'PAPEL']
    },
    'PE': {
        silaba: 'PE',
        emoji: '🦶',
        exemplos: ['PÉ', 'PEIXE', 'PESSOA', 'PEQUENO', 'PERGUNTAR']
    },
    'PI': {
        silaba: 'PI',
        emoji: '🐧',
        exemplos: ['PINGUIM', 'PIPOCA', 'PIANO', 'PINTURA', 'PILHA']
    },
    'PO': {
        silaba: 'PO',
        emoji: '🐷',
        exemplos: ['PORCO', 'PORTA', 'POLVO', 'POMAR', 'POLÍTICA']
    },
    'PU': {
        silaba: 'PU',
        emoji: '🦘',
        exemplos: ['PULAR', 'PULMÃO', 'PUXAR', 'PÚBLICO', 'PUREZA']
    },
    'QUA': {
        silaba: 'QUA',
        emoji: '🖼️',
        exemplos: ['QUADRO', 'QUANDO', 'QUANTIDADE', 'QUARTO', 'QUALIDADE']
    },
    'QUE': {
        silaba: 'QUE',
        emoji: '🧀',
        exemplos: ['QUEIJO', 'QUENTE', 'QUEBRAR', 'QUERIDO', 'QUESTÃO']
    },
    'QUI': {
        silaba: 'QUI',
        emoji: '🍳',
        exemplos: ['QUINDIM', 'QUINTAL', 'QUÍMICA', 'QUILO', 'QUIROPRAXIA']
    },
    'QUO': {
        silaba: 'QUO',
        emoji: '📊',
        exemplos: ['QUOTA', 'QUOTIDIANO', 'QUORUM', 'QUOTIENTE', 'QUOCIENTE']
    },
    'RA': {
        silaba: 'RA',
        emoji: '👸',
        exemplos: ['RAINHA', 'RATO', 'RÁPIDO', 'RAPOSA', 'RABANETE']
    },
    'RE': {
        silaba: 'RE',
        emoji: '⏰',
        exemplos: ['RELÓGIO', 'REDE', 'REGRA', 'RECEITA', 'RESTAURANTE']
    },
    'RI': {
        silaba: 'RI',
        emoji: '😂',
        exemplos: ['RISO', 'RIO', 'RICO', 'RITMO', 'RINOCERONTE']
    },
    'RO': {
        silaba: 'RO',
        emoji: '🌹',
        exemplos: ['ROSA', 'ROUPA', 'RODA', 'ROBÔ', 'ROMANCE']
    },
    'RU': {
        silaba: 'RU',
        emoji: '🛣️',
        exemplos: ['RUA', 'RUÍDO', 'RUGBY', 'RUSSO', 'RURAL']
    },
    'SA': {
        silaba: 'SA',
        emoji: '🐸',
        exemplos: ['SAPO', 'SAPATO', 'SALA', 'SABER', 'SANGUE']
    },
    'SE': {
        silaba: 'SE',
        emoji: '🌱',
        exemplos: ['SEMENTE', 'SEGUNDO', 'SEGREDO', 'SETEMBRO', 'SEREIA']
    },
    'SI': {
        silaba: 'SI',
        emoji: '🤫',
        exemplos: ['SILÊNCIO', 'SIMPLES', 'SINO', 'SISTEMA', 'SÍMBOLO']
    },
    'SO': {
        silaba: 'SO',
        emoji: '☀️',
        exemplos: ['SOL', 'SORRISO', 'SOFÁ', 'SOLDADO', 'SONHO']
    },
    'SU': {
        silaba: 'SU',
        emoji: '💦',
        exemplos: ['SUCO', 'SUJO', 'SURPRESA', 'SUCESSO', 'SUAVIDADE']
    },
    'TA': {
        silaba: 'TA',
        emoji: '🏆',
        exemplos: ['TAÇA', 'TARTARUGA', 'TATU', 'TALVEZ', 'TARTARO']
    },
    'TE': {
        silaba: 'TE',
        emoji: '📺',
        exemplos: ['TELEVISÃO', 'TELA', 'TERRA', 'TEMPO', 'TELEFONE']
    },
    'TI': {
        silaba: 'TI',
        emoji: '🐅',
        exemplos: ['TIGRE', 'TIPO', 'TIJOLO', 'TÍTULO', 'TINTA']
    },
    'TO': {
        silaba: 'TO',
        emoji: '🍅',
        exemplos: ['TOMATE', 'TORRE', 'TOURO', 'TOTAL', 'TORNADO']
    },
    'TU': {
        silaba: 'TU',
        emoji: '🦈',
        exemplos: ['TUBARÃO', 'TUDO', 'TULIPA', 'TURBINA', 'TURMA']
    },
    'VA': {
        silaba: 'VA',
        emoji: '🐄',
        exemplos: ['VACA', 'VASO', 'VARINHA', 'VAPOR', 'VALOR']
    },
    'VE': {
        silaba: 'VE',
        emoji: '🕯️',
        exemplos: ['VELA', 'VERDE', 'VERDADE', 'VEADO', 'VELOCIDADE']
    },
    'VI': {
        silaba: 'VI',
        emoji: '🍇',
        exemplos: ['VIDA', 'VIAGEM', 'VIDRO', 'VIOLÃO', 'VINTE']
    },
    'VO': {
        silaba: 'VO',
        emoji: '✈️',
        exemplos: ['VOAR', 'VOZ', 'VOVÔ', 'VOLUME', 'VOLANTE']
    },
    'VU': {
        silaba: 'VU',
        emoji: '🌋',
        exemplos: ['VULCÃO', 'VULNERÁVEL', 'VULGAR', 'VULTO', 'VULCANOLOGIA']
    },
    // ... adicione o resto das sílabas se necessário
    'ZU': {
        silaba: 'ZU',
        emoji: '🐝',
        exemplos: ['ZUMBIDO', 'ZUNIR', 'ZURETA', 'ZURRAR', 'ZUAVO']
    }
};

// Sistema de conquistas
const conquistas = [
    { id: 'primeira_letra', nome: 'Primeira Letra', descricao: 'Aprendeu sua primeira letra!', icone: '📝' },
    { id: 'primeira_palavra', nome: 'Primeira Palavra', descricao: 'Aprendeu sua primeira palavra!', icone: '📖' },
    { id: 'todas_cores', nome: 'Arco-íris', descricao: 'Aprendeu todas as cores!', icone: '🌈' },
    { id: 'todos_numeros', nome: 'Matemático', descricao: 'Aprendeu todos os números!', icone: '🔢' },
    { id: 'persistence', nome: 'Persistente', descricao: 'Usou a plataforma por 7 dias!', icone: '💪' }
];

// Função para carregar conteúdo
function carregarConteudo() {
    const dadosAtuais = conteudo[modo][atual];
    const activity = document.getElementById('activity');
    
    if (!dadosAtuais) {
        Debug.log('Dados não encontrados para o modo atual', 'erro');
        return;
    }
    
    if (modo === 'jogos' && dadosAtuais.tipo) {
        if (dadosAtuais.tipo === 'menu' || dadosAtuais.nome === 'ESCOLHER JOGO') {
            jogosInterativos.mostrarMenuJogos();
            return;
        }
    }
    
    const isEmoji = dadosAtuais.item.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[\u2600-\u27FF]/);
    const classe = isEmoji ? 'emoji' : (dadosAtuais.item.length === 1 ? 'letter' : 'word');
    
    let jogarButton = '';
    if (modo === 'jogos' && dadosAtuais.tipo) {
        jogarButton = `
            <button class="jogar-btn" onclick="iniciarJogoEspecifico('${dadosAtuais.tipo}')" 
                    style="background: #4caf50; color: white; border: none; padding: 15px 30px; 
                           border-radius: 25px; font-size: 18px; cursor: pointer; margin: 20px;">
                🎮 Jogar Agora!
            </button>
        `;
    }
    
    activity.innerHTML = `
        <div class="${classe} animated" style="font-size: ${configuracoes.emojiSize * (isEmoji ? 72 : 48)}px;">
            ${dadosAtuais.item}
        </div>
        <div class="word" style="margin-top: 20px;">
            ${dadosAtuais.nome}
        </div>
        <div class="progress-visual" style="margin-top: 15px;">
            <div class="progress-fill" style="width: ${configuracoes.showProgress ? ((atual + 1) / conteudo[modo].length * 100) : 0}%"></div>
        </div>
        <p style="color: #666; margin-top: 15px;">
            ${dadosAtuais.descricao}
        </p>
        ${jogarButton}
        ${modo === 'jogos' ? '<button class="jogar-btn" onclick="jogosInterativos.mostrarMenuJogos()" style="background: #2196f3; color: white; border: none; padding: 10px 20px; border-radius: 20px; cursor: pointer; margin: 10px;">🎯 Menu de Jogos</button>' : ''}
    `;
    
    document.getElementById('prevBtn').disabled = atual === 0;
    document.getElementById('nextBtn').disabled = atual === conteudo[modo].length - 1;
    
    atualizarProgresso();
    
    if (configuracoes.autoPlay) {
        setTimeout(() => {
            const textoFala = gerarTextoFala(dadosAtuais);
            mostrarTexto(textoFala);
        }, 500);
    }
    
    verificarConquistas();
}

function iniciarJogoEspecifico(tipo) {
    jogosInterativos.iniciarJogo(tipo);
}

function gerarTextoFala(dados) {
    if (configuracoes.showGuide) {
        return `${dados.nome}. ${dados.descricao}`;
    }
    return dados.nome;
}

function mostrarTexto(texto) {
    const feedback = document.getElementById('textFeedback') || createTextFeedback();
    feedback.textContent = texto;
    feedback.classList.add('visible');
    
    setTimeout(() => {
        feedback.classList.remove('visible');
    }, 3000);
}

function createTextFeedback() {
    const feedback = document.createElement('div');
    feedback.id = 'textFeedback';
    feedback.className = 'text-feedback';
    feedback.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0,0,0,0.8);
        color: white;
        padding: 15px 25px;
        border-radius: 25px;
        display: none;
        z-index: 1000;
        max-width: 80%;
        text-align: center;
        font-size: 16px;
        font-weight: bold;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;
    document.body.appendChild(feedback);
    return feedback;
}

function mostrarComemoracao(texto) {
    const feedback = createTextFeedback();
    feedback.innerHTML = `🎉 ${texto} 🎉`;
    feedback.style.background = 'linear-gradient(45deg, #4caf50, #66bb6a)';
    feedback.classList.add('visible');
    
    setTimeout(() => {
        feedback.classList.remove('visible');
    }, 4000);
}

function mostrarEncorajamento(texto) {
    const feedback = createTextFeedback();
    feedback.innerHTML = `💪 ${texto}`;
    feedback.style.background = 'linear-gradient(45deg, #2196f3, #42a5f5)';
    feedback.classList.add('visible');
    
    setTimeout(() => {
        feedback.classList.remove('visible');
    }, 3000);
}

function mostrarErro() {
    const mensagensErro = [
        'Não se preocupe, vamos tentar novamente!',
        'Quase lá! Continue tentando!',
        'Cada tentativa é um aprendizado!',
        'Não desista, você consegue!'
    ];
    
    const mensagem = mensagensErro[Math.floor(Math.random() * mensagensErro.length)];
    const feedback = createTextFeedback();
    feedback.innerHTML = `🤗 ${mensagem}`;
    feedback.style.background = 'linear-gradient(45deg, #ff9800, #ffb74d)';
    feedback.classList.add('visible');
    
    setTimeout(() => {
        feedback.classList.remove('visible');
    }, 3000);
}

function mostrarNotificacao(titulo, mensagem, icone = '🎉') {
    // Se o sistema de efeitos visuais estiver disponível, usar o novo sistema
    if (window.visualEffects && window.visualEffects.showNotification) {
        window.visualEffects.showNotification(`${titulo}: ${mensagem}`, 'success');
        return;
    }
    
    // Fallback para o sistema antigo
    const notification = document.getElementById('notification');
    const content = notification.querySelector('.notification-content');
    const iconElement = notification.querySelector('.notification-icon');
    
    if (content && iconElement) {
        iconElement.textContent = icone;
        content.textContent = `${titulo}: ${mensagem}`;
    } else {
        // Se não tiver a estrutura nova, usar a antiga
        notification.innerHTML = `${icone} ${titulo}: ${mensagem}`;
    }
    
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

function verificarConquistas() {
    conquistas.forEach(conquista => {
        if (conquistasDesbloqueadas.includes(conquista.id)) return;
        
        let desbloqueada = false;
        
        switch (conquista.id) {
            case 'primeira_letra':
                desbloqueada = modo === 'alfabeto' && atual >= 0;
                break;
            case 'primeira_palavra':
                desbloqueada = modo === 'palavras' && atual >= 0;
                break;
            case 'todas_cores':
                desbloqueada = modo === 'cores' && atual === conteudo.cores.length - 1;
                break;
            case 'todos_numeros':
                desbloqueada = modo === 'numeros' && atual === conteudo.numeros.length - 1;
                break;
        }
        
        if (desbloqueada) {
            conquistasDesbloqueadas.push(conquista.id);
            setLocalStorage('conquistas', JSON.stringify(conquistasDesbloqueadas));
            
            mostrarComemoracao(`Nova conquista desbloqueada: ${conquista.nome}!`);
            mostrarNotificacao('Nova Conquista!', conquista.nome, conquista.icone);
        }
    });
}

function atualizarProgresso() {
    const progressText = document.getElementById('progress');
    if (progressText) {
        progressText.textContent = '';
    }
}

function abrirModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('visible');
        
        if (modalId === 'profileModal') {
            atualizarPerfilModal();
        } else if (modalId === 'achievementsModal') {
            atualizarConquistasModal();
        }
    }
}

function fecharModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('visible');
    }
}

function atualizarPerfilModal() {
    // Atualizar todos os elementos de avatar no modal
    const avatarElements = document.querySelectorAll('#currentAvatar');
    avatarElements.forEach(element => {
        element.textContent = avatarAtual;
    });
    
    document.getElementById('userLevel').textContent = nivel;
    document.getElementById('achievementCount').textContent = conquistasDesbloqueadas.length;
    
    const progressoTotal = (conquistasDesbloqueadas.length / conquistas.length) * 100;
    document.querySelector('.progress-bar-fill').style.width = `${Math.min(progressoTotal, 100)}%`;
    
    const userAchievements = document.getElementById('userAchievements');
    userAchievements.innerHTML = '';
    
    conquistas.forEach(conquista => {
        const isDesbloqueada = conquistasDesbloqueadas.includes(conquista.id);
        const achievementDiv = document.createElement('div');
        achievementDiv.className = `achievement ${isDesbloqueada ? 'unlocked' : 'locked'}`;
        achievementDiv.innerHTML = `
            <span class="achievement-icon">${conquista.icone}</span>
            <div>
                <h4>${conquista.nome}</h4>
                <p>${conquista.descricao}</p>
            </div>
        `;
        if (!isDesbloqueada) {
            achievementDiv.style.opacity = '0.5';
            achievementDiv.style.filter = 'grayscale(100%)';
        }
        userAchievements.appendChild(achievementDiv);
    });
    
    const activityLog = document.getElementById('activityLog');
    activityLog.innerHTML = `
        <div class="activity-item">📚 Modo atual: ${modo}</div>
        <div class="activity-item">🎯 Explorando conteúdo educativo</div>
        <div class="activity-item">🏆 Conquistas: ${conquistasDesbloqueadas.length}</div>
    `;
}

function atualizarConquistasModal() {
    const achievementsGrid = document.querySelector('#achievementsModal .achievements-grid');
    achievementsGrid.innerHTML = '';
    
    conquistas.forEach(conquista => {
        const isDesbloqueada = conquistasDesbloqueadas.includes(conquista.id);
        const gameCard = document.createElement('div');
        gameCard.className = `game-card ${isDesbloqueada ? 'unlocked' : 'locked'}`;
        gameCard.innerHTML = `
            <div class="achievement-icon" style="font-size: 48px;">${conquista.icone}</div>
            <h3>${conquista.nome}</h3>
            <p>${conquista.descricao}</p>
        `;
        
        if (!isDesbloqueada) {
            gameCard.style.opacity = '0.5';
            gameCard.style.filter = 'grayscale(100%)';
        }
        
        achievementsGrid.appendChild(gameCard);
    });
}

function trocarAvatar(novoAvatar) {
    avatarAtual = novoAvatar;
    setLocalStorage('avatar', avatarAtual);
    
    // Atualizar todos os elementos de avatar (toolbar e modal)
    const avatarElements = document.querySelectorAll('#currentAvatar');
    avatarElements.forEach(element => {
        element.textContent = avatarAtual;
    });
    
    // Adicionar feedback visual
    const avatarContainer = document.querySelector('.current-avatar');
    if (avatarContainer) {
        avatarContainer.classList.add('animated');
        setTimeout(() => {
            avatarContainer.classList.remove('animated');
        }, 500);
    }
    
    // Adicionar efeito visual aos botões de avatar clicados
    document.querySelectorAll('.avatar-option').forEach(option => {
        option.classList.remove('selected');
        if (option.getAttribute('data-avatar') === novoAvatar) {
            option.classList.add('selected');
            option.style.transform = 'scale(1.2)';
            setTimeout(() => {
                option.style.transform = '';
                option.classList.remove('selected');
            }, 300);
        }
    });
    
    mostrarNotificacao('Avatar Atualizado!', 'Seu novo avatar foi salvo', '🎨');
    Debug.log(`Avatar alterado para: ${novoAvatar}`, 'sucesso');
}

function aplicarTema(tema) {
    const body = document.body;
    body.classList.remove('theme-blue', 'theme-green', 'theme-purple', 'theme-orange');
    body.classList.add(`theme-${tema}`);
    configuracoesTEA.tema = tema;
    
    Debug.log(`Tema aplicado: ${tema}`, 'sucesso');
}

function aplicarTodasConfiguracoes() {
    const body = document.body;
    
    aplicarTema(configuracoesTEA.tema);
    
    body.classList.toggle('high-contrast', configuracoesTEA.altoContraste);
    body.classList.toggle('large-text', configuracoesTEA.textoGrande);
    body.classList.toggle('reduced-motion', configuracoesTEA.animacoesReduzidas);
    body.classList.toggle('increased-spacing', configuracoesTEA.espacamentoAumentado);
    
    body.classList.toggle('simplified-interface', configuracoesTEA.interfaceSimplificada);
    body.classList.toggle('predictable-navigation', configuracoesTEA.navegacaoPrevisivel);
    body.classList.toggle('focus-assist', configuracoesTEA.assistenteFoco);
    
    if (configuracoesTEA.animacoesReduzidas) {
        body.style.setProperty('--animation-speed', '0s');
    } else {
        body.style.setProperty('--animation-speed', '0.3s');
    }
    
    Debug.log('Todas as configurações aplicadas', 'sucesso');
}

function carregarConfiguracoesTEA() {
    const configSalvas = localStorage.getItem('configuracoesTEA');
    if (configSalvas) {
        configuracoesTEA = { ...configuracoesTEA, ...JSON.parse(configSalvas) };
        configuracoes = configuracoesTEA;
    }
    aplicarTodasConfiguracoes();
}

function salvarConfiguracoesTEA() {
    setLocalStorage('configuracoesTEA', JSON.stringify(configuracoesTEA));
    setLocalStorage('configuracoes', JSON.stringify(configuracoesTEA));
    mostrarNotificacao('Configurações Salvas!', 'Suas preferências foram salvas com sucesso', '💾');
}

function aplicarConfiguracoes() {
    const body = document.body;
    
    if (configuracoes.highContrast) {
        body.classList.add('high-contrast');
    } else {
        body.classList.remove('high-contrast');
    }
    
    if (configuracoes.biggerText) {
        body.style.fontSize = '120%';
        body.classList.add('bigger-spacing');
    } else {
        body.style.fontSize = '';
        body.classList.remove('bigger-spacing');
    }
    
    if (!configuracoes.animations) {
        body.style.setProperty('--transition', 'none');
    } else {
        body.style.setProperty('--transition', 'all 0.3s ease');
    }
}

function inicializarAplicacao() {
    Debug.log('Iniciando aplicação...', 'info');
    
    const elementosEssenciais = [
        { id: 'modeSelect', desc: 'Seletor de modo' },
        { id: 'activity', desc: 'Área de atividade' },
        { id: 'prevBtn', desc: 'Botão anterior' },
        { id: 'nextBtn', desc: 'Botão próximo' },
        { id: 'notification', desc: 'Área de notificação' }
    ];
    
    const todosElementosOk = elementosEssenciais.every(
        elem => Debug.verificarElemento(elem.id, elem.desc)
    );
    
    if (!todosElementosOk) {
        Debug.log('Falha na inicialização: elementos ausentes', 'erro');
        return false;
    }
    
    if (!window.localStorage) {
        Debug.log('Armazenamento local não disponível', 'aviso');
    }
    
    carregarConfiguracoes();
    
    try {
        inicializarEventos();
        Debug.log('Eventos inicializados com sucesso', 'sucesso');
    } catch (error) {
        Debug.log(`Erro ao inicializar eventos: ${error.message}`, 'erro');
        return false;
    }
    
    try {
        carregarConteudo();
        Debug.log('Conteúdo inicial carregado', 'sucesso');
    } catch (error) {
        Debug.log(`Erro ao carregar conteúdo: ${error.message}`, 'erro');
        return false;
    }
    
    atualizarInterface();
    
    // Inicializar sistema de efeitos visuais modernos
    try {
        initializeVisualEffects();
        Debug.log('Sistema de efeitos visuais inicializado', 'sucesso');
    } catch (error) {
        Debug.log(`Erro ao inicializar efeitos visuais: ${error.message}`, 'aviso');
    }
    
    setTimeout(() => {
        mostrarTexto('Bem-vindo à Plataforma de Alfabetização! Vamos aprender juntos!');
    }, 1000);
    
    Debug.log('Aplicação iniciada com sucesso', 'sucesso');
    return true;
}

function carregarConfiguracoes() {
    carregarConfiguracoesTEA();
    
    modo = getLocalStorage('modo', 'cores');
    atual = parseInt(getLocalStorage('atual', '0')) || 0;
    
    Object.keys(configuracoes).forEach(key => {
        const elemento = document.getElementById(key);
        if (elemento) {
            if (elemento.type === 'checkbox') {
                elemento.checked = configuracoes[key];
            } else if (elemento.type === 'range') {
                elemento.value = configuracoes[key];
            } else if (elemento.tagName === 'SELECT') {
                elemento.value = configuracoes[key];
            }
        }
    });
    
    aplicarConfiguracoes();
}

function atualizarInterface() {
    document.getElementById('modeSelect').value = modo;
    
    // Atualizar todos os elementos de avatar
    const avatarElements = document.querySelectorAll('#currentAvatar, .current-avatar-display');
    avatarElements.forEach(element => {
        element.textContent = avatarAtual;
    });
    
    Debug.log(`Interface atualizada - Avatar: ${avatarAtual}`, 'info');
}

function inicializarEventos() {
    // Mode Select
    const modeSelect = document.getElementById('modeSelect');
    modeSelect.addEventListener('change', (e) => {
        try {
            modo = e.target.value;
            atual = 0;
            carregarConteudo();
            localStorage.setItem('modo', modo);
            Debug.log(`Modo alterado para: ${modo}`, 'info');
        } catch (error) {
            Debug.log(`Erro ao mudar modo: ${error.message}`, 'erro');
        }
    });
    
    // Navegação
    document.getElementById('prevBtn').addEventListener('click', () => {
        try {
            if (atual > 0) {
                atual--;
                carregarConteudo();
                localStorage.setItem('atual', atual);
                Debug.log('Navegação: anterior', 'info');
            }
        } catch (error) {
            Debug.log(`Erro na navegação: ${error.message}`, 'erro');
        }
    });
    
    document.getElementById('nextBtn').addEventListener('click', () => {
        try {
            if (atual < conteudo[modo].length - 1) {
                atual++;
                carregarConteudo();
                localStorage.setItem('atual', atual);
                Debug.log('Navegação: próximo', 'info');
            }
        } catch (error) {
            Debug.log(`Erro na navegação: ${error.message}`, 'erro');
        }
    });
    
    // Botões da toolbar
    document.getElementById('profileBtn').addEventListener('click', () => {
        abrirModal('profileModal');
    });
    
    document.getElementById('achievementsBtn').addEventListener('click', () => {
        abrirModal('achievementsModal');
    });
    
    document.getElementById('settingsBtn').addEventListener('click', () => {
        abrirModal('settingsModal');
    });
    
    document.getElementById('helpGuideBtn').addEventListener('click', () => {
        abrirModal('helpModal');
    });

    document.getElementById('projectInfoBtn').addEventListener('click', () => {
        abrirModal('projectInfoModal');
    });
    
    document.getElementById('helpBtn').addEventListener('click', () => {
        abrirModal('helpModal');
    });
    
    // Event listeners dos modais
    document.querySelectorAll('.close-button').forEach(btn => {
       
        btn.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal');
            if (modal) {
                modal.classList.remove('visible');
            }
        });
    });
    
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('visible');
            }
        });
    });
    
    // Eventos dos avatares
    document.querySelectorAll('.avatar-option').forEach(option => {
        option.addEventListener('click', (e) => {
            const novoAvatar = e.target.getAttribute('data-avatar');
            if (novoAvatar) {
                trocarAvatar(novoAvatar);
            }
        });
    });
    
    // Configurações de acessibilidade
    const configuracoeCheckboxes = [
        'autoPlay', 'animations', 'highContrast', 'biggerText', 
        'showGuide', 'repeatAudio', 'showProgress', 'useKeyboard'
    ];
    
    configuracoeCheckboxes.forEach(configId => {
        const elemento = document.getElementById(configId);
        if (elemento) {
            elemento.addEventListener('change', (e) => {
                configuracoes[configId] = e.target.checked;
                localStorage.setItem('configuracoes', JSON.stringify(configuracoes));
                aplicarConfiguracoes();
                Debug.log(`Configuração ${configId} alterada para: ${e.target.checked}`, 'info');
            });
        }
    });
    
    // Slider de tamanho dos emojis
    const emojiSizeSlider = document.getElementById('emojiSize');
    if (emojiSizeSlider) {
        emojiSizeSlider.addEventListener('input', (e) => {
            configuracoes.emojiSize = parseFloat(e.target.value);
            localStorage.setItem('configuracoes', JSON.stringify(configuracoes));
            carregarConteudo();
        });
    }
    
    // Eventos de teclado
    document.addEventListener('keydown', (e) => {
        if (!configuracoes.useKeyboard) return;
        
        switch (e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                if (atual > 0) {
                    atual--;
                    carregarConteudo();
                }
                break;
            case 'ArrowRight':
                e.preventDefault();
                if (atual < conteudo[modo].length - 1) {
                    atual++;
                    carregarConteudo();
                }
                break;
            case ' ':
                e.preventDefault();
                const dadosAtuais = conteudo[modo][atual];
                const textoFala = gerarTextoFala(dadosAtuais);
                mostrarTexto(textoFala);
                break;
            case 'Escape':
                document.querySelectorAll('.modal.visible').forEach(modal => {
                    modal.classList.remove('visible');
                });
                break;
        }
    });
    
    // Evento para elementos interativos no conteúdo
    document.getElementById('activity').addEventListener('click', (e) => {
        if (e.target.classList.contains('emoji') || 
            e.target.classList.contains('letter') || 
            e.target.classList.contains('word')) {
            
            e.target.classList.add('animated');
            setTimeout(() => {
                e.target.classList.remove('animated');
            }, 500);
            
            const dadosAtuais = conteudo[modo][atual];
            const textoFala = gerarTextoFala(dadosAtuais);
            
            if (Math.random() < 0.3) {
                mostrarEncorajamento(textoFala);
            } else {
                mostrarTexto(textoFala);
            }
        }
    });
    
    Debug.log('Todos os eventos foram inicializados', 'sucesso');
}

// Sistema de Jogos Interativos
class JogosInterativos {
    constructor() {
        this.jogoAtual = null;
        this.nivel = 1;
        this.gameContainer = null;
    }

    iniciarJogoMemoria() {
        this.jogoAtual = 'memoria';
        const symbols = ['🐱', '🐶', '🐰', '🐸', '🦋', '🐝', '🌸', '⭐'];
        const cards = [...symbols, ...symbols].sort(() => Math.random() - 0.5);
        let flippedCards = [];
        let matchedPairs = 0;

        this.gameContainer.innerHTML = `
            <div class="memory-game">
                <h3>🎯 Jogo da Memória</h3>
                <p>Encontre os pares iguais!</p>
                <div class="memory-board">
                    ${cards.map((symbol, index) => `
                        <div class="memory-card" data-symbol="${symbol}" data-index="${index}">
                            <div class="card-front">?</div>
                            <div class="card-back">${symbol}</div>
                        </div>
                    `).join('')}
                </div>
                <button onclick="jogosInterativos.voltarMenu()" class="game-button">🏠 Voltar</button>
            </div>
        `;

        this.adicionarEstilosMemoria();

        document.querySelectorAll('.memory-card').forEach(card => {
            card.addEventListener('click', () => {
                if (card.classList.contains('flipped') || card.classList.contains('matched')) return;
                
                card.classList.add('flipped');
                flippedCards.push(card);

                if (flippedCards.length === 2) {
                    const [card1, card2] = flippedCards;
                    
                    if (card1.dataset.symbol === card2.dataset.symbol) {
                        card1.classList.add('matched');
                        card2.classList.add('matched');
                        matchedPairs++;
                        
                        if (matchedPairs === symbols.length) {
                            setTimeout(() => {
                                mostrarComemoracao('Você completou o jogo da memória!');
                                mostrarNotificacao('Parabéns!', 'Você completou o jogo da memória!', '🎉');
                            }, 500);
                        }
                    } else {
                        setTimeout(() => {
                            if (Math.random() < 0.3) {
                                mostrarErro();
                            }
                            card1.classList.remove('flipped');
                            card2.classList.remove('flipped');
                        }, 1000);
                    }
                    
                    flippedCards = [];
                }
            });
        });
    }

    iniciarJogoCores() {
        this.jogoAtual = 'cores';
        const cores = [
            { nome: 'VERMELHO', emoji: '🔴', cor: '#ff0000' },
            { nome: 'AZUL', emoji: '🔵', cor: '#0000ff' },
            { nome: 'VERDE', emoji: '🟢', cor: '#00ff00' },
            { nome: 'AMARELO', emoji: '🟡', cor: '#ffff00' },
            { nome: 'LARANJA', emoji: '🟠', cor: '#ffa500' },
            { nome: 'ROXO', emoji: '🟣', cor: '#800080' }
        ];
        
        let corAtual = cores[Math.floor(Math.random() * cores.length)];
        let acertos = 0;

        this.gameContainer.innerHTML = `
            <div class="color-game">
                <h3>🎪 Jogo de Cores</h3>
                <p>Clique na cor: <strong>${corAtual.nome}</strong></p>
                <div class="score">Acertos: <span id="gameScore">${acertos}</span></div>
                <div class="color-buttons">
                    ${cores.map(cor => `
                        <button class="color-btn" 
                                data-cor="${cor.nome}" 
                                style="background-color: ${cor.cor}">
                            ${cor.emoji}
                        </button>
                    `).join('')}
                </div>
                <button onclick="jogosInterativos.voltarMenu()" class="game-button">🏠 Voltar</button>
            </div>
        `;

        this.adicionarEstilosCores();

        document.querySelectorAll('.color-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.dataset.cor === corAtual.nome) {
                    acertos++;
                    document.getElementById('gameScore').textContent = acertos;
                    btn.style.transform = 'scale(1.2)';
                    setTimeout(() => btn.style.transform = 'scale(1)', 200);
                    
                    if (Math.random() < 0.4) {
                        mostrarEncorajamento(`Muito bem! ${corAtual.nome}!`);
                    } else {
                        mostrarTexto(`Correto! ${corAtual.nome}!`);
                    }
                    
                    setTimeout(() => {
                        corAtual = cores[Math.floor(Math.random() * cores.length)];
                        document.querySelector('.color-game p').innerHTML = `Clique na cor: <strong>${corAtual.nome}</strong>`;
                    }, 1000);
                    
                    if (acertos >= 10) {
                        mostrarComemoracao('Você acertou 10 cores!');
                        mostrarNotificacao('Parabéns!', 'Você acertou 10 cores!', '🌈');
                    }
                } else {
                    btn.style.backgroundColor = '#ff6b6b';
                    
                    if (Math.random() < 0.5) {
                        mostrarErro();
                    }
                    setTimeout(() => {
                        btn.style.backgroundColor = cores.find(c => c.nome === btn.dataset.cor).cor;
                    }, 500);
                }
            });
        });
    }

    iniciarJogoContagem() {
        this.jogoAtual = 'contagem';
        const objetos = ['🍎', '🌟', '🐝', '🎈', '🍭', '⚽'];
        let objetoAtual = objetos[Math.floor(Math.random() * objetos.length)];
        let quantidade = Math.floor(Math.random() * 5) + 1;
        let acertos = 0;

        this.gameContainer.innerHTML = `
            <div class="counting-game">
                <h3>🎲 Conta os Objetos</h3>
                <p>Quantos objetos você vê?</p>
                <div class="score">Acertos: <span id="gameScore">${acertos}</span></div>
                <div class="objects-container">
                    ${Array(quantidade).fill(objetoAtual).map(obj => `<span class="counting-object">${obj}</span>`).join('')}
                </div>
                <div class="number-buttons">
                    ${[1,2,3,4,5].map(num => `
                        <button class="number-btn" data-numero="${num}">${num}</button>
                    `).join('')}
                </div>
                <button onclick="jogosInterativos.voltarMenu()" class="game-button">🏠 Voltar</button>
            </div>
        `;

        this.adicionarEstilosContagem();

        document.querySelectorAll('.number-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const numeroEscolhido = parseInt(btn.dataset.numero);
                
                if (numeroEscolhido === quantidade) {
                    acertos++;
                    document.getElementById('gameScore').textContent = acertos;
                    btn.style.backgroundColor = '#4caf50';
                    btn.style.color = 'white';
                    
                    if (Math.random() < 0.5) {
                        mostrarEncorajamento(`Perfeito! São ${quantidade} objetos!`);
                    } else {
                        mostrarTexto(`Isso mesmo! ${quantidade}!`);
                    }
                    
                    setTimeout(() => {
                        objetoAtual = objetos[Math.floor(Math.random() * objetos.length)];
                        quantidade = Math.floor(Math.random() * 5) + 1;
                        
                        document.querySelector('.objects-container').innerHTML = 
                            Array(quantidade).fill(objetoAtual).map(obj => `<span class="counting-object">${obj}</span>`).join('');
                        
                        document.querySelectorAll('.number-btn').forEach(b => {
                            b.style.backgroundColor = '#4fc3f7';
                            b.style.color = 'white';
                        });
                    }, 1500);
                    
                    if (acertos >= 5) {
                        mostrarComemoracao('Você é ótimo em contar!');
                        mostrarNotificacao('Parabéns!', 'Você é ótimo em contar!', '🔢');
                    }
                } else {
                    btn.style.backgroundColor = '#f44336';
                    if (Math.random() < 0.4) {
                        mostrarErro();
                    }
                    setTimeout(() => {
                        btn.style.backgroundColor = '#4fc3f7';
                    }, 1000);
                }
            });
        });
    }

    iniciarJogo(tipo) {
        if (!this.gameContainer) {
            this.gameContainer = document.getElementById('activity');
        }
        
        switch(tipo) {
            case 'memoria':
                this.iniciarJogoMemoria();
                break;
            case 'cores':
                this.iniciarJogoCores();
                break;
            case 'contagem':
                this.iniciarJogoContagem();
                break;
            default:
                this.mostrarMenuJogos();
        }
    }

    mostrarMenuJogos() {
        if (!this.gameContainer) {
            this.gameContainer = document.getElementById('activity');
        }

        this.gameContainer.innerHTML = `
            <div class="games-menu">
                <h2>🎮 Escolha seu Jogo!</h2>
                <div class="games-grid">
                    <button class="game-card-btn" onclick="jogosInterativos.iniciarJogo('memoria')">
                        <div class="game-icon">🎯</div>
                        <h3>Jogo da Memória</h3>
                        <p>Encontre os pares!</p>
                    </button>
                    <button class="game-card-btn" onclick="jogosInterativos.iniciarJogo('cores')">
                        <div class="game-icon">🎪</div>
                        <h3>Jogo de Cores</h3>
                        <p>Clique na cor certa!</p>
                    </button>
                    <button class="game-card-btn" onclick="jogosInterativos.iniciarJogo('contagem')">
                        <div class="game-icon">🎲</div>
                        <h3>Conta os Objetos</h3>
                        <p>Quantos você vê?</p>
                    </button>
                </div>
            </div>
        `;

        this.adicionarEstilosMenu();
    }

    voltarMenu() {
        this.mostrarMenuJogos();
    }

    adicionarEstilosMenu() {
        const style = document.createElement('style');
        style.textContent = `
            .games-menu { text-align: center; padding: 20px; }
            .games-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 20px;
                margin: 20px 0;
            }
            .game-card-btn {
                background: linear-gradient(135deg, #4fc3f7, #2196f3);
                border: none;
                border-radius: 15px;
                padding: 20px;
                cursor: pointer;
                transition: transform 0.3s ease;
                color: white;
                box-shadow: 0 4px 8px rgba(0,0,0,0.2);
                font-size: 18px;
            }
            .game-card-btn:hover { transform: translateY(-5px); }
            .game-icon { font-size: 48px; margin-bottom: 10px; }
        `;
        document.head.appendChild(style);
    }

    adicionarEstilosMemoria() {
        const style = document.createElement('style');
        style.textContent = `
            .memory-game { text-align: center; padding: 20px; }
            .memory-board {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 10px;
                max-width: 400px;
                margin: 20px auto;
            }
            .memory-card {
                width: 80px; height: 80px; background: #4fc3f7; border-radius: 10px;
                display: flex; align-items: center; justify-content: center;
                cursor: pointer; position: relative; transition: transform 0.3s ease;
            }
            .memory-card:hover { transform: scale(1.05); }
            .memory-card.flipped .card-front { display: none; }
            .memory-card.flipped .card-back { display: block; }
            .memory-card.matched { background: #4caf50; }
            .card-front { font-size: 24px; color: white; }
            .card-back { font-size: 24px; display: none; }
            .game-button {
                background: #4caf50; color: white; border: none;
                padding: 12px 24px; border-radius: 20px;
                cursor: pointer; margin: 10px; font-size: 16px;
            }
        `;
        document.head.appendChild(style);
    }

    adicionarEstilosCores() {
        const style = document.createElement('style');
        style.textContent = `
            .color-game { text-align: center; padding: 20px; }
            .color-buttons {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 15px;
                max-width: 300px;
                margin: 20px auto;
            }
            .color-btn { 
                width: 80px; height: 80px; border: 3px solid white; 
                border-radius: 50%; cursor: pointer; font-size: 24px;
                transition: transform 0.3s ease;
                display: flex; align-items: center; justify-content: center;
            }
            .color-btn:hover { transform: scale(1.1); }
        `;
        document.head.appendChild(style);
    }

    adicionarEstilosContagem() {
        const style = document.createElement('style');
        style.textContent = `
            .counting-game { text-align: center; padding: 20px; }
            .objects-container { 
                background: #e3f2fd; padding: 20px; border-radius: 15px; 
                margin: 20px auto; max-width: 300px; min-height: 100px;
                display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 10px;
            }
            .counting-object { font-size: 32px; animation: bounce 2s infinite; }
            .number-buttons {
                display: flex; gap: 10px; justify-content: center; margin: 20px 0;
            }
            .number-btn { 
                width: 50px; height: 50px; background: #4fc3f7; color: white; 
                border: none; border-radius: 50%; cursor: pointer; font-size: 20px;
                transition: all 0.3s ease;
            }
            .number-btn:hover { transform: scale(1.1); }
        `;
        document.head.appendChild(style);
    }
}

// Cria instância global dos jogos
const jogosInterativos = new JogosInterativos();

// Inicializa a aplicação quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    if (!inicializarAplicacao()) {
        Debug.log('Falha na inicialização da aplicação', 'erro');
        alert('Ocorreram erros ao iniciar a aplicação. Verifique o console para mais detalhes.');
    }
});

// Salva progresso periodicamente
setInterval(() => {
    if (typeof modo !== 'undefined' && typeof atual !== 'undefined') {
        setLocalStorage('modo', modo);
        setLocalStorage('atual', atual.toString());
        setLocalStorage('nivel', nivel.toString());
        setLocalStorage('configuracoes', JSON.stringify(configuracoes));
    }
}, 30000);

// 🎪 SISTEMA DE EFEITOS VISUAIS MODERNOS

class VisualEffects {
    constructor() {
        this.initializeEffects();
        this.setupThemeManager();
        this.setupParticleSystem();
    }

    initializeEffects() {
        // Sistema de temas dinâmicos
        this.currentTheme = localStorage.getItem('selectedTheme') || 'theme-blue';
        document.body.className = this.currentTheme;
        
        // Configurações de efeitos
        this.effectsEnabled = localStorage.getItem('effectsEnabled') !== 'false';
        this.particlesEnabled = localStorage.getItem('particlesEnabled') !== 'false';
        this.glowEnabled = localStorage.getItem('glowEnabled') !== 'false';
        
        this.applyEffectSettings();
    }

    setupThemeManager() {
        const themeSelect = document.getElementById('themeSelect');
        if (themeSelect) {
            themeSelect.value = this.currentTheme;
            themeSelect.addEventListener('change', (e) => {
                this.changeTheme(e.target.value);
            });
        }
    }

    changeTheme(theme) {
        document.body.className = theme;
        this.currentTheme = theme;
        localStorage.setItem('selectedTheme', theme);
        
        // Adicionar efeito de transição suave
        document.body.style.transition = 'all 0.5s ease-in-out';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 500);
        
        this.showNotification('🎨 Tema alterado com sucesso!', 'success');
    }

    setupParticleSystem() {
        this.particleContainer = document.createElement('div');
        this.particleContainer.className = 'celebration-particles';
        document.body.appendChild(this.particleContainer);
    }

    createParticleExplosion(x, y, color = '#ffd700') {
        if (!this.particlesEnabled) return;
        
        const particleCount = 15;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.background = color;
            
            // Randomizar movimento
            const angle = (Math.PI * 2 * i) / particleCount;
            const velocity = 50 + Math.random() * 50;
            const finalX = x + Math.cos(angle) * velocity;
            const finalY = y + Math.sin(angle) * velocity;
            
            particle.style.setProperty('--final-x', finalX + 'px');
            particle.style.setProperty('--final-y', finalY + 'px');
            
            this.particleContainer.appendChild(particle);
            
            // Remover partícula após animação
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 3000);
        }
    }

    createConfettiRain() {
        if (!this.particlesEnabled) return;
        
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#fd79a8'];
        const confettiCount = 50;
        
        for (let i = 0; i < confettiCount; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
                confetti.style.animationDelay = Math.random() * 2 + 's';
                
                document.body.appendChild(confetti);
                
                setTimeout(() => {
                    if (confetti.parentNode) {
                        confetti.parentNode.removeChild(confetti);
                    }
                }, 5000);
            }, i * 100);
        }
    }

    addGlowEffect(element) {
        if (!this.glowEnabled) return;
        
        element.classList.add('glow-effect');
        setTimeout(() => {
            element.classList.remove('glow-effect');
        }, 2000);
    }

    addSuccessAnimation(element) {
        element.classList.add('success-celebration');
        this.addGlowEffect(element);
        
        // Criar explosão de partículas no centro do elemento
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        this.createParticleExplosion(centerX, centerY, '#4CAF50');
        
        setTimeout(() => {
            element.classList.remove('success-celebration');
        }, 800);
    }

    addErrorAnimation(element) {
        element.classList.add('error-shake');
        setTimeout(() => {
            element.classList.remove('error-shake');
        }, 500);
    }

    addMagicAppear(element) {
        element.classList.add('magic-appear');
        setTimeout(() => {
            element.classList.remove('magic-appear');
        }, 1000);
    }

    addFloatingEffect(element) {
        if (!this.effectsEnabled) return;
        element.classList.add('floating');
    }

    removeFloatingEffect(element) {
        element.classList.remove('floating');
    }

    addPulseEffect(element) {
        if (!this.effectsEnabled) return;
        element.classList.add('scale-pulse');
    }

    removePulseEffect(element) {
        element.classList.remove('scale-pulse');
    }

    showNotification(message, type = 'success') {
        const notification = document.getElementById('notification');
        const content = notification.querySelector('.notification-content');
        const icon = notification.querySelector('.notification-icon');
        
        // Definir ícone baseado no tipo
        const icons = {
            success: '🎉',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };
        
        icon.textContent = icons[type] || icons.success;
        content.textContent = message;
        
        // Remover classes de tipo anteriores
        notification.classList.remove('error', 'warning', 'info');
        if (type !== 'success') {
            notification.classList.add(type);
        }
        
        notification.classList.add('show');
        
        // Auto-hide após 3 segundos
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }

    applyEffectSettings() {
        const body = document.body;
        
        if (!this.effectsEnabled) {
            body.classList.add('no-animations');
        } else {
            body.classList.remove('no-animations');
        }
        
        // Aplicar configurações de checkboxes
        const animationsCheckbox = document.getElementById('animations');
        const particleEffectsCheckbox = document.getElementById('particleEffects');
        const glowEffectsCheckbox = document.getElementById('glowEffects');
        
        if (animationsCheckbox) {
            animationsCheckbox.checked = this.effectsEnabled;
            animationsCheckbox.addEventListener('change', (e) => {
                this.effectsEnabled = e.target.checked;
                localStorage.setItem('effectsEnabled', this.effectsEnabled);
                this.applyEffectSettings();
                this.showNotification(
                    this.effectsEnabled ? '✨ Animações ativadas!' : '🔇 Animações desativadas',
                    'info'
                );
            });
        }
        
        if (particleEffectsCheckbox) {
            particleEffectsCheckbox.checked = this.particlesEnabled;
            particleEffectsCheckbox.addEventListener('change', (e) => {
                this.particlesEnabled = e.target.checked;
                localStorage.setItem('particlesEnabled', this.particlesEnabled);
                this.showNotification(
                    this.particlesEnabled ? '🎆 Efeitos de partículas ativados!' : '🔇 Efeitos de partículas desativados',
                    'info'
                );
            });
        }
        
        if (glowEffectsCheckbox) {
            glowEffectsCheckbox.checked = this.glowEnabled;
            glowEffectsCheckbox.addEventListener('change', (e) => {
                this.glowEnabled = e.target.checked;
                localStorage.setItem('glowEnabled', this.glowEnabled);
                this.showNotification(
                    this.glowEnabled ? '💫 Efeitos de brilho ativados!' : '🔇 Efeitos de brilho desativados',
                    'info'
                );
            });
        }
    }

    // Método para criar ondas de energia
    createEnergyWave(element) {
        if (!this.effectsEnabled) return;
        
        const wave = document.createElement('div');
        wave.className = 'energy-wave';
        wave.style.position = 'absolute';
        wave.style.top = '50%';
        wave.style.left = '50%';
        wave.style.transform = 'translate(-50%, -50%)';
        wave.style.width = '20px';
        wave.style.height = '20px';
        wave.style.pointerEvents = 'none';
        wave.style.zIndex = '1000';
        
        element.style.position = 'relative';
        element.appendChild(wave);
        
        setTimeout(() => {
            if (wave.parentNode) {
                wave.parentNode.removeChild(wave);
            }
        }, 2000);
    }

    // Método para criar texto cintilante
    makeTextSparkle(element, duration = 3000) {
        if (!this.effectsEnabled) return;
        
        element.classList.add('sparkle-text');
        setTimeout(() => {
            element.classList.remove('sparkle-text');
        }, duration);
    }

    // Método para celebração completa
    celebrate() {
        if (this.particlesEnabled) {
            this.createConfettiRain();
        }
        
        // Adicionar efeito de zoom dramático ao header
        const header = document.querySelector('header h1');
        if (header) {
            this.makeTextSparkle(header, 5000);
        }
        
        this.showNotification('🎊 Parabéns! Conquista desbloqueada!', 'success');
    }
}

// Função para criar estrelas cadentes
function createShootingStars() {
    const visualEffects = window.visualEffects;
    if (!visualEffects || !visualEffects.effectsEnabled) return;
    
    const star = document.createElement('div');
    star.className = 'shooting-star';
    star.style.top = Math.random() * 50 + '%';
    star.style.left = Math.random() * 50 + '%';
    
    document.body.appendChild(star);
    
    setTimeout(() => {
        if (star.parentNode) {
            star.parentNode.removeChild(star);
        }
    }, 1500);
}

// Sistema de inicialização dos efeitos visuais
function initializeVisualEffects() {
    window.visualEffects = new VisualEffects();
    
    // Configurar close button da notificação
    const closeBtn = document.querySelector('.notification-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            document.getElementById('notification').classList.remove('show');
        });
    }
    
    // Criar estrelas cadentes periodicamente
    setInterval(createShootingStars, 10000);
    
    // Adicionar efeitos hover aos elementos educacionais
    document.addEventListener('mouseover', (e) => {
        if (e.target.classList.contains('emoji') || 
            e.target.classList.contains('letter') || 
            e.target.classList.contains('word') || 
            e.target.classList.contains('number')) {
            window.visualEffects.addFloatingEffect(e.target);
        }
    });
    
    document.addEventListener('mouseout', (e) => {
        if (e.target.classList.contains('emoji') || 
            e.target.classList.contains('letter') || 
            e.target.classList.contains('word') || 
            e.target.classList.contains('number')) {
            window.visualEffects.removeFloatingEffect(e.target);
        }
    });
    
    // Adicionar efeitos de clique
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('emoji') || 
            e.target.classList.contains('letter') || 
            e.target.classList.contains('word') || 
            e.target.classList.contains('number')) {
            window.visualEffects.addSuccessAnimation(e.target);
            window.visualEffects.createEnergyWave(e.target);
        }
    });
    
    console.log('🎪 Sistema de Efeitos Visuais carregado com sucesso!');
}

// Exportar para uso global
window.VisualEffects = VisualEffects;
