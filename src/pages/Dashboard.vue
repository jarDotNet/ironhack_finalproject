<template>
  <div>
    <h1>To-do app</h1>
    <input
      type="text"
      id="task-name"
      class="inputField"
      ref="taskName"
      placeholder="Enter task name"
    />
    <button class="button primary block" @click="createNewTask">
      New Task
    </button>
    <br />
    <br />
    <input
      type="text"
      id="task-id"
      class="inputField"
      ref="taskId"
      placeholder="Enter task Id"
    />
    <button class="btn btn-danger block" @click="deleteTask">
      Delete Task
    </button>
    <br />
    <button class="btn btn-success block" @click="markTaskAsCompleted">
      Mark Task as Completed
    </button>
    <button class="btn btn-secondary block" @click="markTaskAsInProgress">
      Mark Task as In Progress
    </button>
    <button class="btn btn-info block" @click="markTaskAsPending">
      Mark Task as Pending
    </button>
    <ul v-for="task in tasksStore.tasks" :key="task.id">
      <li>
        <b>Id:</b> {{ task.id }} - <b>Title:</b> {{ task.title }} -
        <b>State:</b>
        {{ task.current_state }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useTasksStore from "../store/task";
import { useUserStore } from "../store/user";

export default {
  name: "Dashboard",

  setup() {
    const taskId = ref(null);
    const taskName = ref(null);
    const tasksStore = useTasksStore();
    const store = useUserStore();

    const createNewTask = () => {
      const newTask = {
        user_id: store.user.id,
        title: taskName.value.value,
      };
      tasksStore.createTask(newTask);
    };

    const deleteTask = () => {
      tasksStore.deleteTask(taskId.value.value);
    };

    const markTaskAsCompleted = () => {
      tasksStore.markAsCompleted(taskId.value.value);
    };

    const markTaskAsInProgress = () => {
      tasksStore.markAsInProgress(taskId.value.value);
    };

    const markTaskAsPending = () => {
      tasksStore.markAsPending(taskId.value.value);
    };

    onMounted(() => {
      tasksStore.fetchTasks();
    });

    return {
      taskId,
      taskName,
      tasksStore,
      createNewTask,
      deleteTask,
      markTaskAsCompleted,
      markTaskAsInProgress,
      markTaskAsPending,
    };
  },
};
</script>

<style></style>
