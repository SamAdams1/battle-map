import pymongo
import json

# get password from env
DB_AUTH = ""
myclient = pymongo.MongoClient(f"mongodb+srv://sammyadams04:{DB_AUTH}@cluster0.ux5mv4e.mongodb.net/battle-map?retryWrites=true&w=majority&appName=Cluster0")

myDB = myclient["battle-map"]
testCollection = myDB["battleNames"]

# print(myclient.list_database_names())
# print(testCollection.find_one({ "country": "Afghanistan" }))
# print(testCollection.find_one({ "battle": "Siege of Herat (652)" }))



# with open("./battleLocs.json", "r",encoding="utf-8") as json_file:
#   battleLocs = json.load(json_file)
# def addLocationData():
#   for country in battleLocs:
#     countryData = {}
#     countryData["battles"] = battleLocs[country]
#     if type(countryData) != int:
#       try:
#         dbFormat = {"country": country, "numBattlesInCountry": battleLocs[country]["numBattlesInCountry"]}
#         battleLocs[country].pop("numBattlesInCountry")
#         dbFormat.update(countryData)
#         testCollection.insert_one(dbFormat)
#       except:
#         {}
# addLocationData()


with open("data/b.json", "r",encoding="utf-8") as json_file:
  battleNames = json.load(json_file)
def addBattleNames():
  for country in battleNames:
    print(country)
    countryDoc = {}
    countryDoc["country"] = country
    countryDoc["names"] = battleNames[country]
    testCollection.insert_one(countryDoc)
# addBattleNames()

# print(battleNames["Germany"])
# testCollection.update_one({"country": "Germany"}, {"$set":{"names":battleNames["Germany"]}})



