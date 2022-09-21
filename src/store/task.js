import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useAlertStore } from "./alert";
import TaskStateEnum from "../enums/TaskStateEnum";

const alertStore = useAlertStore();

export default defineStore("tasks", {
  state: () => ({
    tasks: [],
  }),
  actions: {
    async fetchTasks() {
      alertStore.clear();
      const { data: tasks, error } = await supabase
        .from("tasks")
        .select()
        .order("id", { ascending: false });
      if (error) {
        console.log(error);
        alertStore.error();
      } else {
        this.tasks = tasks;
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
    async markAsPending(taskId) {
      alertStore.clear();
      const { data, error } = await supabase
        .from("tasks")
        .update({ current_state: TaskStateEnum.PENDING })
        .match({ id: taskId });
      if (error) {
        console.log(error);
        alertStore.error();
      } else {
        alertStore.success(`Task ${taskId} state updated!`);
        this.tasks = this.tasks.map((task) =>
          task.id == taskId
            ? { ...task, current_state: TaskStateEnum.PENDING }
            : task
        );
        console.table(this.tasks);
      }
    },
    async markAsCompleted(taskId) {
      alertStore.clear();
      const { data, error } = await supabase
        .from("tasks")
        .update({ current_state: TaskStateEnum.COMPLETED })
        .match({ id: taskId });
      if (error) {
        console.log(error);
        alertStore.error();
      } else {
        alertStore.success(`Task ${taskId} state updated!`);
        this.tasks = this.tasks.map((task) =>
          task.id == taskId
            ? { ...task, current_state: TaskStateEnum.COMPLETED }
            : task
        );
      }
    },
    async markAsInProgress(taskId) {
      alertStore.clear();
      const { data, error } = await supabase
        .from("tasks")
        .update({ current_state: TaskStateEnum.IN_PROGRESS })
        .match({ id: taskId });
      if (error) {
        console.log(error);
        alertStore.error();
      } else {
        alertStore.success(`Task ${taskId} state updated!`);
        this.tasks = this.tasks.map((task) =>
          task.id == taskId
            ? { ...task, current_state: TaskStateEnum.IN_PROGRESS }
            : task
        );
      }
    },
  },
});
