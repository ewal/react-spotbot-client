import React from 'react';
import _ from 'lodash';
import utils from 'utils';
import ArtistMetadataApi from '_apis/artist_metadata_api';
import AlbumList from 'album/album_list';
import TrackList from 'track/track_list';
import ArtistList from 'artist/artist_list';
import BackgroundImage from 'components/background_image';
import ComponentHeader from 'components/component_header';

/**
 * Artist container module
 * @module artist/artist_container
 */

class ArtistContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      artist: {},
      albums: [],
      singles: [],
      relatedArtists: [],
      topTracks: []
    };
  }

  componentDidMount() {
    this.fetchData(this.props.params.id);
  }

  componentWillReceiveProps(nextProps) {
    this.fetchData(nextProps.params.id);
  }

  fetchData(id) {

    ArtistMetadataApi.artist(id).then((response) => {
      this.setState({
        artist: response
      });
    }).catch((message) => {
      throw new Error(message);
    });

    ArtistMetadataApi.albums(id).then((response) => {
      this.setState({
        albums: response.items
      });
    }).catch((message) => {
      throw new Error(message);
    });

    ArtistMetadataApi.singles(id).then((response) => {
      this.setState({
        singles: response.items
      });
    }).catch((message) => {
      throw new Error(message);
    });

    ArtistMetadataApi.relatedArtists(id).then((response) => {
      this.setState({
        relatedArtists: response.artists
      });
    }).catch((message) => {
      throw new Error(message);
    });

    ArtistMetadataApi.topTracks(id).then((response) => {
      this.setState({
        topTracks: response.tracks
      });
    }).catch((message) => {
      throw new Error(message);
    });
  }

  // TODO:----
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

    return (
      <div className="artist-container container-fluid">
        <header className="clearfix page-header">
          <div className="media-header-image-container">
            <BackgroundImage classNames="media-header-image-object" image={artist.images[1]} />
          </div>
          <div className="artist-name">
            <span className="label-artist">Artist</span>
            <h1>
              {artist.name}
            </h1>
          </div>
        </header>
        <div className="component">
          <ComponentHeader title="Top songs" />
          <TrackList tracks={this.state.topTracks} image album />
        </div>
        <div className="component">
          <ComponentHeader title="Related artists" />
          <ArtistList artists={this.state.relatedArtists} />
        </div>
        <div className="component">
          <ComponentHeader title="Singles" />
          <AlbumList albums={this.state.singles} />
        </div>
        <div className="component">
          <ComponentHeader title="Albums" />
          <AlbumList albums={this.state.albums} />
        </div>
      </div>
    );
  }
};

export default ArtistContainer;
