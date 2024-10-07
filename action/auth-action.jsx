'use server';

import {createUser, getUserByEmail}from "@/lib/user"
import {createAuthSession}from "@/lib/auth"
import {hashUserPassword, verifyPassword,}from "@/lib/hash"
import { redirect } from "next/navigation";

export async function signup(prevState,formData){
const email=formData.get("email")
const password=formData.get("password")
let errors={}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function isValidPassword(password) {
  return password.length >= 8 && /\d/.test(password) && /[a-z]/.test(password) && /[A-Z]/.test(password);
}
  if (!isValidEmail(email)) {
    errors.email="Invalid email format";
  }
  if (!isValidPassword(password)) {
    errors.email="Password must meet minimum requirements";
  }

if(Object.keys(errors).length>0){
    return {errors:errors}
}
const hashedPassword=hashUserPassword(password)
try{
   const id= createUser(email,hashedPassword)
   await createAuthSession(id)
   redirect("/training")
}catch(error){
    if(error.code==="SQLITE_CONSTRAINT_UNIQUE"){
        return{
            errors:{email:"It seems like an account for the chosen email already exists."}
        }
    }
    throw error;
}
}

export async function login(prevState,formData){
const email=formData.get("email")
const password=formData.get("password")

const existingUser=getUserByEmail(email)

if(!existingUser){
    return {errors:{email:"Couldn't authenticate user, please check your credential."}}
}

const isValidPassword=verifyPassword(existingUser.password,password)

if(!isValidPassword){
    return{errors:{password:"Couldn't authenticate user, please check your credential."}}
}

   await createAuthSession(existingUser.id)
   redirect("/training")
}

export async function auth(mode,prevState,formData){
    if(mode==="login"){
       return login(prevState,formData)
    }
    return signup(prevState,formData)
}