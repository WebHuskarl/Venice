import os
from bs4 import BeautifulSoup

base_dir = r'c:\Users\USERR\Desktop\Венеция'
index_file = os.path.join(base_dir, 'index.html')

with open(index_file, 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')

changed = False

# Add alt to images
for img in soup.find_all('img'):
    if not img.get('alt'):
        src = img.get('src', '')
        # derive alt from filename if possible
        filename = os.path.basename(src).split('.')[0]
        img['alt'] = filename.replace('_', ' ').replace('-', ' ').title() if filename else 'Изображение'
        changed = True
        print(f"Added alt='{img['alt']}' to img {src}")

# Add aria-label to empty buttons
for btn in soup.find_all('button'):
    text = btn.get_text(strip=True)
    if not text and not btn.find('svg') and not btn.get('aria-label'):
        # Check if it has an SVG child that serves as icon or is just empty (like burger menu)
        btn['aria-label'] = "Кнопка"
        changed = True
        print(f"Added aria-label to button {btn.get('class')}")
        
    if not text and not btn.get('aria-label') and btn.find('svg'):
        btn['aria-label'] = "Иконка"
        changed = True
        print(f"Added aria-label to icon button {btn.get('class')}")

# Specifically check Burger Menu and Slider nav arrows
burger = soup.find('button', class_='header__burger')
if burger and not burger.get('aria-label'):
    burger['aria-label'] = 'Открыть меню'
    changed = True
    print("Added aria-label to burger menu")

for slider_btn in soup.find_all('button', class_='reviews__nav-btn'):
    if not slider_btn.get('aria-label'):
        direction = 'следующий' if 'next' in slider_btn.get('class', []) else 'предыдущий'
        slider_btn['aria-label'] = f"{direction} слайд"
        changed = True
        print("Added aria-label to slider button")

# Add tabindex=0 to anything interactive that isn't naturally focusable
# e.g., custom dropdowns, but here they are buttons/a mostly.

if changed:
    # Use formatter to prevent messed up tags
    with open(index_file, 'w', encoding='utf-8') as f:
        f.write(str(soup))
    print('Updated index.html with a11y attributes')
else:
    print('No changes needed for a11y attributes')
