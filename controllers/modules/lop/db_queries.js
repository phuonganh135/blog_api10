const Pool = require('pg').Pool;
var commonModule = require('../common.js');
var dbConfig = require('../../db_config.json');
const pool = new Pool(dbConfig);

module.exports.createLop = function (lopInfo, callback) {
    const { l_ma, l_ten, l_khoa, l_xoa, bmcn_ma } = lopInfo;

    pool.query('INSERT INTO lop (l_ma, l_ten, l_khoa, l_xoa, bmcn_ma) VALUES ($1, $2, $3, $4, $5)', [l_ma, l_ten, l_khoa, l_xoa, bmcn_ma], (error, result) => {
        callback(error, result);
    });
};



module.exports.getLopList = function (bmcn_ma, callback) {
    pool.query('SELECT * FROM lop as l , bomon_chuyennganh as bmcn , khoa as k WHERE bmcn.bmcn_xoa=0 and k.k_xoa=0 and l.bmcn_ma = bmcn.bmcn_ma and bmcn.k_ma = k.k_ma and l.l_xoa=0 and l.bmcn_ma=$1', [bmcn_ma], (error, results) => {
        callback(error, results.rows);
    });
};




module.exports.getLopListAll = function ( callback) {
    pool.query('SELECT * FROM lop as l , bomon_chuyennganh as bmcn , khoa as k WHERE bmcn.bmcn_xoa=0 and k.k_xoa=0 and l.bmcn_ma = bmcn.bmcn_ma and bmcn.k_ma = k.k_ma and l.l_xoa=0 ' ,(error, results) => {
        callback(error, results.rows);
    });
};



module.exports.getLopLisKhoa = function (k_ma, callback) {
    pool.query('SELECT * FROM lop as l , bomon_chuyennganh as bmcn , khoa as k WHERE bmcn.bmcn_xoa=0 and k.k_xoa=0 and l.bmcn_ma = bmcn.bmcn_ma and bmcn.k_ma = k.k_ma and l.l_xoa=0 and k.k_ma=$1', [k_ma], (error, results) => {
        callback(error, results.rows);
    });
};


module.exports.updateLopInfo = function (l_ma, lopInfo, callback) {
    const { l_ten, l_khoa, bmcn_ma  } = lopInfo;

    pool.query('UPDATE lop set l_ten=$1 , l_khoa=$2, bmcn_ma=$3  WHERE l_ma=$4 ', [l_ten, l_khoa, bmcn_ma,l_ma], (error, result) => {
        callback(error, result);
    });
};


module.exports.deleteLop = function (l_ma, callback) {
    pool.query('UPDATE lop set l_xoa=1 WHERE l_ma=$1', [l_ma], (error, result) => {
        callback(error, result);
    });
};


module.exports.getLopInfo = function (l_ma , callback) {
    pool.query('SELECT * FROM lop as l , bomon_chuyennganh as bmcn , khoa as k WHERE bmcn.bmcn_xoa=0 and k.k_xoa=0 and l.bmcn_ma = bmcn.bmcn_ma and bmcn.k_ma = k.k_ma and l_xoa=0 and l_ma=$1', [l_ma], (error, results) => {
        callback(error, results.rows);
    });
};