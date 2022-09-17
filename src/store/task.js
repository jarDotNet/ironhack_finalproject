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
          user_id: "38c4d7d9-27dd-4fcd-8d87-d493aa7684b2",
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
