
import { prisma } from "../config/client";
import { ACCOUNT_TYPE } from "../config/constant";
import bcrypt from 'bcrypt';
const saltRounds = 10;

const hashPassword = async (plainText: string) => {
  return await bcrypt.hash(plainText, saltRounds);
}
const comparePassword = async (plainText: string, hashedPassword: string) => {
  return await bcrypt.compare(plainText, hashedPassword);
}
const handleUser = async (
    fullName: string, 
    email: string, 
    address: string,
    // role: string = "",
    avatar: string = "",
    phone: string = "",
    role: string
) => {
  const hashedPassword = await hashPassword("123456");
 await prisma.user.create({
    data: {
       fullName: fullName,
      username: email,
      address: address,
      password: hashedPassword,
      accoutType: ACCOUNT_TYPE.SYSTEM,
      avatar: avatar,
      phone: phone,
      roleId: +role
    }
  })
};
const getAllRoles = async () => {
  const roles = await prisma.role.findMany()
  return roles;
  
}
const getAllUsers = async () => {
  const users = await prisma.user.findMany({
    include: {
      role: true
    }
  })
  return users
};
const handleDeleteUser = async (id: string) => {
  const deleteUser = await prisma.user.delete({
    where: {id: +id} 
  })
  return deleteUser;
}
const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id: +id },
    include: {
      role: true
    }
  })
  return user;
}
const handleUpdateUser = async (
  id: string, 
  fullName: string, 
  email: string, 
  address: string,
  avatar: string = "",
  phone: string,
  role: string
) => {
  const updateData: any = {
    fullName: fullName,
    username: email,
    address: address,
    phone: phone,
    roleId: +role
  };

  // Chỉ update avatar nếu có file mới
  if (avatar) {
    updateData.avatar = avatar;
  }

  const updateUser = await prisma.user.update({
    where: {id: +id},
    data: updateData
  })
  return updateUser;
}
export { handleUser, getAllUsers,handleDeleteUser,getUserById, handleUpdateUser,getAllRoles, hashPassword, comparePassword };
