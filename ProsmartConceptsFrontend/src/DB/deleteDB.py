from pymongo import MongoClient

# -----------------------------
#  MONGO CONNECTION
# -----------------------------
MONGO_URI = ""
DATABASE_NAME = ""

client = MongoClient(MONGO_URI)

# -----------------------------
#  DELETE COMPLETE DATABASE
# -----------------------------
def delete_entire_database():
    confirm = input(f"Are you sure you want to DELETE the entire database '{DATABASE_NAME}'? (yes/no): ")

    if confirm.lower() == "yes":
        client.drop_database(DATABASE_NAME)
        print(f"🔥 Database '{DATABASE_NAME}' deleted successfully!")
    else:
        print("❌ Cancelled — database NOT deleted.")

if __name__ == "__main__":
    delete_entire_database()
