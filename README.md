# react-spotbot-client
A Spotbot client written in ReactJS

## What you need
1. Install spotbot-server (https://github.com/himynameisjonas/spotbot)
2. Create a Firebase application (https://www.firebase.com)

## .env variables
```
FIREBASE_DEV_URL=https://[app_name].firebaseio.com/
FIREBASE_PROD_URL=https://[app_name].firebaseio.com/
SPOTIFY_MARKET=se
SPOTIFY_SEARCH_LIMIT=10
SPOTIFY_SEARCH_TYPES=track,album,artist
```

### Start dev server
run ```gulp```

### Build for production
run ```gulp dist```

### Deploy to divshot
// TODO:
