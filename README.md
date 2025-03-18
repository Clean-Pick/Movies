# Movie App

link to the live project [here](https://moviesseeker.netlify.app/)

A modern web application built with React.js that allows users to browse and discover movies using The Great Movie
Database API.

the project look was inspired
by [this figma design](https://www.figma.com/design/jzPxr68qxAwMawMluQfopa/Movie-Streaming-App-(Community)-(Community)?node-id=0-1&p=f&t=FRLnybljYvcYLacW-0)

![React](https://img.shields.io/badge/React-v17.0.2-blue)
[![Netlify Status](https://api.netlify.com/api/v1/badges/e14f9954-2e43-46da-982b-8b75a94316c2/deploy-status)](https://app.netlify.com/sites/moviesseeker/deploys)

## Features :

- Browse popular movies with your smartphone, tablet or personal computer.
- Search for movies by title.
- View movie details such as the title, release date, rating, overview, and genres.
- Get recommendations for similar movies.

## Planned Features :

- Handle profile creation and authentication.
- Save favorite movies.
- Save movies to watch later.
- Create a watchlist.
- Create a list of watched movies.
    - Sort movies by genre, rating, release date, etc.

## Technologies Used :

| Technology                   | Purpose                                              |
|------------------------------|------------------------------------------------------|
| React.js (Vite.js)           | JavaScript Framework for building the interactive UI |
| React Router                 | For routing and navigation                           |
| The Great Movie Database API | Provides movie data for the app                      |
| Motion.dev                   | For animations                                       |
| Axios                        | Handles the API responses                            |
| Tailwind CSS                 | CSS framework for styling                            |
| Font Awesome                 | For nice free icons                                  |
| React Spinners               | For loading spinners                                 |

## Installation

To install the project, clone the repository and run the following command:

```bash
npm install
```

Make sure to have Node.js and npm installed.

You WILL need an API key from The Great Movie Database API. You can get
one [here](https://www.themoviedb.org/documentation/api).

Once done, you have to create a `.env` file at the root of the project and add the following line:

```bash
VITE_BEARER_TOKEN=your_personal_token_here
```

Remember that this token is personal and should not be shared with anyone.

## Running the Application

To run the application locally, use:

```bash
npm run dev
```

Visit `http://localhost:3000` to view the app.

## Roadmap

- [ ] Add user authentication
- [ ] Implement favorite movies feature
- [ ] Enhance the user interface
