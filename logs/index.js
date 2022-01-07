
const {configure,getLogger} = require("log4js");


const {logs_config} = require("../config/default")
// logger.level = "debug";
// logger.debug("Some debug messages");


configure(logs_config);

// module.exports = dblogger =logger('db')
module.exports.accesslogger= getLogger('access')
module.exports.dblogger= getLogger('db')
module.exports.logger=getLogger()


// var log4js = require('log4js');

// log4js.configure({
//   appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
//   categories: { default: { appenders: ['cheese'], level: 'error' } }
// });

// exports.logger = function (level) {
//     var logger = log4js.getLogger("cheese");
//     logger.level = 'debug';
//     return logger;
// };



// log4js.configure({
//   appenders: { 
//     cheese: { type: "file", filename: "cheese.log" } },
//     access: { type: "file", filename: "access.log" } ,
//   categories: { 
//     default: { appenders: ["cheese"], level: "info" } },
//     access: { appenders: ["access"], level: "info" } 
// });


// const logger = log4js.getLogger("cheese");
// logger.trace("Entering cheese testing");
// logger.debug("Got cheese.");
// logger.info("Cheese is Comté.");
// logger.warn("Cheese is quite smelly.");
// logger.error("Cheese is too ripe!");
// logger.fatal("Cheese was breeding ground for listeria.");

// export const accessLog = getLogger()
