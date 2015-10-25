import React from 'react';
import FirebaseRef from 'firebase_ref';
import _ from 'lodash';
import AlbumMetadataApi from '_apis/album_metadata_api';
import utils from 'utils';
import AlbumList from 'album/album_list';
import StarPlaylistItem from 'starred_playlists/star_playlist_item';
import { Tabs, Tab } from 'react-bootstrap';

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
      <div className="container-fluid star-playlist-container">
        <div className="page-header">
          <h1>Starred albums & playlists</h1>
        </div>

        <Tabs defaultActiveKey={1}>
          <Tab eventKey={1} title="Albums">
            <div className="component">
              <section>
                <AlbumList albums={this.state.albums} />
              </section>
            </div>
          </Tab>

          <Tab eventKey={2} title="Playlists">
            <div className="component">
              <section>
                <ul className="list-unstyled user-playlists">
                  {playlists}
                </ul>
              </section>
            </div>
          </Tab>

        </Tabs>
      </div>
    );
  }
};

export default StarredPlaylistsContainer;
