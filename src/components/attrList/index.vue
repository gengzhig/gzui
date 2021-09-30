<template></template>

<script>
export default {
	name: "",
};
</script>

<script setup>
import { reactive, ref, onMounted, watch, computed, getCurrentInstance, useSlots, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
const props = defineProps({});
const ctx = getCurrentInstance();
const emit = defineEmits();
const state = reactive({});
const contentHeight = computed(() => {});
const store = useStore();
const route = useRoute();
const slots = useSlots();
const router = useRouter();
const fn = val => {};
onMounted(() => {});
// watch(
// 	() => [name, title],
// 	([nname, ntitle], [oname, otitle]) => {
// 		console.log(nname, oname), console.log(ntitle, otitle);
// 	}
// );
</script>

<style scoped lang="scss"></style>
