files = []
with open('list_of_all_files.txt', 'r') as file:
    files = file.readlines()

files.remove('s.sh\n')
for file in files:
    index = 1
    lines = []
    flag = 1
    final_lines = []
    with open(file[0:-1], 'r') as source:
        lines = source.readlines()
    
    for line in lines:
        if ("radio-button-number" in line):
            if (flag == 1):
                new_line = line.replace("radio-button-number", f"radio-button-{index}")
                final_lines.append(new_line)
                flag = 2
            else:
                new_line = line.replace("radio-button-number", f"radio-button-{index}")
                final_lines.append(new_line)
                index += 1
                flag = 1
        else:
            final_lines.append(line)
            
    with open(file[0:-1], 'w') as source:
        source.writelines(final_lines)