import { PLAY, CHANGE_MUSIC } from '../actions/TrackInfo';
const initState = {
    //songs: global.args.playlist.songs,
    currentTrackIndex: 0,
    //playStatus: false,
    //showMenu: 'none'
};
export default function reducer(state = initState, action) {
    switch (action.type) {
        case PLAY:
            return state;
        case CHANGE_MUSIC:
            return { ...state, currentTrackIndex: action.index };
        default:
            return state;
    }
}