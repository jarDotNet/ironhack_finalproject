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
            class="modal-title m-3 text-dark text-center card-title-text"
            style="font-weight: bold"
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
              ref="taskName"
              placeholder="Enter task name"
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

  <div class="container">
    <div class="col-12 d-flex pt-5 gap-4 align-items-center">
      <h1
        class="text-center text-capitalize"
        style="font-size: 1.5em; margin: 0"
      >
        To-Do Board
      </h1>

      <!-- Button Add -->
      <button
        type="button"
        class="btn btn-custom-secondary text-capitalize"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        <font-awesome-icon
          icon="fa-solid fa-circle-plus"
          style="margin-right: 8px"
        />
        New Task
      </button>
    </div>

    <div class="row mt-4">
      <div class="col-12">
        <div class="board">
          <div class="board-col">
            <h3 class="mt-0 board-header">
              <span class="icon-back"></span> Backlog
            </h3>

            <div class="board-tasks">
              <Container
                drag-class="card-ghost"
                drop-class="card-ghost-drop"
                group-name="1"
                :get-child-payload="getChildPayload1"
                :drop-placeholder="dropPlaceholderOptions"
                @drop="handleDrop(TaskStateEnum.PENDING, $event)"
                style="height: 300px"
              >
                <Card
                  v-for="task in tasksStore.pendingTasks"
                  :taskCard="task"
                  :key="task.id"
                >
                </Card>
              </Container>
            </div>
          </div>

          <div class="board-col">
            <h3 class="mt-0 board-header">
              <span class="icon-back"></span> In Progress
            </h3>

            <div class="board-tasks">
              <Container
                drag-class="card-ghost"
                drop-class="card-ghost-drop"
                group-name="1"
                :get-child-payload="getChildPayload2"
                :drop-placeholder="dropPlaceholderOptions"
                @drop="handleDrop(TaskStateEnum.IN_PROGRESS, $event)"
                style="height: 300px"
              >
                <Card
                  v-for="task in tasksStore.inProcessTasks"
                  :taskCard="task"
                  :key="task.id"
                >
                </Card>
              </Container>
            </div>
          </div>

          <div class="board-col">
            <h3 class="mt-0 board-header">
              <span class="icon-back"></span>Done
            </h3>

            <div class="board-tasks">
              <Container
                drag-class="card-ghost"
                drop-class="card-ghost-drop"
                group-name="1"
                :get-child-payload="getChildPayload3"
                :drop-placeholder="dropPlaceholderOptions"
                @drop="handleDrop(TaskStateEnum.COMPLETED, $event)"
                style="height: 300px"
              >
                <Card
                  v-for="task in tasksStore.completedTasks"
                  :taskCard="task"
                  :key="task.id"
                >
                </Card>
              </Container>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useTasksStore from "../store/task";
import { useUserStore } from "../store/user";
import Card from "../components/Card.vue";
import CardEdition from "../components/CardEdition.vue";
import TaskStateEnum from "../enums/TaskStateEnum";
import TaskPositionEnum from "../enums/TaskPositionEnum";
import { cardPosition } from "../utils/CardPosition";
import { Container, Draggable } from "vue3-smooth-dnd";

export default {
  name: "Dashboard",
  components: {
    CardEdition,
    Container,
    Draggable,
    Card,
  },
  created() {
    this.TaskStateEnum = TaskStateEnum;
    this.TaskPositionEnum = TaskPositionEnum;
  },
  setup() {
    const taskId = ref(null);
    const taskName = ref(null);
    const taskToEdit = ref(null);
    const tasksStore = useTasksStore();
    const store = useUserStore();

    const dropPlaceholderOptions = ref({
      className: "drop-preview",
      animationDuration: "150",
      showOnTop: false,
    });

    const createNewTask = () => {
      const position = cardPosition(
        tasksStore.pendingTasks,
        TaskPositionEnum.BOTTOM
      );
      const newTask = {
        user_id: store.user.id,
        title: taskName.value.value,
        pos: position,
      };
      tasksStore.createTask(newTask);
    };

    const deleteTask = (taskId) => {
      tasksStore.deleteTask(taskId);
    };

    const getChildPayload1 = (index) => {
      return tasksStore.pendingTasks[index];
    };
    const getChildPayload2 = (index) => {
      return tasksStore.inProcessTasks[index];
    };
    const getChildPayload3 = (index) => {
      return tasksStore.completedTasks[index];
    };

    const handleDrop = (state, dropResult) => {
      const { removedIndex, addedIndex, payload } = dropResult;
      if (removedIndex === addedIndex) return;

      if (addedIndex !== null) {
        let tasks = null;
        switch (state) {
          case TaskStateEnum.COMPLETED:
            tasks = tasksStore.completedTasks;
            break;

          case TaskStateEnum.IN_PROGRESS:
            tasks = tasksStore.inProcessTasks;
            break;

          default:
            tasks = tasksStore.pendingTasks;
            break;
        }
        const position = cardPosition(tasks, addedIndex);
        tasksStore.markAs(state, payload.id, position);
      }
    };

    onMounted(() => {
      tasksStore.fetchTasks();
      if (tasksStore.tasks.length > 0) taskToEdit.value = tasksStore.tasks[0];
    });

    return {
      taskId,
      taskName,
      tasksStore,
      taskToEdit,
      dropPlaceholderOptions,
      createNewTask,
      deleteTask,
      getChildPayload1,
      getChildPayload2,
      getChildPayload3,
      handleDrop,
    };
  },
};
</script>

<style scoped>
:deep(path) {
  color: #fff;
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
  width: 24em;
  max-height: 70vh;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0 15px 30px 15px;
  margin-bottom: 24px;
  border-radius: 0 0 15px 15px;
  background: #f5f4f8;
  vertical-align: top;
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
</style>
