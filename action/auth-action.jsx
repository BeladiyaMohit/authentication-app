'use server';

async function signup(prevState,formData){
const email=formData.get("email")
const password=formData.get("password")
let error={}
if(!email.includes("@")){
    error.email="please enter a valid email address.";
}

if(password.length<8){
    error.password="Password must be at least 8 character long.";
}

if(Object.keys(error).length>0){
    return {errors:error}
}

}

export default signup