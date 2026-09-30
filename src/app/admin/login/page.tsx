import { AdminLogin } from '@/components/admin-login';
import { configured } from '@/lib/supabase/server';
export default function Login(){return <section className="page-section reading"><p className="eyebrow">PRIVATE EDITORIAL DESK</p><h1 className="page-title">Admin sign-in.</h1>{configured()?<AdminLogin/>:<p className="notice">Admin setup is required. Configure the Supabase project keys, apply the migration, and add your account to the private admin_users table. See SETUP.md in the repository. There is no public sign-up.</p>}</section>;}
