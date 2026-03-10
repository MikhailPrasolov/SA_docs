import re
import csv
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

# ------------------------------------------------
# загрузка ML модели
# ------------------------------------------------

MODEL_NAME = "cointegrated/rubert-tiny-toxicity"

tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForSequenceClassification.from_pretrained(MODEL_NAME)

model.eval()

# ------------------------------------------------
# таблица замен
# ------------------------------------------------

char_map = str.maketrans({
    "a": "а","e": "е","o": "о","p": "р",
    "c": "с","y": "у","x": "х","k": "к",
    "b": "в","m": "м","t": "т","h": "н",

    "0": "о","1": "и","3": "е","4": "а","6": "б",

    "@": "а","$": "с"
})

# ------------------------------------------------
# нормализация
# ------------------------------------------------

def normalize(text):

    text = text.lower()
    text = text.translate(char_map)

    text = re.sub(r"[\*\_\-\.\,]", "", text)
    text = re.sub(r"(.)\1{2,}", r"\1\1", text)

    return text


# ------------------------------------------------
# regex словарь
# ------------------------------------------------

toxic_roots = [
    "хуй","пизд","еб","бля","сука","муд",
    "гандон","пидор","залуп","дроч","манда",
    "идиот","дебил","долбоеб","кретин",
    "мудак","мудила","урод","чмо","даун","туп"
]

regex_list = [
    re.compile(rf"\b{root}\w*", re.IGNORECASE)
    for root in toxic_roots
]

# ------------------------------------------------
# ML детектор
# ------------------------------------------------

def ml_detect(text):

    inputs = tokenizer(
        text,
        return_tensors="pt",
        truncation=True,
        padding=True,
        max_length=128
    )

    with torch.no_grad():
        outputs = model(**inputs)

    probs = torch.softmax(outputs.logits, dim=1)

    toxicity = probs[0][1].item()

    return toxicity > 0.6


# ------------------------------------------------
# основной детектор
# ------------------------------------------------

def contains_toxic(text):

    normalized = normalize(text)

    # уровень 1 — regex
    for r in regex_list:
        if r.search(normalized):
            return True

    # уровень 2 — ML
    return ml_detect(text)


# ------------------------------------------------
# обработка CSV (исходный формат с двухстрочными записями)
# ------------------------------------------------

def process_file(input_path, output_path):
    rows = []
    
    with open(input_path, encoding='utf-8-sig') as f:
        lines = f.readlines()
    
    i = 0
    while i < len(lines):
        line = lines[i].strip()
        # Пропускаем пустые строки
        if not line:
            i += 1
            continue
        # Пропускаем заголовок "comment"
        if line == "comment":
            i += 1
            continue
        # Если строка начинается с кавычки, это комментарий
        if line.startswith('"'):
            comment = line
            # Убираем обрамляющие кавычки
            if comment.startswith('"') and comment.endswith('"'):
                comment = comment[1:-1]
            # Если после удаления кавычек строка пустая (строка-разделитель), пропускаем
            if not comment:
                i += 1
                continue
            # Добавляем в результат
            toxic = contains_toxic(comment)
            rows.append({
                "comment": comment,
                "obscene": "yes" if toxic else "no"
            })
            i += 1
        else:
            i += 1
    
    with open(output_path, "w", encoding="utf-8", newline="") as outfile:
        writer = csv.DictWriter(
            outfile,
            fieldnames=["comment", "obscene"]
        )
        writer.writeheader()
        for row in rows:
            writer.writerow(row)
    
    print("Обработано:", len(rows))


# ------------------------------------------------

if __name__ == "__main__":

    input_file = r"C:\Users\user\Desktop\GIT\SA_docs\Project_obscence\obscene.csv"

    output_file = r"C:\Users\user\Desktop\GIT\SA_docs\Project_obscence\obscene_with_flag_AI.csv"

    process_file(input_file, output_file)