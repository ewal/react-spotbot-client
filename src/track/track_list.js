import React from 'react';
import { Table } from 'react-bootstrap';
import TableHeader from 'components/track_table_header';
import _ from 'lodash';
import TrackItem from 'track/track_item';
import FirebaseRef from 'firebase_ref';

/**
 * Track list module
 * @module track/track_list
 */

class TrackList extends React.Component {

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

  componentDidUpdate(prevProps) {
    let row = React.findDOMNode(this.refs.search_active);
    if(!_.isEmpty(this.props.query) && !_.isNull(row)) {
      row.focus();
    }
  }

  onTrackChange(snapshot) {
    let val = snapshot.val();
    this.setState({ currentTrack: val });
  }

  caption() {
    if(!this.props.caption) { return; }
    return (
      <caption>
        {this.props.caption}
      </caption>
    );
  }

  render() {

    if(_.isEmpty(this.props.tracks)) { return false; }

    let props = {
      image: this.props.image,
      album: this.props.album,
      artist: this.props.artist,
      header: this.props.header,
      currentTrack: this.state.currentTrack
    };

    let tracks = this.props.tracks.map((track, index) => {
      let ref = 'item_' + index;
      if(!_.isEmpty(this.props.query)) {
        if(this.props.query.trackId === track.id) {
          ref = 'search_active';
        }
      }
      return <TrackItem ref={ref} {...props} track={track} index={index} key={track.id} />;
    });

    return (
      <Table hover>
        {this.caption()}
        <TableHeader index {...props} />
        <tbody>
          {tracks}
        </tbody>
      </Table>
    );
  }
};

TrackList.propTypes = {
  tracks: React.PropTypes.array.isRequired
};

export default TrackList;
