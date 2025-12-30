# import json
# import re
# from collections import defaultdict

# INPUT_JSON = "products.json"
# OUTPUT_JSON = "products_normalized.json"

# # ================= OFFICIAL TAXONOMY =================

# TAXONOMY = {
#     "Healthcare Essentials": {
#         "category_id": "HltaaL2",
#         "subcategories": {
#             "Diagnostic & Monitoring Devices": "daootnm2",
#             "Medical Consumables": "dEiusae5",
#             "Medicines & Treatments": "MIdTiEt1",
#             "Personal Health Care": "socLhHn1",
#             "Medical Tools & Equipment": "upqTiim0",
#         },
#     },
#     "Personal Care": {
#         "category_id": "Erolna6",
#         "subcategories": {
#             "Skin Care": "eakNsIc2",
#             "Hair Care": "rheIaCr3",
#             "Grooming Tools": "oslitom5",
#             "Beauty & Wellness": "uewlaBT3",
#             "Personal Hygiene & Accessories": "IogaOSs0",
#         },
#     },
#     "Smart Home": {
#         "category_id": "raoESM4",
#         "subcategories": {
#             "Home Appliances": "PMphLsC7",
#             "Home Comfort Devices": "RVOeMse0",
#             "Smart Controls & Security": "IlUrNCO3",
#             "Home Decor & Utilities": "SLIouhI5",
#         },
#     },
#     "Gadgets & Accessories": {
#         "category_id": "isSseE1",
#         "subcategories": {
#             "Mobile & Computer Accessories": "iOcccsL3",
#             "Wearable & Audio Gadgets": "gstoRlE6",
#             "Travel & Car Accessories": "AcseCco7",
#             "Utility & Multi-Tools": "ytutILu9",
#             "Office & Desk Gadgets": "IoETfGs2",
#             "Smart Lighting & Electronics": "CNaloir9",
#         },
#     },
#     "Tools & Hardware": {
#         "category_id": "aRsrwa0",
#         "subcategories": {
#             "Hand Tools & Kits": "lNtotsS2",
#             "Automotive & Outdoor Tools": "EuOttTo1",
#             "Hardware Accessories": "crsadEe0",
#         },
#     },
#     "Kids & Crafts": {
#         "category_id": "TFcark9",
#         "subcategories": {
#             "Educational Kits & Models": "iieSNlm0",
#             "Games & Creative Supplies": "MieCPVS0",
#         },
#     },
# }

# # ================= RULE ENGINE =================

# RULES = [
#     ("Healthcare Essentials", "Medical Tools & Equipment",
#      ["dental", "derma", "dermatology", "doctor", "kit", "instrument"]),

#     ("Personal Care", "Personal Hygiene & Accessories",
#      ["scrub", "apparel", "wear", "uniform"]),

#     ("Smart Home", "Home Decor & Utilities",
#      ["cup", "mug", "glass", "drinkware"]),

#     ("Kids & Crafts", "Games & Creative Supplies",
#      ["silver", "ganesha", "laxmi", "frame", "gift"]),
# ]

# def normalize(text):
#     return re.sub(r"[^a-z0-9 ]", "", text.lower())

# def detect_category(product):
#     text = normalize(
#         product.get("product_name", "") +
#         product.get("product_title", "") +
#         product.get("product_description", "")
#     )
#     for cat, subcat, keys in RULES:
#         for k in keys:
#             if k in text:
#                 return cat, subcat
#     return "Gadgets & Accessories", "Utility & Multi-Tools"

# # ================= MAIN =================

# with open(INPUT_JSON, "r", encoding="utf-8") as f:
#     data = json.load(f)

# final = {"products": {}}

# for cat_block in data["products"].values():
#     for subcat_block in cat_block["subcategories"].values():
#         for p in subcat_block["products"]:

#             cat, subcat = detect_category(p)
#             cat_id = TAXONOMY[cat]["category_id"]
#             subcat_id = TAXONOMY[cat]["subcategories"][subcat]

#             final.setdefault("products", {}).setdefault(cat, {
#                 "category_id": cat_id,
#                 "subcategories": {}
#             })

#             final["products"][cat]["subcategories"].setdefault(subcat, {
#                 "subcategory_id": subcat_id,
#                 "products": []
#             })

#             p["category"] = cat
#             p["subcategory"] = subcat
#             p["category_id"] = cat_id
#             p["subcategory_id"] = subcat_id

#             final["products"][cat]["subcategories"][subcat]["products"].append(p)

# with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
#     json.dump(final, f, indent=2, ensure_ascii=False)

# print("✅ Products normalized successfully")
# print("📁 Output file:", OUTPUT_JSON)


import json
import random
import string

# =========================
# FILE PATHS
# =========================
INPUT_FILE = "products_normalized.json"
OUTPUT_FILE = "products_normalized_final.json"

# =========================
# RANDOM PRODUCT ID GENERATOR
# =========================
def generate_product_id(used_ids, char_len=5, digit_len=4):
    while True:
        letters = ''.join(random.choices(string.ascii_letters, k=char_len))
        digits = ''.join(random.choices(string.digits, k=digit_len))
        pid = letters + digits
        if pid not in used_ids:
            used_ids.add(pid)
            return pid

# =========================
# LOAD JSON
# =========================
with open(INPUT_FILE, "r", encoding="utf-8") as f:
    data = json.load(f)

used_product_ids = set()
total_products = 0

# =========================
# MAIN LOOP
# =========================
for category_name, category in data["products"].items():

    category_id = category["category_id"]  # FIXED

    for subcat_name, subcat in category["subcategories"].items():

        subcategory_id = subcat["subcategory_id"]  # FIXED

        for product in subcat["products"]:
            total_products += 1

            # 🔁 Generate new product_id
            new_pid = generate_product_id(used_product_ids)

            product["product_id"] = new_pid

            # enforce correct taxonomy (safety)
            product["category_id"] = category_id
            product["subcategory_id"] = subcategory_id
            product["category"] = category_name
            product["subcategory"] = subcat_name

# =========================
# SAVE OUTPUT
# =========================
with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("✅ DONE SUCCESSFULLY")
print(f"📦 Output file: {OUTPUT_FILE}")
print(f"🧾 Total products processed: {total_products}")
print(f"🔐 Unique product IDs generated: {len(used_product_ids)}")
