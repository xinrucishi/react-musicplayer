export const PLAY = 'PLAY';
export const CHANGE_MUSIC = 'CHANGE_MUSIC';

export function play() {
    return {
        type: PLAY
    }
}

export function changeMusic(index) {
    //console.log(index);
    return {
        type: CHANGE_MUSIC,
        index: index
    }
}