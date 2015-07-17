import React from 'react';

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

    return (
      <thead>
        <tr>
          {imageCell}
          {indexCell}
          <th>Song</th>
          {albumCell}
          {artistCell}
          <th className="duration"><i className="fa fa-clock-o" /></th>
        </tr>
      </thead>
    );
  }
};

export default TableHeader;
