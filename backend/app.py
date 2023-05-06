from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from flask import Flask

app = Flask(__name__)

# CHANGE THE USER AND PASS
uri = "mongodb+srv://<user>:<pass>@cluster0.hpi1zla.mongodb.net/?retryWrites=true&w=majority"
# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))
# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

@app.route('/')
def index():
    return "server running"

if __name__ == '__main__':
    app.run()
