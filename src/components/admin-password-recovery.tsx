'use client';

import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';
import { ADMIN_LOGIN_PATH, ADMIN_PATH } from '@/lib/admin-route';
import { browserDb } from '@/lib/supabase/browser';

export function AdminPasswordRequest() {
  const [pending, setPending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError('');
    const data = new FormData(event.currentTarget);
    const email = String(data.get('email') || '').trim();
    const { error: requestError } = await browserDb().auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}${ADMIN_PATH}/reset-password`,
    });
    setPending(false);
    if (requestError) {
      setError('The reset email could not be sent. Wait a moment and try again.');
      return;
    }
    setSent(true);
  }

  if (sent) {
    return <div className="form-stack"><p role="status" className="success-message">If that address belongs to an admin account, a password link is on its way. Check spam if it does not arrive.</p><Link href={ADMIN_LOGIN_PATH}>Back to sign in</Link></div>;
  }

  return <form className="form-stack" onSubmit={submit}><label>Email<input name="email" type="email" autoComplete="email" required /></label>{error&&<p role="alert" className="error-message">{error}</p>}<button className="button" disabled={pending}>{pending?'Sending…':'Send password link'}</button><Link href={ADMIN_LOGIN_PATH}>Back to sign in</Link></form>;
}

export function AdminPasswordUpdate() {
  const [ready, setReady] = useState(false);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState('Checking your password link…');
  const [error, setError] = useState('');

  useEffect(() => {
    const db = browserDb();
    let active = true;
    db.auth.getSession().then(({ data }) => {
      if (!active) return;
      if (data.session) {
        setReady(true);
        setMessage('');
      } else {
        setMessage('This password link is invalid or has expired. Request a new one.');
      }
    });
    const { data: listener } = db.auth.onAuthStateChange((_event, session) => {
      if (active && session) {
        setReady(true);
        setMessage('');
      }
    });
    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const password = String(data.get('password') || '');
    const confirmation = String(data.get('confirmation') || '');
    setError('');
    if (password.length < 12) {
      setError('Use at least 12 characters.');
      return;
    }
    if (password !== confirmation) {
      setError('The passwords do not match.');
      return;
    }
    setPending(true);
    const { error: updateError } = await browserDb().auth.updateUser({ password });
    setPending(false);
    if (updateError) {
      setError('The password could not be saved. Request a fresh link and try again.');
      return;
    }
    window.location.assign(ADMIN_PATH);
  }

  if (!ready) {
    return <div className="form-stack"><p role="status" className={message.startsWith('This')?'error-message':'muted'}>{message}</p>{message.startsWith('This')&&<Link href={`${ADMIN_PATH}/forgot-password`}>Request another link</Link>}</div>;
  }

  return <form className="form-stack" onSubmit={submit}><label>New password<input name="password" type="password" autoComplete="new-password" minLength={12} required /></label><label>Confirm new password<input name="confirmation" type="password" autoComplete="new-password" minLength={12} required /></label><p className="muted">Use at least 12 characters.</p>{error&&<p role="alert" className="error-message">{error}</p>}<button className="button" disabled={pending}>{pending?'Saving…':'Save password and continue'}</button></form>;
}
