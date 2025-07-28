
import getConnection from "../config/db";
import { prisma } from "../config/client";

const handleUser = async (
    fullName: string, 
    email: string, 
    address: string,
    role: string = "",
    phone: string = ""
) => {
 await prisma.user.create({
    data: {
       fullName: fullName,
      username: email,
      address: address,
      password: "",
      accoutType: "",
    }
  })
};
const getAllRoles = async () => {
  const roles = await prisma.role.findMany()
  return roles;
  
}
const getAllUsers = async () => {
  const users = await prisma.user.findMany()
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
    where: { id: +id }
  })
  return user;
}
const handleUpdateUser = async (id: string, fullName: string, email: string, address: string) => {
  const updateUser = await prisma.user.update({
    where: {id: +id},
    data: {
      fullName: fullName,
      username: email,
      address: address,
      password: "",
      accoutType: "",
    }
  })
  return updateUser;
}
export { handleUser, getAllUsers,handleDeleteUser,getUserById, handleUpdateUser,getAllRoles };
