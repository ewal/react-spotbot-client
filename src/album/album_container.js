import React from 'react';
import AlbumMetadataApi from '_apis/album_metadata_api';
import utils from 'utils';
import { Link } from 'react-router';

class Track extends React.Component {
  render() {
    return (
      <li>
        {this.props.track.name}
      </li>
    );
  }
};

Track.propTypes = { track: React.PropTypes.object.isRequired };

class Artists extends React.Component {
  render() {

    // TODO:
    // - link artist to artist page
    let artists = this.props.artists.map((artist) => {
      return <li><Link to='artist' params={{ id: artist.id }}>{artist.name}</Link></li>;
    });

    return (
      <ul>
        {artists}
      </ul>
    );
  }
};

Artists.propTypes = { artists: React.PropTypes.array.isRequired };

class AlbumContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      album: {}
    };
  }

  componentDidMount() {
    AlbumMetadataApi.fetch(this.props.params.id).then((response) => {
      this.setState({
        album: response
      });
    }).catch((message) => {
      throw new Error(message);
    });
  }

  render() {
    if(_.isEmpty(this.state.album)) { return false; }

    let tracks = this.state.album.tracks.items.map((track) => {
      return <Track track={track} />;
    });

    // TODO:
    // - list and link artists
    // - album cover
    // - queue tracks
    // - set album as current playlist

    return (
      <div>
        <h2>{this.state.album.name}</h2>
        <Artists artists={this.state.album.artists} />
        <ul>
          {tracks}
        </ul>
      </div>
    );
  }
};

export default AlbumContainer;
