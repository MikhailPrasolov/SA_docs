import re
import sys

# Функция проверки мата (скопирована из check_obscene.py)
obscene_patterns = [
    r'\bху[йеёяюи]\w*',
    r'\bпизд\w*',
    r'\bеб[аёуы]\w*',
    r'\bёб\w*',
    r'\bбля\w*',
    r'\bсук[аи]\w*',
    r'\bмуд[оа]\w*',
    r'\bгандон\w*',
    r'\bпидор\w*',
    r'\bдебил\w*',
    r'\bдолбо[ёе]б\w*',
    r'\bурод\w*',
    r'\bшлюх\w*',
    r'\bговн\w*',
    r'\bдерьм\w*',
    r'\bзалуп\w*',
    r'\bебл\w*',
    r'\bчмо\w*',
    r'\bсрак\w*',
    r'\bсос[аи]\w*',
    r'\bвыеб\w*',
    r'\bперееб\w*',
    r'\bdроч\w*',
    r'\bманда\w*',
    r'\bхер\w*',
    r'\bхрен\w*',
    r'\bбл[яэ]д\w*',
    r'\bп[ие]зд\w*',
    r'\bсучк\w*',
    r'\bг[оа]вн\w*',
    r'\bд[еи]р[ьи]м\w*',
    # Дополнительные паттерны
    r'\bср[аоу]\w*',      # срать, обосрался, сру
    r'\bдрист\w*',        # дрист, дристать
    r'\bмудак\w*',        # мудак
    r'\bмудил\w*',        # мудила
    r'\bп[ие]д[оа]р\w*', # педор, пидар
    r'\bхерн\w*',         # херня
    r'\bхрен\w*',         # хрен (эвфемизм)
    r'\bбл[яэ]\w*',       # бля, бле
    r'\bг[оа]вн\w*',      # говно, гавно
    r'\bд[еи]р[ьи]м\w*', # дерьмо, дирьмо
    r'\bзалуп\w*',        # залупа
    r'\bманда\w*',        # манда
    r'\bчлен\w*',         # член (может быть не мат, но часто оскорбительно)
    r'\bсиськ\w*',        # сиськи (вульгарно)
    r'\bжоп\w*',          # жопа
    r'\bпоп[ае]\w*',      # попа
    r'\bанус\w*',         # анус
    r'\bсекс\w*',         # секс (не мат, но может быть в контексте)
    # Оскорбительные выражения
    r'\bтуп[оаы]\w*',     # тупой, тупая
    r'\bидиот\w*',        # идиот
    r'\bдаун\w*',         # даун
    r'\bкретин\w*',       # кретин
    r'\bморал\w*',        # моральный урод (но может быть false positive)
]

patterns = [re.compile(p, re.IGNORECASE | re.UNICODE) for p in obscene_patterns]

def contains_obscene(text):
    for pattern in patterns:
        if pattern.search(text):
            return True
    return False

def process_file(input_path, output_path):
    """Читает исходный файл, добавляет колонку obscene и записывает в новый файл."""
    with open(input_path, 'r', encoding='utf-8-sig') as infile:
        lines = infile.readlines()
    
    # Обрабатываем строки: пропускаем строки, которые состоят только из кавычки
    # Собираем комментарии
    comments = []
    for line in lines:
        stripped = line.strip()
        if stripped == '"':
            continue  # пропускаем строки-разделители
        if stripped.startswith('"'):
            # Убираем начальную кавычку и возможные пробелы
            comment = stripped[1:].strip()
            # Также убираем закрывающую кавычку, если есть в конце
            if comment.endswith('"'):
                comment = comment[:-1].strip()
            comments.append(comment)
        else:
            # Строка без кавычки (например, заголовок)
            comments.append(stripped)
    
    # Теперь comments содержит заголовок и все комментарии
    # Проверяем, что первая строка - заголовок "comment"
    if comments[0] != 'comment':
        print('Предупреждение: первая строка не "comment"')
    
    # Открываем выходной файл для записи
    with open(output_path, 'w', encoding='utf-8', newline='') as outfile:
        # Записываем заголовок с новой колонкой
        outfile.write('comment,obscene\n')
        # Обрабатываем каждый комментарий, начиная со второго элемента (первый - заголовок)
        for comment in comments[1:]:
            # Определяем, содержит ли комментарий мат
            has_obscene = contains_obscene(comment)
            obscene_label = 'yes' if has_obscene else 'no'
            # Экранируем запятые и кавычки в комментарии для CSV
            # Просто обернём комментарий в кавычки, если он содержит запятую или кавычку
            if ',' in comment or '"' in comment:
                # Заменяем двойные кавычки на две двойные кавычки
                comment_escaped = comment.replace('"', '""')
                outfile.write(f'"{comment_escaped}",{obscene_label}\n')
            else:
                outfile.write(f'{comment},{obscene_label}\n')
    
    print(f'Обработано {len(comments)-1} комментариев. Результат записан в {output_path}')

if __name__ == '__main__':
    input_file = r"C:\Users\user\Desktop\GIT\SA_docs\Project_obscence\obscene.csv"
    output_file = r"C:\Users\user\Desktop\GIT\SA_docs\Project_obscence\obscene_with_flag_old.csv"

    process_file(input_file, output_file)