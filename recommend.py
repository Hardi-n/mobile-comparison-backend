import json
import sys
import pandas as pd
import numpy as np
import os

CSV = "final_final_final.csv"

# Load dataset
if not os.path.exists(CSV):
    print(json.dumps({"error": f"CSV file not found: {CSV}"}))
    sys.exit(0)

df = pd.read_csv(CSV)

# Normalize all columns
df.columns = df.columns.str.strip().str.lower()

# Ensure numeric columns
for col in ["price", "ram", "storage", "battery", "rating", "antutu_score", "value_score"]:
    if col in df.columns:
        df[col] = pd.to_numeric(df[col], errors="coerce")

# ---- Generate antutu if missing ----
def generate_antutu(row):
    processor = str(row.get("processor", "")).lower()
    ram = int(row.get("ram", 0))
    storage = int(row.get("storage", 0))

    base = 500000

    if any(x in processor for x in ["8 gen 3", "8 gen 4", "dimensity 9300", "tensor g5"]):
        base = 1100000
    elif any(x in processor for x in ["8 gen 2", "dimensity 9000"]):
        base = 1000000
    elif any(x in processor for x in ["7 gen 3", "dimensity 8350"]):
        base = 900000

    if ram >= 8:
        base += 20000
    if storage >= 256:
        base += 10000

    return int(round(base / 10000) * 10000)

# create antutu_score if needed
df["antutu_score"] = df["antutu_score"].fillna(0)
df.loc[df["antutu_score"] == 0, "antutu_score"] = df.apply(generate_antutu, axis=1)

# value score
df["value_score"] = df["antutu_score"] / df["price"].replace(0, 1)

# ---- Category ----
def assign_category(row):
    antutu = row["antutu_score"]
    ram = row["ram"]
    battery = row["battery"]
    price = row["price"]
    value = row["value_score"]

    if antutu >= 950000 and ram >= 8 and battery >= 5000:
        return "Gaming"
    if antutu >= 900000 and ram >= 12:
        return "Performance"
    if value >= 40 and price <= 25000:
        return "Value for Money"
    if ram >= 8 and battery >= 6000:
        return "Multitasking"
    if antutu >= 850000:
        return "Performance"
    return "Value for Money"

df["category"] = df.apply(assign_category, axis=1)

# ---- Read input from Node ----
raw = sys.stdin.read().strip()
incoming = json.loads(raw) if raw else {}

category = incoming.get("category", "All")
min_price = int(incoming.get("min_price", 0))
max_price = int(incoming.get("max_price", 9999999))

# ---- Filter ----
filtered = df[(df["price"] >= min_price) & (df["price"] <= max_price)].copy()

if category.lower() != "all":
    filtered = filtered[filtered["category"].str.lower() == category.lower()]

# no results
if filtered.empty:
    print("[]")
    sys.exit(0)

# ---- Recommendation score ----
filtered["rec_score"] = (
    filtered["antutu_score"] / 1_000_000 * 40 +
    filtered["value_score"] * 30 +
    filtered["rating"].fillna(4.0) * 5 +
    filtered["battery"] / 2000
)

# top 5
top5 = filtered.nlargest(5, "rec_score")

# Select important columns
cols = [col for col in [
    "device", "name", "processor", "ram", "storage",
    "battery", "price", "antutu_score", "rating",
    "value_score", "category", "image_url", "website_url"
] if col in top5.columns]

result = top5[cols].to_dict(orient="records")

# output JSON only
print(json.dumps(result))
