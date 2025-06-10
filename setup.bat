@echo off
echo Setting up the personal website project...

REM Install Bun globally if not already installed
REM Uncomment the line below if you don't have Bun installed
REM npm install -g bun

REM Install dependencies at the root level
echo Installing root dependencies...
call bun install

REM Build the packages in order
echo Building shared packages...
cd packages\config
call bun run build
cd ..\utils
call bun run build
cd ..\content
call bun run build
cd ..\ui
call bun run build

REM Return to the root directory
cd ..\..\

REM Run the development server
echo Starting the development server...
call bun dev

echo Setup complete! The website is now running at http://localhost:3000