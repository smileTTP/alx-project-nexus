# ALX Project Nexus

The objective is to build a movie recommendation application where users can browse trending movies and receive recommendations tailored to their preferences. The project showcases dynamic routing, local data storage, and interactive UI design to deliver an engaging user experience.

## Tech stack
- Next.js v16 (React) with TypeScript integration.
- Tailwind CSS v4.
- Using figma for UI/UX design.
- TMDB API v3
- [Motion](https://motion.dev/docs/react-motion-component) (framer-motion) 

## API Overview
[TMDB API v3](https://developer.themoviedb.org/reference/getting-started) is a RESTful web service that offers access to detailed information about movies, TV shows, actors, directors and related content. It provides reviews, ratings, plot summaries, high-quality images/videos and more. It enables search via different categories (title, actor, genre, release year, etc) and supports multiple languages. This api provides complete and updated data for over 9 million titles (movies, series and episodes) and 11 million actors/crew and cast members.

## Available Endpoints
Titles, Search, Actors, Obsolete.
Every endpoint returns and object with 'results' key.

| Endpoint | HTTP Method | Description |
| --- | --- | --- |
| /discover/movie | GET | Get movies using over 30 filters / sorting query parameters provided |
| /trending/movie/day | GET | Get the trending movies on TMDB. |
| /movie/popular | GET | Get a list of movies ordered by popularity. |
| /movie/now_playing | GET | Get a list of movies that are currently in theatres. |
| /movie/top_rated | GET | Get a list of movies ordered by rating. |
| /movie/upcoming | GET | Get a list of movies that are being released soon. |
| /movie/{movie_id} | GET | Get the top level details of a movie by ID. |
| /genre/movie/list | GET | Get the list of official genres for movies. |
| /movie/{movie_id}/videos | GET | Get Movie Trailer. |
| /movie/{movie_id}/credits | GET | Get Movie Credits. |

## User-Friendly Design 
[figma file](https://www.figma.com/design/mA4c8IaTeAJ078itSbUUkG/alx-nexus-project-movie-website?node-id=0-1&t=aqDdvFKJ2Dj7x6nB-1)

## Color Styles
- Primary Color #591427
- Secondary Color #4C3A51
- Background #96D9C0
- #D27C91
- #8080FF
- #7B1B38
- #f1d7de

## Typography
- Black Han Sans
- Space Grotesk

## Planned Components
1. Navbar 
   - Logo
   - Responsive Menu
   - Search Icon
   - Responsive Search bar

2. Hero Section
   - Animated Text

3. Dashboard (Home Page)
   - Favorites Widget (Horizonatl Scroll)
   - Trending Movies Widget (Horizonatl Scroll)
   - Recommendations Widget (Horizonatl Scroll)
   - Upcoming Movies Widget (Horizonatl Scroll)

4. Movie Card
   - Movie Poster
   - Movie Name
   - Movie Genre
   - Movie Rating

5. Movies List
   - Movie Card
   - Pagination 
   - Filtering

6. Movie Details
   - Movie backdrop
   - Movie Poster
   - Movie Name
   - Movie Rating
   - Movie Genre
   - Movie Release Year
   - Movie Length
   - Movie Votes
   - Movie Overview
   - Movie Trailer Link
   - Movie Cast Members
   - Movie Production Companies
   - Favorite Button

7. Login Page
   - Redirect to TMDB page to approve and then back to home page.
     
8. Footer
   - Logo
   - Figma Link
   - Github Link
   - Twitter Link
   - Copyright Info

