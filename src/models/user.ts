import Client  from "../database";
import bcrypt from 'bcrypt'

export type User = {
    id?: number,
    first_name: string,
    last_name: string,
    password:string,  
    token?: string
  }

export class UserModel {
    tableName:string = 'users'
  async index(): Promise<User[]> {
    try {
      
      const conn = await Client.connect()
      const sql = `SELECT * FROM ${this.tableName}`

      const result = await conn.query(sql)

      conn.release()

      return result.rows 
    } catch (err) {
      throw new Error(`Could not get exams. Error: ${err}`)
    }
  }

  async show(id: number): Promise<User> {
    try {
    const sql = `SELECT * FROM ${this.tableName} WHERE id=($1)`
    
    const conn = await Client.connect()

    const result = await conn.query(sql, [id])

    conn.release()

    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find user ${id}. Error: ${err}`)
    }
  }

  async create(u: User): Promise<User> {
      try {
        const pepper = process.env.BCRYPT_PASSWORD
        const hash = bcrypt.hashSync(
          u.password + pepper, 
          parseInt(process.env.SALT_ROUNDS as string)
       );
    const sql = `INSERT INTO ${this.tableName} (first_name, last_name, password) VALUES($1, $2, $3) RETURNING *`
    // @ts-ignore
    const conn = await Client.connect()

    const result = await conn.query(sql, [u.first_name, u.last_name, hash])
    const user = result.rows[0]
    
    

    conn.release()

    return user
      } catch (err) {
          throw new Error(`Could not add new user ${u.first_name}. Error: ${err}`)
      }
  }

  async delete(id: number): Promise<User> {
      try {
    const sql = `DELETE FROM ${this.tableName} WHERE id=($1)`
    // @ts-ignore
    const conn = await Client.connect()

    const result = await conn.query(sql, [id])

    const user = result.rows[0]

    conn.release()

    return user
      } catch (err) {
          throw new Error(`Could not delete user ${id}. Error: ${err}`)
      }
  }

  async authenticate(firstName:string,password:string): Promise<User | null> {
    const conn = await Client.connect()
    const sql = `SELECT * FROM ${this.tableName} WHERE first_name=($1)`
    const result = await conn.query(sql, [firstName])
    if (result.rows.length) {
      const user = result.rows[0]

      const pepper = process.env.BCRYPT_PASSWORD
      if (bcrypt.compareSync(password+pepper, user.password)) {
      
        return user
      }
    }
    return null
  }

}
