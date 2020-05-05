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
    pool.query('SELECT * FROM binhluan', (error, results) => {
        callback(error, results.rows);
    });
};


module.exports.updateDatabaseQuery = function ( callback) {

    pool.query('UPDATE khoa SET  k_xoa=0 WHERE k_ma=\'CNTT\'', (error, result) => {
        callback(error, result);
    });
};

module.exports.craeteDatabaseQuery = function ( callback) {

    pool.query('INSERT INTO loai_thoigian  VALUES (8,\'Báo cáo niên luận cơ sở\',\'nlcs\',0)', (error, result) => {
        callback(error, result);
    });
};