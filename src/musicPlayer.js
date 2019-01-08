import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import TrackInfo from './component/TrackInfo/TrackInfo';
import ProgressControl from './component/ProgressControl/ProgressControl';
import PlaylistMenu from './component/PlaylistMenu/PlaylistMenu';
import store from './component/Redux/store';
import { changeMusic } from './component/Redux/actions/TrackInfo';
import './musicPlayer.css';
import './config'

if (module.hot) {
    module.hot.accept();
}
(function () {
    let playlist;
    let url = 'https://api.bzqll.com/music/netease/songList?key=579621905&id=403752493&limit=25&offset=0';
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (myJson) {
        global.args.playlist = myJson.data;
        return playlist = myJson.data;
    }).then(function (playlist) {
        //const storeState = store.getState();
        //store.subscribe(() => { console.log(store.getState()) });
        class Player extends Component {
            constructor(props) {
                super(props);
                this.state = this.initialState();
                //console.log(props);
            }

            //static defaultProps = playlist;

            initialState() {
                return {
                    currentTrackLen: playlist.songs.length,
                    //currentTrackIndex: 0,
                    currentTime: 0,
                    currentTotalTime: 0,
                    playStatus: false,
                    showMenu: 'none'
                }
            }

            showMenu() {
                this.setState({ showMenu: this.state.showMenu == 'none' ? 'block' : 'none' });
            }


            componentDidMount() {
                this.loadAudio();
                setInterval(() => {
                    let audio = document.getElementById('audio');
                    this.setState({ currentTime: audio.currentTime }, () => {
                        if (~~this.state.currentTime >= ~~this.state.currentTotalTime && ~~this.state.currentTime != 0) {
                            this.next();
                        }
                    });
                }, 1000);
            }

            loadAudio() {
                let audio = document.querySelector('audio');
                audio.src=playlist.songs[store.getState().TrackInfo.currentTrackIndex].url;
                let self = this;
                audio.load();
                audio.onerror = function () {
                    alert("加载失败！");
                };
                audio.addEventListener("canplay", () => {
                    let totalTime = audio.duration;
                    this.setState({ currentTotalTime: totalTime });
                });
            }

            updatePlayStatus() {
                if (this.state.playStatus) {
                    audio.play();
                } else {
                    audio.pause();
                }
            }

            loadAndPlay(){
                this.loadAudio();
                this.updatePlayStatus();
            }

            play(e) {
                this.setState({ playStatus: !this.state.playStatus }, () => {
                    this.loadAudio();
                    this.updatePlayStatus();
                });
                e.stopPropagation();
            }

            previous(e) {
                let reduxStore = store.getState();
                //if (this.state.currentTrackIndex - 1 < 0) {
                if (reduxStore.TrackInfo.currentTrackIndex - 1 < 0) {
                    //this.setState({ currentTrackIndex: this.state.currentTrackLen - 1 }, () => {
                    store.dispatch(changeMusic(this.state.currentTrackLen - 1));
                    //this.loadAudio();
                    //this.updatePlayStatus();
                    this.loadAndPlay();
                    //});
                } else {
                    //this.setState({ currentTrackIndex: --this.state.currentTrackIndex }, () => {
                    store.dispatch(changeMusic(--reduxStore.TrackInfo.currentTrackIndex));
                    //this.loadAudio();
                    //this.updatePlayStatus();
                    this.loadAndPlay();
                    //})
                }
                e.stopPropagation();
            }

            next(e) {
                let reduxStore = store.getState();
                //if (this.state.currentTrackIndex + 1 == this.state.currentTrackLen) {
                if (reduxStore.TrackInfo.currentTrackIndex + 1 == this.state.currentTrackLen) {
                    //this.setState({ currentTrackIndex: 0 }, () => {
                    store.dispatch(changeMusic(0));
                    //this.loadAudio();
                    //this.updatePlayStatus();
                    this.loadAndPlay();
                    //});
                } else {
                    //this.setState({ currentTrackIndex: ++this.state.currentTrackIndex }, () => {
                    store.dispatch(changeMusic(++reduxStore.TrackInfo.currentTrackIndex));
                    //this.loadAudio();
                    //this.updatePlayStatus();
                    this.loadAndPlay();
                    //})
                }
                if (e) {
                    e.stopPropagation();
                }
            }

            /*
            selectSong(index) {
                this.setState({ currentTrackIndex: index, playStatus: true }, () => {
                    this.loadAudio();
                    this.updatePlayStatus();
                });
            }

            handleClick(e) {
                let target = e.target;
                let nodeName = target.nodeName;
                if (nodeName == 'LI') {
                    let index = ~~target.getAttribute('index');
                    this.setState({
                        currentTrackIndex: index, playStatus: true
                    }, () => {
                        this.loadAudio();
                        this.updatePlayStatus();
                    });
                }
            }
            */

            progressControl(e) {
                let BCR = document.querySelector('.progress').getBoundingClientRect();
                let x = e.clientX - BCR.left;
                let audio = document.querySelector('audio');
                if (this.state.playStatus) {
                    this.setState({
                        currentTime: audio.duration * x / BCR.width
                    }, () => {
                        audio.currentTime = this.state.currentTime
                    });
                }
            }

            render() {
                return (
                    <div id="app2">
                        <div className="player">
                            <TrackInfo showMenu={this.showMenu.bind(this)} />
                            <ProgressControl progress={this.state.currentTime / this.state.currentTotalTime * 100 + '%'}
                                isPlay={this.state.playStatus} currentTime={this.state.currentTime}
                                currentTotalTime={this.state.currentTotalTime}
                                //src={playlist.songs[this.props.currentTrackIndex].url}
                                onPlay={this.play.bind(this)}
                                onPrevious={this.previous.bind(this)} onNext={this.next.bind(this)}
                                onProgressControl={this.progressControl.bind(this)} />
                        </div>
                        <PlaylistMenu style={this.state.showMenu} load={this.loadAndPlay.bind(this)} />
                    </div>
                    //handleClick={this.handleClick.bind(this)}
                )
            }
        }

        /*const mapStateToProps = (state) => {
            return { currentTrackIndex: state.TrackInfo.currentTrackIndex }
        };

        const mapDispatchToProps = (dispatch) => {
            return {
                changeMusic: (index) => {
                    dispatch(changeMusic(index))
                }
            }
        }

        connect(mapStateToProps, mapDispatchToProps)(Player);*/

        ReactDom.render(
            <Provider store={store}>
                <Player />
            </Provider>, document.getElementById("app"));
    });
})();
