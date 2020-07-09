import { Server } from "http"
import app from './app'
import { logger } from "./utils";

const PORT = 80;
let server: Server = app.listen(PORT, () => {
  logger.debug('Application started on port 80.')
})

export default server