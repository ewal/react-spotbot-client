import React from 'react';
import SearchStore from '_stores/search_store';

/**
 * Search item module
 * @module search/search_item
 */

class SearchItem extends React.Component {

  componentDidUpdate(prevProps) {
    if(this.props.currentIndex === prevProps.index) {
      SearchStore.setNavigateObject(this.props);
    }
  }

  handleClick() {
    this.props.hideSearchContainer();
  }
};

SearchItem.propTypes = {
  currentIndex: React.PropTypes.number.isRequired,
  hideSearchContainer: React.PropTypes.func.isRequired
};

export default SearchItem;
