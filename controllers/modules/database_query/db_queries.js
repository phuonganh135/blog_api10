const Pool = require('pg').Pool;
var commonModule = require('../common.js');
var dbConfig = require('../../db_config.json');
const pool = new Pool(dbConfig);

/* module.exports.getDatabaseQuery = function ( callback) {
    pool.query('SELECT * FROM detai as dt , sinhvien_dk_detai as svdkdt , sinhvien as sv , trangthai_dangki as ttdk WHERE svdkdt.sv_ma = sv.sv_ma and svdkdt.dt_ma = dt.dt_ma and svdkdt.ttdk_ma = ttdk.ttdk_ma and svdkdt.sv_ma=\'B1507297\' and dt.dt_ma=6 and dt.dt_xoa = 0 and sv.sv_xoa=0 and svdkdt.svdkdt_xoa=0 and ttdk.ttdk_xoa=0 and svdkdt.ttdk_ma=\'cn\'', (error, results) => {
        callback(error, results.rows);
    }); 
}; */


module.exports.getDatabaseQuery = function ( callback) {
    pool.query('SELECT * FROM trangthai_dangki', (error, results) => {
        callback(error, results.rows);
    });
};


module.exports.updateDatabaseQuery = function ( callback) {

    pool.query('UPDATE trangthai_dangki SET ttdk_ten=\'Đang thực hiện\' WHERE ttdk_ma=$1', ['cn'], (error, result) => {
        callback(error, result);
    });
};

module.exports.craeteDatabaseQuery = function ( callback) {

    pool.query('INSERT INTO trangthai_dangki VALUES (\'tcbc\',\'Từ chối báo cáo\',0)', (error, result) => {
        callback(error, result);
    });
};