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
    pool.query('SELECT * FROM sinhvien as sv , sinhvien_lop as svl , lop as l WHERE sv.sv_ma = svl.sv_ma and l.l_ma = svl.l_ma and sv.sv_xoa=0 and svl.l_ma=$1 and svl.svl_xoa=0 ', [l_ma], (error, results) => {
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
    pool.query('SELECT * FROM sinhvien_dk_detai as svdkdt , sinhvien as sv WHERE svdkdt.sv_ma = sv.sv_ma and svdkdt.ttdk_ma=\'yc\' and svdkdt.dt_ma=$1 and svdkdt.svdkdt_xoa=0 and sv.sv_xoa=0', [dt_ma], (error, results) => {
        callback(error, results.rows);
    });
};

module.exports.getSinhVienThucHienList = function (gv_ma ,callback) {
    pool.query('SELECT * FROM sinhvien_dk_detai as svdkdt , sinhvien as sv , detai as dt WHERE svdkdt.sv_ma = sv.sv_ma and svdkdt.ttdk_ma=\'cn\' and dt.gv_ma=$1 and dt.ldt_ma=\'lv\' and svdkdt.svdkdt_xoa=0 and svdkdt.dt_ma = dt.dt_ma and dt.dt_xoa=0 and sv.sv_xoa=0', [gv_ma], (error, results) => {
        callback(error, results.rows);
    });
};

module.exports.getSinhVienThucHienNienLuanList = function (gv_ma ,callback) {
    pool.query('SELECT * FROM sinhvien_dk_detai as svdkdt , sinhvien as sv , detai as dt WHERE svdkdt.sv_ma = sv.sv_ma and svdkdt.ttdk_ma=\'cn\' and dt.gv_ma=$1 and dt.ldt_ma=\'nl\' and svdkdt.svdkdt_xoa=0 and svdkdt.dt_ma = dt.dt_ma and dt.dt_xoa=0 and sv.sv_xoa=0', [gv_ma], (error, results) => {
        callback(error, results.rows);
    });
};


module.exports.getSinhVienThucHienTieuLuanList = function (gv_ma ,callback) {
    pool.query('SELECT * FROM sinhvien_dk_detai as svdkdt , sinhvien as sv , detai as dt WHERE svdkdt.sv_ma = sv.sv_ma and svdkdt.ttdk_ma=\'cn\' and dt.gv_ma=$1 and dt.ldt_ma=\'tl\' and svdkdt.svdkdt_xoa=0 and svdkdt.dt_ma = dt.dt_ma and dt.dt_xoa=0 and sv.sv_xoa=0', [gv_ma], (error, results) => {
        callback(error, results.rows);
    });
};

module.exports.getSinhVienThucHienNienLuanCoSoList = function (gv_ma ,callback) {
    pool.query('SELECT * FROM sinhvien_dk_detai as svdkdt , sinhvien as sv , detai as dt WHERE svdkdt.sv_ma = sv.sv_ma and svdkdt.ttdk_ma=\'cn\' and dt.gv_ma=$1 and dt.ldt_ma=\'nlcs\' and svdkdt.svdkdt_xoa=0 and svdkdt.dt_ma = dt.dt_ma and dt.dt_xoa=0 and sv.sv_xoa=0', [gv_ma], (error, results) => {
        callback(error, results.rows);
    });
};


module.exports.getSinhVienBaoCaoList = function (gv_ma ,callback) {
    pool.query('SELECT * FROM sinhvien_dk_detai as svdkdt , sinhvien as sv , detai as dt WHERE svdkdt.sv_ma = sv.sv_ma and svdkdt.ttdk_ma=\'cnbc\' and dt.gv_ma=$1 and dt.ldt_ma=\'lv\' and svdkdt.svdkdt_xoa=0 and svdkdt.dt_ma = dt.dt_ma and dt.dt_xoa=0 and sv.sv_xoa=0', [gv_ma], (error, results) => {
        callback(error, results.rows);
    });
};

module.exports.getSinhVienBaoCaoNienLuanList = function (gv_ma ,callback) {
    pool.query('SELECT * FROM sinhvien_dk_detai as svdkdt , sinhvien as sv , detai as dt WHERE svdkdt.sv_ma = sv.sv_ma and svdkdt.ttdk_ma=\'cnbc\' and dt.gv_ma=$1 and dt.ldt_ma=\'nl\' and svdkdt.svdkdt_xoa=0 and svdkdt.dt_ma = dt.dt_ma and dt.dt_xoa=0 and sv.sv_xoa=0', [gv_ma], (error, results) => {
        callback(error, results.rows);
    });
};


module.exports.getSinhVienBaoCaoTieuLuanList = function (gv_ma ,callback) {
    pool.query('SELECT * FROM sinhvien_dk_detai as svdkdt , sinhvien as sv , detai as dt WHERE svdkdt.sv_ma = sv.sv_ma and svdkdt.ttdk_ma=\'cnbc\' and dt.gv_ma=$1 and dt.ldt_ma=\'tl\' and svdkdt.svdkdt_xoa=0 and svdkdt.dt_ma = dt.dt_ma and dt.dt_xoa=0 and sv.sv_xoa=0', [gv_ma], (error, results) => {
        callback(error, results.rows);
    });
};

module.exports.getSinhVienBaoCaoNienLuanCoSoList = function (gv_ma ,callback) {
    pool.query('SELECT * FROM sinhvien_dk_detai as svdkdt , sinhvien as sv , detai as dt WHERE svdkdt.sv_ma = sv.sv_ma and svdkdt.ttdk_ma=\'cnbc\' and dt.gv_ma=$1 and dt.ldt_ma=\'nlcs\' and svdkdt.svdkdt_xoa=0 and svdkdt.dt_ma = dt.dt_ma and dt.dt_xoa=0 and sv.sv_xoa=0', [gv_ma], (error, results) => {
        callback(error, results.rows);
    });
};


module.exports.getSinhVienTuChoiBaoCaoList = function (gv_ma ,callback) {
    pool.query('SELECT * FROM sinhvien_dk_detai as svdkdt , sinhvien as sv , detai as dt WHERE svdkdt.sv_ma = sv.sv_ma and svdkdt.ttdk_ma=\'tcbc\' and dt.gv_ma=$1 and dt.ldt_ma=\'lv\' and svdkdt.svdkdt_xoa=0 and svdkdt.dt_ma = dt.dt_ma and dt.dt_xoa=0 and sv.sv_xoa=0', [gv_ma], (error, results) => {
        callback(error, results.rows);
    });
};

module.exports.getSinhVienTuChoiBaoCaoNienLuanList = function (gv_ma ,callback) {
    pool.query('SELECT * FROM sinhvien_dk_detai as svdkdt , sinhvien as sv , detai as dt WHERE svdkdt.sv_ma = sv.sv_ma and svdkdt.ttdk_ma=\'tcbc\' and dt.gv_ma=$1 and dt.ldt_ma=\'nl\' and svdkdt.svdkdt_xoa=0 and svdkdt.dt_ma = dt.dt_ma and dt.dt_xoa=0 and sv.sv_xoa=0', [gv_ma], (error, results) => {
        callback(error, results.rows);
    });
};


module.exports.getSinhVienTuChoiBaoCaoTieuLuanList = function (gv_ma ,callback) {
    pool.query('SELECT * FROM sinhvien_dk_detai as svdkdt , sinhvien as sv , detai as dt WHERE svdkdt.sv_ma = sv.sv_ma and svdkdt.ttdk_ma=\'tcbc\' and dt.gv_ma=$1 and dt.ldt_ma=\'tl\' and svdkdt.svdkdt_xoa=0 and svdkdt.dt_ma = dt.dt_ma and dt.dt_xoa=0 and sv.sv_xoa=0', [gv_ma], (error, results) => {
        callback(error, results.rows);
    });
};

module.exports.getSinhVienTuChoiBaoCaoNienLuanCoSoList = function (gv_ma ,callback) {
    pool.query('SELECT * FROM sinhvien_dk_detai as svdkdt , sinhvien as sv , detai as dt WHERE svdkdt.sv_ma = sv.sv_ma and svdkdt.ttdk_ma=\'tcbc\' and dt.gv_ma=$1 and dt.ldt_ma=\'nlcs\' and svdkdt.svdkdt_xoa=0 and svdkdt.dt_ma = dt.dt_ma and dt.dt_xoa=0 and sv.sv_xoa=0', [gv_ma], (error, results) => {
        callback(error, results.rows);
    });
};


module.exports.updateSinhVienDangKiAccept = function (dt_ma, sv_ma, callback) {
    pool.query('UPDATE sinhvien_dk_detai set ttdk_ma=\'cn\' WHERE dt_ma=$1 and sv_ma=$2 ', [dt_ma,sv_ma], (error, result) => {
        callback(error, result);
    });
};

module.exports.updateSinhVienDangKiDecline = function (dt_ma, sv_ma, callback) {
    pool.query('UPDATE sinhvien_dk_detai set ttdk_ma=\'tc\' WHERE dt_ma=$1 and sv_ma=$2 ', [dt_ma,sv_ma], (error, result) => {
        callback(error, result);
    });
};