document.addEventListener("DOMContentLoaded", () => {
    const menu = document.getElementById("menu");
    const onePlayerBtn = document.getElementById("onePlayerBtn");
    const twoPlayersBtn = document.getElementById("twoPlayersBtn");
    const game = document.getElementById("game");
    const board = document.getElementById("board");
    const infoPanel = document.getElementById("infoPanel");
    const twoPlayerInfo = document.getElementById("twoPlayerInfo");
    const restart = document.getElementById("restart");
    const back = document.getElementById("back");

    const player1ScoreElement = document.getElementById("player1Score");
    const player2ScoreElement = document.getElementById("player2Score");
    const turnIndicator = document.getElementById("turnIndicator");

    let player1Score = 0;
    let player2Score = 0;
    let currentPlayer = 1;

    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;

    const images = [
        "Obr/Obr1.png", "Obr/Obr2.png", "Obr/Obr3.png", "Obr/Obr4.png", "Obr/Obr5.png",
        "Obr/Obr6.png", "Obr/Obr7.png", "Obr/Obr8.png", "Obr/Obr9.png", "Obr/Obr10.png",
        "Obr/Obr11.png", "Obr/Obr12.png", "Obr/Obr13.png", "Obr/Obr14.png", "Obr/Obr15.png",
        "Obr/Obr16.png", "Obr/Obr17.png", "Obr/Obr18.png", "Obr/Obr19.png", "Obr/Obr20.png", "Obr/Obr21.png",
        "Obr/Obr1.png", "Obr/Obr2.png", "Obr/Obr3.png", "Obr/Obr4.png", "Obr/Obr5.png",
        "Obr/Obr6.png", "Obr/Obr7.png", "Obr/Obr8.png", "Obr/Obr9.png", "Obr/Obr10.png", 
        "Obr/Obr11.png", "Obr/Obr12.png", "Obr/Obr13.png", "Obr/Obr14.png", "Obr/Obr15.png",
        "Obr/Obr16.png", "Obr/Obr17.png", "Obr/Obr18.png", "Obr/Obr19.png", "Obr/Obr20.png", "Obr/Obr21.png"
    ];

    onePlayerBtn.addEventListener("click", () => {
        startGame(false);
    });

    twoPlayersBtn.addEventListener("click", () => {
        startGame(true);
    });

    restart.addEventListener("click", () => {
        resetScores();
        initializeBoard();
    });

    back.addEventListener("click", () => {
        resetScores();
        game.classList.add("hidden");
        infoPanel.classList.add("hidden");
        twoPlayerInfo.classList.add("hidden");
        menu.classList.remove("hidden");
        board.innerHTML = "";
    });

    function startGame(isTwoPlayer) {
        menu.classList.add("hidden");
        game.classList.remove("hidden");
        infoPanel.classList.remove("hidden");

        if (isTwoPlayer) {
            twoPlayerInfo.classList.remove("hidden");
        } else {
            twoPlayerInfo.classList.add("hidden");
        }

        initializeBoard();
    }

    function resetScores() {
        player1Score = 0;
        player2Score = 0;
        currentPlayer = 1;
        updateScores();
    }

    function initializeBoard() {
        board.innerHTML = ""; // Reset board
        const shuffledImages = images.sort(() => Math.random() - 0.5); // Shuffle images
        shuffledImages.forEach((image) => {
            const card = createCard(image);
            board.appendChild(card);
        });
    }

    function createCard(image) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.image = image;

        const frontFace = document.createElement("div");
        frontFace.classList.add("front-face");
        frontFace.style.backgroundImage = `url(${image})`;

        const backFace = document.createElement("div");
        backFace.classList.add("back-face");

        card.appendChild(frontFace);
        card.appendChild(backFace);

        card.addEventListener("click", () => handleCardClick(card));
        return card;
    }

    function handleCardClick(card) {
        if (lockBoard || card === firstCard || card.classList.contains("flipped")) return;

        card.classList.add("flipped");

        if (!firstCard) {
            firstCard = card;
            return;
        }

        secondCard = card;
        checkForMatch();
    }

    function checkForMatch() {
        lockBoard = true;

        const isMatch = firstCard.dataset.image === secondCard.dataset.image;
        if (isMatch) {
            disableCards();
            updateScore();
        } else {
            unflipCards();
            switchPlayer();
        }
    }

    function disableCards() {
        setTimeout(() => {
            firstCard.style.visibility = "hidden";
            secondCard.style.visibility = "hidden";
            resetBoard();
        }, 1000);
    }

    function unflipCards() {
        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            resetBoard();
        }, 1000);
    }

    function resetBoard() {
        [firstCard, secondCard] = [null, null];
        lockBoard = false;
    }

    function updateScore() {
        if (currentPlayer === 1) {
            player1Score++;
        } else {
            player2Score++;
        }
        updateScores();
    }

    function updateScores() {
        player1ScoreElement.textContent = player1Score;
        player2ScoreElement.textContent = player2Score;
        turnIndicator.textContent = `Na tahu: Hráč ${currentPlayer}`;
    }

    function switchPlayer() {
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        turnIndicator.textContent = `Na tahu: Hráč ${currentPlayer}`;
    }

    updateScores();
});
