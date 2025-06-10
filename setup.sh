#!/bin/bash

# Install Bun globally if not already installed
# Uncomment the line below if you don't have Bun installed
# npm install -g bun

echo "Setting up the personal website project..."

# Install dependencies at the root level
echo "Installing root dependencies..."
bun install

# Build the packages in order
echo "Building shared packages..."
cd packages/config && bun run build
cd ../utils && bun run build
cd ../content && bun run build
cd ../ui && bun run build

# Return to the root directory
cd ../../

# Run the development server
echo "Starting the development server..."
bun dev

echo "Setup complete! The website is now running at http://localhost:3000"