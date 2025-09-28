
🎬 Movie App
<img width="50" height="50" alt="image" src="https://github.com/user-attachments/assets/6055e3c1-299d-48a4-9cef-be8af45c1f94" />

A full-stack movie app built with React, Node.js, and Tailwind CSS. The app displays the top trending movies in Canada,  
along with over 100,000+ movies/shows with a simple search fucntion. Each movie card shows key attributes including the title, poster,
rating, original language, and the release date. 


###


🚀 Features
- Display real-time trending movies in Canada, with the top 4 ranked
- Search functionality to find movies by title
- Interactive movie cards with hover animations
- Responsive design for desktop and mobile
- Backend server that fetched API data

🛠 Tech Stack
- Frontend: React, Tailwind CSS
- Backend: Node.js, Express
- API: TMDB REST API
- Tools / Others: Git, GitHub


###


📥 Set Up
1) Clone the repository
   ``````bash
         git clone https://github.com/tanzina8/Movie-App.git
         cd Movie-App
2) Setup the backend server
   ``````bash
         cd backend
         npm install
3) Create a .env file in the backend folder
   ``````
         VITE_TMDB_API_KEY=your_api_key_here
4) Start the backend server
   ``````
         node index.js
5) Start the frontend
   ``````
         cd ../movie_app
         npm install
         npm run dev
