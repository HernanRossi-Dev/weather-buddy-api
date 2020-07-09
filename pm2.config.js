module.exports = {
  apps : [{
    name      : 'WeatherBuddy',
    script    : 'server.js',
    node_args : '-r dotenv/config',
  }],
}