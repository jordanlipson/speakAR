from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from flask import Flask, request
from flask_cors import CORS
from user import User
import cohere

SESSION = {'username': 'eugene', 'level': 'A1', 'language': 'French'}

co = cohere.Client("qiqWWzNgpO0oJ5pzLu21ETOuC37beHi6ON0XaigM")
app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# CHANGE THE USER AND PASS
uri = "mongodb+srv://methacks:methacks@cluster0.hpi1zla.mongodb.net/?retryWrites=true&w=majority"
# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))
# Send a ping to confirm a successful connection
db = client['Cluster0']

try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

@app.route('/')
def index():
    return "server running"

@app.route('/register/', methods=['POST'])
def register():
    try:
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        # Check if the username already exists in the database
        existing_user = db.users.find_one({'username': username})
        if existing_user:
            return {'success': False, 'error': 'Username already exists'}

        # Create a new user instance
        new_user = User(username, password)

        # Insert the user into the MongoDB collection
        db.users.insert_one(new_user.__dict__)

        SESSION['username'] = username
        return {'success': True, 'error': None}

    except Exception as e:
        print(e)
        return {'success': False, 'error': e}


@app.route('/setlevel/', methods=['POST'])
def set_level():
    try:
        data = request.get_json()
        level = data.get('level')
        SESSION['level'] = level

        query = {"username": SESSION['username']}
        new_values = {"$set": {"level": level }}
        print(new_values)
        db.users.update_one(query, new_values)  

        return {'success': True, 'error': None}
    
    except Exception as e:
        print(e)
        return {'success': False, 'error': e}


@app.route('/login/', methods=['POST'])
def login():

    try:
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        # Check if the username already exists in the database
        existing_user = db.users.find_one({'username': username})
        
        print(existing_user)

        if existing_user is None:
            return {'success': False, 'error': 'User does not exist'}
        
        if existing_user['password'] == password:
            SESSION['username'] = username
            SESSION['level'] = existing_user['level']
            return {'success': True, 'error': None}
        
        return {'success': False, 'error': 'Incorrect password'}
    
    except Exception as e:
        print(e)
        return {'success': False, 'error': e}

@app.route('/chat/', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        message = data.get('message')
        existing_user = db.users.find_one({'username': SESSION['username']})
        conversation = existing_user['conversation']
        print(conversation)

        # example_str = f'''speakAR: Hi, how are you today?
        #                         {SESSION['username']}: I am good. I am just very tired.
        #                         speakAR: That's too bad. Why are you tired?
        #                         {SESSION['username']}: I had 6 hours of class today.
        #                         speakAR: 6 hours is a long time! What classes did you have?
        #                         {SESSION['username']}: I had Computer Science, Math and English.
        #                         speakAR: What did you learn in those classes?
        #                         '''

        example_str = f'''speakAR: Bonjour, comment ca-va aujourd'hui?
                                {SESSION['username']}: Ca va bien, mais je suis un peu fatigue.
                                speakAR: Pourquoi etez vous fatigue?
                                {SESSION['username']}: J'ai eu 6 heueres de classe aujourd'hui.
                                speakAR: 6 heueres de classe est une longue temps! Quel classes aviez-vous?
                                {SESSION['username']}: J'ai eu la classe de science d'ordinateurs et le francais.
                                speakAR: Quel choses avez-vous apprendi?
                                '''

        prompt=f'''<<DESCRIPTION>>
                    In this chat, a helpful and patient person called speakAR holds a normal conversation in {SESSION['language']} with 
                    {SESSION['username']}, who is {SESSION['level']} level proficient in {SESSION['language']}. speakAR asks questions back to
                    {SESSION['username']} and makes insightful comments to keep the conversation flowing. speakAR speaks only in {SESSION['language']} 
                    using {SESSION['level']} level vocabulary. speakAR does not copy from the example conversation above.
                    <<CONVERSATION>>
                    {example_str}
                    <<CONVERSATION>>
                    {conversation}
                    {SESSION['username']}: {message}
                    speakAR:'''


        response = co.generate(
            model='command-nightly',
            prompt=prompt,
            temperature=1,
            max_tokens=1000)
        

        reply = response[0][:].lstrip()
        while '\n' in reply:
            reply = reply[:reply.index('\n')]

        conversation += f"{SESSION['username']}: {message}\nspeakAR: {reply}\n"
        query = {"username": SESSION['username']}
        new_values = {"$set": {"conversation": conversation }}
        db.users.update_one(query, new_values)

        return {'success': True, 'error': None, 'reply': reply}
    
    except Exception as e:
        print(e)
        return {'success': False, 'error': e, 'reply': None}


if __name__ == '__main__':
    app.run()
