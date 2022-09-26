<template>
  <form v-if="state.task" @submit.prevent="$emit('saveTask', state.task)">
    <input
      type="text"
      id="task-name"
      name="task-name"
      class="inputField"
      placeholder="Task name"
      v-model="state.task.title"
      style="color: black"
    />
    <select
      id="task-state"
      name="task-state"
      class="form-control"
      v-model="state.task.current_state"
    >
      <option
        v-for="state in TaskStateEnum"
        :key="state"
        :value="state"
        style="color: black"
      >
        {{ capitalize(state) }}
      </option>
    </select>
    <select
      id="task-priority"
      name="task-priority"
      class="form-control"
      v-model="state.task.priority"
    >
      <option
        v-for="priority in TaskPriorityEnum"
        :key="priority"
        :value="priority"
        style="color: black"
      >
        {{ capitalize(priority) }}
      </option>
    </select>
    <textarea
      id="task-description"
      name="task-description"
      v-model="state.task.description"
      rows="4"
      cols="50"
      style="color: black; width: 100%"
    />
    <button type="submit" class="button primary block">Save Task</button>
  </form>
</template>

<script>
import { reactive, ref, defineComponent, onUpdated, computed } from "vue";
import TaskStateEnum from "../enums/TaskStateEnum";
import TaskPriorityEnum from "../enums/TaskPriorityEnum";

export default defineComponent({
  name: "CardEdition",
  emits: ["saveTask"],
  props: {
    editTask: {
      type: Object,
      default: null,
    },
  },
  created() {
    this.TaskStateEnum = TaskStateEnum;
    this.TaskPriorityEnum = TaskPriorityEnum;
  },
  setup(props, { emit }) {
    const state = reactive({
      task: null,
    });

    const capitalize = (text) => {
      return text[0].toUpperCase() + text.slice(1).toLowerCase();
    };

    onUpdated(() => {
      state.task = props.editTask;
    });

    return { state, capitalize };
  },
});
</script>

<style scoped>
</style>
