import React from 'react';
import _ from 'lodash';
import { Table } from 'react-bootstrap';
import Track  from 'components/track_table_row';
import TableHeader from 'components/track_table_header';

class SearchResultTracks extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    if(_.isEmpty(this.props.tracks)) { return false; }

    let tracks = this.props.tracks.map((track, index) => {
      return <Track track={track} key={index} index={index} image album artist />;
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
