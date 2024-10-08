"use client"

import Link from 'next/link';
import { useFormState } from 'react-dom';
import { auth } from "@/action/auth-action"


export default function AuthForm({ mode }) {
  const [formState, formAction] = useFormState(auth.bind(null, mode), {}) 


  return (
    <form id="auth-form" action={formAction}>
      <div>
        <img src="/images/auth-icon.jpg" alt="A lock icon" />
      </div>
      <p>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </p>
      {formState?.errors && (<ul id="form-errors">{Object.keys(formState?.errors).map((error) => <li key={error}>{formState?.errors[error]}</li>)}</ul>)}
      <p className='mt-10'>
        <button type="submit">
          {mode === "login" ? "Login" : "Create Account"}
        </button>
      </p>
      <p>
        {mode === "signUp" ? <Link href={"/?mode=login"}>Create an account.</Link>
          : <Link href={"/?mode=signUp"}>Login with existing account.</Link>}
      </p>
    </form>
  )
};
