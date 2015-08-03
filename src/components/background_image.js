import React from 'react';
import _ from 'lodash';

class BackgroundImage extends React.Component {
  render() {

    let url = '';
    if(!_.isEmpty(this.props.image)) {
      url = !_.isUndefined(this.props.image.url) ? this.props.image.url : '';
    }

    let bgImage =  {
      backgroundImage: `url(${url})`
    };

    return (
      <div style={bgImage} className={this.props.classNames} />
    );
  }
};

BackgroundImage.propTypes = {
  image: React.PropTypes.object
};

export default BackgroundImage;
