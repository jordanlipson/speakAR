from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from flask import Flask, request
from user import User

app = Flask(__name__)

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

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    # Check if the username already exists in the database
    existing_user = db.users.find_one({'username': username})
    if existing_user:
        return 'Username already exists'

    # Create a new user instance
    new_user = User(username, password)

    # Insert the user into the MongoDB collection
    db.users.insert_one(new_user.__dict__)

    return 'Registration successful'

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    # Check if the username already exists in the database
    existing_user = db.users.find_one({'username': username})
    print(existing_user)
    if existing_user is None:
        return 'User DNE'
    
    if existing_user['password'] == password:
        return 'Login success'
    
    return 'Incorrect pass'


if __name__ == '__main__':
    app.run()
