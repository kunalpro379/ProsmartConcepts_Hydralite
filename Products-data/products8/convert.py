# import json
# import re
# import random
# import string
# from collections import defaultdict

# INPUT_JSON = "products.json"
# OUTPUT_JSON = "products_fixed.json"

# # ================= FIXED TAXONOMY =================

# CATEGORY_NAME = "Gadgets & Accessories"
# CATEGORY_ID = "isSseE1"

# SUBCATEGORY_MAP = {
#     "Utility & Multi-Tools": "ytutILu9",
#     "Office & Desk Gadgets": "IoETfGs2",
#     "Wearable & Audio Gadgets": "gstoRlE6",
#     "Educational Kits & Models": "iieSNlm0",
# }

# # ================= HELPERS =================

# def clean(text):
#     return re.sub(r"[^A-Za-z]", "", text)

# def gen_product_id(name):
#     base = clean(name)[:5].upper()
#     rand = "".join(random.choices(string.digits, k=4))
#     return f"{base}{rand}"

# def detect_subcategory(p):
#     text = (p["product_name"] + " " + p["product_title"]).lower()

#     if any(k in text for k in [
#         "desk", "lamp", "bench", "table", "stand"
#     ]):
#         return "Office & Desk Gadgets"

#     if any(k in text for k in [
#         "head", "glass", "headset", "wearable", "loupe headset"
#     ]):
#         return "Wearable & Audio Gadgets"

#     if any(k in text for k in [
#         "kid", "bug", "educational", "viewer kit"
#     ]):
#         return "Educational Kits & Models"

#     return "Utility & Multi-Tools"

# # ================= MAIN =================

# with open(INPUT_JSON, "r", encoding="utf-8") as f:
#     data = json.load(f)

# final = {
#     "products": {
#         CATEGORY_NAME: {
#             "category_id": CATEGORY_ID,
#             "subcategories": defaultdict(lambda: {"products": []})
#         }
#     }
# }

# seen = set()

# for cat in data["products"].values():
#     for subcat in cat["subcategories"].values():
#         for p in subcat["products"]:

#             key = (p["product_name"], tuple(p.get("image_urls", [])))
#             if key in seen:
#                 continue
#             seen.add(key)

#             fixed_sub = detect_subcategory(p)
#             sub_id = SUBCATEGORY_MAP[fixed_sub]

#             p["product_id"] = p.get("product_id") or gen_product_id(p["product_name"])
#             p["category"] = CATEGORY_NAME
#             p["subcategory"] = fixed_sub
#             p["category_id"] = CATEGORY_ID
#             p["subcategory_id"] = sub_id

#             final["products"][CATEGORY_NAME]["subcategories"].setdefault(
#                 fixed_sub,
#                 {"subcategory_id": sub_id, "products": []}
#             )

#             final["products"][CATEGORY_NAME]["subcategories"][fixed_sub]["products"].append(p)

# final["products"][CATEGORY_NAME]["subcategories"] = dict(
#     final["products"][CATEGORY_NAME]["subcategories"]
# )

# with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
#     json.dump(final, f, indent=2, ensure_ascii=False)

# print("✅ Gadgets & Accessories normalized successfully")
# print("📁 Output file:", OUTPUT_JSON)



# import json
# import re
# from copy import deepcopy

# INPUT_FILE = "products_fixed.json"
# OUTPUT_FILE = "products_merged_no_variants.json"


# def normalize_name(text):
#     """
#     Normalize product name to detect variants:
#     - lowercase
#     - remove special chars
#     - remove variant markers like +, dc, rd
#     """
#     text = text.lower()
#     text = re.sub(r"\(.*?\)", "", text)   # remove (RD), (DC)
#     text = re.sub(r"\+.*", "", text)      # remove +variants
#     text = re.sub(r"[^a-z0-9]", "", text)
#     return text


# with open(INPUT_FILE, "r", encoding="utf-8") as f:
#     data = json.load(f)

# products_root = data["products"]

# for category in products_root.values():
#     for subcat in category["subcategories"].values():

#         merged = {}
#         new_products = []

#         for product in subcat["products"]:
#             key = normalize_name(product["product_name"])

#             if key not in merged:
#                 merged[key] = deepcopy(product)
#                 merged[key]["image_urls"] = list(set(product.get("image_urls", [])))
#             else:
#                 # merge images
#                 merged[key]["image_urls"] = list(
#                     set(merged[key]["image_urls"]) |
#                     set(product.get("image_urls", []))
#                 )

#         new_products.extend(merged.values())
#         subcat["products"] = new_products


# with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
#     json.dump(data, f, indent=2, ensure_ascii=False)

# print("✅ Duplicate variants merged successfully")
# print(f"📦 Output saved as: {OUTPUT_FILE}")


import json
import random
import string
from collections import defaultdict

# ================= CONFIG =================

INPUT_JSON = "products_merged_no_variants.json"
OUTPUT_JSON = "final_products_converted.json"

CATEGORY_MAP = {
    "Healthcare Essentials": "HltaaL2",
    "Personal Care": "Erolna6",
    "Smart Home": "raoESM4",
    "Gadgets & Accessories": "isSseE1",
    "Tools & Hardware": "aRsrwa0",
    "Kids & Crafts": "TFcark9"
}

SUBCATEGORY_MAP = {
    "Diagnostic & Monitoring Devices": "daootnm2",
    "Medical Consumables": "dEiusae5",
    "Medicines & Treatments": "MIdTiEt1",
    "Personal Health Care": "socLhHn1",
    "Medical Tools & Equipment": "upqTiim0",

    "Skin Care": "eakNsIc2",
    "Hair Care": "rheIaCr3",
    "Grooming Tools": "oslitom5",
    "Beauty & Wellness": "uewlaBT3",
    "Personal Hygiene & Accessories": "IogaOSs0",

    "Home Appliances": "PMphLsC7",
    "Home Comfort Devices": "RVOeMse0",
    "Smart Controls & Security": "IlUrNCO3",
    "Home Decor & Utilities": "SLIouhI5",

    "Mobile & Computer Accessories": "iOcccsL3",
    "Wearable & Audio Gadgets": "gstoRlE6",
    "Travel & Car Accessories": "AcseCco7",
    "Utility & Multi-Tools": "ytutILu9",
    "Office & Desk Gadgets": "IoETfGs2",
    "Smart Lighting & Electronics": "CNaloir9",

    "Hand Tools & Kits": "lNtotsS2",
    "Automotive & Outdoor Tools": "EuOttTo1",
    "Hardware Accessories": "crsadEe0",

    "Educational Kits & Models": "iieSNlm0",
    "Games & Creative Supplies": "MieCPVS0"
}

# ================= HELPERS =================

used_product_ids = set()

def generate_product_id():
    while True:
        letters = random.choices(string.ascii_lowercase, k=5) \
                + random.choices(string.ascii_uppercase, k=2)
        numbers = random.choices(string.digits, k=3)
        pid = "".join(random.sample(letters + numbers, 10))
        if pid not in used_product_ids:
            used_product_ids.add(pid)
            return pid

# ================= MAIN =================

with open(INPUT_JSON, "r", encoding="utf-8") as f:
    raw = json.load(f)

final = {"products": {}}

for cat_name, cat_data in raw["products"].items():

    if cat_name not in CATEGORY_MAP:
        continue

    cat_id = CATEGORY_MAP[cat_name]

    final["products"].setdefault(cat_name, {
        "category_id": cat_id,
        "subcategories": {}
    })

    for subcat_name, subcat_data in cat_data["subcategories"].items():

        if subcat_name not in SUBCATEGORY_MAP:
            continue

        subcat_id = SUBCATEGORY_MAP[subcat_name]

        final["products"][cat_name]["subcategories"].setdefault(subcat_name, {
            "subcategory_id": subcat_id,
            "products": []
        })

        for product in subcat_data["products"]:
            new_product = product.copy()
            new_product["product_id"] = generate_product_id()
            new_product["category_id"] = cat_id
            new_product["subcategory_id"] = subcat_id
            new_product["category"] = cat_name
            new_product["subcategory"] = subcat_name

            final["products"][cat_name]["subcategories"][subcat_name]["products"].append(new_product)

# ================= SAVE =================

with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
    json.dump(final, f, indent=2, ensure_ascii=False)

print("✅ DONE")
print("📦 Output file:", OUTPUT_JSON)
print("🆔 Total products:", len(used_product_ids))
