/**
 * Created by xuanjinliang on 2018/10/23.
 */

const config =  {
  log_date_format: "YYYY-MM-DD HH:mm:SS",
  merge_logs: true,
  log_file: "../pm2_monitor_log/logs/pm2_monitor.log",
  error_file: "../pm2_monitor_log/logs/pm2_monitor_Err.log",
  out_file: "../pm2_monitor_log/logs/pm2_monitor_Out.log",
  pid_file: "../pm2_monitor_log/logs/pm2_monitor.pid",
  max_restarts: 1000,
  max_memory_restart: "1G",
  watch: true,
  ignore_watch: [
    ".*",
    "node_modules",
    "README.md",
    "nodemon.json",
    "testScript"
  ],
  env_production: {
    NODE_ENV: "production"
  },
  env_dev: {
    NODE_ENV: "development"
  },
  env_test: {
    NODE_ENV: "test"
  },
  env_prepare: {
    NODE_ENV: "prepare"
  }
};

let configArray = [
  {
    name: "pm2_monitor",
    script: "bin/www",
    exec_mode: "fork",
    instances: "1"
  }
];

configArray = configArray.map((o) => Object.assign({}, config, o));

module.exports = {
  apps : configArray
};
