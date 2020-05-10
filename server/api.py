import random
import time
from string import ascii_letters
from typing import Dict, List

from flask import Flask, request
from flask_socketio import SocketIO
from game.cards import Card
from game.game import Game

app = Flask(__name__, static_url_path='', static_folder='../client/build')
app.config["SECRET_KEY"] = 'SECRET'
socket_io = SocketIO(app, cors_allowed_origins='http://localhost:3000')
games: Dict[str, Game] = {}
clients: List[str] = []


@app.route('/')
def root():
    print("Hello")
    return app.send_static_file('index.html')


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


@app.route('/join_game', methods=['POST'])
def join_game():
    player_id, game = retrieve_player_and_game()
    game.add_player(player_id)
    return {"gameId": game.id}


@app.route('/start_game', methods=['POST'])
def start_game():
    game_id = request.args.get("gameId")
    game: Game = games.get(game_id)
    game.start_game()
    for player in game.players:
        socket_io.emit("cardUpdate", player.get_cards_for_json(), room=player.id)
    socket_io.emit("stateUpdate", "VIEW_CARDS")
    return {}


@app.route('/done_viewing_card', methods=['Post'])
def done_viewing_card():
    player_id, game = retrieve_player_and_game()
    game.player_is_done_viewing(player_id)
    if game.all_player_are_done_viewing():
        socket_io.emit("stateUpdate", "GAME_RUNNING", broadcast=True)
        starting_player_id = game.run_after_viewing()
        emit_new_turn(starting_player_id)
    return {}


@app.route('/replace_drawn', methods=['Post'])
def replacing_with_drawn():
    player_id, game = retrieve_player_and_game()
    pos_exchange = int(request.args.get("position"))
    player, next_player_id = game.replace_with_drawn(player_id, pos_exchange)
    emit_current_card(game)
    time.sleep(0.2)
    emit_new_turn(next_player_id)
    time.sleep(0.2)
    socket_io.emit('cardUpdate', player.get_cards_for_json(), room=player.id)
    return {}


@app.route('/pass_turn', methods=['Post'])
def pass_turn():
    player_id, game = retrieve_player_and_game()
    player, next_player_id = game.pass_turn(player_id)
    emit_current_card(game)
    time.sleep(0.2)
    emit_new_turn(next_player_id)
    return {}


@app.route('/draw_current_card', methods=['Post'])
def draw_current_card():
    player_id, game = retrieve_player_and_game()
    card_drawn: Card = game.draw_current_card(player_id)
    emit_current_card(game)
    time.sleep(0.2)
    socket_io.emit('cardDrawn', card_drawn.for_front(), room=player_id)
    return {}


def emit_current_card(game):
    socket_io.emit('updateCurrentCard', game.current_card_stack[-1].for_front(), broadcast=True)


@app.route('/put_on_current_card', methods=['Post'])
def put_on_current_card():
    player_id, game = retrieve_player_and_game()
    pos = int(request.args.get("position"))
    player = game.put_on_current_card(player_id, pos)
    emit_current_card(game)
    time.sleep(0.2)
    socket_io.emit('cardUpdate', player.get_cards_for_json(), room=player.id)


@app.route('/taloum', methods=['Post'])
def taloum():
    player_id, game = retrieve_player_and_game()
    result = game.taloum(player_id)
    socket_io.emit("taloum", result, broadcast=True)
    return {}


def emit_new_turn(player_id):
    socket_io.emit('newTurn', player_id, broadcast=True)


def retrieve_player_and_game():
    player_id = request.args.get("playerId")
    game_id = request.args.get("gameId")
    game = games[game_id]
    return player_id, game


@app.route('/draw_card', methods=['Post'])
def draw_card():
    player_id, game = retrieve_player_and_game()
    card_drawn: Card = game.draw_card(player_id)
    socket_io.emit('cardDrawn', card_drawn.for_front(), room=player_id)
    return {}


if __name__ == '__main__':
    socket_io.run(app)
