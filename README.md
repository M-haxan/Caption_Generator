# AI Based Caption Generator

A full-stack (React + Node.js) application that Use the Groq API to generate platform specific social media captions based on user keywords, tone, and desired length.

# Features
 Generates captions using Groq's fast LLM model.
 Allows selection of Platform, Tone, and Length.
 Saves generated captions locally using browser LocalStorage.
 Securely proxies API requests through a Node.js backend.

## How to Set Up and Run

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/M-haxan/Caption_Generator
   cd Caption-Generator
   \`\`\`

2. Install dependencies:
   You need to install dependencies in the root, frontend, and backend folders.
   \`\`\`bash
   npm install
   cd frontend && npm install
   cd ../backend && npm install
   cd ..
   \`\`\`

3. Set up the API Key:
   Create a `.env` file inside the **`backend`** folder and add your Groq API key:
   \`\`\`env
   GROQ_API_KEY=your_actual_api_key_here
   \`\`\`

4. Run the application:
   From the **root folder**, run this single command to start both servers concurrently:
   \`\`\`bash
   npm run dev
   \`\`\`
   - Frontend will be available at: `http://localhost:5173`
   - Backend will run at: `http://localhost:5000`