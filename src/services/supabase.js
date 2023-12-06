import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qblcbrcphvmfjawrimgl.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFibGNicmNwaHZtZmphd3JpbWdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcxNDc3NjksImV4cCI6MjAxMjcyMzc2OX0.a4SvcPTWoGvI6_l8nb1aA_iLJxFywA9LO3-Jq-w9b9M";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
