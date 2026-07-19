import os
import re

base_dir = r'c:\Users\USERR\Desktop\Венеция'
index_file = os.path.join(base_dir, 'index.html')
css_dir = os.path.join(base_dir, 'css')

def update_content(content):
    # 1. Update PNG/JPG to WEBP
    content = re.sub(r'([\'"\(])(.*?)(/?images/)([\w\-\s]+)\.(png|jpg|jpeg)([\'"\)])', r'\1\2\3photos/\4.webp\6', content)
    # 2. Update WEBP paths
    content = re.sub(r'([\'"\(])(.*?)(/?images/)([\w\-\s]+)\.webp([\'"\)])', r'\1\2\3photos/\4.webp\5', content)
    # 3. Update SVG paths
    content = re.sub(r'([\'"\(])(.*?)(/?images/)([\w\-\s]+)\.svg([\'"\)])', r'\1\2\3icons/\4.svg\5', content)
    return content

# Process index.html
with open(index_file, 'r', encoding='utf-8') as f:
    html = f.read()
new_html = update_content(html)
with open(index_file, 'w', encoding='utf-8') as f:
    f.write(new_html)
print('Updated index.html')

# Process CSS files
for root, dirs, files in os.walk(css_dir):
    for file in files:
        if file.endswith('.css'):
            file_path = os.path.join(root, file)
            with open(file_path, 'r', encoding='utf-8') as f:
                css = f.read()
            new_css = update_content(css)
            if new_css != css:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_css)
                print(f'Updated {os.path.relpath(file_path, base_dir)}')
print('Done!')
