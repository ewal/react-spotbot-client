import React from 'react';
import Router from 'react-router';
import { Input } from 'react-bootstrap';

import PlaylistContainer from 'playlist/playlist_container';
import SearchContainer from 'search/search_container';
import SearchResultContainer from 'search_result/search_result_container';
import PlayerControlsContainer from 'player_controls/player_controls_container.js';
import QueueContainer from 'queue/queue_container';
import SavedPlaylistsContainer from 'saved_playlists/saved_playlists_container';
import NavigationContainer from 'layout/navigation_container';
import AlbumContainer from 'album/album_container';
import ArtistContainer from 'artist/artist_container';
import ContextMenuTrack from 'components/context_menu_track';
import CurrentTrackContainer from 'current_track/current_track_container';
import classNames from 'classnames';

let RouteHandler = Router.RouteHandler,
    Route = Router.Route,
    DefaultRoute = Router.DefaultRoute;

// TODO:
// - set market in .env file
class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      searchVisible: false
    };
  }

  toggleSearch() {
    this.setState({ searchVisible: !this.state.searchVisible });
  }

  hideSearchContainer() {
    this.setState({ searchVisible: false });
  }

  render() {

    let searchVisibleKlass = classNames('main-content', {'search-visible': this.state.searchVisible});

    return (
      <div className="flex">
        <ContextMenuTrack />
        <main role="main" className={searchVisibleKlass}>
          <aside className="player">
            <CurrentTrackContainer />
            <PlayerControlsContainer />
          </aside>
          <section className="yield" onClick={this.hideSearchContainer.bind(this)}>
            <article className="inner">
              <RouteHandler />
            </article>
          </section>
          <aside className="main-search">
            <SearchContainer searchVisible={this.state.searchVisible} toggleSearch={this.toggleSearch.bind(this)} />
          </aside>
          <aside className="main-navigation">
            <div className="logo">
              <i className="fa fa-spotify" />
            </div>
            <NavigationContainer toggleSearch={this.toggleSearch.bind(this)} />
          </aside>
        </main>
      </div>
    );
  }
};

let routes = (
  <Route handler={App} path='/'>
    <DefaultRoute handler={PlaylistContainer}/>
    <Route name='playlist' path='playlist' handler={PlaylistContainer} />
    <Route name='starred' path='starred' handler={PlaylistContainer} />
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
