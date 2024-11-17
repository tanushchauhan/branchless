import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://eeruzunpaegoccciofsk.supabase.co";
const supabaseKey = process.env.SUPABASE_SUPER_KEY;
const supabase2 = createClient(supabaseUrl, supabaseKey!);
export default supabase2;
