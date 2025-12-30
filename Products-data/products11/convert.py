# import json
# import re
# import random
# import string
# from collections import defaultdict

# INPUT_JSON = "products.json"
# OUTPUT_JSON = "products_normalized.json"

# # ================= FIXED TAXONOMY =================

# CATEGORY_ID = "HltaaL2"  # Healthcare Essentials

# SUBCATEGORY_MAP = {
#     "Diagnostic & Monitoring Devices": "daootnm2",
#     "Medical Consumables": "dEiusae5",
#     "Medical Tools & Equipment": "upqTiim0",
# }

# # ================= ID GENERATORS =================

# def clean(text):
#     return re.sub(r"[^A-Za-z]", "", text)

# def random_id(prefix, name, digits=3):
#     base = clean(name)[:4].upper()
#     rand = "".join(random.choices(string.digits, k=digits))
#     return f"{prefix}{base}{rand}"

# # ================= RULE ENGINE =================

# def detect_subcategory(product):
#     text = (product["product_name"] + " " + product["product_title"]).lower()

#     if any(k in text for k in [
#         "densitometer", "tricoscope", "dermascope",
#         "magnifier", "microscope", "tester", "meter"
#     ]):
#         return "Diagnostic & Monitoring Devices"

#     if any(k in text for k in [
#         "glove", "nitrile", "disposable", "strip"
#     ]):
#         return "Medical Consumables"

#     if any(k in text for k in [
#         "prp", "kit", "forceps", "derma", "hydraroller", "laser"
#     ]):
#         return "Medical Tools & Equipment"

#     return "Medical Tools & Equipment"

# # ================= MAIN =================

# with open(INPUT_JSON, "r", encoding="utf-8") as f:
#     data = json.load(f)

# final = {
#     "products": {
#         "Healthcare Essentials": {
#             "category_id": CATEGORY_ID,
#             "subcategories": defaultdict(lambda: {"products": []})
#         }
#     }
# }

# for _, subcat_block in data["products"]["Healthcare Essentials"]["subcategories"].items():
#     for p in subcat_block["products"]:

#         fixed_subcat = detect_subcategory(p)
#         subcat_id = SUBCATEGORY_MAP[fixed_subcat]

#         # Fill IDs
#         p["product_id"] = random_id("HC", p["product_name"])
#         p["category"] = "Healthcare Essentials"
#         p["subcategory"] = fixed_subcat
#         p["category_id"] = CATEGORY_ID
#         p["subcategory_id"] = subcat_id

#         final["products"]["Healthcare Essentials"]["subcategories"].setdefault(
#             fixed_subcat,
#             {"subcategory_id": subcat_id, "products": []}
#         )

#         final["products"]["Healthcare Essentials"]["subcategories"][fixed_subcat]["products"].append(p)

# # convert defaultdict
# final["products"]["Healthcare Essentials"]["subcategories"] = dict(
#     final["products"]["Healthcare Essentials"]["subcategories"]
# )

# with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
#     json.dump(final, f, indent=2, ensure_ascii=False)

# print("✅ Healthcare products normalized successfully")
# print("📁 Output:", OUTPUT_JSON)


import json
import random
import string

# =========================
# FILE PATHS
# =========================
INPUT_FILE = "products_normalized.json"
OUTPUT_FILE = "products_normalized_final_ids.json"

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
total_products = 0

# =========================
# PROCESS PRODUCTS
# =========================
for category_name, category in data["products"].items():

    category_id = category["category_id"]  # FIXED

    for subcat_name, subcat in category["subcategories"].items():

        subcategory_id = subcat["subcategory_id"]  # FIXED

        for product in subcat["products"]:
            total_products += 1

            # 🔁 regenerate product_id
            product["product_id"] = generate_product_id(used_ids)

            # safety enforcement (NO taxonomy break)
            product["category_id"] = category_id
            product["subcategory_id"] = subcategory_id
            product["category"] = category_name
            product["subcategory"] = subcat_name

# =========================
# SAVE OUTPUT
# =========================
with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("✅ PRODUCT IDs STANDARDIZED SUCCESSFULLY")
print(f"📦 Output file: {OUTPUT_FILE}")
print(f"🧾 Total products processed: {total_products}")
print(f"🔐 Unique IDs generated: {len(used_ids)}")
