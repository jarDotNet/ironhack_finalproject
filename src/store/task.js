import { defineStore } from "pinia";
import { supabase } from "../supabase";

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
    async createTask() {
      const { data: newTask, error } = await supabase.from("tasks").insert([
        {
          user_id: "00926a73-c722-4f1a-bc54-dcfa298c68f0",
          title: "NEW TASK",
        },
      ]);
      if (error) {
        alert("ERROR: " + error);
        console.log(error);
      } else {
        this.tasks.push(newTask);
      }
    },
  },
});
