const state = {
	layerArea: true,
	compLibraryArea: true,
	operateMainArea: true,
};
const mutations = {
	toggleLayerArea(state, payload) {
		state.layerArea = !state.layerArea;
	},
	toggleCompLibraryArea(state, payload) {
		state.compLibraryArea = !state.compLibraryArea;
	},
	toggleOperateMainArea(state, payload) {
		state.operateMainArea = !state.operateMainArea;
	},
};
const actions = {};
const getters = {};

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters,
};
