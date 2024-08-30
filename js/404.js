 const gameContainer = document.getElementById('gameContainer');
  const bin = document.getElementById('bin');
  const scoreDisplay = document.getElementById('score');
  const highscoreDisplay = document.getElementById('highscore');
  const gameOverDisplay = document.getElementById('gameOver');
  const reloadButton = document.getElementById('reloadButton');
  let score = 0;
  let highscore = localStorage.getItem('highscore') || 0;
  let speed = 1000;
  let gameInterval;
  let gameRunning = true;
  let acceleration = 0.05; // Acceleration for falling items

  function updateBinPosition(x) {
    const rect = gameContainer.getBoundingClientRect();
    const binX = x - rect.left - bin.offsetWidth / 2;
    bin.style.left = `${Math.max(0, Math.min(binX, gameContainer.offsetWidth - bin.offsetWidth))}px`;
  }

  function handleTouch(e) {
    e.preventDefault();
    updateBinPosition(e.touches[0].clientX);
  }

  document.addEventListener('mousemove', (e) => updateBinPosition(e.clientX));
  document.addEventListener('touchmove', handleTouch);
  document.addEventListener('keydown', (e) => {
    const binX = parseInt(bin.style.left, 10) || 0;
    if (e.key === 'ArrowLeft') {
      updateBinPosition(binX - 20);
    } else if (e.key === 'ArrowRight') {
      updateBinPosition(binX + 20);
    }
  });

  function startGame() {
    if (!gameRunning) return;

    const item = document.createElement('div');
    item.classList.add('item');
    item.style.left = `${Math.random() * (gameContainer.offsetWidth - 50)}px`;
    item.style.top = '0px';
    item.speed = Math.random() * 2 + 1; // Random speed between 1 and 3

    const itemType = Math.random();
    if (itemType < 0.2) {
      item.classList.add('plastic-bottle');
    } else if (itemType < 0.4) {
      item.classList.add('glass-bottle');
    } else if (itemType < 0.6) {
      item.classList.add('can');
    } else if (itemType < 0.8) {
      item.classList.add('pineapple');
    } else if (itemType < 0.9) {
      item.classList.add('plant');
    } else {
      item.classList.add('tree');
    }

    gameContainer.appendChild(item);

    let itemInterval = setInterval(() => {
      if (!gameRunning) return;
      let itemTop = parseFloat(item.style.top) + item.speed;
      item.style.top = `${itemTop}px`;

      const binRect = bin.getBoundingClientRect();
      const itemRect = item.getBoundingClientRect();

      // Check if the item is within the bin's horizontal range
      const isWithinBinHorizontalRange = itemRect.left < binRect.right && itemRect.right > binRect.left;

      if (itemTop > gameContainer.offsetHeight - 60) {
        if (item.classList.contains('plastic-bottle') || item.classList.contains('glass-bottle') || item.classList.contains('can')) {
          if (isWithinBinHorizontalRange) {
            gameContainer.removeChild(item);
            clearInterval(itemInterval);
          } else {
            gameOver();
          }
        } else if (item.classList.contains('pineapple') || item.classList.contains('plant') || item.classList.contains('tree')) {
          if (isWithinBinHorizontalRange) {
            gameOver();
          } else {
            gameContainer.removeChild(item);
            clearInterval(itemInterval);
            score++;
            scoreDisplay.innerText = `Score: ${score}`;
          }
        }
      } else if (itemTop > gameContainer.offsetHeight) {
        if (item.classList.contains('pineapple') || item.classList.contains('plant') || item.classList.contains('tree')) {
          gameContainer.removeChild(item);
          clearInterval(itemInterval);
        }
      }
    }, 20);

    speed = Math.max(200, speed - 10); // Increase falling speed
    clearInterval(gameInterval);
    gameInterval = setInterval(startGame, speed);
  }

  function gameOver() {
    gameRunning = false;
    gameOverDisplay.style.display = 'block';
    if (score > highscore) {
      localStorage.setItem('highscore', score);
      highscore = score;
      highscoreDisplay.innerText = `High Score: ${highscore}`;
    }
  }

  reloadButton.addEventListener('click', () => {
    window.location.href = "home-page.html"; // Replace with the actual URL of the HTML page
  });

  function init() {
    highscoreDisplay.innerText = `High Score: ${highscore}`;
    startGame();
  }

  init();
