import mysql from 'mysql2/promise'

export class MySQLStore {
  constructor() {
    const connectionString =
      process.env.MYSQL_URI || 'mysql://root:password@localhost:3306/mystore'
    this.pool = mysql.createPool(connectionString)
  }

  list = async (table) => {
    try {
      const [rows] = await this.pool.query(`SELECT * FROM ??`, [table]) // Uso de parámetros seguros
      return rows
    } catch (error) {
      console.error(
        `[MySQLStore] Error fetching data from table "${table}":`,
        error
      )
      throw error
    }
  }

  getById = async (table, id) => {
    try {
      const [rows] = await this.pool.query(`SELECT * FROM ?? WHERE id = ?`, [
        table,
        id
      ])
      return rows[0] || null // Retorna el primer resultado o null si no encuentra nada
    } catch (error) {
      console.error(
        `[MySQLStore] Error fetching data by ID (${id}) from table "${table}":`,
        error
      )
      throw error
    }
  }

  close = async () => {
    try {
      await this.pool.end() // Cierra todas las conexiones en el pool
      console.log('[MySQLStore] Connection pool closed.')
    } catch (error) {
      console.error('[MySQLStore] Error closing connection pool:', error)
      throw error
    }
  }
}
