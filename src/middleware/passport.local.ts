import { prisma } from "../config/client";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getUserWithRoleId } from "services/client/auth.service";
import { comparePassword } from "services/user.service";

const configPassportLocal =  () => {
passport.use(new LocalStrategy(
    {
         passReqToCallback: true
    },
    async function verify(req, username, password, callback) {
    const {session} = req as any;
    if(session?.messages?.length) {
        session.messages = [];
    }
     const user = await prisma.user.findUnique({
    where: { username }
 }) 
    if(!user) {
        // throw new Error(`Username: ${username} not found`);
        return callback(null, false, { message: `Username: ${username} not found` });
    }
    const isMatch = await comparePassword(password, user.password);
    if(!isMatch) {
        return callback(null, false, { message: 'Incorrect username or password.' });
    }
    return callback(null, user as any);
}));

passport.serializeUser(function(user:any, callback) {
    callback(null, { id: user.id, username: user.username });
});

passport.deserializeUser(async function(user:any, callback) {
    const { id, username } = user;
    //query to database
    const userInDB: any = await getUserWithRoleId(id);
    return callback(null, {...userInDB});
});
}
export default configPassportLocal; 