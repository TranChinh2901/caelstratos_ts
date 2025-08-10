
import { Request, Response } from "express";
import { registerNewUser } from 'services/client/auth.service';
import { RegisterSchema, TRegisterSchema } from 'src/validation/register.schema';

const getRegisterPage = async (req: Request, res: Response): Promise<void> => {
    // return res.render('client/auth/register.ejs');
    return res.render('client/auth/register.ejs', {
        errors: [],
        oldData: {}
    });
}
const getLoginPage = async (req: Request, res: Response): Promise<void> => {
    const {session} = req as any;
    const messages = session?.messages ?? [];
    return res.render('client/auth/login.ejs',
        {
            messages
        }
    );
}
const postRegister = async (req: Request, res: Response): Promise<void> => {
    const { fullName, email, password, confirmPassword } = req.body as TRegisterSchema;
    const validate = await RegisterSchema.safeParseAsync(req.body);
    if(!validate.success) {
        const errorsZod = validate.error.issues;
        const errors = errorsZod?.map(item => `${item.message} (${String(item.path[0])})`)

        const oldData = {
            fullName,
            email,
            password,
            confirmPassword
        }
        return res.render('client/auth/register.ejs', {
            errors,
            oldData
        });
    }
    await registerNewUser(fullName, email, password);
    return res.redirect('/login');
}
export { getLoginPage, getRegisterPage, postRegister };