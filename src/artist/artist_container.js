import React from 'react';
import _ from 'lodash';
import utils from 'utils';
import { Link } from 'react-router';
import ArtistMetadataApi from '_apis/artist_metadata_api';
import ArtistTopTracks from './artist_top_tracks';
import AlbumList from 'components/album_list';

class ArtistContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      artist: {},
      albums: []
    };
  }

  componentDidMount() {
    ArtistMetadataApi.fetch(this.props.params.id).then((response) => {
      this.setState({
        artist: response
      });
    }).catch((message) => {
      throw new Error(message);
    });
    ArtistMetadataApi.albums(this.props.params.id).then((response) => {
      this.setState({
        albums: response.items
      });
    }).catch((message) => {
      throw new Error(message);
    });
  }

  render() {
    let artist = this.state.artist;
    if(_.isEmpty(artist)) { return false; }
    return (
      <div>
        <h2>
          {artist.name}
        </h2>
        <h3>Top tracks</h3>
        <ArtistTopTracks artistId={this.props.params.id} />
        <h3>Albums</h3>
        <AlbumList albums={this.state.albums} />
      </div>
    );
  }
};

export default ArtistContainer;
