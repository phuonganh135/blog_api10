const Pool = require('pg').Pool;
var commonModule = require('../common.js');
var dbConfig = require('../../db_config.json');
const pool = new Pool(dbConfig);

module.exports.getDatabaseQuery = function ( callback) {
    pool.query('SELECT * FROM detai as dt , sinhvien_dk_detai as svdkdt , sinhvien as sv , trangthai_dangki as ttdk WHERE svdkdt.sv_ma = sv.sv_ma and svdkdt.dt_ma = dt.dt_ma and svdkdt.ttdk_ma = ttdk.ttdk_ma and svdkdt.sv_ma=\'B1507297\' and dt.dt_ma=6 and dt.dt_xoa = 0 and sv.sv_xoa=0 and svdkdt.svdkdt_xoa=0 and ttdk.ttdk_xoa=0 and svdkdt.ttdk_ma=\'cn\'', (error, results) => {
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