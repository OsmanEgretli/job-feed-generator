# Job Feed Generator

An Electron application for generating job feeds with customizable locations and job titles.

---

## Table of Contents
1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Installation and Setup](#installation-and-setup)
4. [Running the Application](#running-the-application)
5. [Building the Application](#building-the-application)
6. [Project Structure](#project-structure)
7. [Configuration Files](#configuration-files)
8. [Environment Variables](#environment-variables)
9. [Security Notes](#security-notes)
10. [Development Notes](#development-notes)
11. [Troubleshooting](#troubleshooting)
12. [License](#license)

---

## Overview
The **Job Feed Generator** is an Electron-based desktop application designed to simplify the creation of job feeds with customizable options. It supports both macOS and Linux platforms, providing a user-friendly interface and robust build configurations.

---

## Prerequisites
Ensure the following are installed:
- **Node.js** and **npm**
- **Git**
- A **GitHub account** with a personal access token

---

## Installation and Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/job-feed-generator.git
cd job-feed-generator
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory and add your GitHub token:
```plaintext
GITHUB_TOKEN=your_github_token_here
```

---

## Running the Application
To start the application in development mode:
```bash
npm start
```

---

## Building the Application

### Build Commands
- **Current platform**: 
  ```bash
  npm run make
  ```
- **macOS only**: 
  ```bash
  npm run make:mac
  ```
- **Linux only**: 
  ```bash
  npm run make:linux
  ```
- **All platforms**: 
  ```bash
  npm run make:all
  ```

### Platform-Specific Requirements

#### Linux Dependencies
Install required libraries:
```bash
sudo apt-get install libgconf-2-4 libgtk-3-0 libnotify4 libnss3 libxss1 libxtst6 xdg-utils
```

#### macOS Requirements
- A macOS system is needed for building macOS packages.
- Install Xcode Command Line Tools.

---

## Project Structure
```plaintext
job-feed-generator/
├── assets/           # Application icons
│   ├── icon.icns     # macOS icon
│   └── icon.png      # Linux icon
├── src/              # Source code
├── .env              # Environment variables (create this file)
├── main.js           # Main Electron process
├── renderer.js       # Renderer process
└── index.html        # Main application window
```

---

## Configuration Files

### `forge.config.js`
Defines build configurations:
- **macOS (darwin)**: Uses `.icns` icon
- **Linux**: Uses `.png` icon
- Supports DEB, RPM, and ZIP package formats

### `package.json`
Key scripts:
- **Start application**: `npm start`
- **Clean build files**: `npm run clean`
- **Build packages**: `npm run make`, `npm run make:mac`, `npm run make:linux`, `npm run make:all`

---

## Environment Variables
Add your GitHub token in a `.env` file:
```plaintext
GITHUB_TOKEN=your_github_token_here
```

---

## Security Notes
- Avoid committing your `.env` file to version control.
- Keep your GitHub token secure.
- Sensitive files are excluded in `.gitignore`.

---

## Development Notes
- Built with **Electron Forge**.
- Supports **macOS** and **Linux** platforms.
- Uses **asar** for packaging.
- Implements security features via **Electron Fuses**.

---

## Troubleshooting

### Linux Issues
If you encounter permission issues:
```bash
sudo chown -R $USER:$USER ~/.npm
sudo chown -R $USER:$USER ~/.config
```

### Build Issues
- Verify dependencies are installed.
- Check platform compatibility.
- Ensure icon files exist in the `assets/` directory.

---

## License
[Add your license information here]
