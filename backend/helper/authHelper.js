import bcrypt from "bcrypt"
export let encryptPassword= async(password)=>{
    let salt=10
    let hassedPassword=bcrypt.hash(password,salt)
    return hassedPassword
}
export let matchPassword= async(password,hashPassword)=>{
    return bcrypt.compare(password,hashPassword)
}