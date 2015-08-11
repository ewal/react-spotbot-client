import React from 'react';
import FirebaseRef from 'firebase_ref';
import _ from 'lodash';
import AlbumMetadataApi from '_apis/album_metadata_api';
import utils from 'utils';
import AlbumList from 'album/album_list';
import ComponentHeader from 'components/component_header';
import StarPlaylistItem from 'starred_playlists/star_playlist_item';

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

    let playlists = this.state.playlists.map((playlist, index) => {
      return <StarPlaylistItem playlist={playlist} key={index} />;
    });

    return (
      <div className="container-fluid">
        <div className="page-header">
          <h1>Starred playlists</h1>
        </div>

        <div className="component">
          <ComponentHeader title="Albums" />
          <section>
            <AlbumList albums={this.state.albums} />
          </section>
        </div>

        <div className="component">
          <ComponentHeader title="User playlists" />
          <section>
            <ul className="list-unstyled">
              {playlists}
            </ul>
          </section>
        </div>
      </div>
    );
  }
};

export default StarredPlaylistsContainer;
