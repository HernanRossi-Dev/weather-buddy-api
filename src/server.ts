import { Server } from "http"
import app from './app'
import { logger } from "./utils";

const PORT = 8080;
let server: Server = app.listen(PORT, () => {
  console.log(`Application started on port ${PORT}.`)
  logger.debug(`Application started on port ${PORT}.`)
})

export default server