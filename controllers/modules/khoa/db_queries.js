const Pool = require('pg').Pool;
var commonModule = require('../common.js');
var dbConfig = require('../../db_config.json');
const pool = new Pool(dbConfig);

module.exports.createKhoa = function (khoaInfo, callback) {
    const { k_ma, k_ten, k_xoa } = khoaInfo;

    pool.query('INSERT INTO khoa (k_ma, k_ten, k_xoa) VALUES ($1, $2, $3)', [k_ma, k_ten, k_xoa], (error, result) => {
        callback(error, result);
    });
};

module.exports.getKhoaList = function (callback) {
    pool.query('SELECT * FROM khoa WHERE k_xoa=0', (error, results) => {
        callback(error, results.rows);
    });
};


module.exports.updateKhoaInfo = function (k_ma, khoaInfo, callback) {
    const { k_ten  } = khoaInfo;

    pool.query('UPDATE khoa set k_ten=$1 WHERE k_ma=$2 ', [k_ten , k_ma], (error, result) => {
        callback(error, result);
    });
};


module.exports.deleteKhoa = function (k_ma, callback) {
    pool.query('UPDATE khoa set k_xoa=1 WHERE k_ma=$1', [k_ma], (error, result) => {
        callback(error, result);
    });
};


module.exports.getKhoaInfo = function (k_ma , callback) {
    pool.query('SELECT * FROM khoa WHERE k_xoa=0 and k_ma=$1', [k_ma], (error, results) => {
        callback(error, results.rows);
    });
};