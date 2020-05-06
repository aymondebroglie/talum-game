from .deck import Deck
from .player import Player


class Game:

    def __init__(self, id):
        self.id = id
        self.players = []
        self.card_deck = Deck()
        self.current_card = None

    def add_player(self, player_id):
        self.players.append(Player(player_id))
