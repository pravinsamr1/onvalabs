import re

with open('basic-web-development.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix the breadcrumb height
content = content.replace('<div class="ttm-page-title-row ttm-textcolor-white">', 
                          '<div class="ttm-page-title-row ttm-textcolor-white" style="min-height: 400px !important;">')

# Ensure body doesn't overflow horizontally
if '<style id="custom-overflow">' not in content:
    head_end = content.find('</head>')
    if head_end != -1:
        content = content[:head_end] + '    <style id="custom-overflow">body { overflow-x: hidden; }</style>\n' + content[head_end:]

with open('basic-web-development.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Applied fixes")
