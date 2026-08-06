import re
import glob

html_files = glob.glob('*.html')

pattern = re.compile(r'<button type="submit".*?Sign Up Now</button>', re.DOTALL)

replacement = """<button type="submit" class="ttm-btn" style="width: 100%; border-radius: 8px; text-align: center; margin-top: 5px; font-weight: 600; letter-spacing: 0.5px; background-color: var(--theme-primary-color); color: #fff; border: none; padding: 12px 20px; display: block; cursor: pointer; transition: background-color 0.3s ease;" onmouseover="this.style.backgroundColor='#1a2f5e'" onmouseout="this.style.backgroundColor='var(--theme-primary-color)'">Sign Up Now</button>"""

for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if pattern.search(content):
        new_content = pattern.sub(replacement, content)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

