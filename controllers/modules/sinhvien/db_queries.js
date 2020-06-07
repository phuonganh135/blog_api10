const Pool = require('pg').Pool;
var commonModule = require('../common.js');
var dbConfig = require('../../db_config.json');
const pool = new Pool(dbConfig);


module.exports.createSinhVien = function (sinhvienInfo, callback) {
    const { sv_ma, sv_ten, sv_gioitinh, sv_ngaysinh, sv_cmnd, sv_diachi , sv_email , sv_sdt, sv_matkhau , sv_xoa , l_ma , svl_xoa } = sinhvienInfo;

    pool.query('INSERT INTO sinhvien (sv_ma, sv_ten, sv_gioitinh, sv_ngaysinh, sv_cmnd, sv_diachi , sv_email , sv_sdt, sv_matkhau , sv_xoa) VALUES ($1, $2, $3, $4, $5, $6, $7 , $8 , $9 , $10)', [sv_ma, sv_ten, sv_gioitinh, sv_ngaysinh, sv_cmnd, sv_diachi , sv_email , sv_sdt, sv_matkhau , sv_xoa], (error, result) => {
        // callback(error, result);
        if (error) {
            callback(error, result);
        }
        pool.query('INSERT INTO sinhvien_lop (svl_xoa, sv_ma , l_ma ) VALUES ($1, $2 ,$3)', [svl_xoa, sv_ma , l_ma], (error2, result2) => {
            // callback(error, result);
            callback(error2, result2);
        });
    });
    
};


module.exports.getSinhVienList = function (l_ma, callback) {
    pool.query('SELECT * FROM sinhvien as sv , sinhvien_lop as svl , lop as l , bomon_chuyennganh as bmcn , khoa as k WHERE l.bmcn_ma=bmcn.bmcn_ma and bmcn.k_ma=k.k_ma and bmcn.bmcn_xoa=0 and k.k_xoa=0 and sv.sv_ma = svl.sv_ma and l.l_ma = svl.l_ma and sv.sv_xoa=0 and svl.l_ma=$1 and svl.svl_xoa=0 ', [l_ma], (error, results) => {
        callback(error, results.rows);
    });
};


module.exports.getSinhVienListAll = function ( callback) {
    pool.query('SELECT * FROM sinhvien as sv , sinhvien_lop as svl , lop as l , bomon_chuyennganh as bmcn , khoa as k WHERE l.bmcn_ma=bmcn.bmcn_ma and bmcn.k_ma=k.k_ma and bmcn.bmcn_xoa=0 and k.k_xoa=0 and sv.sv_ma = svl.sv_ma and l.l_ma = svl.l_ma and sv.sv_xoa=0 and svl.svl_xoa=0 ', (error, results) => {
        callback(error, results.rows);
    });
};

module.exports.getSinhVienListKhoa = function (k_ma, callback) {
    pool.query('SELECT * FROM sinhvien as sv , sinhvien_lop as svl , lop as l , bomon_chuyennganh as bmcn , khoa as k WHERE l.bmcn_ma=bmcn.bmcn_ma and bmcn.k_ma=k.k_ma and bmcn.bmcn_xoa=0 and k.k_xoa=0 and sv.sv_ma = svl.sv_ma and l.l_ma = svl.l_ma and sv.sv_xoa=0 and k.k_ma=$1 and svl.svl_xoa=0 ', [k_ma], (error, results) => {
        callback(error, results.rows);
    });
};


module.exports.getSinhVienListBMCN = function (bmcn_ma, callback) {
    pool.query('SELECT * FROM sinhvien as sv , sinhvien_lop as svl , lop as l , bomon_chuyennganh as bmcn , khoa as k WHERE l.bmcn_ma=bmcn.bmcn_ma and bmcn.k_ma=k.k_ma and bmcn.bmcn_xoa=0 and k.k_xoa=0 and sv.sv_ma = svl.sv_ma and l.l_ma = svl.l_ma and sv.sv_xoa=0 and bmcn.bmcn_ma=$1 and svl.svl_xoa=0 ', [bmcn_ma], (error, results) => {
        callback(error, results.rows);
    });
};


module.exports.getSinhVienInfo = function (sv_ma, callback) {
    pool.query('SELECT * FROM sinhvien as sv , sinhvien_lop as svl , lop as l, bomon_chuyennganh as bmcn , khoa as k  WHERE l.bmcn_ma = bmcn.bmcn_ma and bmcn.k_ma = k.k_ma and sv.sv_ma = svl.sv_ma and l.l_ma = svl.l_ma and sv.sv_ma = $1', [sv_ma], (error, results) => {
        callback(error, results.rows);
    });
};

module.exports.updateSinhVienInfo = function (sv_ma, sinhvienInfo, callback) {
    const { sv_ten, sv_gioitinh, sv_ngaysinh, sv_cmnd, sv_diachi , sv_email , sv_sdt , l_ma } = sinhvienInfo;

    pool.query('UPDATE sinhvien set sv_ten=$1 , sv_gioitinh=$2, sv_ngaysinh=$3 , sv_cmnd=$4, sv_diachi=$5 , sv_email=$6, sv_sdt=$7  WHERE sv_ma=$8 ', [sv_ten, sv_gioitinh, sv_ngaysinh, sv_cmnd, sv_diachi , sv_email , sv_sdt, sv_ma ], (error, result) => {
        //callback(error, result);

        if (error) {
            callback(error, result);
        }
        pool.query('UPDATE sinhvien_lop set l_ma=$1 WHERE sv_ma=$2', [l_ma, sv_ma], (error2, result2) => {
            // callback(error, result);
            callback(error2, result2);
        });
    });
};


module.exports.deleteSinhVien = function (sv_ma, callback) {
    pool.query('UPDATE sinhvien set sv_xoa=1 WHERE sv_ma=$1', [sv_ma], (error, result) => {
        //callback(error, result);

        if (error) {
            callback(error, result);
        }
        pool.query('UPDATE sinhvien_lop set svl_xoa=1 WHERE sv_ma=$1', [sv_ma], (error2, result2) => {
            // callback(error, result);
            callback(error2, result2);
        });
    });
};

module.exports.getSinhVienDangKiList = function (dt_ma ,callback) {
    pool.query('SELECT * FROM sinhvien_lop as svl , lop as l, bomon_chuyennganh as bmcn , khoa as k, sinhvien_dk_detai as svdkdt , sinhvien as sv WHERE l.bmcn_ma = bmcn.bmcn_ma and bmcn.k_ma = k.k_ma and sv.sv_ma = svl.sv_ma and l.l_ma = svl.l_ma and svdkdt.sv_ma = sv.sv_ma and svdkdt.ttdk_ma=\'yc\' and svdkdt.dt_ma=$1 and svdkdt.svdkdt_xoa=0 and sv.sv_xoa=0', [dt_ma], (error, results) => {
        callback(error, results.rows);
    });
};

module.exports.getSinhVienThucHienList = function (gv_ma ,callback) {
    pool.query('SELECT * FROM sinhvien_lop as svl , lop as l, bomon_chuyennganh as bmcn , khoa as k, sinhvien_dk_detai as svdkdt , sinhvien as sv , detai as dt , trangthai_dangki as ttdk WHERE l.bmcn_ma = bmcn.bmcn_ma and bmcn.k_ma = k.k_ma and sv.sv_ma = svl.sv_ma and l.l_ma = svl.l_ma and svdkdt.ttdk_ma = ttdk.ttdk_ma and svdkdt.sv_ma = sv.sv_ma and svdkdt.ttdk_ma=\'cn\' and dt.gv_ma=$1 and dt.ldt_ma=\'lv\' and svdkdt.svdkdt_xoa=0 and svdkdt.dt_ma = dt.dt_ma and dt.dt_xoa=0 and sv.sv_xoa=0', [gv_ma], (error, results) => {
        callback(error, results.rows);
    });
};

module.exports.getSinhVienThucHienNienLuanList = function (gv_ma ,callback) {
    pool.query('SELECT * FROM sinhvien_lop as svl , lop as l, bomon_chuyennganh as bmcn , khoa as k, sinhvien_dk_detai as svdkdt , sinhvien as sv , detai as dt , trangthai_dangki as ttdk WHERE l.bmcn_ma = bmcn.bmcn_ma and bmcn.k_ma = k.k_ma and sv.sv_ma = svl.sv_ma and l.l_ma = svl.l_ma and svdkdt.ttdk_ma = ttdk.ttdk_ma and svdkdt.sv_ma = sv.sv_ma and svdkdt.ttdk_ma=\'cn\' and dt.gv_ma=$1 and dt.ldt_ma=\'nl\' and svdkdt.svdkdt_xoa=0 and svdkdt.dt_ma = dt.dt_ma and dt.dt_xoa=0 and sv.sv_xoa=0', [gv_ma], (error, results) => {
        callback(error, results.rows);
    });
};


module.exports.getSinhVienThucHienTieuLuanList = function (gv_ma ,callback) {
    pool.query('SELECT * FROM sinhvien_lop as svl , lop as l, bomon_chuyennganh as bmcn , khoa as k, sinhvien_dk_detai as svdkdt , sinhvien as sv , detai as dt , trangthai_dangki as ttdk WHERE l.bmcn_ma = bmcn.bmcn_ma and bmcn.k_ma = k.k_ma and sv.sv_ma = svl.sv_ma and l.l_ma = svl.l_ma and svdkdt.ttdk_ma = ttdk.ttdk_ma and svdkdt.sv_ma = sv.sv_ma and svdkdt.ttdk_ma=\'cn\' and dt.gv_ma=$1 and dt.ldt_ma=\'tl\' and svdkdt.svdkdt_xoa=0 and svdkdt.dt_ma = dt.dt_ma and dt.dt_xoa=0 and sv.sv_xoa=0', [gv_ma], (error, results) => {
        callback(error, results.rows);
    });
};

module.exports.getSinhVienThucHienNienLuanCoSoList = function (gv_ma ,callback) {
    pool.query('SELECT * FROM sinhvien_lop as svl , lop as l, bomon_chuyennganh as bmcn , khoa as k, sinhvien_dk_detai as svdkdt , sinhvien as sv , detai as dt , trangthai_dangki as ttdk WHERE l.bmcn_ma = bmcn.bmcn_ma and bmcn.k_ma = k.k_ma and sv.sv_ma = svl.sv_ma and l.l_ma = svl.l_ma and svdkdt.ttdk_ma = ttdk.ttdk_ma and svdkdt.sv_ma = sv.sv_ma and svdkdt.ttdk_ma=\'cn\' and dt.gv_ma=$1 and dt.ldt_ma=\'nlcs\' and svdkdt.svdkdt_xoa=0 and svdkdt.dt_ma = dt.dt_ma and dt.dt_xoa=0 and sv.sv_xoa=0', [gv_ma], (error, results) => {
        callback(error, results.rows);
    });
};

module.exports.getSinhVienThucHienListAllSoLuong = function (gv_ma , ldt_ma ,callback) {
    pool.query('SELECT count(sv.sv_ma)  as soluong_thuchien FROM sinhvien_lop as svl , lop as l, bomon_chuyennganh as bmcn , khoa as k, sinhvien_dk_detai as svdkdt , sinhvien as sv , detai as dt , trangthai_dangki as ttdk WHERE l.bmcn_ma = bmcn.bmcn_ma and bmcn.k_ma = k.k_ma and sv.sv_ma = svl.sv_ma and l.l_ma = svl.l_ma and svdkdt.ttdk_ma = ttdk.ttdk_ma and ( svdkdt.ttdk_ma=\'cn\' or svdkdt.ttdk_ma=\'cnbc\' or svdkdt.ttdk_ma=\'tcbc\') and svdkdt.sv_ma = sv.sv_ma and dt.gv_ma=$1 and dt.ldt_ma=$2 and svdkdt.svdkdt_xoa=0 and svdkdt.dt_ma = dt.dt_ma and dt.dt_xoa=0 and sv.sv_xoa=0', [gv_ma, ldt_ma], (error, results) => {
        callback(error, results.rows);
    });
};

module.exports.getSinhVienThucHienListAll = function (gv_ma ,callback) {
    pool.query('SELECT * FROM sinhvien_lop as svl , lop as l, bomon_chuyennganh as bmcn , khoa as k, sinhvien_dk_detai as svdkdt , sinhvien as sv , detai as dt , trangthai_dangki as ttdk WHERE l.bmcn_ma = bmcn.bmcn_ma and bmcn.k_ma = k.k_ma and sv.sv_ma = svl.sv_ma and l.l_ma = svl.l_ma and svdkdt.ttdk_ma = ttdk.ttdk_ma and ( svdkdt.ttdk_ma=\'cn\' or svdkdt.ttdk_ma=\'cnbc\' or svdkdt.ttdk_ma=\'tcbc\') and svdkdt.sv_ma = sv.sv_ma and dt.gv_ma=$1 and dt.ldt_ma=\'lv\' and svdkdt.svdkdt_xoa=0 and svdkdt.dt_ma = dt.dt_ma and dt.dt_xoa=0 and sv.sv_xoa=0', [gv_ma], (error, results) => {
        callback(error, results.rows);
    });
};

module.exports.getSinhVienThucHienNienLuanListAll = function (gv_ma ,callback) {
    pool.query('SELECT * FROM sinhvien_lop as svl , lop as l, bomon_chuyennganh as bmcn , khoa as k, sinhvien_dk_detai as svdkdt , sinhvien as sv , detai as dt , trangthai_dangki as ttdk WHERE l.bmcn_ma = bmcn.bmcn_ma and bmcn.k_ma = k.k_ma and sv.sv_ma = svl.sv_ma and l.l_ma = svl.l_ma and svdkdt.ttdk_ma = ttdk.ttdk_ma and ( svdkdt.ttdk_ma=\'cn\' or svdkdt.ttdk_ma=\'cnbc\' or svdkdt.ttdk_ma=\'tcbc\') and svdkdt.sv_ma = sv.sv_ma  and dt.gv_ma=$1 and dt.ldt_ma=\'nl\' and svdkdt.svdkdt_xoa=0 and svdkdt.dt_ma = dt.dt_ma and dt.dt_xoa=0 and sv.sv_xoa=0', [gv_ma], (error, results) => {
        callback(error, results.rows);
    });
};


module.exports.getSinhVienThucHienTieuLuanListAll = function (gv_ma ,callback) {
    pool.query('SELECT * FROM sinhvien_lop as svl , lop as l, bomon_chuyennganh as bmcn , khoa as k, sinhvien_dk_detai as svdkdt , sinhvien as sv , detai as dt , trangthai_dangki as ttdk WHERE l.bmcn_ma = bmcn.bmcn_ma and bmcn.k_ma = k.k_ma and sv.sv_ma = svl.sv_ma and l.l_ma = svl.l_ma and svdkdt.ttdk_ma = ttdk.ttdk_ma and ( svdkdt.ttdk_ma=\'cn\' or svdkdt.ttdk_ma=\'cnbc\' or svdkdt.ttdk_ma=\'tcbc\') and svdkdt.sv_ma = sv.sv_ma and dt.gv_ma=$1 and dt.ldt_ma=\'tl\' and svdkdt.svdkdt_xoa=0 and svdkdt.dt_ma = dt.dt_ma and dt.dt_xoa=0 and sv.sv_xoa=0', [gv_ma], (error, results) => {
        callback(error, results.rows);
    });
};

module.exports.getSinhVienThucHienNienLuanCoSoListAll = function (gv_ma ,callback) {
    pool.query('SELECT * FROM sinhvien_lop as svl , lop as l, bomon_chuyennganh as bmcn , khoa as k, sinhvien_dk_detai as svdkdt , sinhvien as sv , detai as dt , trangthai_dangki as ttdk WHERE l.bmcn_ma = bmcn.bmcn_ma and bmcn.k_ma = k.k_ma and sv.sv_ma = svl.sv_ma and l.l_ma = svl.l_ma and svdkdt.ttdk_ma = ttdk.ttdk_ma and ( svdkdt.ttdk_ma=\'cn\' or svdkdt.ttdk_ma=\'cnbc\' or svdkdt.ttdk_ma=\'tcbc\') and svdkdt.sv_ma = sv.sv_ma  and dt.gv_ma=$1 and dt.ldt_ma=\'nlcs\' and svdkdt.svdkdt_xoa=0 and svdkdt.dt_ma = dt.dt_ma and dt.dt_xoa=0 and sv.sv_xoa=0', [gv_ma], (error, results) => {
        callback(error, results.rows);
    });
};


module.exports.getSinhVienBaoCaoList = function (gv_ma ,callback) {
    pool.query('SELECT * FROM sinhvien_lop as svl , lop as l, bomon_chuyennganh as bmcn , khoa as k, sinhvien_dk_detai as svdkdt , sinhvien as sv , detai as dt , trangthai_dangki as ttdk WHERE l.bmcn_ma = bmcn.bmcn_ma and bmcn.k_ma = k.k_ma and sv.sv_ma = svl.sv_ma and l.l_ma = svl.l_ma and svdkdt.ttdk_ma = ttdk.ttdk_ma and svdkdt.sv_ma = sv.sv_ma and svdkdt.ttdk_ma=\'cnbc\' and dt.gv_ma=$1 and dt.ldt_ma=\'lv\' and svdkdt.svdkdt_xoa=0 and svdkdt.dt_ma = dt.dt_ma and dt.dt_xoa=0 and sv.sv_xoa=0', [gv_ma], (error, results) => {
        callback(error, results.rows);
    });
};


module.exports.getSinhVienThongKeListNamHocHocKi = function (nh_ma, hk_ma , ldt_ma , callback) {
    pool.query('SELECT * FROM sinhvien_lop as svl , lop as l, bomon_chuyennganh as bmcn , khoa as k, sinhvien_dk_detai as svdkdt , sinhvien as sv , detai as dt , trangthai_dangki as ttdk WHERE l.bmcn_ma = bmcn.bmcn_ma and bmcn.k_ma = k.k_ma and sv.sv_ma = svl.sv_ma and l.l_ma = svl.l_ma and svdkdt.ttdk_ma = ttdk.ttdk_ma and svdkdt.sv_ma = sv.sv_ma and svdkdt.svdkdt_xoa=0 and svdkdt.dt_ma = dt.dt_ma and dt.dt_xoa=0 and sv.sv_xoa=0 and k.k_xoa=0 and bmcn.bmcn_xoa=0 and l.l_xoa=0 and dt.nh_ma=$1 and dt.hk_ma=$2 and dt.ldt_ma=$3 and ( svdkdt.ttdk_ma=\'cn\' or svdkdt.ttdk_ma=\'cnbc\' or svdkdt.ttdk_ma=\'tcbc\')', [nh_ma, hk_ma, ldt_ma], (error, results) => {
        callback(error, results.rows);
    });
};

module.exports.getSinhVienThongKeListNamHocHocKiKhoa = function (nh_ma, hk_ma , ldt_ma , k_ma, callback) {
    pool.query('SELECT * FROM sinhvien_lop as svl , lop as l, bomon_chuyennganh as bmcn , khoa as k, sinhvien_dk_detai as svdkdt , sinhvien as sv , detai as dt , trangthai_dangki as ttdk WHERE l.bmcn_ma = bmcn.bmcn_ma and bmcn.k_ma = k.k_ma and sv.sv_ma = svl.sv_ma and l.l_ma = svl.l_ma and svdkdt.ttdk_ma = ttdk.ttdk_ma and svdkdt.sv_ma = sv.sv_ma and svdkdt.svdkdt_xoa=0 and svdkdt.dt_ma = dt.dt_ma and dt.dt_xoa=0 and sv.sv_xoa=0 and k.k_xoa=0 and bmcn.bmcn_xoa=0 and l.l_xoa=0 and dt.nh_ma=$1 and dt.hk_ma=$2 and dt.ldt_ma=$3 and k.k_ma=$4 and ( svdkdt.ttdk_ma=\'cn\' or svdkdt.ttdk_ma=\'cnbc\' or svdkdt.ttdk_ma=\'tcbc\')', [nh_ma, hk_ma, ldt_ma, k_ma], (error, results) => {
        callback(error, results.rows);
    });
};

module.exports.getSinhVienThongKeListNamHocHocKiBMCN = function (nh_ma, hk_ma , ldt_ma , bmcn_ma , callback) {
    pool.query('SELECT * FROM sinhvien_lop as svl , lop as l, bomon_chuyennganh as bmcn , khoa as k, sinhvien_dk_detai as svdkdt , sinhvien as sv , detai as dt , trangthai_dangki as ttdk WHERE l.bmcn_ma = bmcn.bmcn_ma and bmcn.k_ma = k.k_ma and sv.sv_ma = svl.sv_ma and l.l_ma = svl.l_ma and svdkdt.ttdk_ma = ttdk.ttdk_ma and svdkdt.sv_ma = sv.sv_ma and svdkdt.svdkdt_xoa=0 and svdkdt.dt_ma = dt.dt_ma and dt.dt_xoa=0 and sv.sv_xoa=0 and k.k_xoa=0 and bmcn.bmcn_xoa=0 and l.l_xoa=0 and dt.nh_ma=$1 and dt.hk_ma=$2 and dt.ldt_ma=$3 and bmcn.bmcn_ma=$4 and ( svdkdt.ttdk_ma=\'cn\' or svdkdt.ttdk_ma=\'cnbc\' or svdkdt.ttdk_ma=\'tcbc\')', [nh_ma, hk_ma, ldt_ma, bmcn_ma], (error, results) => {
        callback(error, results.rows);
    });
};

module.exports.getSinhVienThongKeListNamHocHocKiLop = function (nh_ma, hk_ma , ldt_ma , l_ma, callback) {
    pool.query('SELECT * FROM sinhvien_lop as svl , lop as l, bomon_chuyennganh as bmcn , khoa as k, sinhvien_dk_detai as svdkdt , sinhvien as sv , detai as dt , trangthai_dangki as ttdk WHERE l.bmcn_ma = bmcn.bmcn_ma and bmcn.k_ma = k.k_ma and sv.sv_ma = svl.sv_ma and l.l_ma = svl.l_ma and svdkdt.ttdk_ma = ttdk.ttdk_ma and svdkdt.sv_ma = sv.sv_ma and svdkdt.svdkdt_xoa=0 and svdkdt.dt_ma = dt.dt_ma and dt.dt_xoa=0 and sv.sv_xoa=0 and k.k_xoa=0 and bmcn.bmcn_xoa=0 and l.l_xoa=0 and dt.nh_ma=$1 and dt.hk_ma=$2 and dt.ldt_ma=$3 and l.l_ma=$4 and ( svdkdt.ttdk_ma=\'cn\' or svdkdt.ttdk_ma=\'cnbc\' or svdkdt.ttdk_ma=\'tcbc\')', [nh_ma, hk_ma, ldt_ma , l_ma], (error, results) => {
        callback(error, results.rows);
    });
};

module.exports.getSinhVienThongKeListNamHocHocKiGianVien = function (nh_ma, hk_ma , ldt_ma , gv_ma , callback) {
    pool.query('SELECT * FROM sinhvien_lop as svl , lop as l, bomon_chuyennganh as bmcn , khoa as k, sinhvien_dk_detai as svdkdt , sinhvien as sv , detai as dt , trangthai_dangki as ttdk WHERE l.bmcn_ma = bmcn.bmcn_ma and bmcn.k_ma = k.k_ma and sv.sv_ma = svl.sv_ma and l.l_ma = svl.l_ma and svdkdt.ttdk_ma = ttdk.ttdk_ma and svdkdt.sv_ma = sv.sv_ma and svdkdt.svdkdt_xoa=0 and svdkdt.dt_ma = dt.dt_ma and dt.dt_xoa=0 and sv.sv_xoa=0 and k.k_xoa=0 and bmcn.bmcn_xoa=0 and l.l_xoa=0 and dt.nh_ma=$1 and dt.hk_ma=$2 and dt.ldt_ma=$3 and dt.gv_ma=$4 and ( svdkdt.ttdk_ma=\'cn\' or svdkdt.ttdk_ma=\'cnbc\' or svdkdt.ttdk_ma=\'tcbc\')', [nh_ma, hk_ma, ldt_ma, gv_ma], (error, results) => {
        callback(error, results.rows);
    });
};




module.exports.getSinhVienThongKeListNamHocHocKiKhoaTTDK = function (nh_ma, hk_ma , ldt_ma , k_ma, ttdk_ma, callback) {
    pool.query('SELECT * FROM sinhvien_lop as svl , lop as l, bomon_chuyennganh as bmcn , khoa as k, sinhvien_dk_detai as svdkdt , sinhvien as sv , detai as dt , trangthai_dangki as ttdk WHERE l.bmcn_ma = bmcn.bmcn_ma and bmcn.k_ma = k.k_ma and sv.sv_ma = svl.sv_ma and l.l_ma = svl.l_ma and svdkdt.ttdk_ma = ttdk.ttdk_ma and svdkdt.sv_ma = sv.sv_ma and svdkdt.svdkdt_xoa=0 and svdkdt.dt_ma = dt.dt_ma and dt.dt_xoa=0 and sv.sv_xoa=0 and k.k_xoa=0 and bmcn.bmcn_xoa=0 and l.l_xoa=0 and dt.nh_ma=$1 and dt.hk_ma=$2 and dt.ldt_ma=$3 and k.k_ma=$4 and svdkdt.ttdk_ma=$5', [nh_ma, hk_ma, ldt_ma, k_ma , ttdk_ma], (error, results) => {
        callback(error, results.rows);
    });
};

module.exports.getSinhVienThongKeListNamHocHocKiBMCNTTDK = function (nh_ma, hk_ma , ldt_ma , bmcn_ma , ttdk_ma, callback) {
    pool.query('SELECT * FROM sinhvien_lop as svl , lop as l, bomon_chuyennganh as bmcn , khoa as k, sinhvien_dk_detai as svdkdt , sinhvien as sv , detai as dt , trangthai_dangki as ttdk WHERE l.bmcn_ma = bmcn.bmcn_ma and bmcn.k_ma = k.k_ma and sv.sv_ma = svl.sv_ma and l.l_ma = svl.l_ma and svdkdt.ttdk_ma = ttdk.ttdk_ma and svdkdt.sv_ma = sv.sv_ma and svdkdt.svdkdt_xoa=0 and svdkdt.dt_ma = dt.dt_ma and dt.dt_xoa=0 and sv.sv_xoa=0 and k.k_xoa=0 and bmcn.bmcn_xoa=0 and l.l_xoa=0 and dt.nh_ma=$1 and dt.hk_ma=$2 and dt.ldt_ma=$3 and bmcn.bmcn_ma=$4 and svdkdt.ttdk_ma=$5', [nh_ma, hk_ma, ldt_ma, bmcn_ma , ttdk_ma], (error, results) => {
        callback(error, results.rows);
    });
};

module.exports.getSinhVienThongKeListNamHocHocKiLopTTDK = function (nh_ma, hk_ma , ldt_ma , l_ma, ttdk_ma, callback) {
    pool.query('SELECT * FROM sinhvien_lop as svl , lop as l, bomon_chuyennganh as bmcn , khoa as k, sinhvien_dk_detai as svdkdt , sinhvien as sv , detai as dt , trangthai_dangki as ttdk WHERE l.bmcn_ma = bmcn.bmcn_ma and bmcn.k_ma = k.k_ma and sv.sv_ma = svl.sv_ma and l.l_ma = svl.l_ma and svdkdt.ttdk_ma = ttdk.ttdk_ma and svdkdt.sv_ma = sv.sv_ma and svdkdt.svdkdt_xoa=0 and svdkdt.dt_ma = dt.dt_ma and dt.dt_xoa=0 and sv.sv_xoa=0 and k.k_xoa=0 and bmcn.bmcn_xoa=0 and l.l_xoa=0 and dt.nh_ma=$1 and dt.hk_ma=$2 and dt.ldt_ma=$3 and l.l_ma=$4 and svdkdt.ttdk_ma=$5', [nh_ma, hk_ma, ldt_ma , l_ma , ttdk_ma], (error, results) => {
        callback(error, results.rows);
    });
};

module.exports.getSinhVienThongKeListNamHocHocKiGianVienTTDK = function (nh_ma, hk_ma , ldt_ma , gv_ma , ttdk_ma, callback) {
    pool.query('SELECT * FROM sinhvien_lop as svl , lop as l, bomon_chuyennganh as bmcn , khoa as k, sinhvien_dk_detai as svdkdt , sinhvien as sv , detai as dt , trangthai_dangki as ttdk WHERE l.bmcn_ma = bmcn.bmcn_ma and bmcn.k_ma = k.k_ma and sv.sv_ma = svl.sv_ma and l.l_ma = svl.l_ma and svdkdt.ttdk_ma = ttdk.ttdk_ma and svdkdt.sv_ma = sv.sv_ma and svdkdt.svdkdt_xoa=0 and svdkdt.dt_ma = dt.dt_ma and dt.dt_xoa=0 and sv.sv_xoa=0 and k.k_xoa=0 and bmcn.bmcn_xoa=0 and l.l_xoa=0 and dt.nh_ma=$1 and dt.hk_ma=$2 and dt.ldt_ma=$3 and dt.gv_ma=$4 and svdkdt.ttdk_ma=$5', [nh_ma, hk_ma, ldt_ma, gv_ma, ttdk_ma], (error, results) => {
        callback(error, results.rows);
    });
};





module.exports.getSinhVienThongKeListNamHocHocKiTrangThaiDangKi = function (nh_ma, hk_ma , ldt_ma , ttdk_ma, callback) {
    pool.query('SELECT * FROM sinhvien_lop as svl , lop as l, bomon_chuyennganh as bmcn , khoa as k, sinhvien_dk_detai as svdkdt , sinhvien as sv , detai as dt , trangthai_dangki as ttdk WHERE l.bmcn_ma = bmcn.bmcn_ma and bmcn.k_ma = k.k_ma and sv.sv_ma = svl.sv_ma and l.l_ma = svl.l_ma and svdkdt.ttdk_ma = ttdk.ttdk_ma and svdkdt.sv_ma = sv.sv_ma and svdkdt.svdkdt_xoa=0 and svdkdt.dt_ma = dt.dt_ma and dt.dt_xoa=0 and sv.sv_xoa=0 and k.k_xoa=0 and bmcn.bmcn_xoa=0 and l.l_xoa=0 and dt.nh_ma=$1 and dt.hk_ma=$2 and dt.ldt_ma=$3 and svdkdt.ttdk_ma=$4', [nh_ma, hk_ma, ldt_ma, ttdk_ma], (error, results) => {
        callback(error, results.rows);
    });
};


module.exports.getSinhVienBaoCaoNienLuanList = function (gv_ma ,callback) {
    pool.query('SELECT * FROM sinhvien_lop as svl , lop as l, bomon_chuyennganh as bmcn , khoa as k, sinhvien_dk_detai as svdkdt , sinhvien as sv , detai as dt , trangthai_dangki as ttdk WHERE l.bmcn_ma = bmcn.bmcn_ma and bmcn.k_ma = k.k_ma and sv.sv_ma = svl.sv_ma and l.l_ma = svl.l_ma and svdkdt.ttdk_ma = ttdk.ttdk_ma and svdkdt.sv_ma = sv.sv_ma and svdkdt.ttdk_ma=\'cnbc\' and dt.gv_ma=$1 and dt.ldt_ma=\'nl\' and svdkdt.svdkdt_xoa=0 and svdkdt.dt_ma = dt.dt_ma and dt.dt_xoa=0 and sv.sv_xoa=0', [gv_ma], (error, results) => {
        callback(error, results.rows);
    });
};


module.exports.getSinhVienBaoCaoTieuLuanList = function (gv_ma ,callback) {
    pool.query('SELECT * FROM sinhvien_lop as svl , lop as l, bomon_chuyennganh as bmcn , khoa as k, sinhvien_dk_detai as svdkdt , sinhvien as sv , detai as dt , trangthai_dangki as ttdk WHERE l.bmcn_ma = bmcn.bmcn_ma and bmcn.k_ma = k.k_ma and sv.sv_ma = svl.sv_ma and l.l_ma = svl.l_ma and svdkdt.ttdk_ma = ttdk.ttdk_ma and svdkdt.sv_ma = sv.sv_ma and svdkdt.ttdk_ma=\'cnbc\' and dt.gv_ma=$1 and dt.ldt_ma=\'tl\' and svdkdt.svdkdt_xoa=0 and svdkdt.dt_ma = dt.dt_ma and dt.dt_xoa=0 and sv.sv_xoa=0', [gv_ma], (error, results) => {
        callback(error, results.rows);
    });
};

module.exports.getSinhVienBaoCaoNienLuanCoSoList = function (gv_ma ,callback) {
    pool.query('SELECT * FROM sinhvien_lop as svl , lop as l, bomon_chuyennganh as bmcn , khoa as k, sinhvien_dk_detai as svdkdt , sinhvien as sv , detai as dt , trangthai_dangki as ttdk WHERE l.bmcn_ma = bmcn.bmcn_ma and bmcn.k_ma = k.k_ma and sv.sv_ma = svl.sv_ma and l.l_ma = svl.l_ma and svdkdt.ttdk_ma = ttdk.ttdk_ma and svdkdt.sv_ma = sv.sv_ma and svdkdt.ttdk_ma=\'cnbc\' and dt.gv_ma=$1 and dt.ldt_ma=\'nlcs\' and svdkdt.svdkdt_xoa=0 and svdkdt.dt_ma = dt.dt_ma and dt.dt_xoa=0 and sv.sv_xoa=0', [gv_ma], (error, results) => {
        callback(error, results.rows);
    });
};


module.exports.getSinhVienTuChoiBaoCaoList = function (gv_ma ,callback) {
    pool.query('SELECT * FROM sinhvien_lop as svl , lop as l, bomon_chuyennganh as bmcn , khoa as k, sinhvien_dk_detai as svdkdt , sinhvien as sv , detai as dt , trangthai_dangki as ttdk WHERE l.bmcn_ma = bmcn.bmcn_ma and bmcn.k_ma = k.k_ma and sv.sv_ma = svl.sv_ma and l.l_ma = svl.l_ma and svdkdt.ttdk_ma = ttdk.ttdk_ma and svdkdt.sv_ma = sv.sv_ma and svdkdt.ttdk_ma=\'tcbc\' and dt.gv_ma=$1 and dt.ldt_ma=\'lv\' and svdkdt.svdkdt_xoa=0 and svdkdt.dt_ma = dt.dt_ma and dt.dt_xoa=0 and sv.sv_xoa=0', [gv_ma], (error, results) => {
        callback(error, results.rows);
    });
};

module.exports.getSinhVienTuChoiBaoCaoNienLuanList = function (gv_ma ,callback) {
    pool.query('SELECT * FROM sinhvien_lop as svl , lop as l, bomon_chuyennganh as bmcn , khoa as k, sinhvien_dk_detai as svdkdt , sinhvien as sv , detai as dt , trangthai_dangki as ttdk WHERE l.bmcn_ma = bmcn.bmcn_ma and bmcn.k_ma = k.k_ma and sv.sv_ma = svl.sv_ma and l.l_ma = svl.l_ma and svdkdt.ttdk_ma = ttdk.ttdk_ma and svdkdt.sv_ma = sv.sv_ma and svdkdt.ttdk_ma=\'tcbc\' and dt.gv_ma=$1 and dt.ldt_ma=\'nl\' and svdkdt.svdkdt_xoa=0 and svdkdt.dt_ma = dt.dt_ma and dt.dt_xoa=0 and sv.sv_xoa=0', [gv_ma], (error, results) => {
        callback(error, results.rows);
    });
};


module.exports.getSinhVienTuChoiBaoCaoTieuLuanList = function (gv_ma ,callback) {
    pool.query('SELECT * FROM sinhvien_lop as svl , lop as l, bomon_chuyennganh as bmcn , khoa as k, sinhvien_dk_detai as svdkdt , sinhvien as sv , detai as dt , trangthai_dangki as ttdk WHERE l.bmcn_ma = bmcn.bmcn_ma and bmcn.k_ma = k.k_ma and sv.sv_ma = svl.sv_ma and l.l_ma = svl.l_ma and svdkdt.ttdk_ma = ttdk.ttdk_ma and svdkdt.sv_ma = sv.sv_ma and svdkdt.ttdk_ma=\'tcbc\' and dt.gv_ma=$1 and dt.ldt_ma=\'tl\' and svdkdt.svdkdt_xoa=0 and svdkdt.dt_ma = dt.dt_ma and dt.dt_xoa=0 and sv.sv_xoa=0', [gv_ma], (error, results) => {
        callback(error, results.rows);
    });
};

module.exports.getSinhVienTuChoiBaoCaoNienLuanCoSoList = function (gv_ma ,callback) {
    pool.query('SELECT * FROM sinhvien_lop as svl , lop as l, bomon_chuyennganh as bmcn , khoa as k, sinhvien_dk_detai as svdkdt , sinhvien as sv , detai as dt , trangthai_dangki as ttdk WHERE l.bmcn_ma = bmcn.bmcn_ma and bmcn.k_ma = k.k_ma and sv.sv_ma = svl.sv_ma and l.l_ma = svl.l_ma and svdkdt.ttdk_ma = ttdk.ttdk_ma and svdkdt.sv_ma = sv.sv_ma and svdkdt.ttdk_ma=\'tcbc\' and dt.gv_ma=$1 and dt.ldt_ma=\'nlcs\' and svdkdt.svdkdt_xoa=0 and svdkdt.dt_ma = dt.dt_ma and dt.dt_xoa=0 and sv.sv_xoa=0', [gv_ma], (error, results) => {
        callback(error, results.rows);
    });
};


module.exports.updateSinhVienDangKiAccept = function (dt_ma, sv_ma, callback) {
    pool.query('UPDATE sinhvien_dk_detai set ttdk_ma=\'cn\' WHERE dt_ma=$1 and sv_ma=$2 ', [dt_ma,sv_ma], (error, result) => {
        //callback(error, result);
		if (error) {
            callback(error, result);
        }
        pool.query('UPDATE sinhvien_dk_detai set svdkdt_xoa=1 , ttdk_ma=\'hdk\'  WHERE dt_ma!=$1 and sv_ma=$2 and svdkdt_xoa=0 and ttdk_ma=\'yc\'', [dt_ma, sv_ma], (error2, result2) => {
            // callback(error, result);
            callback(error2, result2);
        });
    });
};

module.exports.updateSinhVienDangKiDecline = function (dt_ma, sv_ma, callback) {
    pool.query('UPDATE sinhvien_dk_detai set ttdk_ma=\'tc\' WHERE dt_ma=$1 and sv_ma=$2 ', [dt_ma,sv_ma], (error, result) => {
        callback(error, result);
    });
};