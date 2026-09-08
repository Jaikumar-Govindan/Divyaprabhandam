import sys
import json
import re

def format_adivaravu_words(words):
    """
    Pairs every two words and appends an asterisk (*).
    The very last segment will contain 3 words instead of 2.
    """
    # If we have less than 3 words total, just group them all together
    if len(words) <= 3:
        return "அடிவரவு: " + " ".join(words) + " *"

    paired_groups = []
    
    # Process all words except the last 3
    for i in range(0, len(words) - 3, 2):
        # If there's an odd number of words left before the final 3 (shouldn't happen with 11 words, but safe)
        pair = " ".join(words[i:i+2])
        paired_groups.append(f"{pair} *")
    
    # Append the last 3 words as a single segment
    last_three = " ".join(words[-3:])
    paired_groups.append(f"{last_three} *")
    
    return "அடிவரவு: " + " ".join(paired_groups)

def process_js_file(file_path):
    # 1. Read the JS file content
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
    except FileNotFoundError:
        print(f"Error: File '{file_path}' not found.")
        return

    # 2. Extract the JSON object assigned to text_bundle_ta
    match = re.search(r"const\s+text_bundle_ta\s*=\s*(\{[\s\S]*?\});", content)
    if not match:
        print("Error: Could not find 'text_bundle_ta' object in the file.")
        return

    json_str = match.group(1)

    # Clean unquoted JS keys and quotes to parse as valid JSON
    json_str_clean = re.sub(r"(['\"]?)([a-zA-Z0-9_\.]+)\1\s*:", r'"\2":', json_str)
    json_str_clean = json_str_clean.replace("'", '"')

    try:
        bundle = json.loads(json_str_clean)
    except json.JSONDecodeError as e:
        print(f"JSON Parsing Error: {e}")
        return

    # 3. Process each decade and add missing அடிவரவு
    sorted_decades = sorted(bundle.keys())

    for i, decade_key in enumerate(sorted_decades):
        steps = bundle[decade_key]

        # Check if step 11 exists
        has_adivaravu = 11 in steps or "11" in steps

        if not has_adivaravu:
            # Get first word from pasurams 1 to 10
            pasuram_keys = sorted(
                [k for k in steps.keys() if str(k).isdigit() and int(k) <= 10],
                key=lambda x: int(x),
            )
            first_words = []
            for k in pasuram_keys:
                cleaned = re.sub(r"[🙏\*\t\n\r]", "", steps[k]).strip()
                if cleaned:
                    first_words.append(cleaned.split()[0])

            # Get first word of pasuram 1 of the NEXT decade
            if i + 1 < len(sorted_decades):
                next_decade_key = sorted_decades[i + 1]
                next_first = bundle[next_decade_key].get(1) or bundle[next_decade_key].get("1")
                if next_first:
                    cleaned_next = re.sub(r"[🙏\*\t\n\r]", "", next_first).strip()
                    if cleaned_next:
                        first_words.append(cleaned_next.split()[0])

            # Format into pairing with asterisks: "word1 word2 * ... word9 word10 word11 *"
            adivaravu_text = format_adivaravu_words(first_words)
            steps["11"] = adivaravu_text

    # 4. Convert back to formatted JSON
    updated_json_str = json.dumps(bundle, ensure_ascii=False, indent=18)

    # 5. Replace original object string with updated string in the file content
    new_content = content[: match.start(1)] + updated_json_str + content[match.end(1) :]

    # 6. Save back to the JS file
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(new_content)

    print(f"Successfully processed '{file_path}' and formatted missing அடிவரவு!")

if __name__ == "__main__":
    # Takes JS file as command-line argument, defaulting to '3_ta.js'
    input_file = sys.argv[1] if len(sys.argv) > 1 else "3_ta.js"
    process_js_file(input_file)