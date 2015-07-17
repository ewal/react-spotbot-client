import React from 'react';
import _ from 'lodash';
import utils from 'utils';
import { Link } from 'react-router';
import ArtistMetadataApi from '_apis/artist_metadata_api';
import ArtistTopTracks from './artist_top_tracks';
import AlbumList from 'album/album_list';

class ArtistContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      artist: {},
      albums: [],
      singles: []
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
    ArtistMetadataApi.singles(this.props.params.id).then((response) => {
      this.setState({
        singles: response.items
      });
    }).catch((message) => {
      throw new Error(message);
    });
  }

  imageCollage() {
    if(_.isEmpty(this.state.albums)) { return false; }

    let album = this.state.albums;
    let temp = _.pluck(album, 'images');
    let images = temp.map((i) => {
      let style = {
        backgroundImage: 'url(' + i[1].url + ')'
      };
      return (
        <div className="wrapper">
        <div style={style} className="item" />
        </div>
      );
    });

    return (
      <div className="image-collage">{images}</div>
    );
  }

  render() {

    let artist = this.state.artist;
    if(_.isEmpty(artist)) { return false; }

    let bs = {
      backgroundImage: 'url(' + artist.images[1].url + ')'
    };

    // TODO:
    // - mashup background image of cover art

    return (
      <div className="artist-container container-fluid">
        <header className="clearfix page-header">
          <div className="media-header-image-container">
            <div className="media-header-image-object" style={bs} />
          </div>
          <div className="artist-name">
            <span className="label-artist">Artist</span>
            <h1>
              {artist.name}
            </h1>
          </div>
        </header>
        <ArtistTopTracks artistId={this.props.params.id} />
        <div className="component">
          <header>
            <h2>Singles</h2>
          </header>
          <AlbumList albums={this.state.singles} />
        </div>
        <div className="component">
          <header>
            <h2>Albums</h2>
          </header>
          <AlbumList albums={this.state.albums} />
        </div>
      </div>
    );
  }
};

export default ArtistContainer;
