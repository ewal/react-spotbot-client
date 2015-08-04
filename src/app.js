import React from 'react';
import Router from 'react-router';
import { Input } from 'react-bootstrap';
import PlaylistContainer from 'playlist/playlist_container';
import SearchContainer from 'search/search_container';
import SearchResultContainer from 'search_result/search_result_container';
import PlayerControlsContainer from 'player_controls/player_controls_container.js';
import QueueContainer from 'queue/queue_container';
import NavigationContainer from 'layout/navigation_container';
import AlbumContainer from 'album/album_container';
import ArtistContainer from 'artist/artist_container';
import ContextMenuTrack from 'components/context_menu_track';
import CurrentTrackContainer from 'current_track/current_track_container';
import StarredPlaylistsContainer from 'starred_playlists/starred_playlists_container';
import classNames from 'classnames';
import FirebaseRef from 'firebase_ref';
import utils from 'utils';

import CurrentTrackStore from '_stores/current_track_store';

import CurrentTrackActions from '_actions/current_track_actions';

let RouteHandler = Router.RouteHandler,
    Route = Router.Route,
    DefaultRoute = Router.DefaultRoute;

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      searchVisible: false
    };
  }

  componentDidMount() {
    FirebaseRef.child('player/current_track').on('value', (snapshot) => {
      let trackId = utils.spotify.parseId(snapshot.val().uri);
      CurrentTrackActions.set(trackId);
    });
  }

  toggleSearch() {
    this.setState({ searchVisible: !this.state.searchVisible });
  }

  hideSearchContainer() {
    if(this.state.searchVisible) {
      this.setState({ searchVisible: false });
    }
  }

  render() {

    let searchVisibleKlass = classNames('main-content', {'search-visible': this.state.searchVisible});

    let searchContainerProps = {
      searchVisible: this.state.searchVisible,
      toggleSearch: this.toggleSearch.bind(this),
      hideSearchContainer: this.hideSearchContainer.bind(this)
    };

    let navigationContainerProps = {
      hideSearchContainer: this.hideSearchContainer.bind(this),
      toggleSearch: this.toggleSearch.bind(this)
    };

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
            <SearchContainer {...searchContainerProps} />
          </aside>
          <aside className="main-navigation">
            <div className="logo">
              <i className="fa fa-spotify" />
            </div>
            <NavigationContainer {...navigationContainerProps} />
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
    <Route name='starred' path='starred' handler={StarredPlaylistsContainer} />
    <Route name='search' path='search/:query' handler={SearchResultContainer} />
    <Route name='queue' path='queue' handler={QueueContainer} />
    <Route name='album' path='album/:id' handler={AlbumContainer} />
    <Route name='artist' path='artist/:id' handler={ArtistContainer} />
  </Route>
);

Router.run(routes, function(Handler) {
  React.render(<Handler/>, document.getElementById('app'));
});

export default App;
