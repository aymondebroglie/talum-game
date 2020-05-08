import random
from typing import List

from .cards import Card
from .deck import Deck
from .player import Player


class Game:

    def __init__(self, id):
        self.id = id
        self.players: List[Player] = []
        self.card_deck: Deck = Deck()
        self.current_card: Card = None
        self.current_player: Player = None
        self.card_drawn: Card = None

    def add_player(self, player_id):
        self.players.append(Player(player_id))

    def start_game(self):
        for player in self.players:
            for _ in range(4):
                player.give_card(self.card_deck.next())

        self.current_card = self.card_deck.next()

    def player_is_done_viewing(self, client_id):
        for player in self.players:
            if player.id == client_id:
                player.is_done_viewing_cards = True

    def all_player_are_done_viewing(self):
        return all([player.is_done_viewing_cards for player in self.players])

    def run_after_viewing(self):
        starting_player = random.randint(0, len(self.players) - 1)
        self.current_player = self.players[starting_player]
        return self.current_player.id

    def draw_card(self, player_id) -> Card:
        if not player_id == self.current_player.id:
            raise ValueError("Player cannot draw card, it's not his turn ")
        self.card_drawn = self.card_deck.next()
        return self.card_drawn
