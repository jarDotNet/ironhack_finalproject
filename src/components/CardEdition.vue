<template>
  <form v-if="state.task" @submit.prevent="$emit('saveTask', state.task)">
    <label for="task-name" class="label-text text-capitalize">Task Name:</label>
    <div class="inputfield">
      <input
        type="text"
        id="task-name"
        name="task-name"
        class="inputField"
        placeholder="Task name"
        v-model="state.task.title"
        :maxlength="ValidationConstants.NEW_TASK_MAX_LENGTH"
        style="color: black"
      />
    </div>
    <label for="task-state" class="label-text text-capitalize"
      >Current State:</label
    >
    <div class="inputfield">
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
    </div>
    <label for="task-priority" class="label-text text-capitalize"
      >Priority:</label
    >
    <div class="inputfield">
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
    </div>
    <label for="task-priority" class="label-text text-capitalize"
      >Category:</label
    >
    <div class="inputfield">
      <select
        id="task-category"
        name="task-category"
        class="form-control"
        v-model="state.task.category"
      >
        <option
          v-for="category in TaskCategoryEnum"
          :key="category.name"
          :value="category.name"
          style="color: black"
        >
          {{ capitalize(category.name) }}
        </option>
      </select>
    </div>
    <label for="task-description" class="label-text text-capitalize"
      >Description:</label
    >
    <div class="inputfield">
      <textarea
        id="task-description"
        name="task-description"
        v-model="state.task.description"
        rows="4"
        cols="50"
        style="color: black; width: 100%"
      />
    </div>

    <div class="d-grid gap-2">
      <button type="submit" class="btn btn-custom btn-lg btn-block btn-profile">
        Update Task
      </button>
    </div>
  </form>
</template>

<script>
import { reactive, defineComponent, onUpdated } from "vue";
import { TaskStateEnum, TaskPriorityEnum, TaskCategoryEnum } from "../enums/";
import ValidationConstants from "../utils/ValidationConstants";

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
    this.TaskCategoryEnum = TaskCategoryEnum;
    this.ValidationConstants = ValidationConstants;
  },
  setup(props, { emit }) {
    const state = reactive({
      task: null,
    });

    const capitalize = (text) => {
      if (!text || text.length === 0) return "";
      return text[0].toUpperCase() + text.slice(1).toLowerCase();
    };

    onUpdated(() => {
      state.task = props.editTask;
    });

    return { state, capitalize };
  },
});
</script>

<style scoped></style>
