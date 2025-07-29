import { hashPassword } from "services/user.service";
import { prisma } from "./client";
import { ACCOUNT_TYPE } from "../config/constant";

const initDatabase = async () => {
    const userCount = await prisma.user.count();
    const roleCount = await prisma.role.count();
    if(roleCount === 0) {
        await prisma.role.createMany({
        data: [
            {
                name: "ADMIN",
                description: "Admin thi full quyen"
            },
            {
                name: "USER",
                description: "User thong thuong"
            }
        ]
    })
    }  
    if(userCount === 0) {
        const hashedPassword = await hashPassword("123456");
        const adminRole = await prisma.role.findFirst({
            where: { name: "ADMIN" }
        }) 
        if(adminRole)
        await prisma.user.createMany({
        data: [
            {
                fullName: "Trans Viet Chinh",
                username: "a@gmail.com",
                password: hashedPassword,
                accoutType: ACCOUNT_TYPE.SYSTEM,
                roleId: adminRole.id
            },
            {
                fullName: "ADMIN",
                username: "b@gmail.com", 
                password: hashedPassword,
                accoutType: ACCOUNT_TYPE.SYSTEM,
                roleId: adminRole.id
            }
        ]
    })
    } 
    if(roleCount !== 0 && userCount !== 0) {
        console.log("Database already seeded with users.");
    }
}
export default initDatabase;