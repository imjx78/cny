# Exact CNY Celebration - Mobile Web Application

A mobile-friendly Node.js web application for CNY celebration questionnaire.

## Features

- **Welcome Page**: Greeting with "Welcome to Exact CNY celebration" and a Start button
- **30 Question Pages**: Each with an index number, input field, and navigation buttons
- **Smart Navigation**: 
  - Page 1: Only Next button
  - Pages 2-29: Back and Next buttons
  - Page 30: Back and Finish buttons
- **Mobile Optimized**: Designed specifically for mobile web browsers
- **Answer Submission**: All 30 answers are submitted as a JSON array when Finish is pressed

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

3. Open your mobile browser and navigate to:
```
http://localhost:3000
```

## Project Structure

```
CNY/Submission/
├── server.js           # Express server
├── package.json        # Dependencies
└── public/
    ├── index.html      # Main HTML page
    ├── styles.css      # Mobile-optimized styles
    └── app.js          # Client-side application logic
```

## How It Works

1. User starts on the welcome page
2. Clicks "Start" to begin the questionnaire
3. Navigates through 30 pages, filling in answers
4. Can go back and forth to review/change answers
5. On page 30, clicks "Finish" to submit all answers
6. Answers are sent to the server via POST request to `/submit`
7. Server receives a JSON array with all 30 answers

## API Endpoint

**POST /submit**
- Request body: `{ "answers": ["answer1", "answer2", ..., "answer30"] }`
- Response: `{ "success": true, "message": "...", "data": [...] }`

## Mobile Features

- Touch-friendly buttons
- Responsive design
- No zoom on input focus
- Optimized for portrait orientation
- Smooth transitions between pages
