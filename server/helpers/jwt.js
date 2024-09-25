import jwt from 'jsonwebtoken'

const createToken = async (user) => {
    const token = await jwt.sign({ id: user._id }, process.env.jwt_SECRET, {
        expiresIn: '1d'
    })

    return token
}

export { createToken }