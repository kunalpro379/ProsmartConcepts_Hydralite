import json
from pymongo import MongoClient

# =====================================
# MONGO CONNECTION
# =====================================
MONGO_URI = "mongodb+srv://prosmart:prosmart@cluster0.jokss9k.mongodb.net/?appName=Cluster0"
DATABASE_NAME = "prosmart_db"

client = MongoClient(MONGO_URI)
db = client[DATABASE_NAME]

categories_col = db["categories"]
subcategories_col = db["subcategories"]
products_col = db["products"]

print("✔ Connected to MongoDB")

# =====================================
# IMPORT FUNCTION
# =====================================
def import_data(json_path):

    with open(json_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    for category_name, category_obj in data["products"].items():

        category_id = category_obj["category_id"]

        # -------------------------------------------------
        # CATEGORY (INSERT ONLY IF NOT EXISTS)
        # -------------------------------------------------
        if not categories_col.find_one({"category_id": category_id}):
            categories_col.insert_one({
                "category_id": category_id,
                "category_name": category_name
            })
            print(f"➕ Category created: {category_name}")
        else:
            print(f"⏭ Category exists: {category_name}")

        # -------------------------------------------------
        # SUBCATEGORIES
        # -------------------------------------------------
        for subcat_name, subcat_obj in category_obj["subcategories"].items():

            subcat_id = subcat_obj["subcategory_id"]

            if not subcategories_col.find_one({"subcategory_id": subcat_id}):
                subcategories_col.insert_one({
                    "subcategory_id": subcat_id,
                    "subcategory_name": subcat_name,
                    "category_id": category_id
                })
                print(f"   ➕ Subcategory created: {subcat_name}")
            else:
                print(f"   ⏭ Subcategory exists: {subcat_name}")

            # -------------------------------------------------
            # PRODUCTS (CHECK → INSERT or UPDATE)
            # -------------------------------------------------
            for product in subcat_obj["products"]:

                product_id = product["product_id"]

                product_doc = {
                    "product_id": product_id,
                    "product_name": product["product_name"],
                    "product_title": product["product_title"],
                    "product_description": product["product_description"],
                    "product_price": product.get("product_price"),
                    "image_urls": product.get("image_urls", []),
                    "specifications": product.get("specifications", {}),
                    "category_id": category_id,
                    "category_name": category_name,
                    "subcategory_id": subcat_id,
                    "subcategory_name": subcat_name
                }

                existing_product = products_col.find_one(
                    {"product_id": product_id}
                )

                if existing_product:
                    # 🔁 UPDATE ONLY
                    products_col.update_one(
                        {"product_id": product_id},
                        {"$set": product_doc}
                    )
                    print(f"      🔁 Product updated: {product_id}")

                else:
                    # ➕ INSERT NEW
                    products_col.insert_one(product_doc)
                    print(f"      ➕ Product created: {product_id}")

    print("\n🎉 IMPORT COMPLETED SUCCESSFULLY")


# =====================================
# RUN
# =====================================
import_data("final_verified.json")
