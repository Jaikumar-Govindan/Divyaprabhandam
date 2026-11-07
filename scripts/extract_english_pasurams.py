from io import BytesIO
import re
import sys
import requests
from pypdf import PdfReader


def is_header_or_footer(line):
  """Identifies page headers, footers, URLs, and standard page metadata."""
  stripped = line.strip().lower()

  if not stripped:
    return True

  # Page boundary markers / URLs / boilerplate
  if any(
      marker in stripped
      for marker in [
          "nalayira divyaprabandham",
          "sri:",
          "srimathe ramanujaya nama:",
          "azhvar emberumanar jeeyar",
          "thiruvadigale sharanam",
          "http://acharya.org",
          "acharya.org",
          "page ",
      ]
  ):
    return True

  # Pure page numbers or title repeats appearing alone
  if re.match(r"^page\s+\d+$", stripped) or re.match(r"^\d+$", stripped):
    return True

  return False


def extract_and_clean_pdf(url, output_txt_path="acharya_raw_text.txt"):
  print(f"\nDownloading PDF from: {url}")
  try:
    response = requests.get(url)
    response.raise_for_status()
  except Exception as e:
    print(f"[ERROR] Failed to download PDF: {e}")
    return None

  pdf_file = BytesIO(response.content)
  reader = PdfReader(pdf_file)

  all_lines = []

  # Page-by-page extraction with footer/header removal
  for page in reader.pages:
    text = page.extract_text()
    if not text:
      continue

    for line in text.splitlines():
      if not is_header_or_footer(line):
        all_lines.append(line.strip())

  full_text = "\n".join(all_lines)

  with open(output_txt_path, "w", encoding="utf-8") as f:
    f.write(full_text)
  print(f"[INFO] Raw text extracted and stripped of page footers: '{output_txt_path}'")

  return full_text


def process_acharya_text(raw_text):
  # Flatten continuous lines into a single string while maintaining single spaces
  flat_text = " ".join(raw_text.splitlines())

  # Extract aDivaravu section if present at the end
  adivaravu_part = ""
  adivaravu_match = re.search(
      r"(aDivaravu:.*?)(?:thirumanggaiyAzhvAr|\Z)", flat_text, re.IGNORECASE
  )
  if adivaravu_match:
    adivaravu_part = adivaravu_match.group(1).strip()
    flat_text = flat_text[: adivaravu_match.start()].strip()

  # Split into pasurams using trailing number bounds (e.g. 1 to 12 or 14)
  # Uses non-greedy pattern to ensure no middle lines/phrases get dropped
  pattern = r"(.*?)\s+\b([1-9]|[1-9]\d)\b"
  matches = re.findall(pattern, flat_text)

  processed_output = []
  max_num = 0

  for idx, (text_chunk, num_str) in enumerate(matches, start=1):
    num = int(num_str)
    if num > max_num:
      max_num = num

    # Clean up whitespace
    cleaned_text = " ".join(text_chunk.split())

    # Format star symbols (** at start to 🙏, internal ** to ***)
    if cleaned_text.startswith("**"):
      cleaned_text = "🙏" + cleaned_text[2:]
    cleaned_text = cleaned_text.replace("**", "***")

    formatted_line = f'{num}: "{cleaned_text}",'
    processed_output.append(formatted_line)

  # Process aDivaravu if captured
  if adivaravu_part:
    adivaravu_num = max_num + 1
    adivaravu_clean = " ".join(adivaravu_part.split())

    words = adivaravu_clean.split()
    new_words = []
    for i, word in enumerate(words):
      new_words.append(word)
      if (i + 1) % 2 == 0 and i < len(words) - 1:
        if words[i + 1] != "*":
          new_words.append("*")

    adivaravu_formatted = " ".join(new_words)
    if adivaravu_formatted.startswith("**"):
      adivaravu_formatted = "🙏" + adivaravu_formatted[2:]
    adivaravu_formatted = adivaravu_formatted.replace("**", "***")

    adivaravu_line = f'{adivaravu_num}: "{adivaravu_formatted}",'
    processed_output.append(adivaravu_line)

  return processed_output


if __name__ == "__main__":
  if len(sys.argv) > 1:
    target_url = sys.argv[1]
  else:
    target_url = input(
        "Enter the Acharya PDF link (or press Enter for default): "
    ).strip()
    if not target_url:
      target_url = "https://acharya.org/dp/v3/2/01-perith20/1588-tk-en.pdf"

  raw_text = extract_and_clean_pdf(target_url, "acharya_raw_text.txt")

  if raw_text:
    results = process_acharya_text(raw_text)

    print(f"\n--- Processed Output ({len(results)} items) ---")
    for res in results:
      print(res)

    with open("final_processed_output.txt", "w", encoding="utf-8") as out_f:
      for res in results:
        out_f.write(res + "\n")
    print("\n[INFO] Final output saved to 'final_processed_output.txt'.")