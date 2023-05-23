import { Ball } from "./ball.js";
import { Board } from "./board.js";
import { Bot } from "./players/bot.js";
import { Human } from "./players/human.js";
import { Scoreboard } from "./scoreboard.js";
import { BOARD, DISTANCE_TO_BOARD } from "./constants/board.js";
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  FIRST_SERVE_PLAYER,
  SPEED_AFTER_BOUNCE,
  PLAYER_PROJECTOR,
} from "./constants/constants.js";

export class Game {
  /**
   * @constructs Game
   * @param Object Game Container Object
   * @param String GameMode ie. vs Bot or vs Friend
   * @param String Score to win a Game
   * @param String Change serve after this serves
   * @param String Best of 1/3/5
   * @param String Player1 Name
   * @param String Player2 Name
   */
  constructor(
    gameContainer,
    gameMode,
    gameAt,
    serveChangeAt,
    maxGame,
    p1Name,
    p2Name
  ) {
    this.gameMode = gameMode;
    gameContainer.innerHTML = "<canvas></canvas>".repeat(this.gameMode + 1);
    PLAYER_PROJECTOR.viewerPosition.x /= 1 + this.gameMode;

    this.canvas = gameContainer.querySelectorAll("canvas");
    this.ctx = [];
    this.canvas.forEach((x) => {
      this.ctx.push(x.getContext("2d"));
      x.height = CANVAS_HEIGHT;
      x.width = CANVAS_WIDTH / (1 + this.gameMode);
    });

    this.gameOver = false;
    this.gameOverScore = gameAt;
    this.servePlayer = FIRST_SERVE_PLAYER;
    this.maxGame = maxGame;

    this.board = new Board(this.ctx, this.gameMode);
    this.ball = new Ball(this.ctx, this.board, this.gameMode, this.servePlayer);
    if (this.gameMode === 0) {
      this.player1 = new Human(
        this.ctx,
        10,
        BOARD.HEIGHT * 0.75,
        (DISTANCE_TO_BOARD * 3) / 4,
        0,
        p1Name,
        "mouse",
        0
      );
      this.botPlayer = new Bot(
        this.ctx,
        10,
        BOARD.HEIGHT * 0.75,
        DISTANCE_TO_BOARD + BOARD.LENGTH,
        1,
        p2Name,
        this.ball
      );
      this.players = [this.player1, this.botPlayer];
      if (this.botPlayer.playerId === this.servePlayer) this.botPlayer.serve();
    } else if (this.gameMode === 1) {
      this.player1 = new Human(
        this.ctx,
        10,
        BOARD.HEIGHT * 0.75,
        (DISTANCE_TO_BOARD * 3) / 4,
        0,
        p1Name,
        "mouse",
        1
      );
      this.player2 = new Human(
        this.ctx,
        10,
        BOARD.HEIGHT * 0.75,
        (DISTANCE_TO_BOARD * 4.5) / 5 + BOARD.LENGTH,
        1,
        p2Name,
        "keyboard",
        1
      );
      this.players = [this.player1, this.player2];
    }

    this.players[this.servePlayer].serveState = true;
    this.ball.scoreTo = 1 - this.servePlayer;

    this.isPaused = false;
    this.currentServe = 0;
    this.maxServe = serveChangeAt;
    this.scoreBoard = new Scoreboard(
      this.ctx,
      this.players[0],
      this.players[1]
    );
    this.winner = null;

    this.refree = new Audio();
    this.refree.src = "./assets/refree.m4a";
    this.refree.volume = 0.7;
    this.runGame();
  }

  runGame() {
    this.players.forEach((x) => {
      x.detectBallCollision(this.ball);
    });
    if (this.ball.isInvalid == true) this.resetToServe();
    if (
      this.isPaused &&
      this.gameMode === 0 &&
      this.servePlayer === this.botPlayer.playerId
    )
      this.makeBotServe();

    //Clear Canvas
    this.ctx.forEach((x, index) => {
      x.fillStyle = "#ffffff";
      x.fillRect(0, 0, this.canvas[index].width, this.canvas[index].height);
    });

    this.ball.moveBall();
    this.drawBallBatBoard();
    this.scoreBoard.displayScores();

    if (!this.gameOver) requestAnimationFrame(this.runGame.bind(this));
  }

  makeBotServe() {
    this.botPlayer.serve();
    this.isPaused = false;
  }

  drawBallBatBoard() {
    if (this.ball.position.y >= BOARD.HEIGHT) this.ball.drawBall();
    this.ctx.forEach((x, index) => {
      this.players[1 - index].drawBat(index);
    });
    this.board.drawBoard();
    if (this.ball.position.y < BOARD.HEIGHT) this.ball.drawBall();
    this.ctx.forEach((x, index) => {
      this.players[index].drawBat(index);
    });
  }

  resetToServe() {
    this.refree.play();
    if (this.ball.scoreTo != undefined) this.players[this.ball.scoreTo].score++;
    if (
      this.checkWonOrNot(this.players[0]) ||
      this.checkWonOrNot(this.players[1])
    )
      this.roundEnd();
    this.isPaused = true;
    this.ball.isInvalid = false;
    this.ball.isBeingServed = true;
    this.ball.dX = 0;
    this.ball.dY = 0;
    this.ball.dZ = 0;
    this.ball.bounches = 0;
    this.ball.isBounched = true;
    this.ball.speedAfterBounche = SPEED_AFTER_BOUNCE;
    if (this.isPaused) this.changeServe();
    this.ball.scoreTo = this.players[1 - this.servePlayer].playerId;
    this.isPaused = true;
  }

  changeServe() {
    this.currentServe++;
    if (this.currentServe >= this.maxServe) {
      if (this.servePlayer === this.players[0].playerId)
        this.servePlayer = this.players[1].playerId;
      else this.servePlayer = this.players[0].playerId;
      this.currentServe = 0;
    }
    if (this.servePlayer === this.players[0].playerId)
      this.players[0].serveState = true;
    else this.players[1].serveState = true;
    this.ball.resetBallPosition(this.servePlayer);
    this.isPaused = false;
  }

  gameEnd(winner) {
    this.winner = winner;
  }

  roundEnd() {
    const scores = JSON.parse(localStorage.getItem("scores")) || [];

    const winner =
      this.players[0].score > this.players[1].score
        ? this.players[0]
        : this.players[1];
    const looser =
      this.players[0].score > this.players[1].score
        ? this.players[1]
        : this.players[0];
    // get score in winner - looser format
    const finalScore = `${winner.score} - ${looser.score}`;
    scores.push({
      winner: winner.name,
      looser: looser.name,
      score: finalScore,
      date: new Date(),
    });

    localStorage.setItem("scores", JSON.stringify(scores));

    if (this.players[0].score > this.players[1].score) this.players[0].games++;
    else this.players[1].games++;
    if (this.players[0].games >= Math.round(this.maxGame / 2)) {
      this.gameEnd(this.players[0].name);
      this.gameOver = true;
    } else if (this.players[1].games >= Math.round(this.maxGame / 2)) {
      this.gameEnd(this.players[1].name);
      this.gameOver = true;
    }
    this.currentServe = -1;
    this.players.forEach((x) => {
      x.score = 0;
      x.serveState = false;
    });
    this.servePlayer =
      (FIRST_SERVE_PLAYER + this.players[0].games + this.players[1].games) % 2;
  }

  checkWonOrNot(player) {
    if (player.score >= this.gameOverScore) return true;
    return false;
  }
}
