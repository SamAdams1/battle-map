import pymongo, json

# myclient = pymongo.MongoClient("mongodb+srv://sammyadams04:gDAMx07CaXQuhcQL@cluster0.ux5mv4e.mongodb.net/battle-map?retryWrites=true&w=majority&appName=Cluster0")

# myDB = myclient["battle-map"]["test"]

# print(myclient.list_database_names())
# print(myDB.find_one({ "country": "Afghanistan" }))
# print(myDB.find_one({ "battle": "Siege of Herat (652)" }))


#  check for empty years


with open("./battleLocs.json", "r",encoding="utf-8") as json_file:
    battleLocs = json.load(json_file)

for country in battleLocs:
    # print(country, battleLocs[country])
    if type(battleLocs[country]) != int:
        for battle in battleLocs[country]:
          if type(battleLocs[country][battle])!= int:
              try:
                battleLocs[country][battle]["year"]
              except:
                print(battle)
          # print(country, battle)
        