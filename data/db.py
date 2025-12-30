# from pymongo import MongoClient

# # Mongo URI
# MONGO_URI = ""

# # Connect
# client = MongoClient(MONGO_URI)
# print("✅ Connected to MongoDB Atlas")

# db = client["hydralite"]

# # Collection name
# collection = db["products"]

# # Insert dummy data (VERY IMPORTANT)
# sample_doc = {
#     "name": "Test Product",
#     "price": 999,
#     "status": "active"
# }

# collection.insert_one(sample_doc)

# print("✅ Database & Collection created successfully")
import json
from pymongo import MongoClient

# Mongo URI
MONGO_URI = ""

# Connect
client = MongoClient(MONGO_URI)
db = client["hydralite"]
collection = db["products"]

print("✅ Connected to MongoDB")

# Load JSON file
with open("products.json", "r", encoding="utf-8") as f:
    data = json.load(f)

products = data["products"]

clean_products = []

for product in products:
    # Remove subcategory
    product.pop("subcategory", None)
    clean_products.append(product)

# Insert into MongoDB
if clean_products:
    collection.insert_many(clean_products)
    print(f"✅ {len(clean_products)} products inserted successfully")
else:
    print("⚠️ No products found to insert")
