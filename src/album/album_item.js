import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import { Button } from 'react-bootstrap';
import FirebaseRef from 'firebase_ref';

class AlbumItem extends React.Component {

  constructor(props) {
    super(props);
  }

  handleClick() {
    FirebaseRef.child('playlist/uri').set(this.props.album.uri);
    FirebaseRef.child('player/next').set(true);
  }

  render() {

    let album = this.props.album;
    let name = _.trunc(album.name, 45);
    let bgImage = {
      backgroundImage: 'url(' + album.images[1].url + ')',
    };

    return (
      <div className="thumbnail album-item">
        <div className="album-item-image-wrapper">
          <div className="album-item-image-container" style={bgImage} />
          <div className="album-item-actions">
            <Button bsStyle="link" onClick={this.handleClick.bind(this)}>
              <i className="fa fa-play-circle" />
            </Button>
          </div>
        </div>
        <div className="caption">
          <h3>
            <Link to="album" params={{ id: album.id }}>{name}</Link>
          </h3>
        </div>
      </div>
    );
  }
};

AlbumItem.propTypes = {
  album: React.PropTypes.object.isRequired
};

export default AlbumItem;
