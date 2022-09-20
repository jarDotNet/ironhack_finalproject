import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useAlertStore } from "./alert";

const alertStore = useAlertStore();

export default defineStore("tasks", {
  state: () => ({
    tasks: [],
  }),
  actions: {
    async fetchTasks() {
      const { data: tasks } = await supabase
        .from("tasks")
        .select("*")
        .order("id", { ascending: false });
      this.tasks = tasks;
    },
    async createTask(newTask) {
      const { data: taskCreated, error } = await supabase
        .from("tasks")
        .insert([newTask]);
      if (error) {
        console.log(error);
        alertStore.error();
      } else {
        alert(`Task ${taskCreated[0].id} created!`);
        this.tasks.push(taskCreated[0]);
      }
    },
    async deleteTask(taskId) {
      const { data, error } = await supabase
        .from("tasks")
        .delete()
        .match({ id: taskId });
      if (error) {
        console.log(error);
        alertStore.error();
      } else {
        alert(`Task ${taskId} deleted!`);
        this.tasks = this.tasks.filter((task) => task.id !== taskId);
      }
    },
  },
});
