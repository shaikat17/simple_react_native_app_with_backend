import bcrypt from 'bcrypt'

// hash function
const hashPass = async (pass) => {
    const newPass = await bcrypt.hash(pass, 10)

    return newPass
}

const matchPass = async (pass, hashPass) => {
    const isMatch = await bcrypt.compare(pass, hashPass)

    return isMatch
}

export { hashPass, matchPass }