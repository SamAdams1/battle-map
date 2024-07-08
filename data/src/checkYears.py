import json
#  check for empty years


with open("./test.json", "r",encoding="utf-8") as json_file:
    battleLocs = json.load(json_file)

def checkYear():
  for country in battleLocs:
    countryData = battleLocs[country]
    if type(countryData) != int:
      for battle in countryData:
        if type(countryData[battle])!= int:
          battleLocs[country][battle]["battle"] = battle
          # try:
          #   countryData[battle]["year"]
          # except:
          #   print(battle)
        # print(country, battle)
      print(battleLocs[country])



def pageIdStr():
  for country in battleLocs:
    countryData = battleLocs[country]
    if type(countryData) != int:
      for battle in countryData:
        if type(countryData[battle])!= int:
          try:
            battleLocs[country][battle]["pageId"] = str(battleLocs[country][battle]["pageId"])
          except:
            {}

      # print(battleLocs[country])
  with open(f"./ihope.json", "w") as outfile:
    outfile.write(json.dumps(battleLocs, indent=1))



def latLonTenthsPlace():
  for country in battleLocs:
    countryData = battleLocs[country]
    if type(countryData) != int:
      for battle in countryData:
        if type(countryData[battle])!= int:
          try:
            battleLocs[country][battle]["pageId"] = str(battleLocs[country][battle]["pageId"])
          except:
            {}

      print(battleLocs[country])
  # with open(f"./bruh.json", "w") as outfile:
  #   outfile.write(json.dumps(battleLocs, indent=1))







