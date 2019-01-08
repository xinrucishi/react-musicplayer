import React, { Component } from 'react';
import { changeMusic } from '../Redux/actions/TrackInfo';
import { connect } from 'react-redux';
import './TrackInfo.css';
import '../../config';

export class TrackInfo extends Component {
    render() {
        //console.log(this.props.TrackInfo);
        let track = global.args.playlist.songs[this.props.currentTrackIndex];
        return (
            <div>
                <div id="playlist" onClick={this.props.showMenu}><i className="fa fa-bars fa-2x"></i></div>
                <div className="albumPic" style={{ 'backgroundImage': `url(${track.pic})` }}></div>
                <div className="trackInfo">
                    <div className="name">{track.name}</div>
                    <div className="artist">{track.singer}</div>
                    <div className="album">我喜欢的音乐</div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { currentTrackIndex: state.TrackInfo.currentTrackIndex };
};

export default connect(mapStateToProps)(TrackInfo);