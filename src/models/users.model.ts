import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { Credentials, User } from '../interfaces/user.interface';
import connection from './connection';

const userModel = {
  async create(user: User): Promise<void> {
    const { username, classe, level, password } = user;
    const query = `INSERT INTO Trybesmith.Users (username, classe, level, password)
    VALUES (?, ?, ?, ?);`;
    await connection.execute<ResultSetHeader>(query, [username, classe, level, password]);
  },
  async findUser(username: string): Promise<Credentials> {
    const query = 'SELECT username, password FROM Trybesmith.Users WHERE username=?';
    const result = await connection.execute<RowDataPacket[]>(query, [username]);

    const [[row]] = result;
    return row as Credentials;
  },
};

export default userModel;