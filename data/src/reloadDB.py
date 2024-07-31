import pymongo
import json

# get password from env
DB_AUTH = ""
myclient = pymongo.MongoClient(f"mongodb+srv://sammyadams04:{DB_AUTH}@cluster0.ux5mv4e.mongodb.net/battle-map?retryWrites=true&w=majority&appName=Cluster0")

myDB = myclient["battle-map"]
testCollection = myDB["test"]

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


with open("data/battleNames.json", "r",encoding="utf-8") as json_file:
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

with open("data/battleLocs.json", "r",encoding="utf-8") as json_file:
  battleLocs = json.load(json_file)
with open("data/countryCenter.json", "r",encoding="utf-8") as json_file:
  countryCenter = json.load(json_file)
  
def allOneCollection():
  for country in battleNames:
    battles = []
    # print(battleNames[country])
    bcount  = 0
    for battle in battleNames[country]:
      # print(battle.split(" – ")[0])
      try:
        data = battleLocs[country][battle.split(" – ")[0]]
        data["name"] = battle
        battles.append(data)
        bcount += 1
      except:
        battles.append({"name": battle})
    document = { 
      "country": country, 
      "countryCenter": countryCenter[country], 
      "withLocation": bcount,
      "battles": battles
      }
    testCollection.insert_one(document)
    
allOneCollection()

def checkNames():
  country = "Germany"
  for battle in battleLocs[country].keys():
    inNames = False
    for name in battleNames[country]:
      if battle == name.split(" – ")[0] or battle == "numBattlesInCountry":
        inNames = True
      # print(name)
    if not inNames:
      print(battle)
  
# checkNames()
