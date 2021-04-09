import { Row } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { API_KEY, API_URL, IMAGE_BASE_URL } from "../../Config";
import GridCards from "../commons/GridCards";
import MainImage from "./Section/MainImage";

function LandingPage() {
  const [movies, setMovies] = useState([]);
  const [mainMovie, setMainMovie] = useState(null);
  const [page, setPage] = useState(0);
  useEffect(() => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko&page=1`;
    fetchMovies(endpoint);

    loadMoreItems();
  }, []);

  const fetchMovies = (endpoint) => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((response) => {
        setMovies([...movies, ...response.results]);
        if (response.page === 1) setMainMovie(response.results[0]);
        setPage(response.page);
      });
  };

  const loadMoreItems = () => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko&page=${
      page + 1
    }`;

    fetchMovies(endpoint);
  };
  return (
    <div style={{ width: "100%", margin: 0 }}>
      {mainMovie && (
        <MainImage
          image={`${IMAGE_BASE_URL}w1280${mainMovie.backdrop_path}`}
          title={`${mainMovie.original_title}`}
          description={mainMovie.overview}
        />
      )}
      <div style={{ width: "85%", margin: "1rem auto" }}>
        <h2>Movies by latest</h2>
        <hr />
        {/* Movie Grid Cards */}
        <Row gutter={[16, 16]}>
          {movies &&
            movies.map((movie, index) => {
              return (
                <Fragment key={index}>
                  <GridCards
                    landingPage
                    image={
                      movie.poster_path
                        ? `${IMAGE_BASE_URL}w500${movie.poster_path}`
                        : null
                    }
                    movieId={movie.id}
                    movieName={movie.original_title}
                  />
                </Fragment>
              );
            })}
        </Row>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={loadMoreItems}>Load More</button>
      </div>
    </div>
  );
}

export default LandingPage;
