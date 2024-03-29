import init, { World, Direction, GameStatus } from "snake-game";
import { random } from "./utils/random";

init().then((wasm) => {
  const CELL_SIZE = 40;
  const WORLD_WIDTH = 8;
  const snakeSpawnIdx = random(WORLD_WIDTH * WORLD_WIDTH);

  const world = World.new(WORLD_WIDTH, snakeSpawnIdx);
  const worldWidth = world.width();

  const points = document.getElementById("points");
  const gameStatus = document.getElementById("game-status");
  const gameControlBtn = document.getElementById("game-control-btn");
  const canvas = <HTMLCanvasElement>document.getElementById("snake-canvas");
  const ctx = canvas.getContext("2d");

  canvas.height = worldWidth * CELL_SIZE;
  canvas.width = worldWidth * CELL_SIZE;

  gameControlBtn.addEventListener("click", (_) => {
    const status = world.game_status();

    if (status === undefined) {
      gameControlBtn.textContent = "Playing...";
      world.start_game();
      play();
    } else {
      location.reload();
    }
  });

  document.addEventListener("keydown", (e) => {
    switch (e.code) {
      case "ArrowUp":
        world.change_snake_direction(Direction.Up);
        break;
      case "ArrowRight":
        world.change_snake_direction(Direction.Right);
        break;
      case "ArrowDown":
        world.change_snake_direction(Direction.Down);
        break;
      case "ArrowLeft":
        world.change_snake_direction(Direction.Left);
        break;
    }
  });

  function drawWorld() {
    ctx.beginPath();

    for (let x = 0; x < worldWidth + 1; x++) {
      ctx.moveTo(CELL_SIZE * x, 0);
      ctx.lineTo(CELL_SIZE * x, worldWidth * CELL_SIZE);
    }

    for (let y = 0; y < worldWidth + 1; y++) {
      ctx.moveTo(0, CELL_SIZE * y);
      ctx.lineTo(worldWidth * CELL_SIZE, CELL_SIZE * y);
    }

    ctx.stroke();
  }

  function drawReward() {
    const idx = world.reward_cell();
    const col = idx % worldWidth;
    const row = Math.floor(idx / worldWidth);

    ctx.beginPath();
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE);

    ctx.stroke();
  }

  function drawSnake() {
    const snakeCells = new Uint32Array(
      wasm.memory.buffer,
      world.snake_cells(),
      world.snake_length()
    );

    snakeCells
      .slice()
      .reverse()
      .forEach((cellIdx, i) => {
      const col = cellIdx % worldWidth;
      const row = Math.floor(cellIdx / worldWidth);

      ctx.fillStyle = i === (snakeCells.length - 1) ? "#7878db" : "#000000";

      ctx.beginPath();
      ctx.fillRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    });

    ctx.stroke();
  }

  function drawGameStatus() {
    gameStatus.textContent = world.game_status_text();
    points.textContent = world.points().toString();
  }

  function paint() {
    drawWorld();
    drawSnake();
    drawReward();
    drawGameStatus();
  }

  function play() {
    const status = world.game_status();
    
    if (status == GameStatus.Won || status == GameStatus.Lost) {
      gameControlBtn.textContent = "Restart";
    }

    const fps = 5;
    setTimeout(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      world.update();
      paint();
      requestAnimationFrame(play);
    }, 1000 / fps);
  }

  paint();
});
