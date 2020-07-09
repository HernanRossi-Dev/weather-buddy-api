import { Server } from "http"
import app from './app'
import { logger } from "./utils";

const PORT = process.env.PORT || 8080;
let server: Server = app.listen(PORT, () => {
  logger.debug('Application started on port 8080.')
})

export default server