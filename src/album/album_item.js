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

    // TODO:
    // - take param artist and show if so

    let album = this.props.album,
        name = _.trunc(album.name,40),
        imageUrl = (!_.isEmpty(album.images)) ? album.images[1].url : '',
        bgImage = {
          backgroundImage: 'url(' + imageUrl + ')',
        };

    return (
      <div className="album-item">
        <div className="thumbnail">
          <div className="album-item-image-wrapper">
            <div className="album-item-image-container" style={bgImage} />
            <div className="album-item-actions">
              <Button bsStyle="link" onClick={this.handleClick.bind(this)}>
                <i className="fa fa-play" />
              </Button>
            </div>
          </div>

          <Link className="caption" to="album" params={{ id: album.id }}>{name}</Link>
        </div>
      </div>
    );
  }
};

AlbumItem.propTypes = {
  album: React.PropTypes.object.isRequired
};

export default AlbumItem;
