from enum import Enum


class Color(Enum):
    Trefle = "c"
    Carreau = "d"
    Coeur = "h"
    Pique = "s"


class Card:

    def __init__(self, color, value):
        self.color = color
        self.value = value

    def for_front(self):
        value = self.transforme_into_face(self.value)
        print(value)
        return value + self.color.value

    def transforme_into_face(self, value):
        if value <= 10:
            return str(value)
        elif value == 11:
            return "j"
        elif value == 12:
            return "q"
        elif value == 13:
            return "k"
