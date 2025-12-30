# import json
# import re
# from collections import defaultdict

# INPUT_JSON = "products.json"
# OUTPUT_JSON = "products_fixed_taxonomy.json"

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
#     ("Personal Care", "Personal Hygiene & Accessories", ["water bottle", "hydration"]),
#     ("Personal Care", "Grooming Tools", ["dental", "plaque"]),

#     ("Gadgets & Accessories", "Office & Desk Gadgets", ["pen"]),
#     ("Gadgets & Accessories", "Travel & Car Accessories", ["shawl", "scarf"]),

#     ("Smart Home", "Home Appliances", ["steamer", "iron"]),
#     ("Smart Home", "Home Decor & Utilities", ["bed sheet", "pillow", "linen"]),
#     ("Smart Home", "Home Comfort Devices", ["clock", "speaker"]),
#     ("Smart Home", "Smart Controls & Security", ["mobile holder", "wall mounted"]),

#     ("Healthcare Essentials", "Diagnostic & Monitoring Devices", ["ph", "meter", "tewameter"]),
#     ("Healthcare Essentials", "Medical Tools & Equipment", ["vein", "prp"]),
#     ("Healthcare Essentials", "Personal Health Care", ["pill"]),
# ]

# def normalize(text):
#     return re.sub(r"[^a-z0-9 ]", "", text.lower())

# def detect_category(product):
#     text = normalize(
#         product.get("product_name", "") + " " +
#         product.get("product_title", "") + " " +
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

# for cat_data in data["products"].values():
#     for subcat_data in cat_data["subcategories"].values():
#         for p in subcat_data["products"]:

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

# print("✅ Products mapped to official taxonomy")
# print("📁 Output:", OUTPUT_JSON)


# import json
# import copy
# from pathlib import Path

# INPUT_FILE = "products_fixed_taxonomy.json"
# OUTPUT_FILE = "products_fixed_taxonomy_merged.json"

# CATEGORY = "Healthcare Essentials"

# KEEP_SUBCATEGORY = "Medical Tools & Equipment"
# REMOVE_SUBCATEGORY = "Diagnostic & Monitoring Devices"

# KEEP_PRODUCT_ID = "PRD-0013"     # keep this entry
# REMOVE_PRODUCT_ID = "PRD-0012"   # merge+remove this entry


# def uniq_preserve_order(seq):
#     seen = set()
#     out = []
#     for x in seq:
#         if x not in seen:
#             seen.add(x)
#             out.append(x)
#     return out


# def find_product(products_list, product_id):
#     for idx, p in enumerate(products_list):
#         if p.get("product_id") == product_id:
#             return idx, p
#     return None, None


# def main():
#     data = json.loads(Path(INPUT_FILE).read_text(encoding="utf-8"))
#     root = data["products"]

#     cat = root[CATEGORY]
#     subcats = cat["subcategories"]

#     keep_list = subcats[KEEP_SUBCATEGORY]["products"]
#     remove_list = subcats[REMOVE_SUBCATEGORY]["products"]

#     keep_idx, keep_prod = find_product(keep_list, KEEP_PRODUCT_ID)
#     rem_idx, rem_prod = find_product(remove_list, REMOVE_PRODUCT_ID)

#     if keep_prod is None:
#         raise SystemExit(f"KEEP product_id not found: {KEEP_PRODUCT_ID} in {CATEGORY} -> {KEEP_SUBCATEGORY}")
#     if rem_prod is None:
#         raise SystemExit(f"REMOVE product_id not found: {REMOVE_PRODUCT_ID} in {CATEGORY} -> {REMOVE_SUBCATEGORY}")

#     # Merge image_urls (DON'T DELETE ANY)
#     keep_imgs = keep_prod.get("image_urls") or []
#     rem_imgs = rem_prod.get("image_urls") or []
#     keep_prod["image_urls"] = uniq_preserve_order(keep_imgs + rem_imgs)

#     # Ensure taxonomy fields reflect the kept subcategory
#     keep_prod["category"] = CATEGORY
#     keep_prod["subcategory"] = KEEP_SUBCATEGORY
#     keep_prod["category_id"] = cat.get("category_id")
#     keep_prod["subcategory_id"] = subcats[KEEP_SUBCATEGORY].get("subcategory_id")

#     # OPTIONAL: if you want to preserve the more detailed description, keep the longer one
#     kd = (keep_prod.get("product_description") or "").strip()
#     rd = (rem_prod.get("product_description") or "").strip()
#     if len(rd) > len(kd):
#         keep_prod["product_description"] = rd

#     # OPTIONAL: merge specs carefully (here: union lists where both are lists; otherwise keep existing)
#     ks = keep_prod.get("specifications") or {}
#     rs = rem_prod.get("specifications") or {}
#     merged_specs = copy.deepcopy(ks)
#     for k, rv in rs.items():
#         if k not in merged_specs:
#             merged_specs[k] = rv
#         else:
#             kv = merged_specs[k]
#             if isinstance(kv, list) and isinstance(rv, list):
#                 merged_specs[k] = uniq_preserve_order(kv + rv)
#             # else: keep kv (the kept entry’s value)
#     keep_prod["specifications"] = merged_specs

#     # Remove the duplicate product entry
#     del remove_list[rem_idx]

#     Path(OUTPUT_FILE).write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
#     print(f"Done. Wrote merged file: {OUTPUT_FILE}")
#     print(f"Merged images: {keep_prod['image_urls']}")


# if __name__ == "__main__":
#     main()



import json
import random
import string
import os

# =========================
# FILE PATHS
# =========================
INPUT_FILE = "products_fixed_taxonomy_merged.json"
OUTPUT_FILE = "products_final.json"

# =========================
# RANDOM PRODUCT ID GENERATOR
# =========================
def generate_product_id(used_ids, length_chars=5, length_digits=4):
    while True:
        chars = ''.join(random.choices(string.ascii_letters, k=length_chars))
        digits = ''.join(random.choices(string.digits, k=length_digits))
        pid = chars + digits
        if pid not in used_ids:
            used_ids.add(pid)
            return pid

# =========================
# LOAD JSON
# =========================
with open(INPUT_FILE, "r", encoding="utf-8") as f:
    data = json.load(f)

used_product_ids = set()

# =========================
# MAIN LOOP
# =========================
for category_name, category in data.get("products", {}).items():

    # ❗ category_id stays SAME
    category_id = category["category_id"]

    for subcat_name, subcat in category.get("subcategories", {}).items():

        # ❗ subcategory_id stays SAME
        subcategory_id = subcat["subcategory_id"]

        for product in subcat.get("products", []):

            # 🔁 generate new product_id
            new_pid = generate_product_id(used_product_ids)

            product["product_id"] = new_pid

            # safety: keep taxonomy correct
            product["category_id"] = category_id
            product["subcategory_id"] = subcategory_id
            product["category"] = category_name
            product["subcategory"] = subcat_name

# =========================
# SAVE OUTPUT
# =========================
with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("✅ DONE")
print(f"📦 Output saved as: {OUTPUT_FILE}")
print(f"🔢 Total unique product IDs: {len(used_product_ids)}")
