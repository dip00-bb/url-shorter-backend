import jwt from "jsonwebtoken"

export const generateToken = (payload, secretKey, expireDate, backupDate) => {
    const token = jwt.sign(
        { userId: payload },
        secretKey,
        { expiresIn: expireDate || backupDate }

    )

    return token
}