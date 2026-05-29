import os
import sys
import re
import json

def parse_js_array_to_json(raw_str):
    """
    Converts a raw unquoted JavaScript array string cleanly into standard JSON.
    """
    raw_str = re.sub(r'//.*', '', raw_str)
    cleaned = re.sub(r'([{,]\s*)([a-zA-Z0-9_]+)\s*:', r'\1"\2":', raw_str)
    cleaned = re.sub(r"'(.*?)'", r'"\1"', cleaned)
    cleaned = re.sub(r',\s*([\]}])', r'\1', cleaned)
    return json.loads(cleaned)

def extract_database_blocks(content):
    """
    Scans the script sequentially and uses a bracket-counting engine 
    to extract every window.MARKER_DATABASE assignment perfectly.
    """
    blocks = []
    marker_start_pattern = r"window\.MARKER_DATABASE\s*\[\s*['\"](.*?)['\"]\s*\]\s*=\s*\["
    
    for match in re.finditer(marker_start_pattern, content):
        key = match.group(1)
        start_pos = match.end() - 1
        
        bracket_count = 0
        end_pos = -1
        for i in range(start_pos, len(content)):
            char = content[i]
            if char == '[':
                bracket_count += 1
            elif char == ']':
                bracket_count -= 1
                if bracket_count == 0:
                    end_pos = i + 1
                    break
        
        if end_pos != -1:
            raw_array_string = content[start_pos:end_pos]
            blocks.append((key, raw_array_string))
            
    return blocks

def format_timeline_like_sample(payload_dict):
    """
    Formats the timelines with one step property per line, keeping 
    the list of arrays completely flat on that same line.
    """
    output = []
    output.append("window.MARKER_DATABASE = window.MARKER_DATABASE || {};\n")
    
    for key, pasurams in payload_dict.items():
        output.append(f"window.MARKER_DATABASE['{key}'] = [")
        
        pasuram_strings = []
        for item in pasurams:
            lines = []
            lines.append(f'  {{ "p": {item["p"]},')
            
            step_keys = sorted([k for k in item.keys() if k != "p"])
            for idx, k in enumerate(step_keys):
                flat_val = json.dumps(item[k]).replace(", [", ",[")
                if idx == len(step_keys) - 1:
                    lines.append(f'    "{k}": {flat_val}')
                else:
                    lines.append(f'    "{k}": {flat_val},')
                    
            lines.append("  }")
            pasuram_strings.append("\n".join(lines))
            
        output.append(",\n".join(pasuram_strings))
        output.append("];\n")
        
    return "\n".join(output)

def save_optimized_text_output(filename, payload_dict, lang_key):
    """
    Saves text translations as a compact bundle dictionary with a short runtime loop 
    to handle safe injection and merging.
    """
    with open(filename, 'w', encoding='utf-8') as f:
        f.write("window.MARKER_DATABASE = window.MARKER_DATABASE || {};\n\n")
        
        # Define a clean layout object to hold all raw key strings
        f.write(f"const text_bundle_{lang_key} = {{\n")
        
        key_blocks = []
        for key, pasurams in payload_dict.items():
            pasuram_lines = []
            for item in pasurams:
                escaped_text = json.dumps(item[lang_key], ensure_ascii=False)
                pasuram_lines.append(f"    {item['p']}: {escaped_text}")
                
            block = f"  '{key}': {{\n" + ",\n".join(pasuram_lines) + "\n  }"
            key_blocks.append(block)
            
        f.write(",\n".join(key_blocks))
        f.write("\n};\n\n")
        
        # Ultra-compact, non-destructive merging engine loop
        f.write(
            f"// Non-destructive runtime merging engine\n"
            f"for (const key in text_bundle_{lang_key}) {{\n"
            f"  window.MARKER_DATABASE[key] = window.MARKER_DATABASE[key] || [];\n"
            f"  for (const p in text_bundle_{lang_key}[key]) {{\n"
            f"    const idx = parseInt(p) - 1;\n"
            f"    window.MARKER_DATABASE[key][idx] = window.MARKER_DATABASE[key][idx] || {{ p: parseInt(p) }};\n"
            f"    window.MARKER_DATABASE[key][idx]['text'] = window.MARKER_DATABASE[key][idx]['text'] || {{}};\n"
            f"    window.MARKER_DATABASE[key][idx]['text']['{lang_key}'] = text_bundle_{lang_key}[key][p];\n"
            f"  }}\n"
            f"}}\n"
        )
            
    print(f"Generated successfully: {filename}")

def main():
    if len(sys.argv) > 1:
        input_file = sys.argv[1]
    else:
        input_file = input("Enter the input marker file name (e.g., marker_pmt.js): ").strip()

    if not os.path.exists(input_file):
        print(f"Error: File '{input_file}' not found.")
        return

    base_name, _ = os.path.splitext(input_file)
    timelines_file = f"{base_name}_timelines.js"
    en_text_file = f"{base_name}_en.js"
    ta_text_file = f"{base_name}_ta.js"

    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()

    print("Analyzing JavaScript source file layout structurally...")
    matches = extract_database_blocks(content)

    if not matches:
        print("Error: Could not isolate any database structures.")
        return

    timelines_data = {}
    en_text_data = {}
    ta_text_data = {}

    for key, raw_array_str in matches:
        try:
            parsed_array = parse_js_array_to_json(raw_array_str)
        except Exception as e:
            print(f"Skipping key '{key}' due to direct formatting conversion error: {e}")
            continue

        timelines_data[key] = []
        en_text_data[key] = []
        ta_text_data[key] = []

        for item in parsed_array:
            p_val = item.get("p")
            text_obj = item.get("text", {})

            timelines_data[key].append({
                "p": p_val,
                **{k: v for k, v in item.items() if k not in ["p", "text"]}
            })

            en_text_data[key].append({
                "p": p_val,
                "en": text_obj.get("en", "") if isinstance(text_obj, dict) else ""
            })

            ta_text_data[key].append({
                "p": p_val,
                "ta": text_obj.get("ta", "") if isinstance(text_obj, dict) else ""
            })

    print("\nExporting optimized outputs...")
    
    with open(timelines_file, 'w', encoding='utf-8') as f:
        f.write(format_timeline_like_sample(timelines_data))
    print(f"Generated successfully: {timelines_file}")

    save_optimized_text_output(en_text_file, en_text_data, "en")
    save_optimized_text_output(ta_text_file, ta_text_data, "ta")
    print("\nOptimization completed successfully!")

if __name__ == "__main__":
    main()