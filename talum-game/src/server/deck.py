import random

from .cards import Card


class Deck:

    def __init__(self):
        self.cards = self._build()

    def _build(self):
        cards = []
        for colour in ["Trefle", "Carreau", "Coeur", "Pique"]:
            for value in range(1, 14):
                cards.append(Card(colour, value))
        random.shuffle(cards)
        return cards

    def next(self):
        return self.cards.pop()
