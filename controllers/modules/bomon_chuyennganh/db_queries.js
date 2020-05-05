const Pool = require('pg').Pool;
var commonModule = require('../common.js');
var dbConfig = require('../../db_config.json');
const pool = new Pool(dbConfig);


module.exports.createBoMonChuyenNganh = function (bomon_chuyennganhInfo, callback) {
    const { bmcn_ma, bmcn_ten, bmcn_xoa, k_ma } = bomon_chuyennganhInfo;

    pool.query('INSERT INTO bomon_chuyennganh (bmcn_ma, bmcn_ten, bmcn_xoa, k_ma) VALUES ($1, $2, $3, $4)', [bmcn_ma, bmcn_ten, bmcn_xoa, k_ma], (error, result) => {
        callback(error, result);
    });
};


module.exports.getBoMonChuyenNganhList = function (k_ma, callback) {
    pool.query('SELECT * FROM bomon_chuyennganh as bmcn , khoa as k WHERE bmcn.bmcn_xoa=0 and bmcn.k_ma = $1 and bmcn.k_ma=k.k_ma and k.k_xoa=0', [k_ma], (error, results) => {
        callback(error, results.rows);
    });
};

module.exports.getBoMonChuyenNganhListAll = function ( callback) {
    pool.query('SELECT * FROM bomon_chuyennganh as bmcn , khoa as k WHERE bmcn.bmcn_xoa=0 and bmcn.k_ma=k.k_ma and k.k_xoa=0', (error, results) => {
        callback(error, results.rows);
    });
};


module.exports.updateBoMonChuyenNganhInfo = function (bmcn_ma, bomon_chuyennganhInfo, callback) {
    const { bmcn_ten, k_ma  } = bomon_chuyennganhInfo;

    pool.query('UPDATE bomon_chuyennganh set bmcn_ten=$1 , k_ma=$2  WHERE bmcn_ma=$3 ', [bmcn_ten, k_ma, bmcn_ma], (error, result) => {
        callback(error, result);
    });
};


module.exports.deleteBoMonChuyenNganh = function (bmcn_ma, callback) {
    pool.query('UPDATE bomon_chuyennganh set bmcn_xoa=1 WHERE bmcn_ma=$1', [bmcn_ma], (error, result) => {
        callback(error, result);
    });
};


module.exports.getBoMonChuyenNganhInfo = function (bmcn_ma , callback) {
    pool.query('SELECT * FROM bomon_chuyennganh as bmcn, khoa as k WHERE bmcn.k_ma=k.k_ma and k.k_xoa=0 and bmcn.bmcn_xoa=0 and bmcn.bmcn_ma=$1', [bmcn_ma], (error, results) => {
        callback(error, results.rows);
    });
};