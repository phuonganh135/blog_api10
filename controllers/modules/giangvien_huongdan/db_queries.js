const Pool = require('pg').Pool;
var commonModule = require('../common.js');
var dbConfig = require('../../db_config.json');
const pool = new Pool(dbConfig);

module.exports.createGiangVienHuongDan = function (gvhuongdanInfo, callback) {
    const { gvhd_soluong, gvhd_xoa, gv_ma, hk_ma, nh_ma,gvhd_soluong_tl ,gvhd_soluong_nl ,gvhd_soluong_nlcs } = gvhuongdanInfo;

    pool.query('INSERT INTO gianvien_huongdan (gvhd_soluong, gvhd_xoa, gv_ma, hk_ma, nh_ma, gvhd_soluong_tl ,gvhd_soluong_nl ,gvhd_soluong_nlcs) VALUES ($1, $2, $3, $4, $5 ,$6 ,$7 ,$8 )', [gvhd_soluong, gvhd_xoa, gv_ma, hk_ma, nh_ma ,gvhd_soluong_tl ,gvhd_soluong_nl ,gvhd_soluong_nlcs], (error, result) => {
        callback(error, result);
    });
};

module.exports.getGiangVienHuongDanList = function (bmcn_ma , nh_ma,hk_ma,callback) {
    pool.query('SELECT * FROM gianvien_huongdan as gvhd, gianvien as gv , bomon_chuyennganh as bmcn, khoa as k WHERE gvhd.gv_ma = gv.gv_ma and gvhd.gvhd_xoa=0 and gv.gv_xoa=0 and gvhd.hk_ma=$3 and gvhd.nh_ma=$2 and gv.bmcn_ma=bmcn.bmcn_ma and bmcn.bmcn_xoa=0 and bmcn.bmcn_ma=$1 and bmcn.k_ma=k.k_ma and k.k_xoa=0   ',[bmcn_ma , nh_ma,hk_ma], (error, results) => {
        callback(error, results.rows);
    });
};

module.exports.getGiangVienHuongDanListALLKhoa = function ( nh_ma,hk_ma,callback) {
    pool.query('SELECT * FROM gianvien_huongdan as gvhd, gianvien as gv , bomon_chuyennganh as bmcn, khoa as k WHERE gvhd.gv_ma = gv.gv_ma and gvhd.gvhd_xoa=0 and gv.gv_xoa=0 and gvhd.hk_ma=$2 and gvhd.nh_ma=$1 and gv.bmcn_ma=bmcn.bmcn_ma and bmcn.bmcn_xoa=0 and bmcn.k_ma=k.k_ma and k.k_xoa=0   ',[ nh_ma,hk_ma], (error, results) => {
        callback(error, results.rows);
    });
};




module.exports.getGiangVienHuongDanListAllBoMon = function (k_ma , nh_ma,hk_ma,callback) {
    pool.query('SELECT * FROM gianvien_huongdan as gvhd, gianvien as gv , bomon_chuyennganh as bmcn, khoa as k WHERE gvhd.gv_ma = gv.gv_ma and gvhd.gvhd_xoa=0 and gv.gv_xoa=0 and gvhd.hk_ma=$3 and gvhd.nh_ma=$2 and gv.bmcn_ma=bmcn.bmcn_ma and bmcn.bmcn_xoa=0 and bmcn.k_ma=$1 and bmcn.k_ma=k.k_ma and k.k_xoa=0  ',[k_ma , nh_ma,hk_ma], (error, results) => {
        callback(error, results.rows);
    });
};


module.exports.getGiangVienHuongDanInfo = function (gv_ma, nh_ma, hk_ma, callback) {
    pool.query('SELECT * FROM gianvien_huongdan as gvhd, gianvien as gv , bomon_chuyennganh as bmcn, khoa as k WHERE gvhd.gv_ma = gv.gv_ma and gvhd.gvhd_xoa=0 and gv.gv_xoa=0 and gvhd.hk_ma=$3 and gvhd.nh_ma=$2 and gv.bmcn_ma=bmcn.bmcn_ma and bmcn.bmcn_xoa=0 and gv.gv_ma=$1 and bmcn.k_ma=k.k_ma and k.k_xoa=0  ', [gv_ma, nh_ma, hk_ma], (error, results) => {
        callback(error, results.rows);
    });
};


module.exports.updateGiangVienHuongDanInfo = function (gv_ma, nh_ma,hk_ma,  gvhuongdanInfo, callback) {
    const { gvhd_soluong ,gvhd_soluong_tl ,gvhd_soluong_nl ,gvhd_soluong_nlcs } = gvhuongdanInfo;

    pool.query('UPDATE gianvien_huongdan set gvhd_soluong=$4 , gvhd_soluong_tl=$5, gvhd_soluong_nl=$6, gvhd_soluong_nlcs=$7 WHERE gv_ma=$1 and nh_ma=$2 and hk_ma=$3 ', [gv_ma, nh_ma,hk_ma,gvhd_soluong ,gvhd_soluong_tl ,gvhd_soluong_nl ,gvhd_soluong_nlcs], (error, result) => {
        callback(error, result);
    });
};

module.exports.deleteGiangVienHuongDan = function (gv_ma, nh_ma,hk_ma, callback) {
    pool.query('UPDATE gianvien_huongdan set gvhd_xoa=1 WHERE gv_ma=$1 and nh_ma=$2 and hk_ma=$3', [gv_ma, nh_ma,hk_ma], (error, result) => {
        callback(error, result);
    });
};