import json
import os

# ===== CONFIG =====
JSON_FILE = "final_products_converted.json"   # <-- change if your file name is different
BASE_DIR = os.getcwd()        # current directory

# ===== COUNTERS =====
present = 0
missing = 0
present_images = []
missing_images = []

# ===== LOAD JSON =====
with open(JSON_FILE, "r", encoding="utf-8") as f:
    data = json.load(f)

# ===== TRAVERSE JSON =====
products_root = data.get("products", {})

for category_name, category_data in products_root.items():
    subcategories = category_data.get("subcategories", {})

    for subcat_name, subcat_data in subcategories.items():
        products = subcat_data.get("products", [])

        for product in products:
            image_urls = product.get("image_urls", [])

            for img in image_urls:
                # handle simple filenames like "12.jpg"
                image_path = os.path.join(BASE_DIR, img)

                if os.path.isfile(image_path):
                    present += 1
                    present_images.append(img)
                else:
                    missing += 1
                    missing_images.append(img)

# ===== RESULTS =====
print("\n📊 IMAGE CHECK REPORT")
print("────────────────────────")
print(f"✅ Images present : {present}")
print(f"❌ Images missing : {missing}")

if missing_images:
    print("\n🚫 Missing images:")
    for img in missing_images:
        print(" -", img)

if present_images:
    print("\n🖼️ Present images:")
    for img in present_images:
        print(" -", img)

print("\n✅ Done")
