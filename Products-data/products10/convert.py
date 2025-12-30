# import json
# import re
# from collections import defaultdict

# INPUT_JSON = "products.json"
# OUTPUT_JSON = "products_fixed.json"

# # ================= FIXED TAXONOMY =================

# CATEGORIES = {
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
#     # Personal Care
#     ("Personal Care", "Grooming Tools", ["derma", "roller", "microneedling", "stamp"]),
#     ("Personal Care", "Skin Care", ["skin", "facial", "jade", "acne", "scrubber"]),
#     ("Personal Care", "Hair Care", ["hair", "scalp", "dandruff", "tricho"]),

#     # Healthcare
#     ("Healthcare Essentials", "Diagnostic & Monitoring Devices", ["meter", "testing", "diagnostic", "uv"]),
#     ("Healthcare Essentials", "Medical Tools & Equipment", ["prp", "kit", "injection"]),

#     # Gadgets
#     ("Gadgets & Accessories", "Utility & Multi-Tools", ["magnifier", "inspection"]),
# ]

# def normalize(text):
#     return re.sub(r"[^a-z0-9 ]", "", text.lower())

# def detect_category(product):
#     text = normalize(
#         f"{product.get('product_name','')} "
#         f"{product.get('product_title','')} "
#         f"{product.get('product_description','')}"
#     )
#     for cat, subcat, keywords in RULES:
#         for k in keywords:
#             if k in text:
#                 return cat, subcat
#     return "Gadgets & Accessories", "Utility & Multi-Tools"

# # ================= MAIN =================

# with open(INPUT_JSON, "r", encoding="utf-8") as f:
#     data = json.load(f)

# final = {"products": defaultdict(dict)}
# seen = set()

# for _, cat_data in data["products"].items():
#     for _, subcat_data in cat_data["subcategories"].items():
#         for p in subcat_data["products"]:

#             key = (p["product_name"], p["product_title"])
#             if key in seen:
#                 continue
#             seen.add(key)

#             cat, subcat = detect_category(p)

#             cat_id = CATEGORIES[cat]["category_id"]
#             subcat_id = CATEGORIES[cat]["subcategories"][subcat]

#             final["products"].setdefault(cat, {
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

# print("✅ Categories fixed successfully")
# print("📁 Output file:", OUTPUT_JSON)
# import json
# import re
# from copy import deepcopy

# # -------- CONFIG --------
# INPUT_FILE = "products_fixed.json"
# OUTPUT_FILE = "products_fixed_deduped.json"

# # If you want to FORCE where the single PRP Kit should live, set these.
# # If left as None, the script keeps the first encountered PRP product in-place.
# CANON_CATEGORY = None        # e.g. "Healthcare Essentials"
# CANON_SUBCATEGORY = None     # e.g. "Diagnostic & Testing Tools"

# # Keywords to treat as "same PRP family" (covers PRP, ACP, LEV-ACP, platelet rich plasma)
# FAMILY_PATTERNS = [
#     r"\bprp\b",
#     r"platelet\s+rich\s+plasma",
#     r"\bacp\b",
#     r"lev[\s\-]?acp",
# ]
# # ------------------------


# def norm_text(s: str) -> str:
#     return re.sub(r"\s+", " ", (s or "").strip().lower())


# def is_prp_family_product(p: dict) -> bool:
#     hay = " ".join([
#         norm_text(p.get("product_name", "")),
#         norm_text(p.get("product_title", "")),
#         norm_text(p.get("product_description", "")),
#     ])
#     return any(re.search(pat, hay, flags=re.IGNORECASE) for pat in FAMILY_PATTERNS)


# def uniq_keep_order(items):
#     seen = set()
#     out = []
#     for x in items:
#         if x is None:
#             continue
#         x2 = str(x).strip()
#         if not x2:
#             continue
#         if x2 in seen:
#             continue
#         seen.add(x2)
#         out.append(x2)
#     return out


# def iter_products(tree: dict):
#     """
#     Yields tuples:
#       (category_name, subcategory_name, products_list_ref, index_in_list, product_dict)
#     """
#     products_root = tree.get("products", {})
#     for cat_name, cat_obj in products_root.items():
#         subcats = (cat_obj or {}).get("subcategories", {})
#         for subcat_name, subcat_obj in subcats.items():
#             plist = (subcat_obj or {}).get("products", [])
#             if not isinstance(plist, list):
#                 continue
#             for i, p in enumerate(plist):
#                 if isinstance(p, dict):
#                     yield cat_name, subcat_name, plist, i, p


# def ensure_category_subcategory(tree, category_name, subcategory_name):
#     if "products" not in tree or not isinstance(tree["products"], dict):
#         tree["products"] = {}

#     if category_name not in tree["products"] or not isinstance(tree["products"][category_name], dict):
#         tree["products"][category_name] = {"category_id": category_name, "subcategories": {}}

#     cat_obj = tree["products"][category_name]
#     if "subcategories" not in cat_obj or not isinstance(cat_obj["subcategories"], dict):
#         cat_obj["subcategories"] = {}

#     if subcategory_name not in cat_obj["subcategories"] or not isinstance(cat_obj["subcategories"][subcategory_name], dict):
#         cat_obj["subcategories"][subcategory_name] = {"subcategory_id": subcategory_name, "products": []}

#     sub_obj = cat_obj["subcategories"][subcategory_name]
#     if "products" not in sub_obj or not isinstance(sub_obj["products"], list):
#         sub_obj["products"] = []

#     return cat_obj, sub_obj


# def main():
#     with open(INPUT_FILE, "r", encoding="utf-8") as f:
#         data = json.load(f)

#     # Find all PRP-family products
#     hits = []
#     for cat_name, subcat_name, plist, idx, p in iter_products(data):
#         if is_prp_family_product(p):
#             hits.append((cat_name, subcat_name, plist, idx, p))

#     if len(hits) <= 1:
#         # Still normalize image_urls if present
#         if len(hits) == 1:
#             p = hits[0][4]
#             p["image_urls"] = uniq_keep_order(p.get("image_urls", []))
#         with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
#             json.dump(data, f, ensure_ascii=False, indent=2)
#         print(f"No duplicates found. Wrote: {OUTPUT_FILE}")
#         return

#     # Keep the first encountered product as canonical (unless forcing placement)
#     keep = deepcopy(hits[0][4])

#     # Merge ALL images from all duplicates (NO deletions)
#     all_images = []
#     for _, _, _, _, p in hits:
#         all_images.extend(p.get("image_urls", []) or [])
#     keep["image_urls"] = uniq_keep_order((keep.get("image_urls", []) or []) + all_images)

#     # Remove all PRP-family products from everywhere
#     # (remove from end to start so indices don't shift)
#     for cat_name, subcat_name, plist, idx, _p in sorted(hits, key=lambda x: x[3], reverse=True):
#         del plist[idx]

#     # Re-insert the single kept product
#     if CANON_CATEGORY and CANON_SUBCATEGORY:
#         _, sub_obj = ensure_category_subcategory(data, CANON_CATEGORY, CANON_SUBCATEGORY)
#         sub_obj["products"].append(keep)
#         # also sync displayed category/subcategory fields (if your schema uses them)
#         keep["category"] = CANON_CATEGORY
#         keep["subcategory"] = CANON_SUBCATEGORY
#     else:
#         # Put it back where the first one was found
#         first_cat, first_subcat, _, _, _ = hits[0]
#         _, sub_obj = ensure_category_subcategory(data, first_cat, first_subcat)
#         sub_obj["products"].append(keep)

#     with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
#         json.dump(data, f, ensure_ascii=False, indent=2)

#     print(f"Found {len(hits)} PRP-family entries -> kept 1, merged images -> wrote: {OUTPUT_FILE}")
#     print("Merged image_urls:", keep["image_urls"])


# if __name__ == "__main__":
#     main()


import json
import random
import string

# =========================
# FILE PATHS
# =========================
INPUT_FILE = "products_fixed_deduped.json"
OUTPUT_FILE = "products_fixed_deduped_final.json"

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

            # safety enforcement
            product["category_id"] = category_id
            product["subcategory_id"] = subcategory_id
            product["category"] = category_name
            product["subcategory"] = subcat_name

# =========================
# SAVE OUTPUT
# =========================
with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("✅ PRODUCT IDs REGENERATED SUCCESSFULLY")
print(f"📦 Output file: {OUTPUT_FILE}")
print(f"🧾 Total products processed: {total_products}")
print(f"🔐 Unique product IDs generated: {len(used_ids)}")
