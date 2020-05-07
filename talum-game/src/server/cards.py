from flask import jsonify
from flask.json import JSONEncoder


class Card:

    def __init__(self, color, value):
        self.color = color
        self.value = value

