import React, { useState } from "react";
import axios from "axios";

function AddMovie(props) {
  const [newMovie, setNewMovie] = useState({
    id: "",
    title: "",
    director: "",
    metascore: "",
    stars: []
  });

  const handleChange = event => {
    setNewMovie({
      ...newMovie,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log(newMovie);
    axios
      .post("http://localhost:5000/api/movies", newMovie)
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
          value={newMovie.title}
          onChange={handleChange}
        />
        <div className="movie-director">
          Director:{" "}
          <input
            className="form-director"
            type="text"
            name="director"
            placeholder="Director"
            value={newMovie.director}
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
            value={newMovie.metascore}
            onChange={handleChange}
          />
        </div>
        <h3>Actors</h3>
        <div className="movie-star">
          <input
            className="form-star"
            type="text"
            name="star"
            placeholder="actor1,actor2,actor3"
            value={newMovie.stars}
            onChange={handleChange}
          />
        </div>
        <button className="update-button" type="submit">
          Add Movie
        </button>
      </form>
    </div>
  );
}

export default AddMovie;
