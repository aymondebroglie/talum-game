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

        self.current_player_idx: int = None
        self.card_drawn: Card = None

    def add_player(self, player_id):
        self.players.append(Player(player_id))

    def start_game(self):
        for player in self.players:
            for _ in range(4):
                player.give_card(self.card_deck.next())

        self.current_card = self.card_deck.next()

    def player_is_done_viewing(self, client_id):
        player = self.find_player(client_id)
        player.is_done_viewing_cards = True

    def all_player_are_done_viewing(self):
        return all([player.is_done_viewing_cards for player in self.players])

    def run_after_viewing(self):
        self.current_player_idx = random.randint(0, len(self.players) - 1)
        return self.players[self.current_player_idx].id

    def draw_card(self, player_id) -> Card:
        self.check_turn(player_id)
        self.card_drawn = self.card_deck.next()
        return self.card_drawn

    def check_turn(self, player_id):
        if not player_id == self.players[self.current_player_idx].id:
            raise ValueError("Player cannot play, it's not his turn ")

    def replace_with_drawn(self, player_id, pos_exchange):
        self.check_turn(player_id)
        if self.card_drawn is None:
            raise ValueError("No card drawn ! ")
        player = self.find_player(player_id)
        replaced_card = player.cards[pos_exchange]
        player.cards[pos_exchange] = self.card_drawn
        self.current_card = replaced_card
        self.next_turn()
        return player, self.players[self.current_player_idx].id

    def find_player(self, player_id):
        for player in self.players:
            if player.id == player_id:
                return player

    def next_turn(self):
        self.current_player_idx = (self.current_player_idx + 1) % len(self.players)
