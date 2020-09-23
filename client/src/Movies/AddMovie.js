import React, { useState } from "react";
import axios from "axios";

function AddMovie(props) {
  const [actors, setActors] = useState({
    actor1: "",
    actor2: "",
    actor3: ""
  });

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

  const handleActorChange = event => {
    setActors({
      ...actors,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();

    newMovie.stars.push(actors.actor1);
    newMovie.stars.push(actors.actor2);
    newMovie.stars.push(actors.actor3);

    console.log(newMovie);
    axios
      .post("http://localhost:5000/api/movies", newMovie)
      .then(res => props.history.push("/"))
      .catch(err => console.log(err));
  };

  return (
    <form className="movie-card" onSubmit={handleSubmit}>
      <label htmlFor="formTitle">Title</label>
      <input
        className="form-title"
        id="formTitle"
        type="text"
        name="title"
        placeholder="Title"
        value={newMovie.title}
        onChange={handleChange}
      />
      <label htmlFor="formDirector">Director</label>
      <input
        className="form-director"
        id="formDirector"
        type="text"
        name="director"
        placeholder="Director"
        value={newMovie.director}
        onChange={handleChange}
      />
      <label htmlFor="formMetascore">Metascore</label>
      <input
        className="form-metascore"
        id="formMetascore"
        type="text"
        name="metascore"
        placeholder="Metascore"
        value={newMovie.metascore}
        onChange={handleChange}
      />

      <h3>Actors</h3>
      <input
        className="form-star"
        type="text"
        name="actor1"
        placeholder="actor 1"
        value={actors.actor1}
        onChange={handleActorChange}
      />
      <input
        className="form-star"
        type="text"
        name="actor2"
        placeholder="actor 2"
        value={actors.actor2}
        onChange={handleActorChange}
      />
      <input
        className="form-star"
        type="text"
        name="actor3"
        placeholder="actor 3"
        value={actors.actor3}
        onChange={handleActorChange}
      />
      <button className="update-button btn" type="submit">
        Add Movie
      </button>
    </form>
  );
}

export default AddMovie;
