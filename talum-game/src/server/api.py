import random
from string import ascii_letters
from typing import Dict, List

from flask import Flask, request
from flask_socketio import SocketIO

from .game import Game

app = Flask(__name__)
app.config["SECRET_KEY"] = 'SECRET'
socket_io = SocketIO(app, cors_allowed_origins='http://localhost:3000')
games: Dict[str, Game] = {}
clients: List[str] = []


@socket_io.on("connect")
def handle_connection():
    print(request.sid)
    clients.append(request.sid)


@app.route('/create_game', methods=['POST'])
def create_game():
    client_id = request.args.get("playerId")
    if client_id not in clients:
        raise ValueError("not in clients ")
    game_id = ''.join([random.choice(ascii_letters) for _ in range(8)])
    game = Game(game_id)
    games[game_id] = game
    game.add_player(client_id)
    return {"gameId": game_id}


@app.route('/start_game', methods=['POST'])
def start_game():
    game_id = request.args.get("gameId")
    game: Game = games.get(game_id)
    game.start_game()
    socket_io.emit("currentCard", game.current_card.for_front(), broadcast=True)
    for player in game.players.values():
        socket_io.emit("cardUpdate", player.get_cards_for_json(), room=player.id)
    socket_io.emit("stateUpdate", "VIEW_CARDS")
    return {}


@app.route('/done_viewing_card', methods=['Post'])
def done_viewing_card():
    client_id = request.args.get("playerId")
    game_id = request.args.get("gameId")
    game = games[game_id]
    game.player_is_done_viewing(client_id)
    if game.all_player_are_done_viewing():
        socket_io.emit("stateUpdate", "GAME_RUNNING", broadcast=True)
    return {}


if __name__ == '__main__':
    socket_io.run(app)
