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

<div class="container">
  <div class="row justify-content-md-center">
    <div class="col">

      <div>1</div>
      <div>2</div>
      <div>3</div>

    </div>

    <div class="col">

      <div>1</div>
      <div>2</div>
      <div>3</div>

    </div>

    <div class="col">

      <div>1</div>
      <div>2</div>
      <div>3</div>

    </div>
  </div>
</div>

<ArrowNarrowUpIcon />

</template>

<script>
import { ref } from "vue";
import useTasksStore from "../store/task";
import { store } from "../store/auth";
import { ArrowNarrowUpIcon } from "@vue-hero-icons/outline"

export default {
  name: "Dashboard",
  components: { ArrowNarrowUpIcon },

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
 
  .kanban-card{
    margin: 10px;
    background-color:#efefef;
  }

  .heading-kanban-card{
    display: flex;
    justify-content: space-between;
    color: #000;
  }

  .footer-kanban-card{
    display: flex;
    flex-direction: row;
  }

  .heading-kanban-card-category{
    margin: 5px;
    padding: 5px;
    background-color: blue;
  }
</style>