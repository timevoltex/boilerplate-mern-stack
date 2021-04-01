import axios from "axios";
import React, { useEffect, useState } from "react";

function Favorite(props) {
  const movieId = props.movieId;
  const userFrom = props.userForm;
  const movieTitle = props.movieInfo.title;
  const moviePost = props.movieInfo.backdrop_path;
  const movieRuntime = props.movieInfo.runtiem;

  const [favoriteNumber, setFavoriteNumber] = useState(0);
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    const variables = {
      userFrom,
      movieId,
    };
    axios.post("/api/favorite/favoriteNumber", variables).then((response) => {
      console.log(response.data);
      if (response.data.success) {
        setFavoriteNumber(response.data.favoriteNumber);
      } else {
        alert("숫자 정보를 가져오는데 실패 했습니다.");
      }
    });
    axios.post("/api/favorite/favorited", variables).then((response) => {
      console.log("favorited", response.data);
      if (response.data.success) {
        setFavorited(response.data.favorited);
      } else {
        alert("정보를 가져오는데 실패 했습니다.");
      }
    });
  }, []);
  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <button>
        {favorited ? "Not Favorite" : "Add to Favorite "}
        {favoriteNumber}
      </button>
    </div>
  );
}

export default Favorite;
