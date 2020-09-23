import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  deleteMovie = (event, id) => {
    event.preventDefault();

    if (window.confirm("Are you sure you want to delete this movie?")) {
      axios
        .delete(`http://localhost:5000/api/movies/${id}`)
        .then(result => {
          console.log("Movie was deleted");
          this.props.history.push("/");
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div className="movie-buttons">
          <div
            className="fas fa-save fa-2x save-button"
            onClick={this.saveMovie}
          ></div>

          <Link
            className="fas fa-edit fa-2x edit-button"
            to={`/update-movie/${this.state.movie.id}`}
          ></Link>
          <div
            className="fas fa-trash fa-2x delete-button"
            onClick={e => this.deleteMovie(e, this.state.movie.id)}
          ></div>
        </div>
      </div>
    );
  }
}
