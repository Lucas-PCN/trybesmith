import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { Credentials, User, Id } from '../interfaces/user.interface';
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
  async getId(username:string): Promise<Id> {
    const result = await connection.query<RowDataPacket[]>(
      'SELECT id FROM Trybesmith.Users WHERE username=?',
      [username],
    );

    const [[row]] = result;
    return row as Id;
  },
};

export default userModel;