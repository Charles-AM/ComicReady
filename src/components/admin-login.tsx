'use client';
import Link from 'next/link';
import {useActionState} from 'react';
import {login} from '@/app/thgizcblljqbah/actions';
import {ADMIN_PATH} from '@/lib/admin-route';
export function AdminLogin(){const [state,action,pending]=useActionState(login,{});return <form action={action} className="form-stack"><label>Email<input name="email" type="email" autoComplete="username" required/></label><label>Password<input name="password" type="password" autoComplete="current-password" required/></label>{state.error&&<p role="alert" className="error-message">{state.error}</p>}<button className="button" disabled={pending}>{pending?'Signing in…':'Sign in'}</button><Link href={`${ADMIN_PATH}/forgot-password`}>I need to set or reset my password</Link></form>;}
