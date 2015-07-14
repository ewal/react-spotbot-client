import React from 'react';
import _ from 'lodash';
import utils from 'utils';
import { Link } from 'react-router';
import ArtistMetadataApi from '_apis/artist_metadata_api';
import TableRow from 'components/track_table_row';
import { Table } from 'react-bootstrap';

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

    let tracks = this.state.tracks.map((track, index) => {
      return <TableRow track={track} key={index} />;
    });

    return (
      <Table hover>
        <caption>Top tracks</caption>
        <tbody>
          {tracks}
        </tbody>
      </Table>
    );
  }
};

export default ArtistTopTracks;
