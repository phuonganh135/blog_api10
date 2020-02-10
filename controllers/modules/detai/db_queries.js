const Pool = require('pg').Pool;
var commonModule = require('../common.js');
var dbConfig = require('../../db_config.json');
const pool = new Pool(dbConfig);

module.exports.createDeTai = function (detaiInfo, callback) {
    const { dt_ten, dt_mieuta, dt_trangthai, dt_soluong, dt_xoa , gv_ma , nh_ma , hk_ma , ldt_ma  } = detaiInfo;

    pool.query('INSERT INTO detai (dt_ten, dt_mieuta, dt_trangthai, dt_soluong, dt_xoa , gv_ma , nh_ma , hk_ma , ldt_ma) VALUES ($1, $2, $3, $4, $5, $6, $7, $8,$9)', [dt_ten, dt_mieuta, dt_trangthai, dt_soluong, dt_xoa , gv_ma , nh_ma , hk_ma , ldt_ma], (error, result) => {
        callback(error, result);
    });
};

async function getSinhVienDangKy(dt_ma) {
    let response;
    try {
        response = await pool.query('SELECT dt_ma, count(sv_ma) as svdk FROM sinhvien_dk_detai WHERE dt_ma=$1 and ttdk_ma=\'yc\' GROUP BY sv_ma, dt_ma',[dt_ma]);
        if (response.rows.length == 0) return 0;
        return parseInt(response.rows[0].svdk);
    }
    catch (error) {
        console.log(eror);
    }
    
}

module.exports.getDeTaiList = function (gv_ma, callback) {
    pool.query('SELECT * FROM detai WHERE gv_ma = $1 and dt_xoa = 0',[gv_ma], async function (error, results) {
        var listDeTai = results.rows;
        // var listResult = results.rows;
        for (var i = 0; i < listDeTai.length; i++) {
            var deTai = listDeTai[i];
            var dt_ma = deTai.dt_ma;
            deTai.svdk = await getSinhVienDangKy(dt_ma);
            listDeTai[i] = deTai;
        }
        callback(error, listDeTai);
    });
};



module.exports.getDeTaiInfo = function (dt_ma, callback) {
    pool.query('SELECT * FROM detai WHERE dt_ma = $1 and dt_xoa = 0', [dt_ma], (error, results) => {
        callback(error, results.rows);
    });
};


module.exports.updateDeTai = function (dt_ma, detaiInfo, callback) {
    const { dt_ten, dt_mieuta, dt_soluong  } = detaiInfo;

    pool.query('UPDATE detai set dt_ten=$1 , dt_mieuta=$2 , dt_soluong=$3 WHERE dt_ma=$4 ', [dt_ten, dt_mieuta, dt_soluong, dt_ma], (error, result) => {
        callback(error, result);
    });
};


module.exports.deleteDeTai = function (dt_ma, callback) {
    pool.query('UPDATE detai set dt_xoa=1 WHERE dt_ma=$1', [dt_ma], (error, result) => {
        callback(error, result);
    });
};



// SinhVien form

module.exports.getDeTaiListOfAllGianVien = function (bmcn_ma, hk_ma , nh_ma, callback) {
    pool.query('SELECT * FROM detai as dt , gianvien as gv , gianvien_huongdan as gvhd WHERE gv.gv_ma = gvhd.gv_ma and gvhd.gv_ma = dt.gv_ma and dt.dt_xoa = 0 and gv.bmcn_ma=$1 and gvhd.hk_ma=$2 and gvhd.nh_ma=$3 ',[bmcn_ma, hk_ma , nh_ma], async function (error, results) {
        var listDeTai = results.rows;
        // var listResult = results.rows;
        for (var i = 0; i < listDeTai.length; i++) {
            var deTai = listDeTai[i];
            var dt_ma = deTai.dt_ma;
            deTai.svdk = await getSinhVienDangKy(dt_ma);
            listDeTai[i] = deTai;
        }
        callback(error, listDeTai);
    });
};

module.exports.getDeTaiListYeuCau = function ( sv_ma , callback) {
    pool.query('SELECT * FROM detai as dt , gianvien as gv , sinhvien_dk_detai as svdkdt WHERE dt.dt_ma = svdkdt.dt_ma and gv.gv_ma = dt.gv_ma and dt.dt_xoa = 0 and svdkdt.sv_ma=$1 and svdkdt.svdkdt_xoa=0 ',[sv_ma], (error, result) => {
        callback(error, result.rows);
    });
};

module.exports.createSinhVienDangKiDetai = function (svdangkidetaiInfo, callback) {
    const { sv_ma , dt_ma  } = svdangkidetaiInfo;

    pool.query('INSERT INTO sinhvien_dk_detai (svdkdt_xoa , ttdk_ma , sv_ma , dt_ma) VALUES (0,\'yc\',$1, $2)', [sv_ma , dt_ma], (error, result) => {
        callback(error, result);
    });
};


module.exports.createSinhVienDeXuatDetai = function (svdexuatdetaiInfo, callback) {

    const { dt_ten, dt_mieuta, dt_trangthai, dt_soluong, dt_xoa , gv_ma , nh_ma , hk_ma , ldt_ma , sv_ma } = svdexuatdetaiInfo;

    pool.query('INSERT INTO detai (dt_ten, dt_mieuta, dt_trangthai, dt_soluong, dt_xoa , gv_ma , nh_ma , hk_ma , ldt_ma) VALUES ($1, $2, $3, $4, $5, $6, $7, $8,$9)', [dt_ten, dt_mieuta, dt_trangthai, dt_soluong, dt_xoa , gv_ma , nh_ma , hk_ma , ldt_ma], (error, result) => {
        // callback(error, result);
        if (error) {
            callback(error, result);
        }


        pool.query('SELECT dt_ma FROM detai WHERE dt_xoa=0 and dt_ten=$1 and dt_mieuta=$2 and dt_trangthai=$3 and dt_soluong=$4 and gv_ma=$5 and nh_ma=$6 and hk_ma=$7 and ldt_ma=$8', [dt_ten, dt_mieuta, dt_trangthai, dt_soluong, gv_ma , nh_ma , hk_ma , ldt_ma], (error2, result2) => {
            
            var listDeTai = result2.rows;
            // var listResult = results.rows;
            var deTai = listDeTai[0];
            var dt_ma = deTai.dt_ma;

            // callback(error, result);
            if (error) {
                callback(error2, result2);
            }

            pool.query('INSERT INTO sinhvien_dk_detai (svdkdt_xoa , ttdk_ma , sv_ma , dt_ma) VALUES (0,\'yc\',$1, $2)', [sv_ma , dt_ma], (error3, result3) => {
                // callback(error, result);
                callback(error3, result3);
            });

        });


    });
    
};


module.exports.getDeTaiListChapNhan = function ( sv_ma , callback) {
    pool.query('SELECT * FROM detai as dt , sinhvien_dk_detai as svdkdt WHERE dt.dt_ma = svdkdt.dt_ma and dt.dt_xoa = 0 and svdkdt.sv_ma=$1 and svdkdt.ttdk_ma=\'cn\'',[sv_ma], (error, result) => {
        callback(error, result.rows);
    });
};


module.exports.deleteDeTaiHuyYeuCau = function (dt_ma, sv_ma , callback) {
    pool.query('UPDATE sinhvien_dk_detai set svdkdt_xoa=1 WHERE dt_ma=$1 and sv_ma=$2', [dt_ma, sv_ma], (error, result) => {
        callback(error, result);
    });
};