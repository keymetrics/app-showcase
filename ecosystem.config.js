module.exports = {
  apps : [{
    name   : "API",
    script : "./app.js"
  }],

  deploy : {
    production : {
      user : "ubuntu",
      host : "163.172.176.141",
      ref  : "origin/master",
      repo : "git@github.com:keymetrics/app-showcase.git",
      path : "/var/www/production",
      "post-deploy" : "npm install && pm2 startOrRestart ecosystem.config.js --env production"
    }
  }
}
