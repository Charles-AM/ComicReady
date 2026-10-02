'use client';
import {useActionState} from 'react';
import {login} from '@/app/thgizcblljqbah/actions';
export function AdminLogin(){const [state,action,pending]=useActionState(login,{});return <form action={action} className="form-stack"><label>Email<input name="email" type="email" autoComplete="username" required/></label><label>Password<input name="password" type="password" autoComplete="current-password" required/></label>{state.error&&<p role="alert" className="error-message">{state.error}</p>}<button className="button" disabled={pending}>{pending?'Signing in…':'Sign in'}</button></form>;}
