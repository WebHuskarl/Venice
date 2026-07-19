import os
import re

css_dir = r'c:\Users\USERR\Desktop\Венеция\css'

def px_to_rem(match):
    val = float(match.group(1))
    # Leave 1px and 2px and 0px (and negative 1, 2) as is, to avoid sub-pixel border issues
    if abs(val) <= 2 or val == 0:
        # Actually 0px can be just 0, but let's keep it as is
        # Or wait, if it's 1px we keep 1px.
        return f"{int(val) if val.is_integer() else val}px"
    
    rem_val = val / 10.0
    # format without trailing zero if integer
    rem_str = f"{int(rem_val)}" if rem_val.is_integer() else f"{rem_val}"
    return f"{rem_str}rem"

# regex to find px values
px_pattern = re.compile(r'(-?\d+(?:\.\d+)?)px\b')

for root, dirs, files in os.walk(css_dir):
    for file in files:
        if file.endswith('.css'):
            file_path = os.path.join(root, file)
            with open(file_path, 'r', encoding='utf-8') as f:
                lines = f.readlines()
            
            new_lines = []
            changed = False
            for line in lines:
                # Do not convert media queries
                if '@media' in line:
                    new_lines.append(line)
                    continue
                
                new_line = px_pattern.sub(px_to_rem, line)
                if new_line != line:
                    changed = True
                new_lines.append(new_line)
            
            if changed:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.writelines(new_lines)
                print(f"Converted: {os.path.relpath(file_path, css_dir)}")

print("Done converting px to rem!")
