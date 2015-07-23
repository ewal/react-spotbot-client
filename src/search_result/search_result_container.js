import React from 'react';
import SearchApi from '_apis/search_api';
import SearchResultAlbums from 'search_result/search_result_albums';
import SearchResultTracks from 'search_result/search_result_tracks';
import SearchResultArtists from 'search_result/search_result_artists';

class SearchResultContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      albums: [],
      artists: [],
      tracks: []
    };
  }

  fetchSearchResult(query) {
    SearchApi.search(query).then((response) => {
      let tracks = _.isUndefined(response.tracks) ? {} : response.tracks.items;
      let albums = _.isUndefined(response.albums) ? {} : response.albums.items;
      let artists = _.isUndefined(response.artists) ? {} : response.artists.items;
      this.setState({
        albums: albums,
        tracks: tracks,
        artists: artists
      });
    }).catch((message) => {
      throw new Error(message);
    });
  }

  componentWillReceiveProps(nextProps) {
    console.log("nextProps");
    console.log(nextProps);
    this.fetchSearchResult(nextProps.params.query);
  }

  componentDidMount() {
    this.fetchSearchResult(this.props.params.query);
  }

  // TODO:
  // - set current search tracks as playlist

  render() {
    return (
      <div className="container-fluid">
        <div className="page-header">
          <h1>Search result for "{this.props.params.query}"</h1>
        </div>
        <SearchResultArtists artists={this.state.artists} />
        <SearchResultTracks tracks={this.state.tracks} />
        <SearchResultAlbums albums={this.state.albums} />
      </div>
    );
  }
};

export default SearchResultContainer;
