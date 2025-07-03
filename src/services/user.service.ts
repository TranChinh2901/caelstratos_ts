import getConnection from "../config/db";

const handleUser = async (
    name: string, 
    email: string, 
    address: string
) => {
  // console.log(`User created: Name: ${name}, Email: ${email}, Address: ${address}`);
  const connection = await getConnection();
  try {
    const sql =
      "INSERT INTO `users`(`name`, `email`, `address`) VALUES (?, ?, ?)";
    const values = [name, email, address];
    const [result, fields] = await connection.execute(sql, values);
  } catch (error) {
    console.log(error);
    return [];
  }
};
const getAllUsers = async () => {
  const connection = await getConnection();
  try {
    const [results, fields] = await connection.execute("SELECT * FROM `users`");
    return results;
  } catch (error) {
    console.error("Database connection failed:", error);
    return [];
  }
};
const handleDeleteUser = async (id: string) => {
  try { 
  const connection = await getConnection();
  const sql = 'DELETE FROM `users` WHERE `id` = ? LIMIT 1';
  const values = [id];
  const [result, fields] = await connection.execute(sql, values);
  return result;
} catch (err) {
  console.log(err);
}
}
const getUserById = async (id: string) => {
  const connection = await getConnection();
  try {
  const sql = 'SELECT * FROM `users` WHERE `id` = ? ';
  const values = [id];
const [result, fields] = await connection.execute(sql, values);
return Array.isArray(result) ? result[0] : null;
} catch (err) {
  console.log(err);
}
}
const handleUpdateUser = async (id: string, name: string, email: string, address: string) => {
  const connection = await getConnection();
  try {
    const sql = 'UPDATE `users` SET `name` = ?, `email` = ?, `address` = ? WHERE `id` = ?';
    const values = [name, email, address, id];
    const [result, fields] = await connection.execute(sql, values);
    return result;
  } catch (error) {
    console.error("Error updating user:", error);
    return null;
  }
  }
export { handleUser, getAllUsers,handleDeleteUser,getUserById, handleUpdateUser };
