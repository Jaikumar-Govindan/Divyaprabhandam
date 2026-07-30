import sys
def add3stars_file_asterisks(input_file_path, output_file_path):
    counter = 0
    
    # Open the source file for reading and the target file for writing
    with open(input_file_path, 'r', encoding='utf-8') as infile, \
         open(output_file_path, 'w', encoding='utf-8') as outfile:
        
        # Read the file line by line to keep memory usage low
        for line in infile:
            modified_line = []
            
            counter = 0  # Reset the counter
            starCount=line.count("*")+1 # +1 to account for the last segment after the last asterisk
            for char in line:
                if char == '*':
                    counter += 1
                    if counter == int(starCount/2): # for URM or RN
                        modified_line.append('***')
                    elif counter == starCount:
                        modified_line.append('*')
                        counter = 0  # Reset the counter
                    else:
                        modified_line.append('*')
                else:
                    modified_line.append(char)
            
            # Write the processed line directly to the output file
            outfile.write("".join(modified_line))


### For making TCV as 4 parts instead of 8
def remove_stars(input_file_path, output_file_path):
    counter = 0
    
    # Open the source file for reading and the target file for writing
    with open(input_file_path, 'r', encoding='utf-8') as infile, \
         open(output_file_path, 'w', encoding='utf-8') as outfile:
        
        # Read the file line by line to keep memory usage low
        for line in infile:
            modified_line = []
            
            counter = 0  # Reset the counter
            starCount=line.count("*")+1 # +1 to account for the last segment after the last asterisk
            for char in line:
                if char == '*':
                    counter += 1
                    if counter == 1 or counter == 3 or counter == 7 or counter == 9:
                        continue
                    else:
                        modified_line.append('*')
                else:
                    modified_line.append(char)
            
            # Write the processed line directly to the output file
            outfile.write("".join(modified_line))

# Example usage:
# Replace 'input.txt' and 'output.txt' with your actual file paths
add3stars_file_asterisks(sys.argv[1], 'output.txt')
# remove_stars(sys.argv[1], 'output.txt')

print("File processing complete.")
