async function run() {
  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(
    "https://xbqhtcqvbcndikuqsesz.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhicWh0Y3F2YmNuZGlrdXFzZXN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2NzExOTEsImV4cCI6MjA5NjI0NzE5MX0.nmXeAvGQMfsamFDapBzO0JJiMXCqov7LNEyuUlnSJA8"
  );

  // Test connection
  const { data, error } = await supabase.from("members").select("id").limit(1);
  if (error && error.code === "42P01") {
    console.log("Tables not found — need service role key to run DDL via API.");
    console.log("Anon keys cannot execute CREATE TABLE statements.");
    console.log("Please run supabase-schema.sql manually in the SQL Editor.");
  } else if (error) {
    console.error("Connection error:", error.message);
  } else {
    console.log("Tables already exist! Connected successfully.");
    console.log("members rows:", data);
  }
}

run();
