
const Pool = require('pg').Pool;
var commonModule = require('../common.js');
var dbConfig = require('../../db_config.json');
const pool = new Pool(dbConfig);

module.exports.createGiangVien = function (giangvienInfo, callback) {
    const { gv_ma, gv_ten, gv_gioitinh, gv_ngaysinh, gv_cmnd , gv_diachi , gv_email , gv_sdt , gv_matkhau , gv_xoa , bmcn_ma } = giangvienInfo;

    pool.query('INSERT INTO gianvien (gv_ma, gv_ten, gv_gioitinh, gv_ngaysinh, gv_cmnd , gv_diachi , gv_email , gv_sdt , gv_matkhau , gv_xoa , bmcn_ma) VALUES ($1, $2, $3, $4, $5, $6, $7 , $8 , $9 , $10 , $11)', [gv_ma, gv_ten, gv_gioitinh, gv_ngaysinh, gv_cmnd , gv_diachi , gv_email , gv_sdt , gv_matkhau , gv_xoa , bmcn_ma], (error, result) => {
        callback(error, result);
    });
};

module.exports.getGiangVienList = function (bmcn_ma,callback) {
    pool.query('SELECT * FROM gianvien WHERE gv_xoa=0 and bmcn_ma=$1', [bmcn_ma] , (error, results) => {
        callback(error, results.rows);
    });
};

module.exports.getGiangVienInfo = function (gv_ma, callback) {
    pool.query('SELECT * FROM gianvien as gv, bomon_chuyennganh as bmcn, khoa as k WHERE gv.bmcn_ma = bmcn.bmcn_ma and bmcn.k_ma = k.k_ma and gv.gv_ma = $1', [gv_ma], (error, results) => {
        callback(error, results.rows);
    });
};


module.exports.updateGiangVienInfo = function (gv_ma, giangvienInfo, callback) {
    const { gv_ten, gv_gioitinh, gv_ngaysinh, gv_cmnd , gv_diachi , gv_email , gv_sdt  , bmcn_ma  } = giangvienInfo;

    pool.query('UPDATE gianvien set gv_ten=$1 , gv_gioitinh=$2, gv_ngaysinh=$3 , gv_cmnd=$4, gv_diachi=$5, gv_email=$6, gv_sdt=$7 , bmcn_ma=$8 WHERE gv_ma=$9 ', [gv_ten, gv_gioitinh, gv_ngaysinh, gv_cmnd , gv_diachi , gv_email , gv_sdt , bmcn_ma, gv_ma], (error, result) => {
        callback(error, result);
    });
};


module.exports.deleteGiangVien = function (gv_ma, callback) {
    pool.query('UPDATE gianvien set gv_xoa=1 WHERE gv_ma=$1', [gv_ma], (error, result) => {
        callback(error, result);
    });
};