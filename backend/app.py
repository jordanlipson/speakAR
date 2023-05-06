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

        example_str = f'''user: Bonjour, comment allez-vous ?
speakAR: Bonjour, je vais bien, merci. Comment ça va?
user: Ça va bien, merci. Je voudrais pratiquer mon français.
speakAR: Très bien. Quel est votre niveau de français ?
user: Je suis un débutant en français.
speakAR: C'est formidable que vous commenciez à apprendre une nouvelle langue. Qu'est-ce qui vous a motivé à apprendre le français ?
user: J'ai toujours aimé la langue française et la culture française.
speakAR: C'est génial. Que préférez-vous dans la culture française ?
user: J'aime la nourriture française, les vins, les châteaux, la mode et les musées.
speakAR: C'est vrai que la France est connue pour sa cuisine délicieuse et ses vins savoureux. Quel est votre plat français préféré ?
user: Mon plat français préféré est la ratatouille.
speakAR: Ah, j'adore la ratatouille aussi. Avez-vous visité la France auparavant ?
user: Non, je n'ai jamais visité la France. Mais j'espère visiter la France un jour.
speakAR: C'est une bonne idée de visiter la France pour améliorer votre français. Je suis sûr que vous aimerez la France. Qu'est-ce que vous voudriez faire si vous visitez la France ?
user: J'aimerais visiter la Tour Eiffel, le Louvre et faire une dégustation de vin.
speakAR: Ce sont de très bonnes idées. Vous aurez également la chance de pratiquer votre français en France. Avez-vous des questions ou des préoccupations concernant votre apprentissage du français ?
user: Pas pour le moment, merci. C'était une conversation agréable.
speakAR: Merci à vous aussi. Bonne chance pour votre apprentissage du français.'''

        prompt=f'''<<DESCRIPTION>>
                    In this chat, a helpful and patient person called speakAR holds a normal conversation with {SESSION['username']}, who is {SESSION['level']} level proficient in {SESSION['language']}.
                    <<CONVERSATION>>
                    {example_str}
                    <<CONVERSATION>>
                    {conversation}
                    {SESSION['username']}: {message}
                    speakAR:'''

        # prompt = f"You are speakAR, a person who is having a conversation in English with {SESSION['username']}, who is {SESSION['level']} level fluent in English.\
        # Respond to their message, and make sure to keep the conversation going by asking questions to CONTINUE the conversation.\
        # Inlcude ONLY your complete reply in the returned message and not other additional text such as '{SESSION['username']}:'. In other words, do not predict what the user\
        # will say next, and DO NOT reply with an empty string. Make sure the your response ends properly and that you ASK A QUESTION that is complete. Remember, you are speakAR. Here is a sample conversation:\n\
        # {SESSION['username']}: I love apples.\n\
        # speakAR (you): Really? I do to. What is your favourite kind?\n\
        # ------------------------------------------------\
        # {conversation_str}\n\
        # ------------------------------------------------\
        # {SESSION['username']}: {message}\n\
        # speakAR (you):"

        response = co.generate(
            model='command-light',
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
