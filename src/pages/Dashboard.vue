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
    <input
      type="text"
      id="task-id"
      class="inputField"
      ref="taskId"
      placeholder="Enter task Id to delete"
    />
    <button class="btn btn-danger block" @click="deleteTask">
      Delete Task
    </button>
  </div>

  <h2>Kanban</h2>

<div class="container text-left">
  <div class="row">
    <div class="col rounded-5 col-kanban">
      <kanbanCard draggable="true" />

      <kanbanCard draggable="true" />

      <kanbanCard draggable="true" />
    </div>
    <div class="col rounded-5 col-kanban">
      <kanbanCard draggable="true" />

      <kanbanCard draggable="true" />

      <kanbanCard draggable="true" />
    </div>
    <div class="col rounded-5 col-kanban">
      <kanbanCard draggable="true" />

      <kanbanCard draggable="true" />

      <kanbanCard draggable="true" />
    </div>
  </div>
</div>

</template>

<script>
import { ref } from "vue";
import useTasksStore from "../store/task";
import { store } from "../store/auth";
import kanbanCard from "../components/Card.vue"

export default {
  name: "Dashboard",
  components: {
        kanbanCard
    },

  setup() {
    const taskId = ref(null);
    const taskName = ref(null);
    const tasksStore = useTasksStore();

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

    return { taskId, taskName, tasksStore, createNewTask, deleteTask };
  },
}
</script>

<style scoped>
  .col-kanban {
    width: 100%;
    padding: 2rem;
    margin: 0.5rem;
    background-color: #ddd;
    height: 90vh;
    overflow: auto;
  }
</style>