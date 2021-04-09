import axios from "axios";
import React, { useEffect, useState } from "react";

function Favorite(props) {
  const movieId = props.movieId;
  const userFrom = props.userForm;
  const movieTitle = props.movieInfo.title;
  const moviePost = props.movieInfo.backdrop_path;
  const movieRunTime = props.movieInfo.runtime;

  const [favoriteNumber, setFavoriteNumber] = useState(0);
  const [favorited, setFavorited] = useState(false);

  const variables = {
    userFrom,
    movieId,
    movieTitle,
    moviePost,
    movieRunTime,
  };
  useEffect(() => {
    axios.post("/api/favorite/favoriteNumber", variables).then((response) => {
      if (response.data.success) {
        setFavoriteNumber(response.data.favoriteNumber);
      } else {
        alert("숫자 정보를 가져오는데 실패 했습니다.");
      }
    });

    axios.post("/api/favorite/favorited", variables).then((response) => {
      if (response.data.success) {
        setFavorited(response.data.favorited);
      } else {
        alert("정보를 가져오는데 실패 했습니다.");
      }
    });
  }, []);

  const onClickFavorite = () => {
    if (favorited) {
      axios
        .post("/api/favorite/removeFromFavorite", variables)
        .then((response) => {
          if (response.data.success) {
            setFavoriteNumber(favoriteNumber - 1);
            setFavorited(!favorited);
          } else {
            alert("Favorite 리스트에서 지우는데에 실패했습니다.");
          }
        });
    } else {
      axios.post("/api/favorite/addToFavorite", variables).then((response) => {
        if (response.data.success) {
          setFavoriteNumber(favoriteNumber + 1);
          setFavorited(!favorited);
        } else {
          alert("Favorite 리스트에서 추가하는 데에 실패했습니다.");
        }
      });
    }
  };
  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <button onClick={onClickFavorite}>
        {favorited ? "Not Favorite " : "Add to Favorite "}
        {favoriteNumber}
      </button>
    </div>
  );
}

export default Favorite;
