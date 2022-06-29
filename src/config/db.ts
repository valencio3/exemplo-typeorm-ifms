import { AppDataSource } from '../data-source'

export const connectToDB = async () => {
  try {
    const dataSource = await AppDataSource.initialize()
    console.log(`App connected to DB ${dataSource.options.database}`)

    process.on('SIGINT', async () => {
      await dataSource.destroy()
      console.log('Connection to DB closed')
    })
  } catch (error) {
    console.log(error)
  }
}
