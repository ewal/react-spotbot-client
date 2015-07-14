import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import AlbumItem from 'album/album_item';

class AlbumList extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let albums = this.props.albums.map((album) => {
      return (
        <Col xs={12} sm={6} md={3}>
          <AlbumItem album={album} />
        </Col>
      );
    });

    return (
      <div className="album-list">
        <Grid fluid>
          <Row>
            {albums}
          </Row>
        </Grid>
      </div>
    );
  }
};

AlbumList.propTypes = {
  albums: React.PropTypes.array.isRequired
};

export default AlbumList;
