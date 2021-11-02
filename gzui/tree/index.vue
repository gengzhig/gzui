<template>
	<div class="index">23452</div>
</template>

<script>
export default {
	name: "index",
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
</script>

<style scoped lang="scss"></style>
