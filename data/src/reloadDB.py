import pymongo
import json

myclient = pymongo.MongoClient("mongodb+srv://sammyadams04:gDAMx07CaXQuhcQL@cluster0.ux5mv4e.mongodb.net/battle-map?retryWrites=true&w=majority&appName=Cluster0")

myDB = myclient["battle-map"]
testCollection = myDB["test2"]

# print(myclient.list_database_names())
# print(testCollection.find_one({ "country": "Afghanistan" }))
# print(testCollection.find_one({ "battle": "Siege of Herat (652)" }))



with open("./battleLocs.json", "r",encoding="utf-8") as json_file:
  battleLocs = json.load(json_file)

for country in battleLocs:
  countryData = battleLocs[country]
  if type(countryData) != int:
    dbFormat = {"country": country}
    dbFormat.update(countryData)
    # print(dbFormat)
    testCollection.insert_one(dbFormat)
    # for battle in countryData:
    #   if type(countryData[battle])!= int:
    #     battleLocs[country][battle]["battle"] = battle

    # print(battleLocs[country])
