import React from 'react';
import FirebaseRef from 'firebase_ref';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import _ from 'lodash';
import classNames from 'classnames';

class StarPlaylist extends React.Component {

  constructor(props) {
    super(props);

    this.ref = null;
    this.state = {
      isStarred: false,
      refKey: null,
      snapshot: {}
    };

  }

  componentDidMount() {
    this.ref = FirebaseRef.child('starred').on('value', (snapshot) => {
      this.updateState(snapshot);
    });
  }

  updateState(snapshot) {
    let starred = false;
    if(!_.isNull(snapshot.val())) {
      snapshot.forEach((child) => {
        let key = child.key();
        let val = child.val();
        if(val.uri === this.props.uri) {
          starred = true;
          this.setState({
            isStarred: true,
            refKey: key
          });
        }
      });
      if(!starred) {
        this.setState({ isStarred: false, refKey: null, snapshot: {} });
      }
    }
    else {
      this.setState({ isStarred: false, refKey: null, snapshot: {} });
    }
  }

  componentWillUnmount() {
    FirebaseRef.child('starred').off('value', this.ref);
  }

  componentDidUpdate(nextProps) {
    if (this.props.uri !== nextProps.uri) {
      FirebaseRef.child('starred').once('value', (snapshot) => {
        this.updateState(snapshot);
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.uri !== nextProps.uri || this.state.isStarred !== nextState.isStarred;
  }

  toggleStarPlaylist() {
    if(this.state.isStarred) {
      FirebaseRef.child('starred').child(this.state.refKey).remove();
    }
    else {
      FirebaseRef.child('starred').push({ uri: this.props.uri, type: this.props.type, name: this.props.name });
    }
  }

  render() {
    let klass = classNames('fa', {'fa-star': this.state.isStarred, 'fa-star-o': !this.state.isStarred});
    let tooltipText = (this.state.isStarred) ? 'Unstar' : 'Star';
    this.starPlaylistTooltip = <Tooltip id="star-playlist">{tooltipText}</Tooltip>;

    return (
      <Button bsStyle="link" onClick={this.toggleStarPlaylist.bind(this)}>
        <OverlayTrigger overlay={this.starPlaylistTooltip} placement="top">
          <i className={klass} />
        </OverlayTrigger>
      </Button>
    );
  }
};

StarPlaylist.propTypes = {
  uri: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired
};

export default StarPlaylist;
