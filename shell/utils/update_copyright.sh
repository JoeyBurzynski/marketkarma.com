#!/usr/bin/env bash

# Function to display usage
usage() {
    echo "Usage: $0 [old_year] [new_year] [directory (optional)]"
    echo "Example: $0 2023 2024 ./website"
}

# Check if correct number of arguments is passed
if [ "$#" -lt 2 ]; then
    usage
    exit 1
fi

old_year=$1
new_year=$2
directory=${3:-.}  # Default to current directory if not provided

# Check for valid year format
if ! [[ $old_year =~ ^[0-9]{4}$ ]] || ! [[ $new_year =~ ^[0-9]{4}$ ]]; then
    echo "Error: Years must be in YYYY format."
    exit 1
fi

# Confirmation
read -p "Are you sure you want to update '&copy; $old_year' to '&copy; $new_year' in all .html files in $directory? [y/N] " confirm
if [[ $confirm != [yY] ]]; then
    echo "Operation cancelled."
    exit 1
fi

echo "Starting update process..."

# Find and replace the text in .html files
count=0
find "$directory" -type f -name '*.html' | while read -r file; do
    sed -i '' "s/&copy; $old_year/&copy; $new_year/g" "$file"
    ((count++))
    echo "Processed: $file"
done

echo "Copyright update complete. Processed $count files."
