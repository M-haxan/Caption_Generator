1. How to run:
From the root folder, run `npm install`, then `cd frontend && npm install`, and `cd ../backend && npm install`. 
Create a `.env` file in the `backend` folder and add `GROQ_API_KEY=your_key`. 
Finally, go back to the root folder and run `npm run dev`.

2. Stack choice:
I chose a React frontend with a Node.js/Express backend (MERN stack approach). React is excellent for building dynamic, state driven interfaces (like handling loading states and history). Node.js is used as a proxy backend to keep the Groq API key secure. 
A worse choice would be a pure "Frontend-Only" React app directly calling the Groq API. That would expose the API key in the browser's network tab, creating a major security vulnerability.

3. One real edge case:
I handled the edge case of users providing "bad input" (empty strings or just spaces). 
- **File:** `frontend/src/components/Generator.jsx`
- **Line:** Inside the `handleGenerate` function (around line 14: `if (keywords.trim().length < 3)`).
- What happens without it: If a user submits empty spaces, the app would send a blank request to the Groq API. This would waste API quota limits and return an unpredictable or confusing response from the AI, potentially breaking the UI layout. My check stops the request before it even reaches the server and shows a clear UI error.

**4. AI usage:**
- **Tool:** Google Gemini
- **What I asked:** I asked Gemini to generate the initial Vite+React component structure and the fetch logic for the Groq API. 
- **What it gave me:** It provided the base template, state hooks (`useState`), and a standard try-catch block for API calls.
- **What I changed and why:** I significantly modified the prompt logic to include the new length parameter. I also manually added the browser LocalStorage implementation to save the user's history, because the AI only provided a basic fetch wrapper, and I wanted to make the application genuinely "useful" across page reloads.

**5. Honest gap:**
Currently, the app saves the user's generated captions in the browser's `LocalStorage`. While this works for a single device, it means the user cannot access their history if they switch from their laptop to their phone. With another day, I would connect a MongoDB database to the Node.js backend and implement a simple user UUID system to store and retrieve captions permanently across different devices.