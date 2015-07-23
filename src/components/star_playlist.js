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
      rawVal: []
    };
  }

  componentDidMount() {
    FirebaseRef.child('starred').on('value', this.onStarredChange.bind(this));
  }

  componentWillUnmount() {
    FirebaseRef.child('starred').off('value', this.onStarredChange.bind(this));
  }

  onStarredChange(snapshot) {
    let items = _.toArray(snapshot.val());
    let starred = _.findWhere(items, { uri: this.props.uri });
    console.log(starred);
    // TODO: fix the setState bug.
    this.setState({
      isStarred: !_.isUndefined(starred),
      rawVal: snapshot.val()
    });
  }

  toggleStarPlaylist() {
    if(this.state.isStarred) {
      FirebaseRef.child('starred/' + _.keys(this.state.rawVal)[0]).set(null);
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
