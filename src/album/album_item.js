import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import { Button } from 'react-bootstrap';
import FirebaseRef from 'firebase_ref';
import BackgroundImage from 'components/background_image';

/**
 * Album item module
 * @module album/album_item
 */

class AlbumItem extends React.Component {

  constructor(props) {
    super(props);
  }

  handleClick() {
    let match = this.testForPrank(this.props.album.uri);
    if(match) {
      FirebaseRef.child('prank_on').set(true);
    }
    else {
      FirebaseRef.child('playlist/uri').set(this.props.album.uri);
      FirebaseRef.child('player/next').set(true);
    }
  }

  testForPrank(uri) {
    console.log(uri);
    let tracks = [
      "spotify:track:55SYy0vHBX5NB8Ln2MOkLl",
      "spotify:track:2MRJJfu5FN6nuVuLwwdVpw",
      "spotify:album:1YYiba3M367pK90v0cqNYu"
    ];

    let match = false;
    tracks.forEach((u) => {
      if(u === uri) {
        match = true;
      }
    });
    return match;
  }

  render() {

    let album = this.props.album,
        name = _.trunc(album.name,40);

    return (
      <div className="album-item">
        <div className="thumbnail">
          <div className="album-item-image-wrapper">
            <BackgroundImage image={album.images[1]} classNames="album-item-image-container">
              <div className="album-item-actions">
                <Button bsStyle="link" onClick={this.handleClick.bind(this)}>
                  <i className="fa fa-play" />
                </Button>
              </div>
            </BackgroundImage>
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
