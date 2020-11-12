import bcrypt from 'bcrypt';

const encryptPassword =  async (plainPass: string, saltRounds: number) => {
        const hashedPassword:string = await new Promise((resolve, reject) => {
            bcrypt.hash(plainPass, saltRounds, (err, hash) => {
                if (err) reject(err)
                resolve(hash)
            });
        })
    return hashedPassword;
}
export default encryptPassword;
