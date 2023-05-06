class User:
    def __init__(self, username, password):
        self.username = username
        self.password = password
        self.level = ""
        self.conversation = ""
        self.numErrors = 0
        self.errors = {}
