import { useEffect, useState } from 'react'
import './App.css'
import layer07 from './assets/forca-01.png'
import layer06 from './assets/forca-02.png'
import layer05 from './assets/forca-03.png'
import layer04 from './assets/forca-04.png'
import layer03 from './assets/forca-05.png'
import layer02 from './assets/forca-06.png'
import layer01 from './assets/forca-07.png'

// Lista de palavras por categoria
const wordsByCategory = {
  ANIMAIS: [
    'CACHORRO', 'GATO', 'ELEFANTE', 'GIRAFA', 'LEAO',
    'TIGRE', 'URSO', 'MACACO', 'COELHO', 'TARTARUGA',
    'PAPAGAIO', 'PEIXE', 'CAVALO', 'PATO', 'GALINHA',
    'PORCO', 'VACA', 'CORUJA', 'RAPOSA', 'PINGUIM'
  ],
  FRUTAS: [
    'BANANA', 'MACA', 'UVA', 'LARANJA', 'ABACAXI',
    'MANGA', 'MELANCIA', 'MORANGO', 'KIWI', 'PERA',
    'PESSEGO', 'AMORA', 'LIMAO', 'CEREJA', 'FRAMBOESA'
  ],
  PAISES: [
    'BRASIL', 'PORTUGAL', 'ARGENTINA', 'JAPAO', 'CANADA',
    'MEXICO', 'ITALIA', 'FRANCA', 'ESPANHA', 'ALEMANHA',
    'CHINA', 'INDIA', 'INGLATERRA', 'AUSTRALIA', 'EGITO'
  ],
  PROFISSOES: [
    'MEDICO', 'PROFESSOR', 'ENGENHEIRO', 'ADVOGADO', 'BOMBEIRO',
    'POLICIAL', 'ARTISTA', 'CANTOR', 'VETERINARIO', 'PADEIRO',
    'COZINHEIRO', 'JORNALISTA', 'DENTISTA', 'MOTORISTA', 'CARPINTEIRO'
  ],
  CORES: [
    'VERMELHO', 'AZUL', 'VERDE', 'AMARELO', 'ROSA',
    'ROXO', 'LARANJA', 'MARROM', 'PRETO', 'BRANCO',
    'CINZA', 'BEGE', 'TURQUESA', 'VIOLETA', 'DOURADO'
  ],
  ESPORTES: [
    'FUTEBOL', 'BASQUETE', 'VOLEI', 'NATACAO', 'CORRIDA',
    'CICLISMO', 'GINASTICA', 'SKATE', 'JUDO', 'XADREZ'
  ],
  OBJETOS: [
    'CADEIRA', 'MESA', 'LIVRO', 'BOLA', 'LAPIS',
    'BORRACHA', 'CAMA', 'SOFA', 'CELULAR', 'TELEVISAO',
    'COMPUTADOR', 'RELÓGIO', 'GARRAFA', 'BICICLETA', 'MOCHILA'
  ],
  TRANSPORTE: [
    'CARRO', 'ONIBUS', 'AVIAO', 'BARCO', 'TREM',
    'MOTO', 'BICICLETA', 'NAVIO', 'HELICOPTERO', 'PATINETE'
  ],
  ALIMENTOS: [
    'ARROZ', 'FEIJAO', 'PIZZA', 'MACARRAO', 'PAO',
    'QUEIJO', 'IOGURTE', 'SORVETE', 'BOLO', 'BISCOITO'
  ],
  NATURALEZA: [
    'FLORESTA', 'MONTANHA', 'RIO', 'LAGO', 'MAR',
    'CACHOEIRA', 'AREIA', 'PEDRA', 'ARVORE', 'NUVEM'
  ],
  INSTRUMENTOS: [
    'VIOLAO', 'PIANO', 'BATERIA', 'FLAUTA', 'TROMPETE',
    'GUITARRA', 'VIOLINO', 'SAXOFONE', 'PERCURSAO', 'CLARINETE'
  ],
  PARTES_DO_CORPO: [
    'CABECA', 'MAO', 'PE', 'PERNA', 'BRAÇO',
    'OLHO', 'BOCA', 'ORELHA', 'NARIZ', 'DEDOS'
  ]
};


function App () {
  // Estados do jogo
  const [category, setCategory] = useState('');
  const [word, setWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [wrongLetters, setWrongLetters] = useState<string[]>([]);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [keyboard] = useState(generateKeyboard());

  // Função para gerar teclado virtual
  function generateKeyboard () {
    const rows = [
      ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
      ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
      ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
    ];
    return rows;
  }

  // Inicializar o jogo
  useEffect(() => {
    startNewGame();
  }, []);

  // Verificar status do jogo
  useEffect(() => {
    if (wrongLetters.length >= 6) {
      setGameStatus('lost');
    } else if (word && word.split('').every(letter => guessedLetters.includes(letter))) {
      setGameStatus('won');
    }
  }, [guessedLetters, wrongLetters, word]);

  // Iniciar novo jogo
  const startNewGame = () => {
    // Selecionar categoria aleatória
    const categories = Object.keys(wordsByCategory);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    setCategory(randomCategory);

    // Selecionar palavra aleatória da categoria
    const words = wordsByCategory[randomCategory as keyof typeof wordsByCategory];
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setWord(randomWord);

    // Resetar o estado do jogo
    setGuessedLetters([]);
    setWrongLetters([]);
    setGameStatus('playing');
  };

  // Lidar com tentativa de letra
  const handleLetterGuess = (letter: string) => {
    // Não fazer nada se o jogo já acabou ou se a letra já foi tentada
    if (gameStatus !== 'playing' || guessedLetters.includes(letter)) {
      return;
    }

    // Adicionar letra à lista de letras tentadas
    setGuessedLetters([...guessedLetters, letter]);

    // Verificar se a letra está na palavra
    if (!word.includes(letter)) {
      setWrongLetters([...wrongLetters, letter]);
    }
  };

  // Obter a imagem da forca com base no número de erros
  const getHangmanImage = () => {
    const images = [layer07, layer06, layer05, layer04, layer03, layer02, layer01];
    return images[Math.min(wrongLetters.length, 6)];
  };

  return (
    <div className='container'>
      <header>
        <h1>JOGO DA FORCA</h1>
      </header>

      <main>
        {gameStatus !== 'playing' && (
          <div className='game-message'>
            {gameStatus === 'won' ? 'VOCÊ VENCEU!' : 'VOCÊ PERDEU!'}
            {gameStatus === 'lost' && <div>A palavra era: {word}</div>}
          </div>
        )}
        <div className='category'>Categoria: {category.replace("_", " ")}</div>

        <div className='imagewrapper'>
          <img src={getHangmanImage()} alt="Forca" />
        </div>

        <div className='word'>
          {word.split('').map((letter, index) => (
            <div className='letter-box' key={index}>
              {guessedLetters.includes(letter) ? letter : gameStatus === 'lost' ? letter : ''}
            </div>
          ))}
        </div>

        <div className='wrong-letters'>
          {wrongLetters.length > 0 && (
            <>
              <span>Letras erradas: </span>
              {wrongLetters.join(', ')}
            </>
          )}
        </div>

        <div className='virtual-keyboard'>
          {keyboard.map((row, rowIndex) => (
            <div className='keyboard-row' key={rowIndex}>
              {row.map((key) => {
                const isGuessed = guessedLetters.includes(key);
                const isWrong = wrongLetters.includes(key);
                return (
                  <button
                    key={key}
                    className={`key ${isGuessed ? (isWrong ? 'wrong' : 'correct') : ''}`}
                    onClick={() => handleLetterGuess(key)}
                    disabled={isGuessed || gameStatus !== 'playing'}
                  >
                    {key}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {gameStatus !== 'playing' && (
          <button className='restart-button' onClick={startNewGame}>
            Jogar Novamente
          </button>
        )}
      </main>

      <footer>&copy; 2025</footer>
    </div>
  );
}

export default App