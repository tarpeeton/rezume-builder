import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://nshroozdxiowxyogqxhj.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zaHJvb3pkeGlvd3h5b2dxeGhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyMDI1NjYsImV4cCI6MjA2OTc3ODU2Nn0.IsMf04c7PxC_dnxTqxxxYl6ndns_oRZExyQ_PjP1zhI";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
