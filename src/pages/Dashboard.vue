<template>
  <!-- Modal Add Task -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4
            class="
              modal-title
              m-3
              text-dark text-center
              card-title-text
              fw-bold
            "
            id="exampleModalLabel"
          >
            Add a New Task
          </h4>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body text-dark w-75 m-auto pb-4">
          <div class="inputfield">
            <input
              type="text"
              id="task-name"
              class="inputField"
              ref="newTaskName"
              placeholder="Enter task name"
              :maxlength="ValidationConstants.NEW_TASK_MAX_LENGTH"
            />
          </div>
          <div class="d-grid gap-2">
            <button
              class="btn btn-custom btn-lg btn-block btn-profile"
              @click="createNewTask"
            >
              Add Task
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Edit Card -->
  <div
    class="modal fade"
    id="editModal"
    ref="editModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4
            class="
              modal-title
              m-3
              text-dark text-center
              card-title-text
              fw-bold
            "
            id="exampleModalLabel"
          >
            Modify Your Task
          </h4>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="cancelEdit"
          ></button>
        </div>
        <div class="modal-body text-dark">
          <CardEdition :editTask="taskToEdit" @saveTask="saveTask" />
        </div>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="col-12 d-flex pt-5 gap-4 align-items-center">
      <h1 class="text-center text-capitalize m-0 board-title">To-Do Board</h1>

      <!-- Button Add -->
      <button
        type="button"
        class="btn btn-custom-secondary text-capitalize"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        <font-awesome-icon icon="fa-solid fa-circle-plus" class="plus-icon" />
        New Task
      </button>
    </div>

    <div class="row mt-4">
      <div class="col-12 col-dashboard">
        <div class="board">
          <CardList
            :cards="tasksStore.pendingTasks"
            :current_sate="TaskStateEnum.PENDING"
            :title="'Backlog'"
            @editTask="editTask"
          />

          <CardList
            :cards="tasksStore.inProcessTasks"
            :current_sate="TaskStateEnum.IN_PROGRESS"
            :title="'In Progress'"
            @editTask="editTask"
          />

          <CardList
            :cards="tasksStore.completedTasks"
            :current_sate="TaskStateEnum.COMPLETED"
            :title="'Done'"
            @editTask="editTask"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useTasksStore, useUserStore } from "../store/";
import { CardEdition, CardList } from "../components/";
import { TaskStateEnum, TaskPositionEnum } from "../enums/";
import { cardPosition, ValidationConstants } from "../utils/";
import { Modal } from "bootstrap";

export default {
  name: "Dashboard",
  components: {
    CardEdition,
    CardList,
  },
  created() {
    this.TaskStateEnum = TaskStateEnum;
    this.TaskPositionEnum = TaskPositionEnum;
    this.ValidationConstants = ValidationConstants;
  },
  setup() {
    const editModal = ref(null);
    const newTaskName = ref(null);
    let taskToEdit = ref(null);
    let originalTaskToEdit = null;
    const tasksStore = useTasksStore();
    const store = useUserStore();

    const createNewTask = () => {
      const position = cardPosition(
        tasksStore.pendingTasks,
        TaskPositionEnum.BOTTOM
      );
      const newTask = {
        user_id: store.user.id,
        title: newTaskName.value.value,
        pos: position,
      };
      tasksStore.createTask(newTask);
    };

    const editTask = (task) => {
      taskToEdit.value = task;
      originalTaskToEdit = { ...task };
    };

    const cancelEdit = () => {
      tasksStore.updateStoredTask(originalTaskToEdit);
    };

    const saveTask = (task) => {
      tasksStore.updateTask(
        task.id,
        task.title,
        task.current_state,
        task.priority,
        task.category,
        task.description
      );

      Modal.getInstance(editModal.value)?.hide();

      // HACK: remove .modal-backdrop remaining div
      var elements = document.getElementsByClassName(
        "modal-backdrop fade show"
      );
      if (elements.length > 0) {
        [...elements].forEach((elem) => elem.parentNode.removeChild(elem));
      }
    };

    onMounted(() => {
      tasksStore.fetchTasks();
    });

    return {
      newTaskName,
      tasksStore,
      taskToEdit,
      editModal,
      createNewTask,
      editTask,
      cancelEdit,
      saveTask,
    };
  },
};
</script>

<style scoped>
:deep(path) {
  color: #fff;
}

.board-title {
  font-size: 1.5em;
}

.card-ghost {
  transition: transform 0.18s ease;
  transform: rotateZ(5deg);
}

.card-ghost-drop {
  transition: transform 0.18s ease-in-out;
  transform: rotateZ(0deg);
}

.drop-preview {
  background-color: rgba(blue);
  margin: 1rem 2rem 1rem 0.3rem;
}

.board {
  display: block;
  overflow-x: auto;
  white-space: nowrap;
}

.board-col {
  display: inline-block;
  width: 19em;
  max-height: 70vh;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0 15px 30px 15px;
  margin-bottom: 24px;
  border-radius: 0 0 15px 15px;
  background: #f5f4f8;
  vertical-align: top;
}

@media (min-width: 768px) {
  .board-col {
    width: 24em;
  }
}

@media (max-width: 440px) {
  .col-dashboard {
    margin-bottom: 5em;
  }
}

.board-col:not(:last-child) {
  margin-right: 2em;
}

.board-header {
  padding: 1rem;
  margin: 0 -1rem;
  color: #fff;
  background: #635e94ed;
  font-size: 1em;
}

.board-tasks {
  position: relative;
}

.board-tasks:before {
  content: "No tasks in here!";
  width: 100%;
  color: rgb(112, 112, 112);
  position: absolute;
  line-height: 6em;
  text-align: center;
}

.icon-back:before {
  content: "\f0ae";
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  color: #fff;
  margin: 0.5em;
}

.plus-icon {
  margin-right: 8px;
}
</style>
