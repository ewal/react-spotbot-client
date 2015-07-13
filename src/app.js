import React from 'react';
import Router from 'react-router';
import ReactBootstrap from 'react-bootstrap';

import PlaylistContainer from 'playlist/playlist_container';
import SearchContainer from 'search/search_container';
import SearchResultContainer from 'search_result/search_result_container';
import PlayerControlsContainer from 'player_controls/player_controls_container.js';
import QueueContainer from 'queue/queue_container';
import SavedPlaylistsContainer from 'saved_playlists/saved_playlists_container';
import NavigationContainer from 'layout/navigation_container';
import AlbumContainer from 'album/album_container';
import ArtistContainer from 'artist/artist_container';

let RouteHandler = Router.RouteHandler,
    Route = Router.Route,
    DefaultRoute = Router.DefaultRoute;

class App extends React.Component {
  render() {
    return (
      <div className="flex">
        <header className="main-header" role="banner">
          <div className="logo pull-left">
            <i className="fa fa-spotify" />
          </div>
          <SearchContainer />
        </header>
        <main role="main" className="main-content">
          <section className="yield">
            <article>
              <RouteHandler />
            </article>
          </section>
          <aside className="main-navigation">
            <NavigationContainer />
            <SavedPlaylistsContainer />
          </aside>
        </main>
        <footer className="main-footer">
          <PlayerControlsContainer />
        </footer>
      </div>
    );
  }
};

let routes = (
  <Route handler={App} path='/'>
    <DefaultRoute handler={PlaylistContainer}/>
    <Route name='playlist' path='playlist' handler={PlaylistContainer} />
    <Route name='starred' path='starred/:uri' handler={PlaylistContainer} />
    <Route name='search' path='search/:query' handler={SearchResultContainer} />
    <Route name='queue' path='queue' handler={QueueContainer} />
    <Route name='album' path='album/:id' handler={AlbumContainer} />
    <Route name='artist' path='artist/:id' handler={ArtistContainer} />
  </Route>
);

Router.run(routes, function(Handler) {
  React.render(<Handler/>, document.body);
});

export default App;
