import requests
import re
import json

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
countriesParam = {
    'origin': "*",
    'format': "json",
    'action': "parse",
    'prop': "wikitext",
    'pageid': 57197,
}

def getSingleBattle(battleName):
    url = appendParamsToUrl(params, battleName)
    response = requests.get(url)
    
    data = response.json()
    try:
        battle = data["query"]['pages']
        key = list(battle.keys())[0]
        print(battle[key])
    except:
        print("Index error: " + data)


def appendParamsToUrl(parameters, text):
    url = wikiUrl
    for key in parameters.keys():
        if key == "gsrsearch" or key == "pageid":
            parameters[key] = text.replace(" ", "_").replace("'", "")
        url += f"{key}={parameters[key]}&"
    return url


linkToList = []
def getCountryBattleList(index):
    countriesParam["prop"] = "wikitext"
    countriesParam["section"] = index
    url = appendParamsToUrl(countriesParam, "57197")
    response = requests.get(url)
    data = response.json()
    battleData = str(data["parse"]["wikitext"]["*"])
    if "wikitable" in battleData:
        return wikiTableFormat(battleData)
    elif "main|List of" in battleData:
        # linkToList.append(list(countries.keys())[index-1])
        pass
    else:
        return normalFormat(battleData)
    # print(battleData)


def normalFormat(data):
    battleList = data.split("*")
    formattedList = []
    for i in battleList:
        formattedList.append(fixBattleTitle(i))
    return formattedList


battlePrefixes =["Battle of","Siege of","Capture of","Fall of","Action of","Bombing of","Sack of","Raid on","Invasion of","vs","Roman conquest of Anglesey","Caratacus' last battle","Relief of","combat of","destruction of","attack on"]
def wikiTableFormat(data):
    formattedArr = []
    for item in data.split("\n"):
        if "!" not in item:
            preFound = False
            if data.index(item) == 0:
                formattedArr.append(fixBattleTitle(item))
            
            for prefix in battlePrefixes:
                if prefix in item and not preFound:
                    formattedArr.append(fixBattleTitle(item))
                    preFound = True
                    
    return formattedArr


def fixBattleTitle(title):
    title = re.sub(r'<.+>', '', title)
    title = re.sub(r'..rowspan......', '', title)
    title = title.replace("[[","").replace("]]","").replace("==","").replace("'''","").replace("<nowiki/>","").replace("|"," – ").replace("\n","")
    return title


def countriesSectionIds():
    countriesParam["prop"] = "sections"
    url = appendParamsToUrl(countriesParam, "57197")
    response = requests.get(url)
    data = response.json()

    sectionId = 0
    sections = data["parse"]["sections"]
    countryDict = {}
    for i in data["parse"]["sections"]:
        anchor = sections[sectionId]["anchor"]
        if  anchor !="References":
            countryDict[anchor.replace("_", " ")] = sectionId + 1

        sectionId +=1
    with open("countries.json", "w") as outfile:
        outfile.write(json.dumps(countryDict, indent=2))
    # return countryDict


sectionNum = 162

battleList = {}
def getAllCountrysList():
    countries = json.load(open("countries.json"))
    for key in list(countries.keys()):
        battles = getCountryBattleList(countries[key])
        if battles != None:
            battleList[battles[0]] = battles[1:]
    with open("battleList2.json", "w") as outfile:
        outfile.write(json.dumps(battleList, indent=2))
getAllCountrysList()
# print(linkToList)
# bl = json.load(open("battleList.json"))
# for i in bl:
#     print(bl[i])
# getAllCountrysList()
# print(getCountryBattleList(1))
# getSingleBattle("Siege of Uxellodunum 51 BC ")

#  missing
# [Canada, China, georgia, ireland,egypt,korea, belgium]
# {{Main List of Georgian battles}}
# {{Main List of Irish battles}}
# {{further Battles of the Old Swiss Confederacy}}
# a = """

# """
# arr = []
# for i in a.split("\n"):
#     arr.append(i)

# with open("abc.json", "w") as outfile:
#     outfile.write(json.dumps(arr, indent=2))