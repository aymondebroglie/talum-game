from typing import List

from .cards import Card


class Player:

    def __init__(self, id):
        self.id = id
        self.cards = {}

    def init_cards(self, cards: List[Card]):
        for i, card in enumerate(cards):
            self.cards[i] = card
