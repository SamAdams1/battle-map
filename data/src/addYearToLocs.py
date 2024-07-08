import requests, json, time


with open("./battleLocs.json", "r",encoding="utf-8") as json_file:
    battleLocs = json.load(json_file)
with open("./battleNames.json", "r",encoding="utf-8") as json_file:
    battleNames = json.load(json_file)


# for country in countryIndex:
#   countryCenter[country]["wikiIndex"] = countryIndex[country]
# with open(f"./countryCenter.json", "w") as outfile:
#     outfile.write(json.dumps(countryCenter, indent=1))



def searchNameForYear(name):
  numbers = ""
  for char in name:
    if char.isnumeric():
      numbers += char
    elif len(numbers) < 2:
      numbers = ""
  return numbers

def catchBC(name):
  name = name.split(" or ")[0]
  numbers = "-"
  for char in name:
    if char.isnumeric():
      numbers += char
    elif len(numbers) < 2:
      numbers = "-"
  return numbers

def getYear(arr):
  try:
    # print(len(arr) > 1)
    if len(arr) > 1 and arr[1].split(" or ")[0].isnumeric():
      return arr[1].split(" or ")[0]
    elif len(arr) > 2 and arr[2].isnumeric():
      return arr[2]
    elif len(arr) > 1 and "BC" in arr[1]:
      return catchBC(arr[1])
    elif len(arr) > 1:
      return searchNameForYear(arr[1])
    else:
      pp = searchNameForYear(arr[0])
      return pp if pp else ""
  except:
    return ""

def checkLoc(country, battle):
  try:
    return battleLocs[country][battle]
  except:
    return None
    
noyearlist = []
def main():
  for country in battleNames:
    # print(f"===={country}====")
    for battle in range(len(battleNames[country])):
      info = battleNames[country][battle].split(" \u2013 ")
      if checkLoc(country, info[0]):
        year = getYear(info)
        if year:
          battleLocs[country][info[0]]["year"] = int(year)
          # print(int(getYear(info)), getYear(info))
        else:
          noyearlist.append(info[0])
# main()

# print(noyearlist)
# print(battleLocs)

# with open(f"./ihope.json", "w") as outfile:
#   outfile.write(json.dumps(battleLocs, indent=1))

