import Client  from "../database";

export type Order = {
    id?: number,
    user_id: number,
    status: string}

export class OrderModel {
  tableName:string = 'orders'
  async index(): Promise<Order[]> {
    try {
      
      const conn = await Client.connect()
      const sql = `SELECT * FROM ${this.tableName}`

      const result = await conn.query(sql)

      conn.release()

      return result.rows 
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`)
    }
  }

  async showUserOrder(user_id: number): Promise<Order> {
    try {
    const sql =  `SELECT * FROM ${this.tableName} WHERE user_id=($1)`
    
    const conn = await Client.connect()

    const result = await conn.query(sql, [user_id])

    conn.release()

    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find user order ${user_id}. Error: ${err}`)
    }
  }



  async create(o: Order): Promise<Order> {
      try {
    const sql = 'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *'
    // @ts-ignore
    const conn = await Client.connect()

    const result = await conn
        .query(sql, [o.user_id, o.status])

    const order = result.rows[0]

    conn.release()

    return order
      } catch (err) {
          throw new Error(`Could not add new order ${o.user_id}. Error: ${err}`)
      }
  }

  async delete(id: number): Promise<Order> {
      try {
    const sql = `DELETE FROM ${this.tableName} WHERE id=($1) RETURNING *`
    // @ts-ignore
    const conn = await Client.connect()

    const result = await conn.query(sql, [id])

    const order = result.rows[0]

    conn.release()

    return order
      } catch (err) {
          throw new Error(`Could not delete order ${id}. Error: ${err}`)
      }
  }
}
