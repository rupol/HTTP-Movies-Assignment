import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
export default class SavedList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="saved-wrapper">
        <h2>Saved Movies:</h2>
        <div className="saved-list">
          {this.props.list.map(movie => {
            return (
              <NavLink to={`/movies/${movie.id}`} key={movie.id}>
                <span className="saved-movie">{movie.title}</span>
              </NavLink>
            );
          })}
        </div>
      </div>
    );
  }
}
