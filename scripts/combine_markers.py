import re
import os
import sys
import json
import ast

def extract_javascript_variable_data(file_content, target_variable_name):
    """
    Locates a top-level JavaScript object assignment and extracts it 
    into a native Python dictionary using AST evaluation.
    """
    pattern = rf'(?:var|let|const\s+)?{re.escape(target_variable_name)}\s*=\s*({{.*?}});'
    match = re.search(pattern, file_content, re.DOTALL)
    if not match:
        return None
    
    raw_js_obj = match.group(1)
    raw_js_obj = re.sub(r'//.*', '', raw_js_obj)
    raw_js_obj = re.sub(r'/\*.*?\*/', '', raw_js_obj, flags=re.DOTALL)
    
    try:
        return ast.literal_eval(raw_js_obj)
    except Exception:
        return fallback_regex_parse(raw_js_obj)

def fallback_regex_parse(body_content):
    """Fallback if the block cannot be fully digested by AST parsing directly."""
    database = {}
    block_pattern = r'[\'"]?([A-Za-z0-9_\.]+)[\'"]?\s*:\s*\{([^}]+)\}'
    blocks_found = re.findall(block_pattern, body_content)
    for block_key, block_body in blocks_found:
        verse_pattern = r'[\'"]?([^\'":\s]+)[\'"]?\s*:\s*[\'"]([^\'"]+)[\'"]'
        verses = re.findall(verse_pattern, block_body)
        if verses:
            database[block_key] = {vk.strip(): vt.strip() for vk, vt in verses}
    return database

def parse_window_marker_database(file_content):
    """
    Extracts all tracking matrices assigned directly to window.MARKER_DATABASE arrays.
    """
    pattern = r"window\.MARKER_DATABASE\s*\[\s*['\"]([^'\"]+)['\"]\s*\]\s*=\s*(\[.*?\]);"
    matches = re.findall(pattern, file_content, re.DOTALL)
    
    extracted_timelines = {}
    for key, array_str in matches:
        clean_array_str = re.sub(r'//.*', '', array_str)
        try:
            extracted_timelines[key] = ast.literal_eval(clean_array_str)
        except Exception:
            continue
    return extracted_timelines

def clean_verse_text(text_string):
    """Strips runtime tracking tokens and structural normalization artifacts."""
    text_string = re.sub(r'###[^#]+###', '', text_string)
    text_string = re.sub(r'\s+', ' ', text_string)
    return text_string.strip()

def serialize_to_strict_compact_format(payload):
    """
    Custom string writer that ensures line breaks occur ONLY 
    before fields ('p', 'text', 'stepX') and structures.
    """
    lines = ["{"]
    
    chapters = sorted(payload.keys())
    for ch_idx, ch_name in enumerate(chapters):
        lines.append(f'  "{ch_name}": [')
        
        paragraphs = payload[ch_name]
        for p_idx, para in enumerate(paragraphs):
            lines.append("    {")
            lines.append(f'      "p": {para["p"]},')
            
            # Escape double-quotes inside text values safely
            escaped_text = para["text"].replace('"', '\\"')
            lines.append(f'      "text": "{escaped_text}",')
            
            # Identify timeline steps dynamically
            step_keys = sorted([k for k in para.keys() if k.startswith("step")])
            for s_idx, skey in enumerate(step_keys):
                # Force single-line string generation for the arrays
                compact_array = json.dumps(para[skey], ensure_ascii=False)
                
                # Append comma for tracking properties unless it's the final property
                trailing_comma = "," if s_idx < len(step_keys) - 1 else ""
                lines.append(f'      "{skey}": {compact_array}{trailing_comma}')
                
            # Close paragraph block
            lines.append("    }" + ("," if p_idx < len(paragraphs) - 1 else ""))
            
        # Close chapter collection block
        lines.append("  ]" + ("," if ch_idx < len(chapters) - 1 else ""))
        
    lines.append("}")
    return "\n".join(lines)

def main():
    # Support manual input overrides or default local working folder variables
    texts_filename = sys.argv[1] if len(sys.argv) > 1 else "marker_pmt_ta.js"
    timelines_filename = sys.argv[2] if len(sys.argv) > 2 else "marker_pmt_timelines.js"
    output_filename = "splitter_paragraphs_import.json"

    if not os.path.exists(texts_filename) or not os.path.exists(timelines_filename):
        print(f"❌ Error: Files missing.\nTexts: {texts_filename}\nTimelines: {timelines_filename}")
        return

    print("📥 Processing and combining source script tracks...")
    
    with open(texts_filename, 'r', encoding='utf-8') as f:
        texts_content = f.read()
    with open(timelines_filename, 'r', encoding='utf-8') as f:
        timelines_content = f.read()

    text_bundle = extract_javascript_variable_data(texts_content, 'text_bundle_ta')
    timeline_bundle = parse_window_marker_database(timelines_content)

    if not text_bundle or not timeline_bundle:
        print("❌ Error: Structural variables could not be extracted.")
        return

    available_keys = sorted([k for k in timeline_bundle.keys() if k in text_bundle])

    if not available_keys:
        print("❌ Sync Error: Keys across datasets could not be correlated.")
        return

    final_json_payload = {}

    for key in available_keys:
        chapter_clean_name = key.replace('.steps', '')
        processed_paragraphs = []
        
        verse_map = text_bundle[key]
        timeline_rows = timeline_bundle[key]

        for row in timeline_rows:
            p_idx = str(row.get('p'))
            if p_idx in verse_map or int(p_idx) in verse_map:
                raw_text = verse_map.get(p_idx) or verse_map.get(int(p_idx))
                
                paragraph_object = {
                    "p": row.get('p'),
                    "text": clean_verse_text(raw_text)
                }
                
                for field in sorted(row.keys()):
                    if field.startswith('step'):
                        paragraph_object[field] = row[field]
                        
                processed_paragraphs.append(paragraph_object)

        final_json_payload[chapter_clean_name] = processed_paragraphs

    # Run the strict custom serializer
    formatted_output_string = serialize_to_strict_compact_format(final_json_payload)

    with open(output_filename, 'w', encoding='utf-8') as json_file:
        json_file.write(formatted_output_string)

    print(f"\n=================================================")
    print(f"✅ Clean structural compilation complete!")
    print(f"👉 JSON output saved to: '{output_filename}'")
    print(f"=================================================\n")

if __name__ == "__main__":
    main()