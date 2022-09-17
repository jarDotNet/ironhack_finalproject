import { createClient } from "@supabase/supabase-js";

// Raul:
const supabaseUrl = "https://myirmalszrpixdsvjfdv.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15aXJtYWxzenJwaXhkc3ZqZmR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjMyNjAzODYsImV4cCI6MTk3ODgzNjM4Nn0.RmKuVhnw84Lx-H2BgufnfUx5Ipmez4bIh7wg_oeCr8I";

// JarDotNet:
// const supabaseUrl = "https://nozuyhybxeuhlblvltfq.supabase.co";
// const supabaseAnonKey =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5venV5aHlieGV1aGxibHZsdGZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjMyNjI3OTcsImV4cCI6MTk3ODgzODc5N30.vv3ciY-tSJneWfPj8RbJCjgD-MbCtnoG2V5OVcE637o";

console.log(import.meta.env);
console.log(import.meta.env.VITE_SUPABASE_URL);
console.log(import.meta.env.PUBLIC_SUPABASE_URL);
console.log(import.meta.env.VUE_APP_SUPABASE_URL);
// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
