import requests

response = requests.get("/data/countriesCenter.json")

data = response.json()

print(data)