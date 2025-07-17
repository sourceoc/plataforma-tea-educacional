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
        // Animais Domésticos
        { item: '🐶', nome: 'CACHORRO', descricao: 'O melhor amigo do homem! Faz AU AU 🐕' },
        { item: '🐱', nome: 'GATO', descricao: 'Bichinho carinhoso que faz MIAU 😸' },
        { item: '🐹', nome: 'HAMSTER', descricao: 'Pequenino e corre na roda 🎡' },
        { item: '🐰', nome: 'COELHO', descricao: 'Saltitante e fofo, come cenoura 🥕' },
        { item: '🐦', nome: 'PASSARINHO', descricao: 'Voa pelo céu e canta PIO PIO 🎵' },
        { item: '🐠', nome: 'PEIXE', descricao: 'Nada na água e faz bolhinhas 💙' },
        { item: '🐢', nome: 'TARTARUGA', descricao: 'Devagar e sempre, vive muito tempo ⏰' },
        
        // Animais da Fazenda
        { item: '🐄', nome: 'VACA', descricao: 'Dá leite fresquinho e faz MUUU 🥛' },
        { item: '🐷', nome: 'PORCO', descricao: 'Gosta de rolar na lama e faz OINC OINC 🎭' },
        { item: '🐑', nome: 'OVELHA', descricao: 'Tem lã macia e faz BÉÉÉÉ 🧶' },
        { item: '🐐', nome: 'CABRA', descricao: 'Salta nas montanhas e faz MÉÉÉÉ ⛰️' },
        { item: '🐴', nome: 'CAVALO', descricao: 'Corre rápido e faz HIIIII 🏇' },
        { item: '🐓', nome: 'GALO', descricao: 'Acorda cedo e faz COCORICÓ ☀️' },
        { item: '🐔', nome: 'GALINHA', descricao: 'Bota ovos e faz CÓ CÓ CÓ 🥚' },
        { item: '🦆', nome: 'PATO', descricao: 'Nada no lago e faz QUACK QUACK 🌊' },
        
        // Animais Selvagens - África
        { item: '🦁', nome: 'LEÃO', descricao: 'Rei da selva, forte e corajoso! ROAAAAR 👑' },
        { item: '🐘', nome: 'ELEFANTE', descricao: 'Gigante gentil com tromba comprida 🎪' },
        { item: '🦒', nome: 'GIRAFA', descricao: 'Pescoço bem alto, come folhas das árvores 🌳' },
        { item: '🦏', nome: 'RINOCERONTE', descricao: 'Tem chifre no nariz e é muito forte 💪' },
        { item: '🦓', nome: 'ZEBRA', descricao: 'Cavalo listrado de preto e branco 🖤🤍' },
        { item: '🦛', nome: 'HIPOPÓTAMO', descricao: 'Grandão que vive na água e na terra 🌊' },
        { item: '🐊', nome: 'CROCODILO', descricao: 'Dentes afiados, vive no rio 🦷' },
        
        // Animais Selvagens - Outros
        { item: '🐅', nome: 'TIGRE', descricao: 'Felino listrado, muito ágil e forte 🏃‍♂️' },
        { item: '🐆', nome: 'LEOPARDO', descricao: 'Manchado e muito veloz 💨' },
        { item: '🐻', nome: 'URSO', descricao: 'Peludo e forte, gosta de mel 🍯' },
        { item: '🐺', nome: 'LOBO', descricao: 'Uiva para a lua AUUUUU 🌙' },
        { item: '🦊', nome: 'RAPOSA', descricao: 'Esperta e tem cauda peluda 🧠' },
        { item: '🐨', nome: 'COALA', descricao: 'Fofinho que come eucalipto 🌿' },
        { item: '🐼', nome: 'PANDA', descricao: 'Preto e branco, come bambu 🎋' },
        
        // Primatas
        { item: '🐵', nome: 'MACACO', descricao: 'Sobe em árvores e come banana 🍌' },
        { item: '🦍', nome: 'GORILA', descricao: 'Primata grande e forte 💪' },
        { item: '🦧', nome: 'ORANGOTANGO', descricao: 'Tem braços compridos e é ruivo 🔴' },
        
        // Animais do Mar
        { item: '🐋', nome: 'BALEIA', descricao: 'Gigante dos oceanos, esguicha água 💦' },
        { item: '🐙', nome: 'POLVO', descricao: 'Tem oito braços e é muito inteligente 🧠' },
        { item: '🦈', nome: 'TUBARÃO', descricao: 'Peixe grande com dentes afiados 🦷' },
        { item: '🐬', nome: 'GOLFINHO', descricao: 'Inteligente e amigável, faz acrobacias 🤸‍♂️' },
        { item: '🐡', nome: 'BAIACU', descricao: 'Peixe que infla como uma bola ⚽' },
        { item: '🦀', nome: 'CARANGUEJO', descricao: 'Anda de lado e tem garras 👐' },
        { item: '🦞', nome: 'LAGOSTA', descricao: 'Crustáceo vermelho do mar 🔴' },
        { item: '🐚', nome: 'CONCHA', descricao: 'Casa dos moluscos no mar 🏠' },
        { item: '⭐', nome: 'ESTRELA-DO-MAR', descricao: 'Tem cinco pontas como uma estrela ⭐' },
        { item: '🪼', nome: 'ÁGUA-VIVA', descricao: 'Transparente e flutua no mar 👻' },
        
        // Aves
        { item: '🦅', nome: 'ÁGUIA', descricao: 'Ave de rapina, voa muito alto ⛰️' },
        { item: '🦉', nome: 'CORUJA', descricao: 'Sábia da floresta, ativa à noite 🌙' },
        { item: '🦆', nome: 'PATO', descricao: 'Nada e voa, faz QUACK QUACK 🌊' },
        { item: '🦢', nome: 'CISNE', descricao: 'Elegante ave branca dos lagos 🤍' },
        { item: '🦩', nome: 'FLAMINGO', descricao: 'Rosa e fica numa perna só 🩰' },
        { item: '🐧', nome: 'PINGUIM', descricao: 'Ave que não voa, mas nada muito bem 🏊‍♂️' },
        { item: '🦜', nome: 'PAPAGAIO', descricao: 'Colorido e repete o que falamos 🗣️' },
        { item: '🐔', nome: 'GALINHA', descricao: 'Bota ovos e cuida dos pintinhos 🥚' },
        { item: '🐓', nome: 'GALO', descricao: 'Canta de manhã COCORICÓ ☀️' },
        { item: '🦃', nome: 'PERU', descricao: 'Ave grande com cauda colorida 🌈' },
        
        // Répteis
        { item: '🐍', nome: 'COBRA', descricao: 'Rasteja no chão e faz SSSSS 🤫' },
        { item: '🦎', nome: 'LAGARTO', descricao: 'Toma sol na pedra e muda de cor 🌞' },
        { item: '🐢', nome: 'TARTARUGA', descricao: 'Carrega a casa nas costas 🏠' },
        { item: '🐊', nome: 'JACARÉ', descricao: 'Primo do crocodilo, vive em rios 🌊' },
        
        // Insetos
        { item: '🐛', nome: 'LAGARTA', descricao: 'Vai virar borboleta linda 🦋' },
        { item: '🦋', nome: 'BORBOLETA', descricao: 'Voa de flor em flor, muito colorida 🌺' },
        { item: '🐝', nome: 'ABELHA', descricao: 'Faz mel delicioso e faz BZZZZ 🍯' },
        { item: '🐞', nome: 'JOANINHA', descricao: 'Vermelhinha com pintinhas pretas ⚫' },
        { item: '🕷️', nome: 'ARANHA', descricao: 'Tece teias e tem oito pernas 🕸️' },
        { item: '🦗', nome: 'GRILO', descricao: 'Faz música à noite CRI CRI CRI 🎵' },
        { item: '🐜', nome: 'FORMIGA', descricao: 'Trabalhadeira e muito forte 💪' },
        { item: '🦟', nome: 'MOSQUITO', descricao: 'Pequenino que faz ZZZZ 🎵' },
        
        // Animais Australianos
        { item: '🦘', nome: 'CANGURU', descricao: 'Pula muito alto e tem bolsa 👶' },
        { item: '🐨', nome: 'COALA', descricao: 'Dorme muito e come eucalipto 😴' },
        
        // Animais do Gelo
        { item: '🐧', nome: 'PINGUIM', descricao: 'Vive no gelo e escorrega na barriga ❄️' },
        { item: '🦭', nome: 'FOCA', descricao: 'Nada no mar gelado e faz OU OU OU 🌊' },
        { item: '🐻‍❄️', nome: 'URSO-POLAR', descricao: 'Branquinho do Polo Norte ❄️' },
        
        // Animais Fantásticos (Mitológicos)
        { item: '🦄', nome: 'UNICÓRNIO', descricao: 'Cavalo mágico com chifre ✨' },
        { item: '🐉', nome: 'DRAGÃO', descricao: 'Criatura lendária que cospe fogo 🔥' },
        
        // Dinossauros
        { item: '🦕', nome: 'DINOSSAURO', descricao: 'Gigante que viveu há muito tempo ⏳' },
        { item: '🦖', nome: 'T-REX', descricao: 'Rei dos dinossauros, muito feroz 👑' }
    ],
    alimentos: [
        // Frutas Nacionais
        { item: '🍎', nome: 'MAÇÃ', descricao: 'Fruta vermelha, crocante e doce 🌟' },
        { item: '🍌', nome: 'BANANA', descricao: 'Fruta amarela, macia e nutritiva 💪' },
        { item: '🍊', nome: 'LARANJA', descricao: 'Fruta cítrica, cheia de vitamina C ☀️' },
        { item: '🍇', nome: 'UVA', descricao: 'Frutinhas roxas em cachos 🍷' },
        { item: '🍓', nome: 'MORANGO', descricao: 'Vermelhinho e doce, com pontinhas 💕' },
        { item: '🍑', nome: 'CEREJA', descricao: 'Pequenina e vermelha, bem docinha 🎈' },
        { item: '🍒', nome: 'CEREJAS', descricao: 'Duas juntinhas no cabinho 👯‍♀️' },
        { item: '🍐', nome: 'PÊRA', descricao: 'Fruta verdinha ou amarelinha, suculenta 💚' },
        { item: '🍍', nome: 'ABACAXI', descricao: 'Fruta espinhosa por fora, doce por dentro 👑' },
        { item: '🥝', nome: 'KIWI', descricao: 'Verdinho por fora, branquinho por dentro 🥽' },
        { item: '🍉', nome: 'MELANCIA', descricao: 'Grande, verde e vermelha por dentro! 🍀' },
        { item: '🍈', nome: 'MELÃO', descricao: 'Laranjinha por dentro, bem refrescante 🧡' },
        
        // Frutas Tropicais
        { item: '🥭', nome: 'MANGA', descricao: 'Fruta tropical doce e suculenta 🌴' },
        { item: '🍌', nome: 'BANANA-DA-TERRA', descricao: 'Banana grande para cozinhar 🔥' },
        { item: '🥥', nome: 'COCO', descricao: 'Água fresquinha dentro da casca 💧' },
        { item: '🍊', nome: 'TANGERINA', descricao: 'Laranjinha pequena e fácil de descascar �' },
        { item: '🍋', nome: 'LIMÃO', descricao: 'Azedinho, mas muito bom na limonada 😋' },
        { item: '🫐', nome: 'MIRTILO', descricao: 'Frutinhas azuis pequeninas e doces 💙' },
        
        // Legumes e Verduras
        { item: '�🥕', nome: 'CENOURA', descricao: 'Legume laranja, bom para os olhos 👀' },
        { item: '🥬', nome: 'ALFACE', descricao: 'Folhinha verde para salada 🥗' },
        { item: '🥒', nome: 'PEPINO', descricao: 'Verde e refrescante na salada 💚' },
        { item: '�', nome: 'TOMATE', descricao: 'Vermelhinho e suculento 🔴' },
        { item: '🌽', nome: 'MILHO', descricao: 'Grãozinhos amarelos na espiga 🌞' },
        { item: '🥔', nome: 'BATATA', descricao: 'Tubérculo gostoso, vira purê! 🥄' },
        { item: '🧄', nome: 'ALHO', descricao: 'Tempero forte e cheiroso 👃' },
        { item: '🧅', nome: 'CEBOLA', descricao: 'Faz chorar, mas dá sabor à comida 😢' },
        { item: '🥦', nome: 'BRÓCOLIS', descricao: 'Arvorezinha verde, muito nutritiva 🌳' },
        { item: '🥬', nome: 'COUVE', descricao: 'Folha verde escura, cheia de ferro 💪' },
        { item: '🫑', nome: 'PIMENTÃO', descricao: 'Verde, vermelho ou amarelo, bem colorido 🌈' },
        { item: '🥖', nome: 'ABOBRINHA', descricao: 'Verde clarinha, gostosa refogada 🥒' },
        
        // Proteínas
        { item: '🥩', nome: 'CARNE', descricao: 'Proteína importante para crescer forte 💪' },
        { item: '🍗', nome: 'FRANGO', descricao: 'Carne branca, leve e saborosa 🐔' },
        { item: '🐟', nome: 'PEIXE', descricao: 'Do mar ou rio, cheio de ômega 3 🌊' },
        { item: '🥚', nome: 'OVO', descricao: 'Proteína perfeita, vem da galinha 🐔' },
        { item: '🧀', nome: 'QUEIJO', descricao: 'Feito do leite, tem muito cálcio 🥛' },
        
        // Cereais e Grãos
        { item: '🍞', nome: 'PÃO', descricao: 'Feito de trigo, base da alimentação 🌾' },
        { item: '🍚', nome: 'ARROZ', descricao: 'Grãozinho branco, acompanha tudo 🍽️' },
        { item: '🫘', nome: 'FEIJÃO', descricao: 'Pretinho ou colorido, dupla com arroz 🖤' },
        { item: '🥜', nome: 'AMENDOIM', descricao: 'Oleaginosa que vira paçoca 🥜' },
        { item: '🌰', nome: 'CASTANHA', descricao: 'Semente nutritiva da árvore 🌳' },
        
        // Massas
        { item: '🍝', nome: 'MACARRÃO', descricao: 'Massa deliciosa com molho 🍅' },
        { item: '🍕', nome: 'PIZZA', descricao: 'Massa redonda com cobertura gostosa 🔴' },
        { item: '🥖', nome: 'PÃO FRANCÊS', descricao: 'Pãozinho crocante do café da manhã ☀️' },
        
        // Doces e Sobremesas
        { item: '�🍯', nome: 'MEL', descricao: 'Doce natural feito pelas abelhas 🐝' },
        { item: '🍫', nome: 'CHOCOLATE', descricao: 'Doce irresistível feito do cacau 🤤' },
        { item: '🍰', nome: 'BOLO', descricao: 'Doce fofo para festas e comemorações 🎉' },
        { item: '🧁', nome: 'CUPCAKE', descricao: 'Bolinho pequeno com cobertura 🎂' },
        { item: '🍪', nome: 'BISCOITO', descricao: 'Crocante e doce para o lanche 🍪' },
        { item: '🎂', nome: 'TORTA', descricao: 'Doce especial de aniversário 🎈' },
        { item: '🍮', nome: 'PUDIM', descricao: 'Doce cremoso com calda de caramelo 🟫' },
        { item: '🍭', nome: 'PIRULITO', descricao: 'Doce no palitinho, colorido 🌈' },
        { item: '🍬', nome: 'BALA', descricao: 'Docinho pequeno para chupar 😋' },
        { item: '🧊', nome: 'SORVETE', descricao: 'Gelado e doce para refrescar ❄️' },
        
        // Bebidas
        { item: '🥛', nome: 'LEITE', descricao: 'Branquinho, cheio de cálcio para os ossos 🦴' },
        { item: '💧', nome: 'ÁGUA', descricao: 'Transparente e essencial para viver 💎' },
        { item: '🧃', nome: 'SUCO', descricao: 'Líquido doce das frutas 🍹' },
        { item: '☕', nome: 'CAFÉ', descricao: 'Bebida escura dos adultos ☕' },
        { item: '🍵', nome: 'CHÁ', descricao: 'Bebida quente das folhas 🌿' },
        { item: '🥤', nome: 'REFRIGERANTE', descricao: 'Bebida doce com bolhinhas 🫧' },
        
        // Condimentos e Temperos
        { item: '🧂', nome: 'SAL', descricao: 'Tempero branco que realça o sabor 🤍' },
        { item: '🌶️', nome: 'PIMENTA', descricao: 'Ardida e vermelha, esquenta a boca 🔥' },
        { item: '🍯', nome: 'AÇÚCAR', descricao: 'Adoça tudo, mas sem exagerar! 🍭' },
        
        // Lanches e Salgados
        { item: '🥨', nome: 'PRETZEL', descricao: 'Biscoito salgado em formato especial 🥨' },
        { item: '🍿', nome: 'PIPOCA', descricao: 'Milho que estoura e fica branquinho 💥' },
        { item: '🥪', nome: 'SANDUÍCHE', descricao: 'Lanche com recheio entre pães 🥖' },
        { item: '🌮', nome: 'TACO', descricao: 'Comida mexicana dobradinha 🇲🇽' },
        { item: '🌯', nome: 'WRAP', descricao: 'Lanche enrolado na tortilha 🌯' },
        { item: '🍔', nome: 'HAMBÚRGUER', descricao: 'Lanche com carne no pão 🍖' },
        { item: '🍟', nome: 'BATATA FRITA', descricao: 'Palitinhos dourados e crocantes 🟡' },
        
        // Sopas e Caldos
        { item: '🍲', nome: 'SOPA', descricao: 'Comida líquida e quentinha 🔥' },
        { item: '🍜', nome: 'CALDO', descricao: 'Líquido nutritivo e saboroso 💚' },
        
        // Comidas Típicas
        { item: '🍱', nome: 'MARMITA', descricao: 'Comida organizada na caixinha 📦' },
        { item: '🥘', nome: 'ENSOPADO', descricao: 'Comida cozida com molho 🥄' },
        { item: '🍳', nome: 'OVO FRITO', descricao: 'Ovinho na frigideira 🍳' }
    ],
    alimentos: [
        // Frutas
        { item: '🍎', nome: 'MAÇÃ', descricao: 'Fruta vermelha, crocante e doce 🌟' },
        { item: '🍌', nome: 'BANANA', descricao: 'Fruta amarela, macia e nutritiva 💪' },
        { item: '🍊', nome: 'LARANJA', descricao: 'Fruta cítrica, cheia de vitamina C ☀️' },
        { item: '🍇', nome: 'UVA', descricao: 'Frutinhas roxas em cachos 🍷' },
        { item: '🍓', nome: 'MORANGO', descricao: 'Vermelhinho e doce, com pontinhas 💕' },
        { item: '🍑', nome: 'CEREJA', descricao: 'Pequenina e vermelha, bem docinha 🎈' },
        { item: '🍐', nome: 'PÊRA', descricao: 'Fruta verdinha ou amarelinha, suculenta 💚' },
        { item: '🍍', nome: 'ABACAXI', descricao: 'Fruta espinhosa por fora, doce por dentro 👑' },
        { item: '🥝', nome: 'KIWI', descricao: 'Verdinho por fora, branquinho por dentro 🥽' },
        { item: '🍉', nome: 'MELANCIA', descricao: 'Grande, verde e vermelha por dentro! 🍀' },
        { item: '🍈', nome: 'MELÃO', descricao: 'Laranjinha por dentro, bem refrescante 🧡' },
        { item: '🥭', nome: 'MANGA', descricao: 'Fruta tropical doce e suculenta 🌴' },
        { item: '🥥', nome: 'COCO', descricao: 'Água fresquinha dentro da casca 💧' },
        { item: '🍋', nome: 'LIMÃO', descricao: 'Azedinho, mas muito bom na limonada 😋' },
        { item: '🫐', nome: 'MIRTILO', descricao: 'Frutinhas azuis pequeninas e doces 💙' },
        
        // Legumes e Verduras
        { item: '🥕', nome: 'CENOURA', descricao: 'Legume laranja, bom para os olhos 👀' },
        { item: '🥬', nome: 'ALFACE', descricao: 'Folhinha verde para salada 🥗' },
        { item: '🥒', nome: 'PEPINO', descricao: 'Verde e refrescante na salada 💚' },
        { item: '🍅', nome: 'TOMATE', descricao: 'Vermelhinho e suculento 🔴' },
        { item: '🌽', nome: 'MILHO', descricao: 'Grãozinhos amarelos na espiga 🌞' },
        { item: '🥔', nome: 'BATATA', descricao: 'Tubérculo gostoso, vira purê! 🥄' },
        { item: '🧄', nome: 'ALHO', descricao: 'Tempero forte e cheiroso 👃' },
        { item: '🧅', nome: 'CEBOLA', descricao: 'Faz chorar, mas dá sabor à comida 😢' },
        { item: '🥦', nome: 'BRÓCOLIS', descricao: 'Arvorezinha verde, muito nutritiva 🌳' },
        { item: '🫑', nome: 'PIMENTÃO', descricao: 'Verde, vermelho ou amarelo, bem colorido 🌈' },
        
        // Proteínas
        { item: '🥩', nome: 'CARNE', descricao: 'Proteína importante para crescer forte 💪' },
        { item: '🍗', nome: 'FRANGO', descricao: 'Carne branca, leve e saborosa 🐔' },
        { item: '🐟', nome: 'PEIXE', descricao: 'Do mar ou rio, cheio de ômega 3 🌊' },
        { item: '🥚', nome: 'OVO', descricao: 'Proteína perfeita, vem da galinha 🐔' },
        { item: '🧀', nome: 'QUEIJO', descricao: 'Feito do leite, tem muito cálcio 🥛' },
        
        // Grãos e Cereais
        { item: '🍞', nome: 'PÃO', descricao: 'Feito de trigo, base da alimentação 🌾' },
        { item: '🍚', nome: 'ARROZ', descricao: 'Grãozinho branco, acompanha tudo 🍽️' },
        { item: '🥜', nome: 'AMENDOIM', descricao: 'Oleaginosa que vira paçoca 🥜' },
        { item: '🌰', nome: 'CASTANHA', descricao: 'Semente nutritiva da árvore 🌳' },
        
        // Massas e Lanches
        { item: '🍝', nome: 'MACARRÃO', descricao: 'Massa deliciosa com molho 🍅' },
        { item: '🍕', nome: 'PIZZA', descricao: 'Massa redonda com cobertura gostosa 🔴' },
        { item: '🥖', nome: 'PÃO FRANCÊS', descricao: 'Pãozinho crocante do café da manhã ☀️' },
        { item: '🥪', nome: 'SANDUÍCHE', descricao: 'Lanche com recheio entre pães 🥖' },
        { item: '🍔', nome: 'HAMBÚRGUER', descricao: 'Lanche com carne no pão 🍖' },
        { item: '🍟', nome: 'BATATA FRITA', descricao: 'Palitinhos dourados e crocantes 🟡' },
        { item: '🍿', nome: 'PIPOCA', descricao: 'Milho que estoura e fica branquinho 💥' },
        { item: '🥨', nome: 'PRETZEL', descricao: 'Biscoito salgado em formato especial 🥨' },
        
        // Doces
        { item: '🍯', nome: 'MEL', descricao: 'Doce natural feito pelas abelhas 🐝' },
        { item: '🍫', nome: 'CHOCOLATE', descricao: 'Doce irresistível feito do cacau 🤤' },
        { item: '🍰', nome: 'BOLO', descricao: 'Doce fofo para festas e comemorações 🎉' },
        { item: '🧁', nome: 'CUPCAKE', descricao: 'Bolinho pequeno com cobertura 🎂' },
        { item: '🍪', nome: 'BISCOITO', descricao: 'Crocante e doce para o lanche 🍪' },
        { item: '🎂', nome: 'BOLO DE ANIVERSÁRIO', descricao: 'Doce especial de aniversário 🎈' },
        { item: '🍮', nome: 'PUDIM', descricao: 'Doce cremoso com calda de caramelo 🟫' },
        { item: '🍭', nome: 'PIRULITO', descricao: 'Doce no palitinho, colorido 🌈' },
        { item: '🍬', nome: 'BALA', descricao: 'Docinho pequeno para chupar 😋' },
        { item: '🍦', nome: 'SORVETE', descricao: 'Gelado e doce para refrescar ❄️' },
        
        // Bebidas
        { item: '🥛', nome: 'LEITE', descricao: 'Branquinho, cheio de cálcio para os ossos 🦴' },
        { item: '🧃', nome: 'SUCO', descricao: 'Líquido doce das frutas 🍹' },
        { item: '☕', nome: 'CAFÉ', descricao: 'Bebida escura dos adultos ☕' },
        { item: '🍵', nome: 'CHÁ', descricao: 'Bebida quente das folhas 🌿' },
        { item: '🥤', nome: 'REFRIGERANTE', descricao: 'Bebida doce com bolhinhas 🫧' },
        
        // Temperos
        { item: '🧂', nome: 'SAL', descricao: 'Tempero branco que realça o sabor 🤍' },
        { item: '🌶️', nome: 'PIMENTA', descricao: 'Ardida e vermelha, esquenta a boca 🔥' },
        
        // Comidas Prontas
        { item: '🍳', nome: 'OVO FRITO', descricao: 'Ovinho na frigideira 🍳' },
        { item: '🍲', nome: 'SOPA', descricao: 'Comida líquida e quentinha 🔥' },
        { item: '🍜', nome: 'MACARRÃO INSTANTÂNEO', descricao: 'Macarrão rápido e saboroso 💨' }
    ],
    transportes: [
        // Veículos Terrestres - Carros e Similares
        { item: '🚗', nome: 'CARRO', descricao: 'Transporte de 4 rodas, faz VRUM VRUM 🛣️' },
        { item: '🚙', nome: 'SUV', descricao: 'Carro grande e alto, para aventuras 🏔️' },
        { item: '🚐', nome: 'VAN', descricao: 'Veículo grande para muitas pessoas 👨‍👩‍👧‍👦' },
        { item: '🛻', nome: 'PICAPE', descricao: 'Carro com caçamba para carregar coisas 📦' },
        { item: '🚕', nome: 'TÁXI', descricao: 'Carro amarelo que leva passageiros 🟡' },
        { item: '🚔', nome: 'CARRO DE POLÍCIA', descricao: 'Veículo dos policiais, tem sirene 🚨' },
        { item: '🚑', nome: 'AMBULÂNCIA', descricao: 'Leva pessoas doentes para o hospital 🏥' },
        { item: '🚒', nome: 'CAMINHÃO DE BOMBEIROS', descricao: 'Combate incêndios com água 🔥' },
        
        // Veículos Pesados
        { item: '🚛', nome: 'CAMINHÃO', descricao: 'Grande e forte, carrega muitas coisas 💪' },
        { item: '🚚', nome: 'CAMINHONETE', descricao: 'Caminhão pequeno para entregas 📦' },
        { item: '🚜', nome: 'TRATOR', descricao: 'Trabalha na fazenda, ara a terra 🌾' },
        { item: '🏗️', nome: 'GUINDASTE', descricao: 'Levanta coisas muito pesadas ⬆️' },
        { item: '🚧', nome: 'MÁQUINA DE CONSTRUÇÃO', descricao: 'Constrói estradas e casas 🏠' },
        
        // Transporte Público
        { item: '🚌', nome: 'ÔNIBUS', descricao: 'Transporte coletivo, leva muitas pessoas 👥' },
        { item: '�', nome: 'ÔNIBUS ESCOLAR', descricao: 'Amarelo, leva crianças para escola 🎒' },
        { item: '🚎', nome: 'ÔNIBUS ELÉTRICO', descricao: 'Ônibus que usa energia elétrica ⚡' },
        { item: '🚐', nome: 'MICRO-ÔNIBUS', descricao: 'Ônibus pequeno para poucas pessoas 👥' },
        
        // Veículos de Duas Rodas
        { item: '�🚲', nome: 'BICICLETA', descricao: 'Duas rodas, pedalamos para andar 🚴' },
        { item: '🛴', nome: 'PATINETE', descricao: 'Duas rodas pequenas, empurramos com o pé 🦶' },
        { item: '🏍️', nome: 'MOTOCICLETA', descricao: 'Moto rápida com motor barulhento 💨' },
        { item: '🛵', nome: 'SCOOTER', descricao: 'Motinho pequena e econômica 🏃‍♂️' },
        
        // Transporte Ferroviário
        { item: '🚂', nome: 'TREM', descricao: 'Anda nos trilhos, faz CHOO CHOO 🛤️' },
        { item: '🚃', nome: 'VAGÃO', descricao: 'Parte do trem que carrega passageiros 🪑' },
        { item: '🚄', nome: 'TREM BALA', descricao: 'Trem super rápido do Japão ⚡' },
        { item: '🚅', nome: 'TREM DE ALTA VELOCIDADE', descricao: 'Trem moderno e veloz 🚀' },
        { item: '🚆', nome: 'TREM ELÉTRICO', descricao: 'Trem que usa energia elétrica ⚡' },
        { item: '🚇', nome: 'METRÔ', descricao: 'Trem subterrâneo da cidade 🏙️' },
        { item: '🚈', nome: 'TREM URBANO', descricao: 'Transporte sobre trilhos na cidade 🌆' },
        { item: '🚝', nome: 'MONOTRILHO', descricao: 'Trem que anda em um trilho só ➡️' },
        
        // Transporte Aéreo
        { item: '✈️', nome: 'AVIÃO', descricao: 'Voa pelo céu, faz UIIIIIII ☁️' },
        { item: '�️', nome: 'AVIÃO PEQUENO', descricao: 'Aviãozinho para poucas pessoas 👨‍✈️' },
        { item: '🚁', nome: 'HELICÓPTERO', descricao: 'Voa com hélices que giram 🌀' },
        { item: '🛸', nome: 'DISCO VOADOR', descricao: 'Nave espacial dos aliens 👽' },
        { item: '🚀', nome: 'FOGUETE', descricao: 'Vai para o espaço com fogo 🔥' },
        { item: '🛰️', nome: 'SATÉLITE', descricao: 'Fica no espaço e manda sinais 📡' },
        
        // Transporte Aquático
        { item: '🚢', nome: 'NAVIO', descricao: 'Grande embarcação que navega no mar 🌊' },
        { item: '⛵', nome: 'VELEIRO', descricao: 'Barco que usa o vento para navegar 💨' },
        { item: '🛥️', nome: 'LANCHA', descricao: 'Barco rápido e moderno 💨' },
        { item: '⛴️', nome: 'FERRY', descricao: 'Barco que transporta carros e pessoas 🚗' },
        { item: '🛶', nome: 'CANOA', descricao: 'Barquinho pequeno com remo 🚣' },
        { item: '🚤', nome: 'BARCO A MOTOR', descricao: 'Barco rápido com motor potente 🌊' }
    ],
    transportes: [
        // Veículos Terrestres
        { item: '🚗', nome: 'CARRO', descricao: 'Transporte de 4 rodas, faz VRUM VRUM 🛣️' },
        { item: '🚙', nome: 'SUV', descricao: 'Carro grande e alto, para aventuras 🏔️' },
        { item: '🚐', nome: 'VAN', descricao: 'Veículo grande para muitas pessoas 👨‍👩‍👧‍👦' },
        { item: '🛻', nome: 'PICAPE', descricao: 'Carro com caçamba para carregar coisas 📦' },
        { item: '🚕', nome: 'TÁXI', descricao: 'Carro amarelo que leva passageiros 🟡' },
        { item: '🚔', nome: 'CARRO DE POLÍCIA', descricao: 'Veículo dos policiais, tem sirene 🚨' },
        { item: '🚑', nome: 'AMBULÂNCIA', descricao: 'Leva pessoas doentes para o hospital 🏥' },
        { item: '🚒', nome: 'CAMINHÃO DE BOMBEIROS', descricao: 'Combate incêndios com água 🔥' },
        { item: '🚛', nome: 'CAMINHÃO', descricao: 'Grande e forte, carrega muitas coisas 💪' },
        { item: '🚚', nome: 'CAMINHONETE', descricao: 'Caminhão pequeno para entregas 📦' },
        { item: '🚜', nome: 'TRATOR', descricao: 'Trabalha na fazenda, ara a terra 🌾' },
        
        // Transporte Público
        { item: '🚌', nome: 'ÔNIBUS', descricao: 'Transporte coletivo, leva muitas pessoas 👥' },
        { item: '🚍', nome: 'ÔNIBUS ESCOLAR', descricao: 'Amarelo, leva crianças para escola 🎒' },
        { item: '🚎', nome: 'ÔNIBUS ELÉTRICO', descricao: 'Ônibus que usa energia elétrica ⚡' },
        
        // Veículos de Duas Rodas
        { item: '🚲', nome: 'BICICLETA', descricao: 'Duas rodas, pedalamos para andar 🚴' },
        { item: '🛴', nome: 'PATINETE', descricao: 'Duas rodas pequenas, empurramos com o pé 🦶' },
        { item: '🏍️', nome: 'MOTOCICLETA', descricao: 'Moto rápida com motor barulhento 💨' },
        { item: '🛵', nome: 'SCOOTER', descricao: 'Motinho pequena e econômica 🏃‍♂️' },
        
        // Transporte Ferroviário
        { item: '🚂', nome: 'TREM', descricao: 'Anda nos trilhos, faz CHOO CHOO 🛤️' },
        { item: '🚃', nome: 'VAGÃO', descricao: 'Parte do trem que carrega passageiros 🪑' },
        { item: '🚄', nome: 'TREM BALA', descricao: 'Trem super rápido do Japão ⚡' },
        { item: '🚅', nome: 'TREM DE ALTA VELOCIDADE', descricao: 'Trem moderno e veloz 🚀' },
        { item: '🚆', nome: 'TREM ELÉTRICO', descricao: 'Trem que usa energia elétrica ⚡' },
        { item: '🚇', nome: 'METRÔ', descricao: 'Trem subterrâneo da cidade 🏙️' },
        { item: '🚈', nome: 'TREM URBANO', descricao: 'Transporte sobre trilhos na cidade 🌆' },
        { item: '🚝', nome: 'MONOTRILHO', descricao: 'Trem que anda em um trilho só ➡️' },
        
        // Transporte Aéreo
        { item: '✈️', nome: 'AVIÃO', descricao: 'Voa pelo céu, faz UIIIIIII ☁️' },
        { item: '🛩️', nome: 'AVIÃO PEQUENO', descricao: 'Aviãozinho para poucas pessoas 👨‍✈️' },
        { item: '🚁', nome: 'HELICÓPTERO', descricao: 'Voa com hélices que giram 🌀' },
        { item: '🚀', nome: 'FOGUETE', descricao: 'Vai para o espaço com fogo 🔥' },
        
        // Transporte Aquático
        { item: '🚢', nome: 'NAVIO', descricao: 'Grande embarcação que navega no mar 🌊' },
        { item: '⛵', nome: 'VELEIRO', descricao: 'Barco que usa o vento para navegar 💨' },
        { item: '🛥️', nome: 'LANCHA', descricao: 'Barco rápido e moderno 💨' },
        { item: '⛴️', nome: 'FERRY', descricao: 'Barco que transporta carros e pessoas 🚗' },
        { item: '🛶', nome: 'CANOA', descricao: 'Barquinho pequeno com remo 🚣' },
        { item: '🚤', nome: 'BARCO A MOTOR', descricao: 'Barco rápido com motor potente 🌊' }
    ],
    silabas: [
        // Família do B
        { item: '🍌', nome: 'BA', descricao: 'BA como em BANANA 🍌 - Exemplos: BANANA, BALA, BACIA, BARATA, BATATA' },
        { item: '�', nome: 'BE', descricao: 'BE como em BEBÊ 👶 - Exemplos: BEBÊ, BEIJO, BELA, BECO, BERÇO' },
        { item: '�', nome: 'BI', descricao: 'BI como em BICICLETA 🚲 - Exemplos: BICICLETA, BICO, BIBLIOTECA, BIGODE, BISCOITO' },
        { item: '⚽', nome: 'BO', descricao: 'BO como em BOLA ⚽ - Exemplos: BOLA, BOCA, BONECA, BOLO, BORBOLETA' },
        
        // Transporte de Carga
        { item: '🚛', nome: 'CAMINHÃO GRANDE', descricao: 'Transporta mercadorias pesadas 📦' },
        { item: '🚜', nome: 'TRATOR AGRÍCOLA', descricao: 'Máquina que trabalha no campo 🌱' },
        
        // Veículos Urbanos
        { item: '🛴', nome: 'PATINETE ELÉTRICO', descricao: 'Patinete moderno com bateria ⚡' },
        { item: '�', nome: 'PATINS', descricao: 'Calçado com rodinhas para deslizar ⛸️' },
        
        // Transporte Histórico
        { item: '🎠', nome: 'CARROSSEL', descricao: 'Cavalinhos que giram no parque 🎪' },
        { item: '🎡', nome: 'RODA GIGANTE', descricao: 'Gira devagar mostrando a cidade 🎢' },
        { item: '🎢', nome: 'MONTANHA RUSSA', descricao: 'Diversão radical que sobe e desce 🎭' }
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
        { item: '5️⃣', nome: 'CINCO', descricao: 'Número 5 - Cinco dedos da mão ✋' },
        { item: '6️⃣', nome: 'SEIS', descricao: 'Número 6 - Seis pernas da formiga 🐜' },
        { item: '7️⃣', nome: 'SETE', descricao: 'Número 7 - Sete cores do arco-íris 🌈' },
        { item: '8️⃣', nome: 'OITO', descricao: 'Número 8 - Oito pernas da aranha 🕷️' },
        { item: '9️⃣', nome: 'NOVE', descricao: 'Número 9 - Nove meses do bebê 👶' },
        { item: '🔟', nome: 'DEZ', descricao: 'Número 10 - Dez dedinhos das mãos 🙌' }
    ],
    emocoes: [
        // Emoções Básicas
        { item: '😊', nome: 'FELIZ', descricao: 'Sentimento de alegria e satisfação 😊' },
        { item: '😢', nome: 'TRISTE', descricao: 'Sentimento de tristeza e melancolia 😢' },
        { item: '😠', nome: 'BRAVO', descricao: 'Sentimento de raiva e irritação 😠' },
        { item: '😨', nome: 'MEDO', descricao: 'Sentimento de susto e apreensão 😨' },
        { item: '😴', nome: 'SONO', descricao: 'Sentimento de cansaço e sonolência 😴' },
        
        // Emoções de Alegria
        { item: '😄', nome: 'MUITO FELIZ', descricao: 'Alegria grande, sorriso aberto 😄' },
        { item: '😆', nome: 'RINDO', descricao: 'Gargalhada, muito divertido 😆' },
        { item: '🤣', nome: 'GARGALHANDO', descricao: 'Rindo tanto que chora de rir 🤣' },
        { item: '😂', nome: 'CHORANDO DE RIR', descricao: 'Muito engraçado, não para de rir 😂' },
        { item: '🥰', nome: 'APAIXONADO', descricao: 'Sentimento de muito amor e carinho 🥰' },
        { item: '😍', nome: 'ENCANTADO', descricao: 'Olhos de coração, muito admirado 😍' },
        
        // Emoções de Tristeza
        { item: '😭', nome: 'CHORANDO', descricao: 'Muito triste, lágrimas escorrendo 😭' },
        { item: '😥', nome: 'DECEPCIONADO', descricao: 'Triste e desapontado 😥' },
        { item: '🥺', nome: 'CARENTE', descricao: 'Olhinho pidão, precisando de carinho 🥺' },
        { item: '😞', nome: 'DESANIMADO', descricao: 'Sem energia, cabisbaixo 😞' },
        
        // Emoções de Raiva
        { item: '😡', nome: 'MUITO BRAVO', descricao: 'Raiva intensa, vermelho de raiva 😡' },
        { item: '🤬', nome: 'FURIOSO', descricao: 'Extremamente irritado 🤬' },
        { item: '😤', nome: 'BUFANDO', descricao: 'Respirando fundo de raiva 😤' },
        
        // Emoções de Medo e Ansiedade
        { item: '😰', nome: 'NERVOSO', descricao: 'Suando de nervosismo 😰' },
        { item: '😱', nome: 'APAVORADO', descricao: 'Muito assustado, gritando 😱' },
        { item: '😵', nome: 'TONTO', descricao: 'Zonzo, meio perdido 😵' },
        { item: '🥴', nome: 'CONFUSO', descricao: 'Não entende o que está acontecendo 🥴' },
        
        // Emoções de Surpresa
        { item: '😮', nome: 'SURPRESO', descricao: 'Boca aberta de surpresa 😮' },
        { item: '😲', nome: 'CHOCADO', descricao: 'Muito surpreso, olhos arregalados 😲' },
        { item: '🤯', nome: 'MENTE EXPLODINDO', descricao: 'Surpresa extrema, não acredita 🤯' },
        
        // Emoções Neutras e Calmas
        { item: '😐', nome: 'NEUTRO', descricao: 'Sem expressão, normal 😐' },
        { item: '😌', nome: 'ALIVIADO', descricao: 'Calmo e tranquilo 😌' },
        { item: '🙂', nome: 'CONTENTE', descricao: 'Levemente feliz, sorriso simples 🙂' },
        { item: '😇', nome: 'INOCENTE', descricao: 'Anjinho, comportado 😇' },
        
        // Emoções de Cansaço
        { item: '😪', nome: 'SONOLENTO', descricao: 'Com sono, olhos pesados 😪' },
        { item: '🥱', nome: 'BOCEJANDO', descricao: 'Abrindo a boca de sono 🥱' },
        { item: '😫', nome: 'CANSADO', descricao: 'Exausto, muito cansado 😫' },
        
        // Emoções de Doença
        { item: '🤒', nome: 'DOENTE', descricao: 'Com febre, termômetro na boca 🤒' },
        { item: '🤧', nome: 'RESFRIADO', descricao: 'Espirrando, nariz escorrendo 🤧' },
        { item: '🤢', nome: 'ENJOADO', descricao: 'Com náusea, passando mal 🤢' },
        { item: '🤕', nome: 'MACHUCADO', descricao: 'Com curativo, se recuperando 🤕' },
        
        // Emoções Sociais
        { item: '🤗', nome: 'ABRAÇANDO', descricao: 'Dando um abraço carinhoso 🤗' },
        { item: '🤔', nome: 'PENSANDO', descricao: 'Refletindo, tentando entender 🤔' },
        { item: '😏', nome: 'MAROTO', descricao: 'Sorriso travesso, arteiro 😏' },
        { item: '😋', nome: 'GOSTOSO', descricao: 'Saboreando algo delicioso 😋' },
        { item: '🤤', nome: 'COM ÁGUA NA BOCA', descricao: 'Desejando comer algo 🤤' },
        
        // Emoções de Vergonha
        { item: '😳', nome: 'ENVERGONHADO', descricao: 'Vermelho de vergonha 😳' },
        { item: '🙈', nome: 'TAPANDO OS OLHOS', descricao: 'Não quer ver, com vergonha 🙈' },
        { item: '😅', nome: 'RIR DE NERVOSO', descricao: 'Rindo mas suando frio 😅' },
        
        // Emoções de Tédio
        { item: '😑', nome: 'ENTEDIADO', descricao: 'Sem graça, sem interesse 😑' },
        { item: '🙄', nome: 'REVIRANDO OS OLHOS', descricao: 'Achando chato ou óbvio 🙄' },
        
        // Emoções de Determinação
        { item: '😤', nome: 'DETERMINADO', descricao: 'Focado, pronto para a ação 😤' },
        { item: '🤨', nome: 'DESCONFIADO', descricao: 'Sobrancelha levantada, duvidando 🤨' },
        
        // Emoções Especiais
        { item: '🥳', nome: 'COMEMORANDO', descricao: 'Festa, celebração 🥳' },
        { item: '🤩', nome: 'DESLUMBRADO', descricao: 'Estrelas nos olhos, impressionado 🤩' },
        { item: '😎', nome: 'DESCOLADO', descricao: 'Com óculos escuros, estiloso 😎' }
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
    ]
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
    
    const isEmoji = dadosAtuais.item.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[\u2600-\u27FF]/);
    const classe = isEmoji ? 'emoji' : (dadosAtuais.item.length === 1 ? 'letter' : 'word');
    
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
