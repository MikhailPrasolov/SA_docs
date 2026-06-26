import re
import csv
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

# -------------------------
# ML модель
# -------------------------
MODEL_NAME = "cointegrated/rubert-tiny-toxicity"
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForSequenceClassification.from_pretrained(MODEL_NAME)
model.eval()

def ml_detect(text, threshold=0.6):
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True, max_length=128)
    with torch.no_grad():
        outputs = model(**inputs)
    probs = torch.softmax(outputs.logits, dim=1)
    return probs[0][1].item() > threshold

# -------------------------
# символы и нормализация
# -------------------------
char_map = str.maketrans({
    "a": "а","e": "е","o": "о","p": "р","c": "с","y": "у","x": "х","k": "к",
    "b": "в","m": "м","t": "т","h": "н",
    "0": "о","1": "и","3": "е","4": "а","6": "б","8": "в",
    "@": "а","$": "с"
})

def normalize(text):
    text = text.lower().translate(char_map)
    text = re.sub(r"[\*\_\-\.\,]", "", text)
    text = re.sub(r"(.)\1{2,}", r"\1\1", text)
    return text

# -------------------------
# regex корни
# -------------------------
toxic_roots = [
    "хуй","пизд","еб","бля","сука","муд","гандон","пидор","залуп","дроч","манда",
    "идиот","дебил","долбоеб","кретин","мудак","мудила","урод","чмо","даун","туп"
]

regex_list = [re.compile(rf"\b{root}\w*", re.IGNORECASE) for root in toxic_roots]

# -------------------------
# основной детектор
# -------------------------
def contains_toxic(text):
    normalized = normalize(text)

    # 1 уровень: regex
    for r in regex_list:
        if r.search(normalized):
            return True

    # 2 уровень: без пробелов (маскированный мат)
    compact = normalized.replace(" ", "")
    for root in toxic_roots:
        if root in compact:
            return True

    # 3 уровень: ML модель
    if ml_detect(text):
        return True

    return False

# -------------------------
# обработка csv
# -------------------------
def process_file(input_path, output_path):
    rows = []

    with open(input_path, encoding="utf-8") as infile:
        reader = csv.DictReader(infile)
        for row in reader:
            comment = row["comment"]
            toxic = contains_toxic(comment)
            rows.append({
                "comment": comment,
                "obscene": "yes" if toxic else "no"
            })

    with open(output_path, "w", encoding="utf-8", newline="") as outfile:
        writer = csv.DictWriter(outfile, fieldnames=["comment", "obscene"])
        writer.writeheader()
        for row in rows:
            writer.writerow(row)

    print("Обработано:", len(rows))

# -------------------------
if __name__ == "__main__":
    input_file = r"C:\Users\user\Desktop\GIT\SA_docs\Project_obscence\obscene.csv"
    output_file = r"C:\Users\user\Desktop\GIT\SA_docs\Project_obscence\obscene_with_flag.csv"
    process_file(input_file, output_file)