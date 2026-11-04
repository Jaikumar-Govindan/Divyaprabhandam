from io import BytesIO
import re
import sys
import requests
from pypdf import PdfReader


def extract_and_save_pdf(url, output_txt_path="acharya_raw_text.txt"):
  print(f"\nDownloading PDF from: {url}")
  try:
    response = requests.get(url)
    response.raise_for_status()
  except Exception as e:
    print(f"[ERROR] Failed to download PDF: {e}")
    return None

  pdf_file = BytesIO(response.content)
  reader = PdfReader(pdf_file)

  full_text = ""
  for page_num, page in enumerate(reader.pages):
    text = page.extract_text()
    if text:
      full_text += text + "\n"

  # Step 1: Extract text to a file
  with open(output_txt_path, "w", encoding="utf-8") as f:
    f.write(full_text)
  print(f"[INFO] Step 1 complete: Raw text saved to '{output_txt_path}'")

  return full_text


def process_acharya_text(raw_text):
  # Step 1.1: Filter only lines that contain '*', 'adivaravu', or a number
  lines = raw_text.splitlines()
  filtered_lines = []
  for line in lines:
    stripped = line.strip()
    if not stripped:
      continue
    has_star = "*" in stripped
    has_adivaravu = "adivaravu" in stripped.lower()
    has_number = bool(re.search(r"\d", stripped))

    if has_star or has_adivaravu or has_number:
      filtered_lines.append(stripped)

  # Step 2: Remove all newlines (flattening filtered lines into one continuous string)
  flat_text = " ".join(filtered_lines)

  # Separate aDivaravu section from the main pasurams
  adivaravu_part = ""
  adivaravu_match = re.search(r"(aDivaravu:.*?)(?:thirumanggaiyAzhvAr|\Z)", flat_text, re.IGNORECASE)
  if adivaravu_match:
    adivaravu_part = adivaravu_match.group(1).strip()
    flat_text = flat_text[: adivaravu_match.start()].strip()

  # Step 3: Find numbers (1 or 2 digits) and split/insert newlines (chunks)
  pattern = r"(.*?)(?:\s+([1-9]|10|11|12))\b"
  chunks = re.findall(pattern, flat_text)

  processed_output = []
  max_num = 0

  for idx, (text_chunk, num_str) in enumerate(chunks, start=1):
    num = int(num_str)
    if num > max_num:
      max_num = num

    cleaned_text = text_chunk.strip()

    # Step 7: Replace '**' at the beginning of text with 🙏
    if cleaned_text.startswith("**"):
      cleaned_text = "🙏" + cleaned_text[2:]

    # Step 8: Replace any other '**' with '***'
    cleaned_text = cleaned_text.replace("**", "***")

    # Step 4 & 5: Move number to beginning, add colon, enclose text in quotes, add trailing comma
    formatted_line = f'{num}: "{cleaned_text}",'
    processed_output.append(formatted_line)

  # Step 6 & 9: Handle aDivaravu text (assigned number = max_num + 1, e.g., 11)
  if adivaravu_part:
    adivaravu_num = max_num + 1 if max_num > 0 else 11

    # Clean up excessive spaces in adivaravu
    adivaravu_clean = " ".join(adivaravu_part.split())

    # Step 9: In aDivaravu, for every two words add a '*' if it's not already there
    words = adivaravu_clean.split()
    new_words = []
    for i, word in enumerate(words):
      new_words.append(word)
      if (i + 1) % 2 == 0 and i < len(words) - 1:
        if words[i + 1] != "*":
          new_words.append("*")
    
    adivaravu_formatted = " ".join(new_words)

    # Apply steps 7 and 8 to adivaravu as well
    if adivaravu_formatted.startswith("**"):
      adivaravu_formatted = "🙏" + adivaravu_formatted[2:]
    adivaravu_formatted = adivaravu_formatted.replace("**", "***")

    # Format adivaravu line
    adivaravu_line = f'{adivaravu_num}: "{adivaravu_formatted}",'
    processed_output.append(adivaravu_line)

  return processed_output


if __name__ == "__main__":
  if len(sys.argv) > 1:
    target_url = sys.argv[1]
  else:
    target_url = input("Enter the Acharya PDF link (or press Enter for default): ").strip()
    if not target_url:
      target_url = "https://acharya.org/dp/v3/2/01-perith20/1588-tk-en.pdf"

  # Run Step 1
  raw_text = extract_and_save_pdf(target_url, "acharya_raw_text.txt")

  if raw_text:
    # Run Steps 1.1 through 9
    results = process_acharya_text(raw_text)

    print(f"\n--- Processed Output ({len(results)} items) ---")
    for res in results:
      print(res)

    # Save final output
    with open("final_processed_output.txt", "w", encoding="utf-8") as out_f:
      for res in results:
        out_f.write(res + "\n")
    print("\n[INFO] Final output successfully saved to 'final_processed_output.txt'.")
  else:
    print("Processing failed.")