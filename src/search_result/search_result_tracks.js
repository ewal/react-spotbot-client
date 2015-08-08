import React from 'react';
import _ from 'lodash';
import { Table } from 'react-bootstrap';
import Track  from 'components/track_table_row';
import TableHeader from 'components/track_table_header';
import FirebaseRef from 'firebase_ref';

class SearchResultTracks extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentTrack: {}
    };
  }

  componentDidMount() {
    FirebaseRef.child('player/current_track').on('value', this.onTrackChange.bind(this));
  }

  componentWillUnmount() {
    FirebaseRef.child('player/current_track').off('value', this.onTrackChange.bind(this));
  }

  onTrackChange(snapshot) {
    let val = snapshot.val();
    this.setState({ currentTrack: val });
  }

  render() {

    if(_.isEmpty(this.props.tracks)) { return false; }

    let tracks = this.props.tracks.map((track, index) => {
      return <Track track={track} key={index} index={index} currentTrack={this.state.currentTrack} image album artist />;
    });

    return (
      <div className="component">
        <Table hover>
          <caption>Songs</caption>
          <TableHeader image album artist />
          <tbody>
            {tracks}
          </tbody>
        </Table>
      </div>
    );
  }

};

export default SearchResultTracks;
