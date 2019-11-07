import React, { useState, useEffect } from "react";
import axios from "axios";

function UpdateMovie(props) {
  const [movie, setMovie] = useState({
    id: "",
    title: "",
    director: "",
    metascore: "",
    stars: []
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  }, [props.match.params.id]);

  const handleChange = event => {
    setMovie({
      ...movie,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();

    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(res => props.history.push("/"))
      .catch(err => console.log(err));
  };

  return (
    <div className="save-wrapper">
      <form className="movie-card" onSubmit={handleSubmit}>
        <input
          className="form-title"
          type="text"
          name="title"
          placeholder="Title"
          value={movie.title}
          onChange={handleChange}
        />
        <div className="movie-director">
          Director:{" "}
          <input
            className="form-director"
            type="text"
            name="director"
            placeholder="Director"
            value={movie.director}
            onChange={handleChange}
          />
        </div>
        <div className="movie-metascore">
          Metascore:{" "}
          <input
            className="form-metascore"
            type="text"
            name="metascore"
            placeholder="Metascore"
            value={movie.metascore}
            onChange={handleChange}
          />
        </div>
        <h3>Actors</h3>

        {movie.stars.map(star => (
          <div key={star} className="movie-star">
            <input
              className="form-star"
              type="text"
              name="star"
              placeholder="Star"
              value={star}
              onChange={handleChange}
            />
          </div>
        ))}
        <button className="update-button" type="submit">
          Update Movie
        </button>
      </form>
    </div>
  );
}

export default UpdateMovie;
