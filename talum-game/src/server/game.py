import random
from typing import List

from .cards import Card, EmptyCard
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
        self.card_drawn = None
        self.current_card = replaced_card
        self.next_turn()
        return player, self.players[self.current_player_idx].id

    def pass_turn(self, player_id):
        self.check_turn(player_id)
        if self.card_drawn is None:
            raise ValueError("No card drawn ! ")
        player = self.find_player(player_id)
        self.current_card = self.card_drawn
        self.card_drawn = None
        self.next_turn()
        return player, self.players[self.current_player_idx].id

    def find_player(self, player_id):
        for player in self.players:
            if player.id == player_id:
                return player

    def next_turn(self):
        self.current_player_idx = (self.current_player_idx + 1) % len(self.players)

    def taloum(self, player_id):
        self.check_turn(player_id)
        scores = self.compute_player_scores()
        taloum_player_score = scores[player_id]
        if taloum_player_score > 7:
            return f"Talum failed for {player_id} score is {taloum_player_score} bigger than 7 "
        for other_player, score in scores.items():
            if taloum_player_score > score:
                return f"Taloum failed for {player_id}, {other_player} has a score of {score} lower than" \
                       f" {taloum_player_score}"
        return f"Taloum successful for player {player_id} with a score of {taloum_player_score}"

    def compute_player_scores(self):
        return {player.id: player.score() for player in self.players}

    def put_on_current_card(self, player_id, pos):
        player = self.find_player(player_id)
        if player.cards[pos].value == self.current_card.value:
            self.current_card = player.cards[pos]
            player.cards[pos] = EmptyCard()
        else:
            player.cards.append(self.card_deck.next())
        return player
