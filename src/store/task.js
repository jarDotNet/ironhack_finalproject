import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useAlertStore } from "./alert";
import TaskStateEnum from "../enums/TaskStateEnum";

const alertStore = useAlertStore();

export default defineStore("tasks", {
  state: () => ({
    tasks: [],
  }),
  getters: {
    pendingTasks: (state) =>
      state.tasks
        .filter((task) => task.current_state == TaskStateEnum.PENDING)
        .sort((t1, t2) => t1.pos - t2.pos),
    inProcessTasks: (state) =>
      state.tasks
        .filter((task) => task.current_state == TaskStateEnum.IN_PROGRESS)
        .sort((t1, t2) => t1.pos - t2.pos),
    completedTasks: (state) =>
      state.tasks
        .filter((task) => task.current_state == TaskStateEnum.COMPLETED)
        .sort((t1, t2) => t1.pos - t2.pos),
  },
  actions: {
    async fetchTasks() {
      alertStore.clear();
      const { data: tasks, error } = await supabase
        .from("tasks")
        .select()
        .order("pos", { ascending: true });
      this.tasks = tasks;
      if (error) {
        console.log(error);
        alertStore.error();
      }
    },
    async createTask(newTask) {
      alertStore.clear();
      const { data: taskCreated, error } = await supabase
        .from("tasks")
        .insert([newTask]);
      if (error) {
        console.log(error);
        alertStore.error();
      } else {
        alertStore.success(`Task ${taskCreated[0].id} created!`);
        this.tasks.push(taskCreated[0]);
      }
    },
    async updateTask(taskId, title, state, priority, desc) {
      alertStore.clear();
      const { data, error } = await supabase
        .from("tasks")
        .update({
          title: title,
          current_state: state,
          priority: priority,
          description: desc,
        })
        .match({ id: taskId });
      if (error) {
        console.log(error);
        alertStore.error();
      } else {
        alertStore.success(`Task ${taskId} updated!`);
        this.tasks = this.tasks.map((task) =>
          task.id == taskId ? data[0] : task
        );
      }
    },
    async deleteTask(taskId) {
      alertStore.clear();
      const { data, error } = await supabase
        .from("tasks")
        .delete()
        .match({ id: taskId });
      if (error) {
        console.log(error);
        alertStore.error();
      } else {
        alertStore.success(`Task ${taskId} deleted!`);
        this.tasks = this.tasks.filter((task) => task.id !== taskId);
      }
    },
    async markAs(state, taskId, position) {
      alertStore.clear();
      const { data, error } = await supabase
        .from("tasks")
        .update({ current_state: state, pos: position })
        .match({ id: taskId });
      if (error) {
        console.log(error);
        alertStore.error();
      } else {
        alertStore.success(`Task ${taskId} state updated!`);
        this.tasks = this.tasks.map((task) =>
          task.id == taskId ? data[0] : task
        );
      }
    },
  },
});
