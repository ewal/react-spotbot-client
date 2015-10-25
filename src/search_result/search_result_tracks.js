import React from 'react';
import _ from 'lodash';
import TrackList from 'track/track_list';
import Section from 'components/section';

class SearchResultTracks extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <Section title="Songs">
        <TrackList tracks={this.props.tracks} image album artist header />
      </Section>
    );
  }
};

SearchResultTracks.propTypes = {
  tracks: React.PropTypes.array
};

export default SearchResultTracks;
