import React from 'react';
import _ from 'lodash';
import utils from 'utils';
import { Link } from 'react-router';
import ArtistMetadataApi from '_apis/artist_metadata_api';
import Track from 'components/track_table_row';
import { Table } from 'react-bootstrap';
import FirebaseRef from 'firebase_ref';

/**
 * Artist top tracks module
 * @module artist/artist_top_tracks
 */

class ArtistTopTracks extends React.Component {

  constructor(props) {
    super(props);

    this.state= {
      tracks: [],
      currentTrack: {}
    };
  }

  componentDidMount() {
    this.fetchData(this.props.artistId);
    FirebaseRef.child('player/current_track').on('value', this.onTrackChange.bind(this));
  }

  componentWillUnmount() {
    FirebaseRef.child('player/current_track').off('value', this.onTrackChange.bind(this));
  }

  componentWillReceiveProps(nextProps) {
    this.fetchData(nextProps.artistId);
  }

  onTrackChange(snapshot) {
    let val = snapshot.val();
    this.setState({ currentTrack: val });
  }

  fetchData(id) {
    ArtistMetadataApi.topTracks(id).then((response) => {
      this.setState({
        tracks: response.tracks
      });
    }).catch((message) => {
      throw new Error(message);
    });
  }

  render() {

    if(_.isEmpty(this.state.tracks)) { return false; }

    let tracks = this.state.tracks.map((track, index) => {
      return <Track track={track} key={index} index={index} image currentTrack={this.state.currentTrack} />;
    });

    return (
      <Table hover>
        <caption>Popular</caption>
        <tbody>
          {tracks}
        </tbody>
      </Table>
    );
  }
};

export default ArtistTopTracks;
