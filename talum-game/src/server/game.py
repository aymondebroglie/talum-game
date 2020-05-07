from typing import Dict

from .deck import Deck
from .player import Player


class Game:

    def __init__(self, id):
        self.id = id
        self.players: Dict[str, Player] = {}
        self.card_deck = Deck()
        self.current_card = None

    def add_player(self, player_id):
        self.players[player_id] = Player(player_id)

    def start_game(self):
        for player in self.players.values():
            for _ in range(4):
                player.give_card(self.card_deck.next())

        self.current_card = self.card_deck.next()

    def player_is_done_viewing(self, client_id):
        self.players[client_id].is_done_viewing_cards = True

    def all_player_are_done_viewing(self):
        return all([player.is_done_viewing_cards for player in self.players.values()])
