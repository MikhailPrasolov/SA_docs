import csv
import pandas as pd
from collections import defaultdict
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.metrics import confusion_matrix, classification_report
import numpy as np
import os

def load_csv_file(filepath):
    """Загружает CSV файл и возвращает словарь {комментарий: метка}"""
    data = {}
    try:
        with open(filepath, 'r', encoding='utf-8-sig') as f:
            reader = csv.DictReader(f)
            for row in reader:
                comment = row['comment']
                label = row['obscene'].strip().lower()
                data[comment] = label
    except UnicodeDecodeError:
        # Попробуем другую кодировку
        with open(filepath, 'r', encoding='cp1251') as f:
            reader = csv.DictReader(f)
            for row in reader:
                comment = row['comment']
                label = row['obscene'].strip().lower()
                data[comment] = label
    return data

def compare_models():
    """Сравнивает результаты трех моделей и генерирует отчет"""
    
    # Пути к файлам
    files = {
        'GPT5': 'obscene_with_flag.csv',
        'DeepSeek': 'obscene_with_flag_old.csv', 
        'AI_Agent': 'obscene_with_flag_AI.csv'
    }
    
    # Загружаем данные
    print("Загрузка данных...")
    models_data = {}
    for model_name, filename in files.items():
        filepath = os.path.join(os.path.dirname(__file__), filename)
        if os.path.exists(filepath):
            models_data[model_name] = load_csv_file(filepath)
            print(f"  {model_name}: загружено {len(models_data[model_name])} записей")
        else:
            print(f"  {model_name}: файл {filename} не найден")
            models_data[model_name] = {}
    
    # Находим общие комментарии (пересечение всех трех наборов)
    all_comments = set()
    for data in models_data.values():
        all_comments.update(data.keys())
    
    # Для корректного сравнения нужны комментарии, присутствующие во всех трех файлах
    common_comments = all_comments.copy()
    for model_name, data in models_data.items():
        common_comments = common_comments.intersection(data.keys())
    
    print(f"\nОбщие комментарии (присутствуют во всех файлах): {len(common_comments)}")
    
    if len(common_comments) == 0:
        print("Нет общих комментариев для сравнения. Возможно, файлы имеют разную структуру.")
        return
    
    # Создаем таблицу сравнения
    comparison = []
    for comment in list(common_comments)[:10]:  # Для отладки покажем первые 10
        row = {'comment': comment}
        for model_name in files.keys():
            row[model_name] = models_data[model_name].get(comment, 'N/A')
        comparison.append(row)
    
    # Статистика по каждой модели
    print("\n" + "="*80)
    print("СТАТИСТИКА ПО МОДЕЛЯМ")
    print("="*80)
    
    for model_name in files.keys():
        data = models_data[model_name]
        if not data:
            continue
            
        yes_count = sum(1 for label in data.values() if label == 'yes')
        no_count = sum(1 for label in data.values() if label == 'no')
        total = len(data)
        
        if total > 0:
            yes_pct = (yes_count / total) * 100
            print(f"\n{model_name}:")
            print(f"  Всего комментариев: {total}")
            print(f"  С матом (yes): {yes_count} ({yes_pct:.2f}%)")
            print(f"  Без мата (no): {no_count} ({100 - yes_pct:.2f}%)")
    
    # Сравнение попарно
    print("\n" + "="*80)
    print("СРАВНЕНИЕ МОДЕЛЕЙ (на общих комментариях)")
    print("="*80)
    
    if len(common_comments) > 0:
        model_names = list(files.keys())
        
        # Создаем матрицы сравнения
        for i in range(len(model_names)):
            for j in range(i+1, len(model_names)):
                model_a = model_names[i]
                model_b = model_names[j]
                
                # Подсчет совпадений
                matches = 0
                total_compared = 0
                
                for comment in common_comments:
                    label_a = models_data[model_a].get(comment)
                    label_b = models_data[model_b].get(comment)
                    
                    if label_a and label_b:
                        total_compared += 1
                        if label_a == label_b:
                            matches += 1
                
                if total_compared > 0:
                    agreement = (matches / total_compared) * 100
                    print(f"\n{model_a} vs {model_b}:")
                    print(f"  Совпадающих классификаций: {matches} из {total_compared} ({agreement:.2f}%)")
                    
                    # Матрица ошибок
                    y_true = []
                    y_pred = []
                    
                    for comment in common_comments:
                        label_a = models_data[model_a].get(comment)
                        label_b = models_data[model_b].get(comment)
                        
                        if label_a and label_b:
                            y_true.append(1 if label_a == 'yes' else 0)
                            y_pred.append(1 if label_b == 'yes' else 0)
                    
                    if y_true and y_pred:
                        tn, fp, fn, tp = confusion_matrix(y_true, y_pred).ravel()
                        print(f"  Матрица ошибок (A как истина, B как предсказание):")
                        print(f"    True Negative (оба no): {tn}")
                        print(f"    False Positive (A: no, B: yes): {fp}")
                        print(f"    False Negative (A: yes, B: no): {fn}")
                        print(f"    True Positive (оба yes): {tp}")
        
        # Консенсус всех трех моделей
        print("\n" + "="*80)
        print("КОНСЕНСУС ВСЕХ ТРЕХ МОДЕЛЕЙ")
        print("="*80)
        
        consensus_counts = defaultdict(int)
        for comment in common_comments:
            labels = [models_data[model].get(comment) for model in model_names]
            if all(label == 'yes' for label in labels):
                consensus_counts['all_yes'] += 1
            elif all(label == 'no' for label in labels):
                consensus_counts['all_no'] += 1
            else:
                consensus_counts['disagreement'] += 1
        
        total_consensus = len(common_comments)
        print(f"Полное согласие (все yes): {consensus_counts['all_yes']} ({consensus_counts['all_yes']/total_consensus*100:.2f}%)")
        print(f"Полное согласие (все no): {consensus_counts['all_no']} ({consensus_counts['all_no']/total_consensus*100:.2f}%)")
        print(f"Разногласия (хотя бы одна модель отличается): {consensus_counts['disagreement']} ({consensus_counts['disagreement']/total_consensus*100:.2f}%)")
        
        # Примеры разногласий
        print("\nПримеры разногласий (первые 5):")
        examples_shown = 0
        for comment in common_comments:
            if examples_shown >= 5:
                break
                
            labels = {model: models_data[model].get(comment) for model in model_names}
            if len(set(labels.values())) > 1:  # Есть разногласие
                print(f"\nКомментарий: {comment[:100]}...")
                for model, label in labels.items():
                    print(f"  {model}: {label}")
                examples_shown += 1
    
    # Генерация отчета в файл
    generate_report(models_data, common_comments, files)
    
    print("\n" + "="*80)
    print("Отчет сохранен в файл comparison_report.txt")
    print("="*80)

def generate_report(models_data, common_comments, files):
    """Генерирует текстовый отчет с результатами сравнения"""
    
    report_lines = []
    report_lines.append("="*80)
    report_lines.append("ОТЧЕТ СРАВНЕНИЯ ТРЕХ МОДЕЛЕЙ ДЕТЕКЦИИ МАТА")
    report_lines.append("="*80)
    report_lines.append(f"Дата генерации: {pd.Timestamp.now().strftime('%Y-%m-%d %H:%M:%S')}")
    report_lines.append("")
    
    # Статистика по моделям
    report_lines.append("СТАТИСТИКА ПО МОДЕЛЯМ:")
    report_lines.append("-"*40)
    
    for model_name in files.keys():
        data = models_data[model_name]
        if not data:
            continue
            
        yes_count = sum(1 for label in data.values() if label == 'yes')
        no_count = sum(1 for label in data.values() if label == 'no')
        total = len(data)
        
        if total > 0:
            yes_pct = (yes_count / total) * 100
            report_lines.append(f"{model_name}:")
            report_lines.append(f"  Всего комментариев: {total}")
            report_lines.append(f"  С матом (yes): {yes_count} ({yes_pct:.2f}%)")
            report_lines.append(f"  Без мата (no): {no_count} ({100 - yes_pct:.2f}%)")
            report_lines.append("")
    
    # Сравнение на общих комментариях
    if len(common_comments) > 0:
        report_lines.append("")
        report_lines.append("СРАВНЕНИЕ НА ОБЩИХ КОММЕНТАРИЯХ:")
        report_lines.append(f"Количество общих комментариев: {len(common_comments)}")
        report_lines.append("-"*40)
        
        model_names = list(files.keys())
        
        # Попарное сравнение
        for i in range(len(model_names)):
            for j in range(i+1, len(model_names)):
                model_a = model_names[i]
                model_b = model_names[j]
                
                matches = 0
                total_compared = 0
                
                for comment in common_comments:
                    label_a = models_data[model_a].get(comment)
                    label_b = models_data[model_b].get(comment)
                    
                    if label_a and label_b:
                        total_compared += 1
                        if label_a == label_b:
                            matches += 1
                
                if total_compared > 0:
                    agreement = (matches / total_compared) * 100
                    report_lines.append(f"\n{model_a} vs {model_b}:")
                    report_lines.append(f"  Совпадений: {matches}/{total_compared} ({agreement:.2f}%)")
        
        # Консенсус
        report_lines.append("\n")
        report_lines.append("КОНСЕНСУС ВСЕХ ТРЕХ МОДЕЛЕЙ:")
        report_lines.append("-"*40)
        
        consensus_counts = defaultdict(int)
        for comment in common_comments:
            labels = [models_data[model].get(comment) for model in model_names]
            if all(label == 'yes' for label in labels):
                consensus_counts['all_yes'] += 1
            elif all(label == 'no' for label in labels):
                consensus_counts['all_no'] += 1
            else:
                consensus_counts['disagreement'] += 1
        
        total_consensus = len(common_comments)
        report_lines.append(f"Полное согласие (все yes): {consensus_counts['all_yes']} ({consensus_counts['all_yes']/total_consensus*100:.2f}%)")
        report_lines.append(f"Полное согласие (все no): {consensus_counts['all_no']} ({consensus_counts['all_no']/total_consensus*100:.2f}%)")
        report_lines.append(f"Разногласия: {consensus_counts['disagreement']} ({consensus_counts['disagreement']/total_consensus*100:.2f}%)")
        
        # Примеры разногласий
        report_lines.append("\nПРИМЕРЫ РАЗНОГЛАСИЙ (первые 10):")
        examples_shown = 0
        for comment in common_comments:
            if examples_shown >= 10:
                break
                
            labels = {model: models_data[model].get(comment) for model in model_names}
            if len(set(labels.values())) > 1:
                report_lines.append(f"\n{examples_shown + 1}. Комментарий: {comment[:150]}...")
                for model, label in labels.items():
                    report_lines.append(f"   {model}: {label}")
                examples_shown += 1
    
    # Запись отчета в файл
    report_path = os.path.join(os.path.dirname(__file__), 'comparison_report.txt')
    with open(report_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(report_lines))
    
    # Также создаем CSV с результатами сравнения
    if len(common_comments) > 0:
        comparison_csv = []
        for comment in common_comments:
            row = {'comment': comment}
            for model_name in files.keys():
                row[model_name] = models_data[model_name].get(comment, 'N/A')
            
            # Определяем консенсус
            labels = [models_data[model].get(comment) for model in files.keys()]
            if all(label == 'yes' for label in labels):
                row['consensus'] = 'yes'
            elif all(label == 'no' for label in labels):
                row['consensus'] = 'no'
            else:
                row['consensus'] = 'disagreement'
            
            comparison_csv.append(row)
        
        # Сохраняем как CSV
        csv_path = os.path.join(os.path.dirname(__file__), 'model_comparison.csv')
        with open(csv_path, 'w', encoding='utf-8', newline='') as f:
            fieldnames = ['comment'] + list(files.keys()) + ['consensus']
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()
            for row in comparison_csv:
                writer.writerow(row)
        
        print(f"Детальное сравнение сохранено в {csv_path}")

if __name__ == '__main__':
    print("Сравнение результатов трех моделей детекции мата")
    print("="*80)
    print("Модели:")
    print("  1. GPT5 (obscene_with_flag.csv)")
    print("  2. DeepSeek (obscene_with_flag_old.csv)")
    print("  3. AI Agent (obscene_with_flag_AI.csv)")
    print("="*80)
    
    compare_models()