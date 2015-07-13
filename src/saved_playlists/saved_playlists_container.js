import React from 'react';
import { Nav } from 'react-bootstrap';
import ReactRouterBootstrap from 'react-router-bootstrap';

let NavItemLink = ReactRouterBootstrap.NavItemLink;

class SavedPlaylistsContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="saved-playlists">
        <header>
          <h2>Starred playlists <i className="fa fa-star" /></h2>
        </header>
        <section>
          <Nav stacked>
            <NavItemLink to="starred" params={{uri: "awesome"}}>
              <i className="fa fa-music" /> Awesome songs
            </NavItemLink>
            <NavItemLink to="starred" params={{uri: "more"}}>
              <i className="fa fa-music" /> More stuff
            </NavItemLink>
          </Nav>
        </section>
      </div>
    );
  }
};

export default SavedPlaylistsContainer;
