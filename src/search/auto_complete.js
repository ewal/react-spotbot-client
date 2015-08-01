import React from 'react';
import SearchItemTrack from 'search/search_item_track';
import SearchItemAlbum from 'search/search_item_album';
import SearchItemArtist from 'search/search_item_artist';

/**
 * Search auto complete module
 * @module search/auto_complete
 */

class AutoComplete extends React.Component {

  getIndex(index) {
    return index +=1;
  }

  render() {

    let index = -1;
    let commonProps = {
      hideSearchContainer: this.props.hideSearchContainer,
      currentIndex: this.props.index
    };

    let tracks = this.props.tracks.map((track) => {
      index = this.getIndex(index);
      return <SearchItemTrack {...commonProps} route="album" index={index} key={index} item={track} />;
    });

    let albums = this.props.albums.map((album) => {
      index = this.getIndex(index);
      return <SearchItemAlbum {...commonProps} route="album" index={index} key={index} item={album} />;
    });

    let artists = this.props.artists.map((artist) => {
      index = this.getIndex(index);
      return <SearchItemArtist {...commonProps} route="artist" index={index} key={index} item={artist} />;
    });

    return (
      <dl className="auto-complete">
        <dt>Songs</dt>
        {tracks}
        <dt>Albums</dt>
        {albums}
        <dt>Artists</dt>
        {artists}
      </dl>
    );
  }
};

export default AutoComplete;
