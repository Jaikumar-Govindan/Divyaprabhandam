import re
import os
import sys  # <--- Crucial import for reading terminal arguments

def parse_javascript_file(file_path):
    """
    Reads the javascript file and parses out all objects/dictionaries.
    """
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Remove multi-line and single-line comments
    content = re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL)
    content = re.sub(r'//.*', '', content)

    block_pattern = r'[\'"]?([A-Za-z0-9_\.]+)[\'"]?\s*:\s*\{([^}]+)\}'
    blocks_found = re.findall(block_pattern, content)

    database = {}
    for block_key, block_body in blocks_found:
        verse_pattern = r'[\'"]?([^\'":\s]+)[\'"]?\s*:\s*[\'"]([^\'"]+)[\'"]'
        verses = re.findall(verse_pattern, block_body)
        
        if verses:
            database[block_key] = {}
            for v_key, v_text in verses:
                database[block_key][v_key.strip()] = v_text.strip()
                
    return database

def convert_to_trailing_format(block_key, pasurams_dict):
    """
    Converts a single selected verse map block into trailing '* index' lines.
    """
    output_lines = [f"// Format converted for context key: {block_key}"]
    adivaravu_line = None

    for key, text in pasurams_dict.items():
        if key == "அடிவரவு" or "அடிவரவு" in text or "adivaravu" in str(key).lower():
            adivaravu_line = text
            continue

        clean_text = text.strip()
        clean_text = re.sub(r'\*\s*$', '', clean_text).strip()

        if clean_text.endswith("."):
            clean_text = clean_text[:-1].strip()
            final_line = f"{clean_text} * {key}."
        else:
            final_line = f"{clean_text} * {key}"
            
        output_lines.append(final_line)

    if adivaravu_line:
        output_lines.append(f"\n{adivaravu_line}")

    return "\n\n".join(output_lines)

def main():
    # 1. Read input filename from command-line argument if provided
    # sys.argv[0] is the script name itself, sys.argv[1] is the first argument passed
    if len(sys.argv) > 1:
        input_filename = sys.argv[1]
    else:
        # Fallback default if no argument is typed in the terminal
        input_filename = "marker_pmt_ta.js"
        print(f"[Info] No argument passed. Using default file: {input_filename}")

    output_filename = "formatted_output.txt"

    if not os.path.exists(input_filename):
        print(f"Error: Target file '{input_filename}' not found in current directory path.")
        print("Usage: python process_all_pasurams.py <your_file_name.js>")
        return

    # 2. Inspect and digest the database structures
    parsed_db = parse_javascript_file(input_filename)
    available_keys = list(parsed_db.keys())

    if not available_keys:
        print(f"No valid structural step-dictionary layouts discovered in '{input_filename}'.")
        return

    # 3. Present the interactive menu
    print("\n==============================================")
    print(f" Successfully Parsed: {input_filename}")
    print("==============================================")
    print("Available keys found in this file:")
    for idx, key in enumerate(available_keys, start=1):
        print(f"  [{idx}] {key}")
    print(f"  [{len(available_keys) + 1}] ALL (Convert everything combined)")
    print("==============================================")

    user_selection = input(f"Select a number (1-{len(available_keys) + 1}): ").strip()

    final_compiled_output = []

    # 4. Evaluate choices
    if user_selection == str(len(available_keys) + 1) or user_selection.lower() == 'all':
        print("\nProcessing all keys into a unified asset layout data stream...")
        for k in available_keys:
            converted_block = convert_to_trailing_format(k, parsed_db[k])
            final_compiled_output.append(converted_block)
    else:
        try:
            sel_idx = int(user_selection) - 1
            if 0 <= sel_idx < len(available_keys):
                chosen_key = available_keys[sel_idx]
                print(f"\nProcessing single tracking context layer: {chosen_key}")
                converted_block = convert_to_trailing_format(chosen_key, parsed_db[chosen_key])
                final_compiled_output.append(converted_block)
            else:
                print("Invalid numerical selection option range. Cancelling pipeline execution.")
                return
        except ValueError:
            print("Invalid textual input code selection. Cancelling pipeline execution.")
            return

    # 5. Save output
    output_content = "\n\n// ==========================================\n\n".join(final_compiled_output)
    if os.path.exists(output_filename):
        print(f"[Overwriting] Existing file found. Replacing content in '{output_filename}'...")
        
    with open(output_filename, 'w', encoding='utf-8') as outfile:
        outfile.write(output_content + "\n")

    print(f"\nSuccess! Extraction output saved cleanly onto: {output_filename}\n")

if __name__ == "__main__":
    main()