import React, { Component } from 'react';
import { changeMusic } from '../Redux/actions/TrackInfo';
import { connect } from 'react-redux';
import './ProgressControl.css';
import 'font-awesome-webpack';
import '../../config';

export class ProgressControl extends Component {
    audio = document.querySelector('audio');

    render() {
        //console.log(this);
        return (
            <div>
                <Time currentTime={this.props.currentTime} currentTotalTime={this.props.currentTotalTime} />
                <Progress progress={this.props.progress} onProgressControl={(e) => this.props.onProgressControl(e)} />
                <div className="controlwrap">
                    <div className="controls">
                        <Controls isPlay={this.props.isPlay} onPlay={e => this.props.onPlay(e)}
                            onPrevious={e => this.props.onPrevious(e)}
                            onNext={e => this.props.onNext(e)} />
                        <audio id="audio"></audio>
                    </div>
                </div>
            </div>
        )
    }
}


class Progress extends Component {
    render() {
        return (
            <div className="progress"
                style={{ 'backgroundImage': `linear-gradient(to right,orange ${this.props.progress},#e3e3e3 0)` }}
                onClick={(e) => this.props.onProgressControl(e)}></div>
        )
    }
}

class Controls extends Component {
    render() {
        let className = 'fa ';
        className += this.props.isPlay ? 'fa-pause' : 'fa-play';
        return (
            <div>
                <div className="previous btn" onClick={this.props.onPrevious}>
                    <i className="fa fa-step-backward"></i>
                </div>
                <div className="play" onClick={this.props.onPlay}>
                    <i className={className}></i>
                </div>
                <div className="next btn" onClick={this.props.onNext}>
                    <i className="fa fa-step-forward"></i>
                </div>
            </div>
        )
    }
}

class Time extends Component {
    timeConvert(timestamp) {
        let min = Math.floor(timestamp / 60);
        let sec = Math.floor(timestamp - (min * 60));
        if (sec < 10) {
            sec = `0${sec}`;
        }
        timestamp = `${min}:${sec}`;
        return timestamp;
    }

    render() {
        return (
            <div className="time">
                <div className="current">{this.timeConvert(this.props.currentTime)}</div>
                <div className="total">{this.timeConvert(this.props.currentTotalTime)}</div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {currentTrackIndex:state.TrackInfo.currentTrackIndex}
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeMusic: (index) => {
            dispatch(changeMusic(index))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProgressControl);