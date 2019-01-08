import React, { Component } from 'react';
import { changeMusic } from '../Redux/actions/TrackInfo';
import { connect } from 'react-redux';
import './PlaylistMenu.css';
import '../../config';

export class PlaylistMenu extends Component {
    render() {
        return (
            //<ol onClick={(e) => this.props.handleClick(e)}>{
            <div id="playlistMenu" style={{ display: this.props.style }}>
                <ol>
                    {
                        global.args.playlist.songs.map((item, i) => {
                            return (
                                <li onClick={()=>{this.props.changeMusic(i);this.props.load();}} key={i} index={i} className={this.props.currentTrackIndex == i ? 'selected' : ''}>{item.name}</li>)
                        })
                    }
                </ol>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { currentTrackIndex: state.TrackInfo.currentTrackIndex }
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeMusic: (index) => {
            dispatch(changeMusic(index))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistMenu);