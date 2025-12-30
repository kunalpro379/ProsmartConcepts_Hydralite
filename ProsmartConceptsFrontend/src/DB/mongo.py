
import json
from pymongo import MongoClient

# -----------------------------
#  MONGO CONNECTION
# -----------------------------
MONGO_URI = ""
DATABASE_NAME = ""

client = MongoClient(MONGO_URI)
db = client[DATABASE_NAME]

categories_col = db["Categories"]
subcategories_col = db["SubCategories"]
products_col = db["Products"]

# -----------------------------
#  LOAD JSON FILE
# -----------------------------
with open("prosmart_products.json", "r", encoding="utf-8") as f:
    data = json.load(f)

products_tree = data["products"]

# -----------------------------
#  PUSH TO MONGODB
# -----------------------------
category_docs = []
subcategory_docs = []
product_docs = []

for main_category, cats in products_tree.items():
    for category_name, cat_data in cats.items():

        category_id = cat_data.get("category_id")

        # ---- CATEGORY DOCUMENT ----
        category_doc = {
            "category_id": category_id,
            "category_name": category_name,
            "main_category": main_category
        }
        category_docs.append(category_doc)

        # iterate subcategories
        for subcat_name, subcat_data in cat_data["subcategories"].items():

            subcat_id = subcat_data.get("subcategory_id")

            # ---- SUBCATEGORY DOCUMENT ----
            subcategory_doc = {
                "subcategory_id": subcat_id,
                "subcategory_name": subcat_name,
                "category_id": category_id
            }
            subcategory_docs.append(subcategory_doc)

            # iterate products
            for product in subcat_data["products"]:

                product_doc = {
                    "main_category": main_category,
                    "category_id": category_id,
                    "subcategory_id": subcat_id,
                    "product_id": product["product_id"],
                    "product_name": product["product_name"],
                    "product_title": product["product_title"],
                    "product_description": product["product_description"],
                    "product_price": product.get("product_price"),
                    "product_images": product.get("image_urls", [])
                }

                product_docs.append(product_doc)

# -----------------------------
#  INSERT DATA INTO COLLECTIONS
# -----------------------------
if category_docs:
    categories_col.insert_many(category_docs)

if subcategory_docs:
    subcategories_col.insert_many(subcategory_docs)

if product_docs:
    products_col.insert_many(product_docs)

print("✅ Successfully pushed all categories, subcategories, and products to MongoDB!")
