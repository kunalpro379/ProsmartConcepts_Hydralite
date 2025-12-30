---
agent: agent
---
edit the json data bro and create the json data in this json format {
  "products": {
    "<Category Name>": {
      "category_id": "",
      "subcategories": {
        "<Subcategory Name>": {
          "subcategory_id": "",
          "products": [
            {
              "product_id": "",
              "product_name": "",
              "product_title": "",
              "product_description": "",
              "product_price": null,
              "image_urls": ["<local_image_path>"],
              "category_id": "",
              "subcategory_id": "",
              "category": "<Category Name>",
              "subcategory": "<Subcategory Name>"
            }
          ]
        }
      }
    }
  }
}
product description should be in paragraph in detailed okkk 8-10 sentences max i want to show the data to the ecommerce website also choose the category from the 6 categories Healthcare Essentials, Personal Care, Smart Home, Gadgets & Accessories, Tools & Hardware, Kids & Crafts and guess its subcategory okk and product ke andar specification bhi dalde okkk
bro keep the pricing null and bro dont guess anything and for each image append new product okk

IMPORTANT: Provide only the exact image filenames (do NOT include folders or full paths). Examples:
- IMG_0001.jpg
- phone_wall_holder_front.png

RULES FOR IMAGE URLS:
- Use ONLY the exact local image filename from the project root (match spaces/case/extension exactly).
- ONE image = ONE product (do not club multiple images into one product unless user explicitly says they are the same product).

If multiple images belong to one product, send them as a comma-separated list for that product.
