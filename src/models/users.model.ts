import { ResultSetHeader } from 'mysql2';
import { User } from '../interfaces/user.interface';
import connection from './connection';

const userModel = {
  async create(user: User): Promise<void> {
    const { username, classe, level, password } = user;
    const query = `INSERT INTO Trybesmith.Users (username, classe, level, password)
    VALUES (?, ?, ?, ?);`;
    await connection.execute<ResultSetHeader>(query, [username, classe, level, password]);
  },
};

export default userModel;