// src/redux/playerSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	playlist: [], // Mảng bài hát trong playlist
	currentTrackIndex: -1, // Chỉ số bài hát hiện tại
	playStatus: false, // Trạng thái phát nhạc
	currentTime: { minute: 0, second: 0 },
	totalTime: { minute: 0, second: 0 },
	shuffle: false, // Ngẫu nhiên
	// Giá trị có thể là: "off" | "one" | "all"
	repeatMode: 'off',
	shuffleList: [],
};

function createShuffledIndices(length) {
	const indices = Array.from({ length }, (_, i) => i);

	// Fisher-Yates shuffle
	for (let i = indices.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[indices[i], indices[j]] = [indices[j], indices[i]];
	}

	return indices;
}

// !!! fix next, prev khi repeatmode : one or all
const playerSlice = createSlice({
	name: 'player',
	initialState,
	reducers: {
		clearPlayer: (state) => {
			state.playlist = [];
			state.currentTrackIndex = -1;
			state.playStatus = false;
			state.currentTime = { minute: 0, second: 0 };
			state.totalTime = { minute: 0, second: 0 };
			state.shuffle = false;
			state.repeatMode = 'off';
		},
		// Chức năng tiếp tục phát
		play: (state) => {
			if (state.currentTrackIndex === -1) return;
			state.playStatus = true;
		},
		// Chức năng pause
		pause: (state) => {
			if (state.currentTrackIndex === -1) return;
			state.playStatus = false;
		},
		// Tiến đến bài hát tiếp theo
		nextTrack: (state) => {
			// danh sách trống
			if (state.playlist.length === 0) return;
			// cuối hàng => phát lại từ đầu
			else if (state.currentTrackIndex === state.playlist.length - 1) {
				state.currentTrackIndex = 0;
				// state.playStatus = isRepeat ? true : false;
			}
			// bình thường
			else {
				if (state.shuffle) {
					if (state.shuffleList.length === 0) {
						state.shuffleList = createShuffledIndices(state.playlist.length); // Shuffle lại nếu hết
					}
					const idx = state.shuffleList.pop();
					state.currentTrackIndex = idx;
				} else {
					state.currentTrackIndex += 1;
				}
			}

			state.currentTime = { minute: 0, second: 0 };
			const durationInSec =
				state.playlist[state.currentTrackIndex]?.duration || 0;
			state.totalTime = {
				minute: Math.floor(durationInSec / 60),
				second: durationInSec % 60,
			};
		},
		previousTrack: (state) => {
			// danh sách trống
			if (state.playlist.length === 0) return;
			// đầu hàng => phát từ đầu
			if (state.currentTrackIndex === 0) {
				state.currentTime = { minute: 0, second: 0 };
				return;
			}
			// bình thường
			if (state.shuffle) {
				if (state.shuffleList.length === 0) {
					state.shuffleList = createShuffledIndices(state.playlist.length); // Shuffle lại nếu hết
				}
				const idx = state.shuffleList.pop();
				state.currentTrackIndex = idx;
			} else {
				state.currentTrackIndex -= 1;
			}

			state.currentTime = { minute: 0, second: 0 };

			const durationInSec =
				state.playlist[state.currentTrackIndex]?.duration || 0;
			state.totalTime = {
				minute: Math.floor(durationInSec / 60),
				second: durationInSec % 60,
			};
		},
		nextTrackNoRepeat: (state) => {
			// danh sách trống
			if (state.playlist.length === 0) return;
			// cuối hàng => phát lại từ đầu
			else if (state.currentTrackIndex === state.playlist.length - 1) {
				state.playStatus = false;
				return;
				// state.playStatus = isRepeat ? true : false;
			}
			// bình thường
			else {
				if (state.shuffle) {
					if (state.shuffleList.length === 0) {
						state.shuffleList = createShuffledIndices(state.playlist.length); // Shuffle lại nếu hết
					}
					const idx = state.shuffleList.pop();
					state.currentTrackIndex = idx;
				} else {
					state.currentTrackIndex += 1;
				}
			}

			state.currentTime = { minute: 0, second: 0 };
			const durationInSec =
				state.playlist[state.currentTrackIndex]?.duration || 0;
			state.totalTime = {
				minute: Math.floor(durationInSec / 60),
				second: durationInSec % 60,
			};
		},
		// Chức năng phát 1 bài dựa trên index
		selectTrack: (state, action) => {
			const track_id = action.payload;
			if (state.playlist.length === 0 || track_id < 0) return;

			const idx = state.playlist.findIndex((t) => t.track_id === track_id);

			state.currentTrackIndex = idx;
			state.playStatus = true;
			state.currentTime = { minute: 0, second: 0 };

			const durationInSec = state.playlist[idx]?.duration || 0;
			state.totalTime = {
				minute: Math.floor(durationInSec / 60),
				second: durationInSec % 60,
			};
		},
		// Thêm bài hát vào Queue
		addTrack: (state, action) => {
			const track = action.payload;
			// Kiểm tra xem bài hát đã có trong playlist chưa
			const idx = state.playlist.findIndex(
				(existingTrack) => existingTrack.track_id === track.track_id
			);

			if (idx !== -1) {
				// Nếu bài hát đã có trong playlist, không thêm vào
				state.currentTrackIndex = idx; // Chọn bài hát đầu tiên trong playlist mới
			} else {
				// Thêm bài hát vào đầu playlist (unshift)
				state.playlist.unshift(track);
				state.currentTrackIndex = 0; // Chọn bài hát đầu tiên trong playlist mới
			}

			state.playStatus = true;
			state.currentTime = { minute: 0, second: 0 };

			const durationInSec = track?.duration || 0;
			state.totalTime = {
				minute: Math.floor(durationInSec / 60),
				second: durationInSec % 60,
			};
		},
		// Tua bài hát
		setCurrentTime: (state, action) => {
			if (state.playlist.length === 0) {
				return;
			}
			state.currentTime = action.payload;
		},
		//
		setTotalTime: (state, action) => {
			if (state.playlist.length === 0) {
				return;
			}
			state.totalTime = action.payload;
		},
		// Repeat mode
		setRepeatMode: (state) => {
			switch (state.repeatMode) {
				case 'off':
					state.repeatMode = 'all'; // lặp 1 bài
					break;
				case 'all':
					state.repeatMode = 'one'; // lặp queue
					break;
				case 'one':
				default:
					state.repeatMode = 'off'; // tắt lặp
					break;
			}
		},
		// Xáo trộn
		setShuffle: (state) => {
			state.shuffle = !state.shuffle;
		},
		playOne: (state) => {
			if (state.currentTrackIndex === -1) return;
			state.currentTime = { minute: 0, second: 0 };
			state.playStatus = true;
		},
	},
});

export const {
	play,
	nextTrackNoRepeat,
	pause,
	nextTrack,
	previousTrack,
	selectTrack,
	setCurrentTime,
	setRepeatMode,
	setShuffle,
	addTrack,
	clearPlayer,
	setTotalTime,
	playOne,
} = playerSlice.actions;
export default playerSlice.reducer;
