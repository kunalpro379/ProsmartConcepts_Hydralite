# import json

# INPUT_JSON = "products.json"
# OUTPUT_JSON = "products_normalized.json"

# FINAL_CATEGORY = {
#     "category_name": "Tools & Hardware",
#     "category_id": "aRsrwa0",
#     "subcategory_name": "Hand Tools & Kits",
#     "subcategory_id": "lNtotsS2",
# }

# with open(INPUT_JSON, "r", encoding="utf-8") as f:
#     data = json.load(f)

# all_products = []

# tools_block = data["products"].get("Tools & Hardware", {})
# subcats = tools_block.get("subcategories", {})

# for subcat in subcats.values():
#     for product in subcat.get("products", []):
#         product["category"] = FINAL_CATEGORY["category_name"]
#         product["category_id"] = FINAL_CATEGORY["category_id"]
#         product["subcategory"] = FINAL_CATEGORY["subcategory_name"]
#         product["subcategory_id"] = FINAL_CATEGORY["subcategory_id"]
#         all_products.append(product)

# final_json = {
#     "products": {
#         FINAL_CATEGORY["category_name"]: {
#             "category_id": FINAL_CATEGORY["category_id"],
#             "subcategories": {
#                 FINAL_CATEGORY["subcategory_name"]: {
#                     "subcategory_id": FINAL_CATEGORY["subcategory_id"],
#                     "products": all_products
#                 }
#             }
#         }
#     }
# }

# with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
#     json.dump(final_json, f, indent=2, ensure_ascii=False)

# print("✅ Normalization done")
# print("📦 Total products:", len(all_products))
# print("📁 Output file:", OUTPUT_JSON)



import json
import random
import string
import os

# ===============================
# FILE PATHS
# ===============================
INPUT_FILE = "products_normalized_new.json"
OUTPUT_FILE = "products_final.json"

# ===============================
# RANDOM PRODUCT ID GENERATOR
# ===============================
def generate_product_id(used_ids, length=9):
    """
    Generates random product ID with:
    - mixed uppercase + lowercase letters
    - digits
    Example: aZkP7mQ92
    """
    chars = string.ascii_letters + string.digits
    while True:
        pid = ''.join(random.choices(chars, k=length))
        if pid not in used_ids:
            used_ids.add(pid)
            return pid

# ===============================
# LOAD JSON
# ===============================
with open(INPUT_FILE, "r", encoding="utf-8") as f:
    data = json.load(f)

used_product_ids = set()

# ===============================
# MAIN LOGIC
# ===============================
products_root = data.get("products", {})

for category_name, category_obj in products_root.items():

    # category_id stays FIXED
    category_id = category_obj.get("category_id")

    subcategories = category_obj.get("subcategories", {})

    for subcat_name, subcat_obj in subcategories.items():

        # subcategory_id stays FIXED
        subcategory_id = subcat_obj.get("subcategory_id")

        products = subcat_obj.get("products", [])

        for product in products:
            # generate new product_id
            product["product_id"] = generate_product_id(used_product_ids)

            # enforce fixed ids (safety)
            product["category_id"] = category_id
            product["subcategory_id"] = subcategory_id
            product["category"] = category_name
            product["subcategory"] = subcat_name

# ===============================
# SAVE OUTPUT
# ===============================
with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("✅ Conversion complete")
print(f"📁 Output saved to: {OUTPUT_FILE}")




# import json
# import re
# import os
# import sys
# from copy import deepcopy

# # =====================================================
# # FILE NAMES (KEEP IN SAME FOLDER AS SCRIPT)
# # =====================================================
# INPUT_FILE = "products_normalized.json"
# OUTPUT_FILE = "products_normalized_new.json"

# # =====================================================
# # PATHS (SCRIPT DIRECTORY – NOT TERMINAL DIRECTORY)
# # =====================================================
# SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
# INPUT_PATH = os.path.join(SCRIPT_DIR, INPUT_FILE)
# OUTPUT_PATH = os.path.join(SCRIPT_DIR, OUTPUT_FILE)

# # =====================================================
# # ITERATORS
# # =====================================================
# def iter_products(root):
#     products_root = root.get("products", {})
#     for cat_name, cat_obj in products_root.items():
#         subcats = (cat_obj or {}).get("subcategories", {})
#         for subcat_name, subcat_obj in subcats.items():
#             plist = (subcat_obj or {}).get("products", [])
#             if not isinstance(plist, list):
#                 continue
#             for i, p in enumerate(plist):
#                 if isinstance(p, dict):
#                     yield plist, i, p, cat_name, subcat_name


# def build_index(root):
#     idx = {}
#     for plist, i, p, _, _ in iter_products(root):
#         pid = p.get("product_id")
#         if pid:
#             idx.setdefault(pid, []).append((plist, i, p))
#     return idx

# # =====================================================
# # HELPERS
# # =====================================================
# def get_model_codes_list(product):
#     specs = product.get("specifications")
#     if not isinstance(specs, dict):
#         return None
#     m = specs.get("model_codes_shown")
#     return m if isinstance(m, list) else None


# def uniq_keep_order(seq):
#     seen = set()
#     out = []
#     for x in seq:
#         if x not in seen:
#             seen.add(x)
#             out.append(x)
#     return out


# def merge_products(target, sources):
#     t_imgs = target.get("image_urls")
#     if not isinstance(t_imgs, list):
#         t_imgs = []
#     all_imgs = list(t_imgs)

#     t_codes = get_model_codes_list(target)
#     if t_codes is None:
#         target.setdefault("specifications", {})
#         target["specifications"]["model_codes_shown"] = []
#         t_codes = target["specifications"]["model_codes_shown"]
#     all_codes = list(t_codes)

#     for s in sources:
#         s_imgs = s.get("image_urls")
#         if isinstance(s_imgs, list):
#             all_imgs.extend(s_imgs)

#         s_codes = get_model_codes_list(s)
#         if isinstance(s_codes, list):
#             all_codes.extend(s_codes)

#     target["image_urls"] = uniq_keep_order(all_imgs)
#     target["specifications"]["model_codes_shown"] = uniq_keep_order(all_codes)


# def delete_product_by_id(root, product_id):
#     changed = True
#     while changed:
#         changed = False
#         for plist, i, p, _, _ in list(iter_products(root)):
#             if p.get("product_id") == product_id:
#                 del plist[i]
#                 changed = True
#                 break


# def extract_model_codes(product, extract_prefixes=None, extract_regex=None):
#     codes = get_model_codes_list(product)
#     if not isinstance(codes, list):
#         return [], []

#     rgx = re.compile(extract_regex) if extract_regex else None
#     prefixes = tuple(extract_prefixes or [])

#     extracted, remaining = [], []
#     for c in codes:
#         s = str(c)
#         match = False
#         if rgx and rgx.search(s):
#             match = True
#         if prefixes and s.startswith(prefixes):
#             match = True

#         (extracted if match else remaining).append(c)

#     return extracted, remaining


# def add_codes(product, codes):
#     if not codes:
#         return
#     m = get_model_codes_list(product)
#     if m is None:
#         product.setdefault("specifications", {})
#         product["specifications"]["model_codes_shown"] = []
#         m = product["specifications"]["model_codes_shown"]
#     m[:] = uniq_keep_order(list(m) + list(codes))


# def add_images(product, images):
#     if not images:
#         return
#     imgs = product.get("image_urls")
#     if not isinstance(imgs, list):
#         imgs = []
#     product["image_urls"] = uniq_keep_order(list(imgs) + list(images))

# # =====================================================
# # MERGE / EXTRACTION CONFIG
# # =====================================================
# MERGE_FULL_GROUPS = [
#     ("P-0001", ["P-0004"]),
#     ("P-0014", ["P-0015"]),
#     ("P-0024", ["P-0025", "P-0026", "P-0027"]),
#     ("P-0030", ["P-0031", "P-0032"]),
#     ("P-0034", ["P-0035"]),
# ]

# EXTRACTIONS = [
#     {
#         "from_id": "P-0005",
#         "to_id": "P-0001",
#         "extract_prefixes": ["MG 81001", "MG81001"],
#         "also_merge_images": True,
#     },
#     {
#         "from_id": "P-0016",
#         "to_id": "P-0015",
#         "extract_prefixes": ["MG 7B", "MG7B"],
#         "also_merge_images": True,
#     },
# ]

# CLEANUPS = [
#     {
#         "product_id": "P-0015",
#         "remove_prefixes": ["MG 6B", "MG6B"],
#     },
# ]

# # =====================================================
# # MAIN
# # =====================================================
# def main():
#     print("SCRIPT DIR :", SCRIPT_DIR)
#     print("INPUT FILE :", INPUT_PATH)
#     print("OUTPUT FILE:", OUTPUT_PATH)

#     if not os.path.exists(INPUT_PATH):
#         print(f"\n❌ ERROR: Input file not found:\n{INPUT_PATH}")
#         sys.exit(1)

#     with open(INPUT_PATH, "r", encoding="utf-8") as f:
#         root = json.load(f)

#     root = deepcopy(root)

#     # -------- FULL MERGES --------
#     for keep_id, merge_ids in MERGE_FULL_GROUPS:
#         idx = build_index(root)
#         if keep_id not in idx:
#             print(f"⚠ Missing keep_id: {keep_id}")
#             continue

#         keep = idx[keep_id][0][2]
#         sources = [idx[mid][0][2] for mid in merge_ids if mid in idx]

#         merge_products(keep, sources)
#         for mid in merge_ids:
#             delete_product_by_id(root, mid)

#     # -------- EXTRACTIONS --------
#     for ex in EXTRACTIONS:
#         idx = build_index(root)
#         if ex["from_id"] not in idx or ex["to_id"] not in idx:
#             print(f"⚠ Extraction skipped: {ex['from_id']} → {ex['to_id']}")
#             continue

#         from_p = idx[ex["from_id"]][0][2]
#         to_p = idx[ex["to_id"]][0][2]

#         extracted, remaining = extract_model_codes(
#             from_p,
#             extract_prefixes=ex.get("extract_prefixes"),
#             extract_regex=ex.get("extract_regex"),
#         )

#         m = get_model_codes_list(from_p)
#         if isinstance(m, list):
#             m[:] = remaining

#         add_codes(to_p, extracted)

#         if ex.get("also_merge_images"):
#             add_images(to_p, from_p.get("image_urls", []))

#     # -------- CLEANUPS --------
#     for cl in CLEANUPS:
#         idx = build_index(root)
#         pid = cl["product_id"]
#         if pid not in idx:
#             continue

#         p = idx[pid][0][2]
#         codes = get_model_codes_list(p)
#         if not isinstance(codes, list):
#             continue

#         prefixes = tuple(cl.get("remove_prefixes") or [])
#         codes[:] = [c for c in codes if not str(c).startswith(prefixes)]

#     # -------- FINAL DEDUPE --------
#     for _, _, p, _, _ in iter_products(root):
#         if isinstance(p.get("image_urls"), list):
#             p["image_urls"] = uniq_keep_order(p["image_urls"])

#         m = get_model_codes_list(p)
#         if isinstance(m, list):
#             p["specifications"]["model_codes_shown"] = uniq_keep_order(m)

#     with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
#         json.dump(root, f, ensure_ascii=False, indent=2)

#     print("\n✅ SUCCESS: JSON saved to:")
#     print(OUTPUT_PATH)


# if __name__ == "__main__":
#     main()
