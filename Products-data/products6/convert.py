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
#     ("Personal Care", "Personal Hygiene & Accessories", ["toothbrush"]),
#     ("Personal Care", "Beauty & Wellness", ["bite", "itch"]),

#     ("Healthcare Essentials", "Medical Tools & Equipment", ["ent", "mirror", "kit"]),
#     ("Healthcare Essentials", "Medical Consumables", ["delivery", "gynae"]),

#     ("Smart Home", "Smart Controls & Security", ["fire", "extinguisher"]),

#     ("Gadgets & Accessories", "Wearable & Audio Gadgets", ["hydrogen water"]),
#     ("Gadgets & Accessories", "Utility & Multi-Tools", ["jade", "massager"]),

#     ("Tools & Hardware", "Hand Tools & Kits", ["magnifier"]),

#     ("Kids & Crafts", "Games & Creative Supplies", ["mosquito", "repellent"]),
# ]

# def normalize(text):
#     return re.sub(r"[^a-z0-9 ]", "", text.lower())

# def detect(product):
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

# for cat in data["products"].values():
#     for subcat in cat["subcategories"].values():
#         for p in subcat["products"]:

#             cat_name, subcat_name = detect(p)
#             cat_id = TAXONOMY[cat_name]["category_id"]
#             subcat_id = TAXONOMY[cat_name]["subcategories"][subcat_name]

#             final.setdefault("products", {}).setdefault(cat_name, {
#                 "category_id": cat_id,
#                 "subcategories": {}
#             })

#             final["products"][cat_name]["subcategories"].setdefault(subcat_name, {
#                 "subcategory_id": subcat_id,
#                 "products": []
#             })

#             p["category"] = cat_name
#             p["subcategory"] = subcat_name
#             p["category_id"] = cat_id
#             p["subcategory_id"] = subcat_id

#             final["products"][cat_name]["subcategories"][subcat_name]["products"].append(p)

# with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
#     json.dump(final, f, indent=2, ensure_ascii=False)

# print("✅ Products normalized to official taxonomy")
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
# PRODUCT ID GENERATOR
# =========================
def generate_product_id(used_ids, letters_len=5, digits_len=4):
    while True:
        letters = ''.join(random.choices(string.ascii_letters, k=letters_len))
        digits = ''.join(random.choices(string.digits, k=digits_len))
        pid = letters + digits
        if pid not in used_ids:
            used_ids.add(pid)
            return pid

# =========================
# LOAD JSON
# =========================
with open(INPUT_FILE, "r", encoding="utf-8") as f:
    data = json.load(f)

used_ids = set()
total = 0

# =========================
# PROCESS PRODUCTS
# =========================
for cat_name, cat in data["products"].items():

    cat_id = cat["category_id"]  # FIXED

    for subcat_name, subcat in cat["subcategories"].items():

        subcat_id = subcat["subcategory_id"]  # FIXED

        for product in subcat["products"]:
            total += 1

            product["product_id"] = generate_product_id(used_ids)

            # enforce correct taxonomy (safety)
            product["category_id"] = cat_id
            product["subcategory_id"] = subcat_id
            product["category"] = cat_name
            product["subcategory"] = subcat_name

# =========================
# SAVE OUTPUT
# =========================
with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("✅ PRODUCT ID REGENERATION COMPLETE")
print(f"📦 Output file: {OUTPUT_FILE}")
print(f"🧾 Total products processed: {total}")
print(f"🔐 Unique IDs generated: {len(used_ids)}")
