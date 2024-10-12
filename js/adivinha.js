const words = [
                'galaxia', 
                'supernova', 
                'planeta', 
                'sistema',
                'estrelas',
                'asteroide',
                'fisica',
                'ciencia',
                'nebulosa',
                'astronomia',
                'universo',
                'aglomerado',
                'cometas',
                'constelacao'
            ];

let selectedWord = '';
let revealedWord = '';
let attempts = [];
let remainingAttempts = 15;

function initializeGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    revealedWord = '_'.repeat(selectedWord.length);
    attempts = [];
    remainingAttempts = 15;

    document.getElementById('word-container').textContent = revealedWord;
    document.getElementById('attempts').textContent = attempts.join(', ');
    document.getElementById('remaining-attempts').textContent = remainingAttempts;
    document.getElementById('message').textContent = '';
    document.getElementById('guess-button').disabled = false;
}

function updateWord(letter) {
    let newRevealedWord = revealedWord.split('');
    let correctGuess = false;

    for (let i = 0; i < selectedWord.length; i++) {
        if (selectedWord[i] === letter) {
            newRevealedWord[i] = letter;
            correctGuess = true;
        }
    }

    revealedWord = newRevealedWord.join('');
    document.getElementById('word-container').textContent = revealedWord;

    return correctGuess;
}

function showConfetti() {
    confetti({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.6 }
    });
}

document.getElementById('guess-button').addEventListener('click', function() {
    const letterInput = document.getElementById('letter-input');
    const letter = letterInput.value.toLowerCase();

    if (letter && letter.length === 1 && !attempts.includes(letter)) {
        attempts.push(letter);
        document.getElementById('attempts').textContent = attempts.join(', ');

        const correctGuess = updateWord(letter);

        if (!correctGuess) {
            remainingAttempts--;
            document.getElementById('remaining-attempts').textContent = remainingAttempts;
        }

        if (remainingAttempts <= 0) {
            document.getElementById('message').textContent = 'Você perdeu! A palavra era ' + selectedWord;
            document.getElementById('guess-button').disabled = true;
        } else if (revealedWord === selectedWord) {
            document.getElementById('message').textContent = 'Parabéns! Você ganhou!';
            document.getElementById('guess-button').disabled = true;
            showConfetti(); // Mostrar confete ao ganhar
        }

        letterInput.value = '';
    }
});

document.getElementById('restart-button').addEventListener('click', function() {
    initializeGame();
});

window.onload = initializeGame;
