const Pool = require('pg').Pool;
var commonModule = require('../common.js');
var dbConfig = require('../../db_config.json');
const pool = new Pool(dbConfig);

module.exports.getDatabaseQuery = function ( callback) {
    pool.query('SELECT * FROM detai', (error, results) => {
        callback(error, results.rows);
    }); 
};


/* module.exports.getDatabaseQuery = function ( callback) {
    pool.query('SELECT * FROM hocki', (error, results) => {
        callback(error, results.rows);
    });
}; */


module.exports.updateDatabaseQuery = function ( callback) {

    pool.query('UPDATE gianvien_huongdan SET gvhd_xoa=0 WHERE gv_ma=$1', ['GV1501213'], (error, result) => {
        callback(error, result);
    });
};