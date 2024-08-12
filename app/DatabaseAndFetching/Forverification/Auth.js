import { jwtVerify } from 'jose';


export default async function Cookiechecker(token) {
    try {
        const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_CODE))
        return payload
    } catch (err) {
        console.error("Invalid token", err)
        return null
    }
}
