import { useState } from "react";
// components
import Box from "./Box";
import ErrorMessage from "./ErrorMessage";
import Loader from "./Loader";
import Logo from "./Logo";
import Main from "./Main";
import MovieList from "./MovieList";
import NavBar from "./NavBar";
import NumResults from "./NumResults";
import Search from "./Search";
import MovieDetails from "./MovieDetails";
import WatchedMovieList from "./WatchedMovieList";
import WatchedSummary from "./WatchedSummary";
import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";

// const average = (arr) =>
//   arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

// const API_KEY = "43df423e";

export default function App() {
  const [query, setQuery] = useState("");

  const [selectedId, setSelectedId] = useState(null);

  const { movies, isLoading, error } = useMovies(query);
  const [watched, setWatched] = useLocalStorageState([], "watched");

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  //   function () {
  //     const controller = new AbortController();

  //     async function fetchMovies() {
  //       try {
  //         setIsLoading(true);
  //         setError("");
  //         const res = await fetch(
  //           `http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`,
  //           { signal: controller.signal }
  //         );
  //         if (!res.ok)
  //           throw new Error("Something went wrong with fetching movies!");
  //         const data = await res.json();
  //         if (data.Response === "False") throw new Error("Movie not found");
  //         setMovies(data.Search);
  //         setError("");
  //       } catch (err) {
  //         if (err.name !== "AbortError") {
  //           setError(err.message);
  //         }
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     }
  //     if (query.length < 3) {
  //       setMovies([]);
  //       setError("");
  //       return;
  //     }
  //     handleCloseMovie();
  //     fetchMovies();
  //     return function () {
  //       controller.abort();
  //     };
  //   },
  //   [query]
  // );

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
