const Pool = require('pg').Pool;
var commonModule = require('../common.js');
var dbConfig = require('../../db_config.json');
const pool = new Pool(dbConfig);


module.exports.getThoiGianList = function (nh_ma, hk_ma, k_ma, ltg_loaidetai,  callback) {
    pool.query('SELECT * FROM khoa as k, thoigian_dk_bc as tgdkbc, loai_thoigian as ltg WHERE tgdkbc.k_ma=k.k_ma and k.k_xoa=0 and tgdkbc.ltg_ma = ltg.ltg_ma and tgdkbc.nh_ma = $1 and tgdkbc.hk_ma = $2 and tgdkbc.k_ma = $3 and  tgdkbc.tg_xoa=0 and ltg.ltg_xoa=0 and ltg.ltg_loaidetai=$4', [nh_ma, hk_ma , k_ma, ltg_loaidetai ], (error, results) => {
        callback(error, results.rows);
    });
};

module.exports.getLoaiThoiGianList = function ( ltg_loaidetai ,callback) {
    pool.query('SELECT * FROM loai_thoigian where ltg_xoa=0 and ltg_loaidetai=$1 ',[ltg_loaidetai],  (error, results) => {
        callback(error, results.rows);
    });
};

module.exports.createThoiGian = function (thoigianInfo, callback) {
    const { tg_batdau, tg_ketthuc,  nh_ma, hk_ma , k_ma , ltg_ma , tg_xoa   } = thoigianInfo;

    pool.query('INSERT INTO thoigian_dk_bc (tg_batdau, tg_ketthuc, nh_ma, hk_ma , k_ma , ltg_ma , tg_xoa) VALUES ($1, $2, $3, $4, $5, $6, $7)', [tg_batdau, tg_ketthuc, nh_ma, hk_ma , k_ma , ltg_ma , tg_xoa], (error, result) => {
        callback(error, result);
    });
};


module.exports.getThoiGianInfo = function (tg_ma , callback) {
    pool.query('SELECT * FROM thoigian_dk_bc as tgdkbc, loai_thoigian as ltg WHERE tgdkbc.ltg_ma = ltg.ltg_ma and tgdkbc.tg_xoa=0 and tgdkbc.tg_ma=$1 ', [tg_ma], (error, results) => {
        callback(error, results.rows);
    });
};


module.exports.updateThoiGianInfo = function (tg_ma, thoigianInfo, callback) {
    const { tg_batdau, tg_ketthuc  } = thoigianInfo;

    pool.query('UPDATE thoigian_dk_bc set tg_batdau=$1 , tg_ketthuc=$2 WHERE tg_ma=$3 ', [tg_batdau, tg_ketthuc, tg_ma ], (error, result) => {
        callback(error, result);
    });
};


module.exports.deleteThoiGian = function (tg_ma, callback) {
    pool.query('UPDATE thoigian_dk_bc set tg_xoa=1 WHERE tg_ma=$1', [tg_ma], (error, result) => {
        callback(error, result);
    });
};