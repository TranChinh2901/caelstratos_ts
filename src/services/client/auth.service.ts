import { ACCOUNT_TYPE } from "../../config/constant";
import { prisma } from "../../config/client";
import { comparePassword, hashPassword } from "services/user.service";


const isEmailExist = async (email: string): Promise<boolean> => {
    const user = await prisma.user.findUnique({
        where: { username: email }
    })
    if(user) {
        return true;
    }
    return false;
}
const registerNewUser = async (
    fullName: string,
    email: string,
    password: string
) => {
    const newPassword = await hashPassword(password);
    const userRole = await prisma.role.findUnique({
        where: {
            name: "USER"
        }
    })
    if(userRole) {
        await prisma.user.create({
            data: {
                username: email,
                password: newPassword,
                fullName: fullName,
                accoutType: ACCOUNT_TYPE.SYSTEM,
                roleId: userRole.id
            }
        });
    } else {
        throw new Error("User role not found");
    }
}

export { isEmailExist, registerNewUser };