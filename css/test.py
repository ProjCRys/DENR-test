# Define the file name
file_name = 'info-frame.css'

# Read the contents of the file
with open(file_name, 'r') as file:
    content = file.read()

# Replace '..' with '...'
new_content = content.replace('info_frame', 'info-frame')

# Write the updated content back to the file
with open(file_name, 'w') as file:
    file.write(new_content)

print("Replacement complete.")
