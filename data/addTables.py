from pymongo import MongoClient

# -----------------------------
# MONGO URI
# -----------------------------
MONGO_URI = ""

# -----------------------------
# CONNECT TO MONGO
# -----------------------------
client = MongoClient(MONGO_URI)

# Use hydralite database
db = client["hydralite"]

print("✅ Connected to MongoDB Atlas (hydralite DB)")

# -----------------------------
# Hero Section Customization
# -----------------------------
hero_collection = db["HeroSectionCustomization"]

if hero_collection.count_documents({}) == 0:
    hero_collection.insert_one({
        "products": []   # array of product IDs for hero section
    })
    print("✅ HeroSectionCustomization initialized")
else:
    print("ℹ HeroSectionCustomization already exists")

# -----------------------------
# Products Priority Collection
# -----------------------------
priority_collection = db["productsPriority"]

if priority_collection.count_documents({}) == 0:
    priority_collection.insert_one({
        "products": []   # ordered product IDs for priority display
    })
    print("✅ productsPriority initialized")
else:
    print("ℹ productsPriority already exists")

print("🎯 MongoDB setup completed successfully")
