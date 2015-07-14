import React from 'react';
import _ from 'lodash';
import utils from 'utils';
import { Link } from 'react-router';
import ArtistMetadataApi from '_apis/artist_metadata_api';
import ArtistTopTracks from './artist_top_tracks';
import AlbumList from 'album/album_list';
import { Thumbnail } from 'react-bootstrap';

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
    console.log(artist);
    return (
      <div className="artist-container">
        <div className="container-fluid">
          <header>
            <Thumbnail bsSize="small" src={artist.images[1].url} />
            <h2>
              ARTIST<br />
              {artist.name}
            </h2>
          </header>
          <ArtistTopTracks artistId={this.props.params.id} />
          <header className="section-header">
            <h3>Albums</h3>
          </header>
          <AlbumList albums={this.state.albums} />
        </div>
      </div>
    );
  }
};

export default ArtistContainer;
