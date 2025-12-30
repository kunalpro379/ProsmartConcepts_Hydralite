import os
import json
import cloudinary
import cloudinary.uploader
import re

# ================= CLOUDINARY =================
cloudinary.config(

)

# ================= PATHS =================
INPUT_JSON = "products_final.json"
OUTPUT_JSON = "final_verified.json"

# ================= HELPERS =================
def safe_name(text):
    return re.sub(r"[^a-zA-Z0-9_-]", "_", text)

# ================= LOAD JSON =================
with open(INPUT_JSON, "r", encoding="utf-8") as f:
    data = json.load(f)

# ================= MAIN LOGIC =================
for category_name, category in data["products"].items():
    cat_safe = safe_name(category_name)

    for subcat_name, subcat in category["subcategories"].items():
        subcat_safe = safe_name(subcat_name)

        for product in subcat["products"]:
            pid = product["product_id"]
            new_urls = []

            for idx, img in enumerate(product.get("image_urls", []), start=1):
                local_path = os.path.join(os.getcwd(), img)

                if not os.path.exists(local_path):
                    print(f"⚠ Image not found: {local_path}")
                    continue

                public_id = f"{pid}_img{idx}"

                try:
                    res = cloudinary.uploader.upload(
                        local_path,
                        folder=f"ProsmartProducts/{cat_safe}/{subcat_safe}/{pid}",
                        public_id=public_id,
                        overwrite=True
                    )

                    new_urls.append(res["secure_url"])
                    print(f"✅ Uploaded: {public_id}")

                except Exception as e:
                    print(f"❌ Upload failed: {img} → {e}")

            # 🔁 replace local paths with Cloudinary URLs
            product["image_urls"] = new_urls

# ================= SAVE OUTPUT =================
with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("\n🎉 DONE")
print(f"📄 Saved to: {OUTPUT_JSON}")
