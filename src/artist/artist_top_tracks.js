import React from 'react';
import _ from 'lodash';
import utils from 'utils';
import { Link } from 'react-router';
import ArtistMetadataApi from '_apis/artist_metadata_api';
import TrackListItem from 'components/track_list_item';

class ArtistTopTracks extends React.Component {
  constructor(props) {
    super(props);

    this.state= {
      tracks: []
    };
  }

  componentDidMount() {
    ArtistMetadataApi.topTracks(this.props.artistId).then((response) => {
      this.setState({
        tracks: response.tracks
      });
    }).catch((message) => {
      throw new Error(message);
    });
  }

  render() {
    if(_.isEmpty(this.state.tracks)) { return false; }

    let tracks = this.state.tracks.map((track) => {
      return <TrackListItem track={track} />;
    });

    return (
      <ul>
        {tracks}
      </ul>
    );
  }
};

export default ArtistTopTracks;
