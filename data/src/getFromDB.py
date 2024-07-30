import pymongo
import json
import os
from dotenv import load_dotenv
env = os.getenv("", None)

DB_AUTH = ""
myclient = pymongo.MongoClient(f"mongodb+srv://sammyadams04:{DB_AUTH}@cluster0.ux5mv4e.mongodb.net/battle-map?retryWrites=true&w=majority&appName=Cluster0")

myDB = myclient["battle-map"]
nameCollection = myDB["battleNames"]

battleNames = {}
for doc in nameCollection.find({}, {"_id":0, "country":1, "names": 1}):
    country = doc.pop("country")
    battleNames[country] = doc["names"]
    
with open("./bnames.json", "w") as outfile:
  outfile.write(json.dumps(battleNames, indent=1))