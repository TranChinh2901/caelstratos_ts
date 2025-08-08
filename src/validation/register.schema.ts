
// import { isEmailExist } from "services/client/auth.service";
import { isEmailExist } from "../services/client/auth.service";
import z from "zod";

const passwordSchema = z 
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .max(20, { message: 'Password must not exceed 20 characters' });

const emailSchema = z
    .string()
    .email({ message: 'Email không đúng định dạng' })
    .refine(async (email) => {
        const existingUser = await isEmailExist(email); 
        return !existingUser;
    }, {
        message: 'Email đã tồn tại',
        path: ['email'],
    });

export const RegisterSchema = z.object({
    fullName: z.string().trim().min(1, { message: 'Tên không được để trống' }), 
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string()
}) 
.refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword'],
});

export type TRegisterSchema = z.infer<typeof RegisterSchema>;