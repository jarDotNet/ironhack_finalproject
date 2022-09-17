<template>
  <div>
    <p>Hello world!</p>
    <button @click="tasksStore.createTask()">New Task</button>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import useTaskStore from "../store/task";

export default {
  name: "Dashboard",
  computed: {
    ...mapStores(useTaskStore),
  },
};
</script>

<style>
</style>