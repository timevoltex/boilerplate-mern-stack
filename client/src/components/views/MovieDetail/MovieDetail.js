import { Row } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import Favorite from "./Sections/Favorite";
import { API_KEY, API_URL, IMAGE_BASE_URL } from "../../Config";
import GridCards from "../commons/GridCards";
import MainImage from "../LandingPage/Section/MainImage";
import MovieInfo from "./Sections/MovieInfo";

function MovieDetail(props) {
  const movieId = props.match.params.movieId;
  const [movie, setMovie] = useState([]);
  const [cast, setCast] = useState([]);
  const [actorToggle, setActorToggle] = useState(false);

  const toggleActorView = () => {
    setActorToggle(!actorToggle);
  };

  useEffect(() => {
    const endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
    const endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;
    fetch(endpointInfo)
      .then((response) => response.json())
      .then((response) => {
        setMovie(response);
      });

    fetch(endpointCrew)
      .then((response) => response.json())
      .then((response) => {
        setCast(response.cast);
      });
  }, []);
  return (
    <div>
      {/* header */}

      <MainImage
        image={`${IMAGE_BASE_URL}w1280${movie.backdrop_path}`}
        title={movie.original_title}
        description={movie.overview}
      />

      <div style={{ width: "85%", margin: "1rem auto" }}>
        <Favorite
          movieInfo={movie}
          movieId={movieId}
          userForm={localStorage.getItem("userId")}
        />

        {/* movie info */}
        <MovieInfo movie={movie} />
        <br />
        <div
          style={{ display: "flex", justifyContent: "center", margin: "2rem" }}
        >
          <button onClick={toggleActorView}>Toggle Actor View</button>
        </div>
        {actorToggle && (
          <Row gutter={[16, 16]}>
            {cast &&
              cast.map((cast, index) => {
                return (
                  <Fragment key={index}>
                    <GridCards
                      image={
                        cast.profile_path
                          ? `${IMAGE_BASE_URL}w500${cast.profile_path}`
                          : null
                      }
                      characterName={cast.name}
                    />
                  </Fragment>
                );
              })}
          </Row>
        )}
      </div>
    </div>
  );
}

export default MovieDetail;
