const state = {
	isEditScreen: false,
};
const mutations = {
	toggleEditScreen(state, payload) {
		state.isEditScreen = payload;
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
