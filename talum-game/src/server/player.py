class Player:

    def __init__(self, id):
        self.id = id
        self.cards = []
        self.is_done_viewing_cards = False

    def give_card(self, card):
        self.cards.append(card)

    def get_cards_for_json(self):
        return [card.__dict__ for card in self.cards]

