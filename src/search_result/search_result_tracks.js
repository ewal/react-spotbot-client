import React from 'react';
import _ from 'lodash';
import TrackList from 'track/track_list';
import ComponentHeader from 'components/component_header';

class SearchResultTracks extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="component">
        <ComponentHeader title="Songs" />
        <TrackList tracks={this.props.tracks} image album artist header />
      </div>
    );
  }
};

SearchResultTracks.propTypes = {
  tracks: React.PropTypes.array
};

export default SearchResultTracks;
