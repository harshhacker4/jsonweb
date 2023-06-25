import json
import os

print(os.getcwd())
# Specify the path to your JSON file
file_path = "quotes.json"

# Open the file and load its contents
with open(file_path) as file:
    data = json.load(file)

# Now you can work with the loaded data
# For example, let's print the content of the JSON file
print(data)
