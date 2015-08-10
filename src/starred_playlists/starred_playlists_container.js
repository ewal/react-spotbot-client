import React from 'react';
import FirebaseRef from 'firebase_ref';
import _ from 'lodash';
import AlbumMetadataApi from '_apis/album_metadata_api';
import utils from 'utils';
import AlbumList from 'album/album_list';

class StarredPlaylistsContainer extends React.Component {

  constructor(props) {
    super(props);
    this.ref = null;

    this.state = {
      playlists: [],
      albums: []
    };
  }

  componentDidMount() {
    this.ref = FirebaseRef.child('starred').on('value', (snapshot) => {
      let snap = _.toArray(snapshot.val());
      let albums = _.pluck(_.where(snap, { type: 'album' }), 'uri');
      let albumIds = albums.map((uri) => {
        return utils.spotify.parseId(uri);
      });

      let playlists = _.where(snap, { type: 'user' });
      this.setState({ playlists: playlists });

      if(albumIds.length === 0) { return; }

      AlbumMetadataApi.albums(albumIds).then((response) => {
        this.setState({
          albums: response.albums
        });
      }).catch((message) => {
        throw new Error(message);
      });
    });
  }

  componentWillUnmount() {
    FirebaseRef.child('starred').off('value', this.ref);
  }

  render() {
    if(_.isEmpty(this.state.playlists) && _.isEmpty(this.state.albums)) { return false; }

    let playlists = this.state.playlists.map((playlist, index) => {
      return <li key={index}>{playlist.name}</li>;
    });

    return (
      <div className="container-fluid">
        <div className="page-header">
          <h1>Starred playlists</h1>
        </div>

        <div className="component">
          <header>
            <h2>Albums</h2>
          </header>
          <section>
            <AlbumList albums={this.state.albums} />
          </section>
        </div>

        <div className="component">
          <header>
            <h2>Playlists</h2>
          </header>
          <section>
            <ul>
              {playlists}
            </ul>
          </section>
        </div>
      </div>
    );
  }
};

export default StarredPlaylistsContainer;
