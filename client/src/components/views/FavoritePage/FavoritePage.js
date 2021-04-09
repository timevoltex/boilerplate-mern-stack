import axios from "axios";
import React, { useEffect, useState } from "react";
import "./favorite.css";
import { Popover } from "antd";
import { IMAGE_BASE_URL } from "../../Config";

function FavoritePage() {
  const [favorites, setFavorites] = useState([]);

  const onHandleRemove = (movieId, userFrom) => {
    const variables = {
      movieId,
      userFrom,
    };
    axios
      .post("/api/favorite/removeFromFavorite", variables)
      .then((response) => {
        if (response.data.success) {
          fetchFavoredMovie();
        } else {
          alert("리스트에서 지우는데 실패했습니다.");
        }
      });
  };

  const fetchFavoredMovie = () => {
    axios
      .post("/api/favorite/getFavoredMovie", {
        userFrom: localStorage.getItem("userId"),
      })
      .then((response) => {
        if (response.data.success) {
          setFavorites(response.data.favorites);
        } else {
          alert("영화 정보를 가져오는데 실패했습니다.");
        }
      });
  };
  const renderCards = favorites.map((movie, index) => {
    const content = (
      <div>
        {movie.moviePost ? (
          <img src={`${IMAGE_BASE_URL}w500${movie.moviePost}`} />
        ) : (
          "no image"
        )}
      </div>
    );
    return (
      <tr key={index}>
        <Popover content={content} title={`${movie.movieTitle}`}>
          <td>{movie.movieTitle}</td>
        </Popover>
        <td>{movie.movieRunTime} mins</td>
        <td>
          <button onClick={() => onHandleRemove(movie.movieId, movie.userFrom)}>
            remove
          </button>
        </td>
      </tr>
    );
  });

  useEffect(() => {
    fetchFavoredMovie();
  }, []);
  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h2>Favorite Movies</h2>
      <hr />
      <table>
        <thead>
          <tr>
            <th>Movie Title</th>
            <th>Movie RunTime</th>
            <th>Remove from favorites</th>
          </tr>
        </thead>
        <tbody>{renderCards}</tbody>
      </table>
    </div>
  );
}

export default FavoritePage;
