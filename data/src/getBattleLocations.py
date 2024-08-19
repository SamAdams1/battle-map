import requests, json, time

wikiUrl = "https://en.wikipedia.org/w/api.php?"
params = {
    'origin': "*",
    'format': "json",
    'action': "query",
    'prop': "coordinates",
    'generator': "search",
    'gsrsearch': "",
    'gsrlimit': 1,
}
secondParams = {
    'origin': "*",
    'format': "json",
    'action': "parse",
    'prop': "externallinks",
    'pageid': 000,
}
battlesData = {}
# with open("./b.json", "r",) as json_file:
#     battlesData = json.load(json_file)
# with open("./battleList2.json", "r",encoding="utf-8") as json_file:
#     battleList = json.load(json_file)
with open("../countryCenter.json", "r") as json_file:
    countryCenters = json.load(json_file)

def getBattleData(country, battleName):
    url = appendParamsToUrl(params, battleName)
    response = requests.get(url)
    data = response.json()
    pageID = 0
    try:
        battle = data["query"]['pages']
        key = list(battle.keys())[0]
        
        latLon = [battle[key]["coordinates"][0]["lat"], battle[key]["coordinates"][0]["lon"]]
        pageID = battle[key]["pageid"]
        
        battlesData[country]["withLocationData"][battleName] = {}
        battlesData[country]["withLocationData"][battleName]["latLon"] = latLon
        battlesData[country]["withLocationData"][battleName]["pageId"] = pageID
        battlesData[country]["numBattlesInCountry"] += 1
        battlesData["battlesYesLocation"] += 1

        # print("found")
    except:
        battlesData["battlesNoLocation"] += 1
        # print("No Location: ",  data["query"]['pages'])
        # battlesData[country]["totalBattles"] += 1
        # battlesData[country]["noLocationData"][battleName] = {}
        # battlesData[country]["noLocationData"][battleName]["latLon"] = [0, 0]
        # battlesData[country]["noLocationData"][battleName]["pageId"] = pageID


def appendParamsToUrl(parameters, text):
    url = wikiUrl
    for key in parameters.keys():
        if key == "gsrsearch" or key == "pageid":
            parameters[key] = text.replace(" ", "_").replace("'", "")
        url += f"{key}={parameters[key]}&"
    return url


def readBattleList():
    apiCalls = 0
    battlesData["battlesYesLocation"] = 0
    battlesData["battlesNoLocation"] = 0
    for country in countriesList:
        # if apiCalls > 1:
        #     break
        if country in battleList.keys():
            battlesData[country] = {}
            battlesData[country]["withLocationData"] = {}
            battlesData[country]["numBattlesInCountry"] = 0
            for battle in battleList[country]:
                time.sleep(0.001)
                getBattleData(country, battle.split(" – ")[0])
                apiCalls += 1
            print(country, "+++++++++complete+++++++", apiCalls)
        else:
            print(country, " not in battle list", apiCalls)

    battlesData["battlesFoundTotal"] = apiCalls
    # print(battlesData)
    with open(f"./d.json", "w") as outfile:
        outfile.write(json.dumps(battlesData, indent=1))
    print(apiCalls)

# getBattleData("Croatia", "Battle of Carnuntum 170 Marcomannic Wars (Roman - Germanic wars)")
# readBattleList()
# 11:23 start
# 
# for i in battlesData["Cambodia"]["withLocationData"]:
#     print(i, battlesData["Cambodia"]["withLocationData"][i])

countryCenterLatlon = {}
def findCountriesCenter():
    for country in countriesList:
        # time.sleep(0.001)
        getcountryLatlon(country)
    print(countryCenterLatlon)
    with open(f"./countriesCenter.json", "w") as outfile:
        outfile.write(json.dumps(countryCenterLatlon, indent=1))

def getcountryLatlon(country):
    url = appendParamsToUrl(params, country)
    response = requests.get(url)
    data = response.json()
    try:
        page = data["query"]['pages']
        key = list(page.keys())[0]
        
        latLon = [page[key]["coordinates"][0]["lat"], page[key]["coordinates"][0]["lon"]]
        
        countryCenterLatlon[country] = {}
        countryCenterLatlon[country]["latLon"] = latLon
        print("found", country, latLon)
    except:
        countryCenterLatlon[country] = {}
        countryCenterLatlon[country]["latLon"] = [0, 0]
        print("not found++++++++++++++++++", country)
# findCountriesCenter()



import pymongo 
import bson

DB_AUTH = "9TZTNT69uD4nkYD7"
myclient = pymongo.MongoClient(f"mongodb+srv://sammyadams04:{DB_AUTH}@cluster0.ux5mv4e.mongodb.net/battle-map?retryWrites=true&w=majority&appName=Cluster0")

myDB = myclient["battle-map"]
# collection = myDB["test"]

collection = myDB["battles"]

def getLatLon(battleName):
    url = appendParamsToUrl(params, battleName)
    response = requests.get(url)
    data = response.json()
    try:
        battle = data["query"]['pages']
        key = list(battle.keys())[0]
        
        latLon = [battle[key]["coordinates"][0]["lat"], battle[key]["coordinates"][0]["lon"]]
        return latLon
    except:
        False

# separate single battle string into json
def sepBattles(country):
    file = open("test.txt", "r",encoding="utf-8")
    nameList = file.read().split("\n")
    
    countryDict = {"country": country, "battles": [], "countryCenter": countryCenters[country], "withLocation": 0}        
    for battle in nameList:
        battleArr = battle.split(" – ")
        battleDict = {
            "name": battleArr[1],
            "year": battleArr[0],
            "id": bson.ObjectId()
        }
        latLon = getLatLon(battleArr[1].split("[")[0])
        if latLon:
            battleDict["latLon"] = latLon
            countryDict["withLocation"] += 1
            
        countryDict["battles"].append(battleDict)
        
    print(countryDict)
    collection.insert_one(countryDict)
    
    filter = {"country": country}
    update = {"$set": {"battles": countryDict["battles"], "withLocation": countryDict["withLocation"]} }
    result = collection.update_one(filter, update, upsert=False)
    # myDB["battles"].update

sepBattles("Ireland")
