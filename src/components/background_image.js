import React from 'react';
import _ from 'lodash';

class BackgroundImage extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    let url = '';
    if(!_.isEmpty(this.props.image)) {
      url = !_.isUndefined(this.props.image.url) ? this.props.image.url : '';
    }

    let bgImage =  {
      backgroundImage: `url(${url})`
    };

    return (
      <div style={bgImage} className={"bg-image " + this.props.classNames}>
        {this.props.children}
      </div>
    );
  }
};

BackgroundImage.propTypes = {
  image: React.PropTypes.object
};

export default BackgroundImage;
