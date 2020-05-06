import random
from string import ascii_letters

from flask import Flask, request
from flask_socketio import SocketIO

from .game import Game

app = Flask(__name__)
app.config["SECRET_KEY"] = 'SECRET'
socket_io = SocketIO(app, cors_allowed_origins='http://localhost:3000')
games = {}


@socket_io.on("connect")
def handle_connection():
    print("Connected ")


@app.route('/create_game', methods=['POST'])
def create_game():
    player_id = request.args.get("playerId")
    game_id = ''.join([random.choice(ascii_letters) for _ in range(8)])
    game = Game(game_id)
    games[game_id] = game
    game.add_player(player_id)
    return {"gameId": game_id}


@app.route('/start_game', methods=['POST'])
def start_game():
    game_id = request.args.get("gameId")
    print(f"Starting game {game_id}")
    socket_io.emit("stateUpdate", "GAME_RUNNING")
    return {}


if __name__ == '__main__':
    socket_io.run(app)
