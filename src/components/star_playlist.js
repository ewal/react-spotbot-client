import React from 'react';
import FirebaseRef from 'firebase_ref';
import { Button } from 'react-bootstrap';
import _ from 'lodash';
import classNames from 'classnames';

class StarPlaylist extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isStarred: false,
      refKey: null
    };
  }

  componentDidMount() {
    FirebaseRef.child('starred').on('value', this.onStarredChange.bind(this));
  }

  componentWillUnmount() {
    FirebaseRef.child('starred').off('value', this.onStarredChange.bind(this));
  }

  onStarredChange(snapshot) {

    let starred = false;
    if(!_.isNull(snapshot.val())) {
      snapshot.forEach((child) => {
        let key = child.key();
        let val = child.val();
        if(val.uri === this.props.uri) {
          this.setState({
            isStarred: true,
            refKey: key
          });
          starred = true;
        }
      });
      if(!starred) {
        this.setState({ isStarred: false, refKey: null });
      }
    }
  }

  toggleStarPlaylist() {
    if(this.state.isStarred) {
      FirebaseRef.child('starred/' + this.state.refKey).remove();
    }
    else {
      FirebaseRef.child('starred').push({ uri: this.props.uri, type: this.props.type, name: this.props.name });
    }
  }

  render() {

    let klass = classNames('fa', {'fa-star': this.state.isStarred, 'fa-star-o': !this.state.isStarred});

    return (
      <Button bsStyle="link" onClick={this.toggleStarPlaylist.bind(this)}>
        <i className={klass} />
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
