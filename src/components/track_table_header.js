import React from 'react';
import classNames from 'classnames';

class TableHeader extends React.Component {

  hiddenCell() {
    return <th className="hide" />;
  }

  cell(label, klass) {
    return <th className={klass}>{label}</th>;
  }

  render() {

    let imageCell = this.hiddenCell(),
        artistCell = this.hiddenCell(),
        albumCell = this.hiddenCell(),
        indexCell = this.hiddenCell();

    if(this.props.image) {
      imageCell = this.cell('', 'image-cell');
    }
    if(this.props.artist) {
      artistCell = this.cell('Artist', '');
    }
    if(this.props.album) {
      albumCell = this.cell('Album', '');
    }
    if(this.props.index) {
      indexCell = this.cell('#', '');
    }

    let klass = classNames({ 'hide': !this.props.header });

    return (
      <thead className={klass}>
        <tr>
          {imageCell}
          {indexCell}
          <th>Song</th>
          {artistCell}
          {albumCell}
          <th className="duration"><i className="fa fa-clock-o" /></th>
        </tr>
      </thead>
    );
  }
};

export default TableHeader;
