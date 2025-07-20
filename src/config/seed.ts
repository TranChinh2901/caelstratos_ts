import { prisma } from "./client";

const initDatabase = async () => {
    const userCount = await prisma.user.count();
    if(userCount === 0) {
        await prisma.user.createMany({
        data: [
            {
                username: "a@gmail.com",
                password: "123456",
                accoutType: "SYSTEM"
            },
            {
                username: "b@gmail.com",
                password: "123456",
                accoutType: "USER"
            }
        ]
    })
    } else {
        console.log("Database already seeded with users.");
    }
}
export default initDatabase;