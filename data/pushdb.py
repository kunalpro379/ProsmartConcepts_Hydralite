import json
import os
import cloudinary
import cloudinary.uploader
from pymongo import MongoClient
from urllib.parse import quote_plus

# Cloudinary configuration
DEST_CREDS = {

}

cloudinary.config(**DEST_CREDS)

# MongoDB configuration
username = quote_plus("")
password = quote_plus("")
mongo_uri = f""

def upload_to_cloudinary(file_path, folder_path):
    """Upload file to Cloudinary and return the URL"""
    try:
        # Get file extension to determine resource type
        file_ext = os.path.splitext(file_path)[1].lower()
        resource_type = "video" if file_ext in ['.mp4', '.avi', '.mov', '.wmv'] else "image"
        
        result = cloudinary.uploader.upload(
            file_path,
            folder=folder_path,
            resource_type=resource_type,
            use_filename=True,
            unique_filename=False
        )
        return result['secure_url']
    except Exception as e:
        print(f"Error uploading {file_path}: {str(e)}")
        return None

def process_products():
    """Process products.json and upload assets to Cloudinary"""
    # Load products.json
    with open('products.json', 'r') as f:
        data = json.load(f)
    
    # Process each product
    for product in data['products']:
        product_id = product['id']
        product_name = product['name'].replace(' ', '_').replace('–', '-').replace('™', '').replace('&', 'and').replace('(', '').replace(')', '').replace('.', '')
        
        # Process assets
        for asset in product['assets']:
            if 'path' in asset:
                # Convert path to local file path
                local_path = asset['path'].replace('/hydralite/', 'hydralite/')
                
                if os.path.exists(local_path):
                    # Create Cloudinary folder path: hydralite/product_id/product_name/
                    folder_path = f"hydralite/{product_id}/{product_name}"
                    
                    # Upload to Cloudinary
                    print(f"Uploading {local_path} to {folder_path}...")
                    cloudinary_url = upload_to_cloudinary(local_path, folder_path)
                    
                    if cloudinary_url:
                        # Update the path with Cloudinary URL
                        asset['path'] = cloudinary_url
                        print(f"✓ Uploaded: {cloudinary_url}")
                    else:
                        print(f"✗ Failed to upload: {local_path}")
                else:
                    print(f"✗ File not found: {local_path}")
    
    # Save updated products.json
    with open('products.json', 'w') as f:
        json.dump(data, f, indent=4)
    
    print("\n✓ Updated products.json with Cloudinary URLs")
    return data

def push_to_mongodb(data):
    """Push data to MongoDB"""
    try:
        # Connect to MongoDB
        client = MongoClient(mongo_uri)
        db = client['hydralite']  # Database name
        collection = db['products']  # Collection name
        
        # Clear existing data
        collection.delete_many({})
        print("✓ Cleared existing products from MongoDB")
        
        # Insert new data
        result = collection.insert_many(data['products'])
        print(f"✓ Inserted {len(result.inserted_ids)} products to MongoDB")
        
        client.close()
        return True
        
    except Exception as e:
        print(f"✗ Error connecting to MongoDB: {str(e)}")
        return False

def main():
    """Main function to process and upload everything"""
    print("Starting upload process...")
    print("=" * 50)
    
    # Process products and upload to Cloudinary
    updated_data = process_products()
    
    print("\n" + "=" * 50)
    print("Uploading to MongoDB...")
    
    # Push to MongoDB
    success = push_to_mongodb(updated_data)
    
    if success:
        print("\n🎉 All done! Products uploaded to Cloudinary and MongoDB successfully!")
    else:
        print("\n❌ Failed to upload to MongoDB. Check your connection and credentials.")

if __name__ == "__main__":
    main()