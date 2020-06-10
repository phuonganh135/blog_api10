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
        response = await pool.query('SELECT svdkdt.dt_ma, count(svdkdt.sv_ma) as svdk FROM sinhvien_dk_detai as svdkdt, sinhvien as sv WHERE svdkdt.sv_ma = sv.sv_ma and sv.sv_xoa=0 and svdkdt.svdkdt_xoa=0 and svdkdt.dt_ma=$1 and svdkdt.ttdk_ma=\'yc\' GROUP BY svdkdt.dt_ma ',[dt_ma]);
        if (response.rows.length == 0) return 0;
        return parseInt(response.rows[0].svdk);
    }
    catch (error) {
        console.log(eror);
    }
    
}


async function getSinhVienChapNhan(dt_ma) {
    let response;
    try {
        response = await pool.query('SELECT svdkdt.dt_ma, count(svdkdt.sv_ma) as svdk FROM sinhvien_dk_detai as svdkdt , sinhvien as sv WHERE svdkdt.sv_ma=sv.sv_ma and sv.sv_xoa=0 and svdkdt.svdkdt_xoa=0 and svdkdt.dt_ma=$1 and ( svdkdt.ttdk_ma=\'cn\' or svdkdt.ttdk_ma=\'cnbc\' or svdkdt.ttdk_ma=\'tcbc\') GROUP BY svdkdt.dt_ma ',[dt_ma]);
        if (response.rows.length == 0) return 0;
        return parseInt(response.rows[0].svdk);
    }
    catch (error) {
        console.log(eror);
    }
    
}

module.exports.getDeTaiList = function (gv_ma, callback) {
    pool.query('SELECT * FROM detai WHERE gv_ma = $1 and dt_xoa = 0 and dt_trangthai=\'dtgv\' and ldt_ma=\'lv\'',[gv_ma], async function (error, results) {
        var listDeTai = results.rows;
        // var listResult = results.rows;
        for (var i = 0; i < listDeTai.length; i++) {
            var deTai = listDeTai[i];
            var dt_ma = deTai.dt_ma;
            deTai.svdk = await getSinhVienDangKy(dt_ma);
			deTai.svcn= await getSinhVienChapNhan(dt_ma);
            listDeTai[i] = deTai;
        }
        callback(error, listDeTai);
    });
};



module.exports.getDeTaiListTongSoLuong = function (gv_ma, ldt_ma, callback) {
    pool.query('SELECT sum(dt_soluong) as tong_soluong FROM detai WHERE gv_ma = $1 and dt_xoa = 0 and dt_trangthai=\'dtgv\' and ldt_ma=$2',[gv_ma , ldt_ma], async function (error, results) {
        var listDeTai = results.rows;
        // var listResult = results.rows;
        for (var i = 0; i < listDeTai.length; i++) {
            var deTai = listDeTai[i];
            var dt_ma = deTai.dt_ma;
            deTai.svdk = await getSinhVienDangKy(dt_ma);
			deTai.svcn= await getSinhVienChapNhan(dt_ma);
            listDeTai[i] = deTai;
        }
        callback(error, listDeTai);
    });
};

module.exports.getDeTaiNienLuanList = function (gv_ma, callback) {
    pool.query('SELECT * FROM detai WHERE gv_ma = $1 and dt_xoa = 0 and dt_trangthai=\'dtgv\' and ldt_ma=\'nl\'',[gv_ma], async function (error, results) {
        var listDeTai = results.rows;
        // var listResult = results.rows;
        for (var i = 0; i < listDeTai.length; i++) {
            var deTai = listDeTai[i];
            var dt_ma = deTai.dt_ma;
            deTai.svdk = await getSinhVienDangKy(dt_ma);
			deTai.svcn= await getSinhVienChapNhan(dt_ma);
            listDeTai[i] = deTai;
        }
        callback(error, listDeTai);
    });
};

module.exports.getDeTaiTieuLuanList = function (gv_ma, callback) {
    pool.query('SELECT * FROM detai WHERE gv_ma = $1 and dt_xoa = 0 and dt_trangthai=\'dtgv\' and ldt_ma=\'tl\'',[gv_ma], async function (error, results) {
        var listDeTai = results.rows;
        // var listResult = results.rows;
        for (var i = 0; i < listDeTai.length; i++) {
            var deTai = listDeTai[i];
            var dt_ma = deTai.dt_ma;
            deTai.svdk = await getSinhVienDangKy(dt_ma);
			deTai.svcn= await getSinhVienChapNhan(dt_ma);
            listDeTai[i] = deTai;
        }
        callback(error, listDeTai);
    });
};


module.exports.getDeTaiNienLuanCoSoList = function (gv_ma, callback) {
    pool.query('SELECT * FROM detai WHERE gv_ma = $1 and dt_xoa = 0 and dt_trangthai=\'dtgv\' and ldt_ma=\'nlcs\'',[gv_ma], async function (error, results) {
        var listDeTai = results.rows;
        // var listResult = results.rows;
        for (var i = 0; i < listDeTai.length; i++) {
            var deTai = listDeTai[i];
            var dt_ma = deTai.dt_ma;
            deTai.svdk = await getSinhVienDangKy(dt_ma);
			deTai.svcn= await getSinhVienChapNhan(dt_ma);
            listDeTai[i] = deTai;
        }
        callback(error, listDeTai);
    });
};

module.exports.getDeTaiLuanVanSVDXList = function (gv_ma, callback) {
    pool.query('SELECT * FROM detai as dt , sinhvien_dk_detai as svdkdt , sinhvien as sv  WHERE dt.dt_ma=svdkdt.dt_ma and svdkdt.svdkdt_xoa=0 and svdkdt.sv_ma=sv.sv_ma and sv.sv_xoa=0 and svdkdt.ttdk_ma not in (\'hdk\' , \'tc\' ) and dt.gv_ma = $1 and dt.dt_xoa = 0 and dt.dt_trangthai=\'svdx\' and dt.ldt_ma=\'lv\'',[gv_ma], async function (error, results) {
        var listDeTai = results.rows;
        // var listResult = results.rows;
        for (var i = 0; i < listDeTai.length; i++) {
            var deTai = listDeTai[i];
            var dt_ma = deTai.dt_ma;
            deTai.svdk = await getSinhVienDangKy(dt_ma);
			deTai.svcn= await getSinhVienChapNhan(dt_ma);
            listDeTai[i] = deTai;
        }
        callback(error, listDeTai);
    });
};

module.exports.getDeTaiNienLuanSVDXList = function (gv_ma, callback) {
    pool.query('SELECT * FROM detai as dt , sinhvien_dk_detai as svdkdt , sinhvien as sv  WHERE dt.dt_ma=svdkdt.dt_ma and svdkdt.svdkdt_xoa=0 and svdkdt.sv_ma=sv.sv_ma and sv.sv_xoa=0 and svdkdt.ttdk_ma not in (\'hdk\' , \'tc\' ) and dt.gv_ma = $1 and dt.dt_xoa = 0 and dt.dt_trangthai=\'svdx\' and dt.ldt_ma=\'nl\'',[gv_ma], async function (error, results) {
        var listDeTai = results.rows;
        // var listResult = results.rows;
        for (var i = 0; i < listDeTai.length; i++) {
            var deTai = listDeTai[i];
            var dt_ma = deTai.dt_ma;
            deTai.svdk = await getSinhVienDangKy(dt_ma);
			deTai.svcn= await getSinhVienChapNhan(dt_ma);
            listDeTai[i] = deTai;
        }
        callback(error, listDeTai);
    });
};

module.exports.getDeTaiTieuLuanSVDXList = function (gv_ma, callback) {
    pool.query('SELECT * FROM detai as dt , sinhvien_dk_detai as svdkdt , sinhvien as sv  WHERE dt.dt_ma=svdkdt.dt_ma and svdkdt.svdkdt_xoa=0 and svdkdt.sv_ma=sv.sv_ma and sv.sv_xoa=0 and svdkdt.ttdk_ma not in (\'hdk\' , \'tc\' ) and dt.gv_ma = $1 and dt.dt_xoa = 0 and dt.dt_trangthai=\'svdx\' and dt.ldt_ma=\'tl\'',[gv_ma], async function (error, results) {
        var listDeTai = results.rows;
        // var listResult = results.rows;
        for (var i = 0; i < listDeTai.length; i++) {
            var deTai = listDeTai[i];
            var dt_ma = deTai.dt_ma;
            deTai.svdk = await getSinhVienDangKy(dt_ma);
			deTai.svcn= await getSinhVienChapNhan(dt_ma);
            listDeTai[i] = deTai;
        }
        callback(error, listDeTai);
    });
};

module.exports.getDeTaiNienLuanCoSoSVDXList = function (gv_ma, callback) {
    pool.query('SELECT * FROM detai as dt , sinhvien_dk_detai as svdkdt , sinhvien as sv  WHERE dt.dt_ma=svdkdt.dt_ma and svdkdt.svdkdt_xoa=0 and svdkdt.sv_ma=sv.sv_ma and sv.sv_xoa=0 and svdkdt.ttdk_ma not in (\'hdk\' , \'tc\' ) and dt.gv_ma = $1 and dt.dt_xoa = 0 and dt.dt_trangthai=\'svdx\' and dt.ldt_ma=\'nlcs\'',[gv_ma], async function (error, results) {
        var listDeTai = results.rows;
        // var listResult = results.rows;
        for (var i = 0; i < listDeTai.length; i++) {
            var deTai = listDeTai[i];
            var dt_ma = deTai.dt_ma;
            deTai.svdk = await getSinhVienDangKy(dt_ma);
			deTai.svcn= await getSinhVienChapNhan(dt_ma);
            listDeTai[i] = deTai;
        }
        callback(error, listDeTai);
    });
};



module.exports.getDeTaiInfo = function (dt_ma, callback) {
    pool.query('SELECT * FROM detai as dt , loai_detai as ldt, gianvien as gv WHERE dt.gv_ma = gv.gv_ma and ldt.ldt_ma = dt.ldt_ma and ldt.ldt_xoa=0 and dt.dt_ma = $1 and dt.dt_xoa = 0 and gv.gv_xoa=0', [dt_ma], (error, results) => {
        callback(error, results.rows);
    });
};


module.exports.getDeTaiAndSinhVienInfo = function (sv_ma, dt_ma, callback) {
    pool.query('SELECT * FROM detai as dt , sinhvien_dk_detai as svdkdt , sinhvien as sv , trangthai_dangki as ttdk, gianvien as gv WHERE dt.gv_ma = gv.gv_ma and gv.gv_xoa=0 and svdkdt.sv_ma = sv.sv_ma and svdkdt.dt_ma = dt.dt_ma and svdkdt.ttdk_ma = ttdk.ttdk_ma and svdkdt.sv_ma=$1 and dt.dt_ma = $2 and dt.dt_xoa = 0 and sv.sv_xoa=0 and svdkdt.svdkdt_xoa=0 and ttdk.ttdk_xoa=0 and ( svdkdt.ttdk_ma=\'cn\' or svdkdt.ttdk_ma=\'cnbc\' or svdkdt.ttdk_ma=\'tcbc\'  )', [sv_ma, dt_ma], (error, results) => {
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
    pool.query('SELECT * FROM detai as dt , gianvien as gv , gianvien_huongdan as gvhd WHERE gv.gv_ma = gvhd.gv_ma and gvhd.gv_ma = dt.gv_ma and dt.dt_xoa = 0 and gv.gv_xoa=0 and gvhd.gvhd_xoa=0 and gv.bmcn_ma=$1 and gvhd.hk_ma=$2 and gvhd.nh_ma=$3 and dt.ldt_ma=\'lv\' and dt.dt_trangthai=\'dtgv\' ',[bmcn_ma, hk_ma , nh_ma], async function (error, results) {
        var listDeTai = results.rows;
        // var listResult = results.rows;
        for (var i = 0; i < listDeTai.length; i++) {
            var deTai = listDeTai[i];
            var dt_ma = deTai.dt_ma;
            deTai.svdk = await getSinhVienDangKy(dt_ma);
			deTai.svcn= await getSinhVienChapNhan(dt_ma);
            listDeTai[i] = deTai;
        }
        callback(error, listDeTai);
    });
};

module.exports.getDeTaiListOfAllGianVienUpdate = function (bmcn_ma, hk_ma , nh_ma, ldt_ma, sv_ma ,  callback) {
    pool.query('SELECT * FROM detai as dt , gianvien as gv , gianvien_huongdan as gvhd WHERE gv.gv_ma = gvhd.gv_ma and gvhd.gv_ma = dt.gv_ma and dt.dt_xoa = 0 and gv.gv_xoa=0 and gvhd.gvhd_xoa=0 and gv.bmcn_ma=$1 and gvhd.hk_ma=$2 and gvhd.nh_ma=$3 and dt.ldt_ma=$4 and dt.dt_trangthai=\'dtgv\' and dt.dt_ma not in ( select dt_ma from sinhvien_dk_detai where (ttdk_ma=\'cn\' or ttdk_ma=\'cnbc\' or ttdk_ma=\'tcbc\' or ttdk_ma=\'yc\') and sv_ma=$5) ',[bmcn_ma, hk_ma , nh_ma, ldt_ma,sv_ma], async function (error, results) {
        var listDeTai = results.rows;
        // var listResult = results.rows;
        for (var i = 0; i < listDeTai.length; i++) {
            var deTai = listDeTai[i];
            var dt_ma = deTai.dt_ma;
            deTai.svdk = await getSinhVienDangKy(dt_ma);
			deTai.svcn= await getSinhVienChapNhan(dt_ma);
            listDeTai[i] = deTai;
        }
        callback(error, listDeTai);
    });
};

module.exports.getDeTaiListOfOneGianVienUpdate = function (bmcn_ma, hk_ma , nh_ma,gv_ma, ldt_ma, sv_ma, callback) {
    pool.query('SELECT * FROM detai as dt , gianvien as gv , gianvien_huongdan as gvhd WHERE gv.gv_ma = gvhd.gv_ma and gvhd.gv_ma = dt.gv_ma and dt.dt_xoa = 0 and gv.gv_xoa=0 and gvhd.gvhd_xoa=0 and gv.bmcn_ma=$1 and gvhd.hk_ma=$2 and gvhd.nh_ma=$3 and dt.ldt_ma=$5 and dt.dt_trangthai=\'dtgv\' and gv.gv_ma=$4 and dt.dt_ma not in ( select dt_ma from sinhvien_dk_detai where (ttdk_ma=\'cn\' or ttdk_ma=\'cnbc\' or ttdk_ma=\'tcbc\' or ttdk_ma=\'yc\') and sv_ma=$6)  ',[bmcn_ma, hk_ma , nh_ma,gv_ma, ldt_ma, sv_ma], async function (error, results) {
        var listDeTai = results.rows;
        // var listResult = results.rows;
        for (var i = 0; i < listDeTai.length; i++) {
            var deTai = listDeTai[i];
            var dt_ma = deTai.dt_ma;
            deTai.svdk = await getSinhVienDangKy(dt_ma);
			deTai.svcn= await getSinhVienChapNhan(dt_ma);
            listDeTai[i] = deTai;
        }
        callback(error, listDeTai);
    });
};

module.exports.getDeTaiListOfAllGianVienTieuLuan = function (bmcn_ma, hk_ma , nh_ma, callback) {
    pool.query('SELECT * FROM detai as dt , gianvien as gv , gianvien_huongdan as gvhd WHERE gv.gv_ma = gvhd.gv_ma and gvhd.gv_ma = dt.gv_ma and dt.dt_xoa = 0 and gv.gv_xoa=0 and gvhd.gvhd_xoa=0 and gv.bmcn_ma=$1 and gvhd.hk_ma=$2 and gvhd.nh_ma=$3 and dt.ldt_ma=\'tl\' and dt.dt_trangthai=\'dtgv\' ',[bmcn_ma, hk_ma , nh_ma], async function (error, results) {
        var listDeTai = results.rows;
        // var listResult = results.rows;
        for (var i = 0; i < listDeTai.length; i++) {
            var deTai = listDeTai[i];
            var dt_ma = deTai.dt_ma;
            deTai.svdk = await getSinhVienDangKy(dt_ma);
			deTai.svcn= await getSinhVienChapNhan(dt_ma);
            listDeTai[i] = deTai;
        }
        callback(error, listDeTai);
    });
};

module.exports.getDeTaiListOfAllGianVienNienLuan = function (bmcn_ma, hk_ma , nh_ma, callback) {
    pool.query('SELECT * FROM detai as dt , gianvien as gv , gianvien_huongdan as gvhd WHERE gv.gv_ma = gvhd.gv_ma and gvhd.gv_ma = dt.gv_ma and dt.dt_xoa = 0 and gv.gv_xoa=0 and gvhd.gvhd_xoa=0 and gv.bmcn_ma=$1 and gvhd.hk_ma=$2 and gvhd.nh_ma=$3 and dt.ldt_ma=\'nl\' and dt.dt_trangthai=\'dtgv\' ',[bmcn_ma, hk_ma , nh_ma], async function (error, results) {
        var listDeTai = results.rows;
        // var listResult = results.rows;
        for (var i = 0; i < listDeTai.length; i++) {
            var deTai = listDeTai[i];
            var dt_ma = deTai.dt_ma;
            deTai.svdk = await getSinhVienDangKy(dt_ma);
			deTai.svcn= await getSinhVienChapNhan(dt_ma);
            listDeTai[i] = deTai;
        }
        callback(error, listDeTai);
    });
};

module.exports.getDeTaiListOfAllGianVienNienLuanCoSo = function (bmcn_ma, hk_ma , nh_ma, callback) {
    pool.query('SELECT * FROM detai as dt , gianvien as gv , gianvien_huongdan as gvhd WHERE gv.gv_ma = gvhd.gv_ma and gvhd.gv_ma = dt.gv_ma and dt.dt_xoa = 0 and gv.gv_xoa=0 and gvhd.gvhd_xoa=0 and gv.bmcn_ma=$1 and gvhd.hk_ma=$2 and gvhd.nh_ma=$3 and dt.ldt_ma=\'nlcs\' and dt.dt_trangthai=\'dtgv\' ',[bmcn_ma, hk_ma , nh_ma], async function (error, results) {
        var listDeTai = results.rows;
        // var listResult = results.rows;
        for (var i = 0; i < listDeTai.length; i++) {
            var deTai = listDeTai[i];
            var dt_ma = deTai.dt_ma;
            deTai.svdk = await getSinhVienDangKy(dt_ma);
			deTai.svcn= await getSinhVienChapNhan(dt_ma);
            listDeTai[i] = deTai;
        }
        callback(error, listDeTai);
    });
};

module.exports.getDeTaiListOfOneGianVien = function (bmcn_ma, hk_ma , nh_ma,gv_ma, callback) {
    pool.query('SELECT * FROM detai as dt , gianvien as gv , gianvien_huongdan as gvhd WHERE gv.gv_ma = gvhd.gv_ma and gvhd.gv_ma = dt.gv_ma and dt.dt_xoa = 0 and gv.gv_xoa=0 and gvhd.gvhd_xoa=0 and gv.bmcn_ma=$1 and gvhd.hk_ma=$2 and gvhd.nh_ma=$3 and dt.ldt_ma=\'lv\' and dt.dt_trangthai=\'dtgv\' and gv.gv_ma=$4 ',[bmcn_ma, hk_ma , nh_ma,gv_ma], async function (error, results) {
        var listDeTai = results.rows;
        // var listResult = results.rows;
        for (var i = 0; i < listDeTai.length; i++) {
            var deTai = listDeTai[i];
            var dt_ma = deTai.dt_ma;
            deTai.svdk = await getSinhVienDangKy(dt_ma);
			deTai.svcn= await getSinhVienChapNhan(dt_ma);
            listDeTai[i] = deTai;
        }
        callback(error, listDeTai);
    });
};

module.exports.getDeTaiListOfOneGianVienTieuLuan = function (bmcn_ma, hk_ma , nh_ma,gv_ma, callback) {
    pool.query('SELECT * FROM detai as dt , gianvien as gv , gianvien_huongdan as gvhd WHERE gv.gv_ma = gvhd.gv_ma and gvhd.gv_ma = dt.gv_ma and dt.dt_xoa = 0 and gv.gv_xoa=0 and gvhd.gvhd_xoa=0 and gv.bmcn_ma=$1 and gvhd.hk_ma=$2 and gvhd.nh_ma=$3 and dt.ldt_ma=\'tl\' and dt.dt_trangthai=\'dtgv\' and gv.gv_ma=$4 ',[bmcn_ma, hk_ma , nh_ma ,gv_ma], async function (error, results) {
        var listDeTai = results.rows;
        // var listResult = results.rows;
        for (var i = 0; i < listDeTai.length; i++) {
            var deTai = listDeTai[i];
            var dt_ma = deTai.dt_ma;
            deTai.svdk = await getSinhVienDangKy(dt_ma);
			deTai.svcn= await getSinhVienChapNhan(dt_ma);
            listDeTai[i] = deTai;
        }
        callback(error, listDeTai);
    });
};

module.exports.getDeTaiListOfOneGianVienNienLuan = function (bmcn_ma, hk_ma , nh_ma,gv_ma, callback) {
    pool.query('SELECT * FROM detai as dt , gianvien as gv , gianvien_huongdan as gvhd WHERE gv.gv_ma = gvhd.gv_ma and gvhd.gv_ma = dt.gv_ma and dt.dt_xoa = 0 and gv.gv_xoa=0 and gvhd.gvhd_xoa=0 and gv.bmcn_ma=$1 and gvhd.hk_ma=$2 and gvhd.nh_ma=$3 and dt.ldt_ma=\'nl\' and dt.dt_trangthai=\'dtgv\' and gv.gv_ma=$4 ',[bmcn_ma, hk_ma , nh_ma ,gv_ma], async function (error, results) {
        var listDeTai = results.rows;
        // var listResult = results.rows;
        for (var i = 0; i < listDeTai.length; i++) {
            var deTai = listDeTai[i];
            var dt_ma = deTai.dt_ma;
            deTai.svdk = await getSinhVienDangKy(dt_ma);
			deTai.svcn= await getSinhVienChapNhan(dt_ma);
            listDeTai[i] = deTai;
        }
        callback(error, listDeTai);
    });
};

module.exports.getDeTaiListOfOneGianVienNienLuanCoSo = function (bmcn_ma, hk_ma , nh_ma,gv_ma, callback) {
    pool.query('SELECT * FROM detai as dt , gianvien as gv , gianvien_huongdan as gvhd WHERE gv.gv_ma = gvhd.gv_ma and gvhd.gv_ma = dt.gv_ma and dt.dt_xoa = 0 and gv.gv_xoa=0 and gvhd.gvhd_xoa=0 and gv.bmcn_ma=$1 and gvhd.hk_ma=$2 and gvhd.nh_ma=$3 and dt.ldt_ma=\'nlcs\' and dt.dt_trangthai=\'dtgv\' and gv.gv_ma=$4 ',[bmcn_ma, hk_ma , nh_ma ,gv_ma], async function (error, results) {
        var listDeTai = results.rows;
        // var listResult = results.rows;
        for (var i = 0; i < listDeTai.length; i++) {
            var deTai = listDeTai[i];
            var dt_ma = deTai.dt_ma;
            deTai.svdk = await getSinhVienDangKy(dt_ma);
			deTai.svcn= await getSinhVienChapNhan(dt_ma);
            listDeTai[i] = deTai;
        }
        callback(error, listDeTai);
    });
};


module.exports.getDeTaiListYeuCau = function ( sv_ma , callback) {
    pool.query('SELECT * FROM detai as dt , gianvien as gv , sinhvien_dk_detai as svdkdt WHERE dt.dt_ma = svdkdt.dt_ma and gv.gv_ma = dt.gv_ma and dt.dt_xoa = 0 and svdkdt.sv_ma=$1 and svdkdt.svdkdt_xoa=0 and gv.gv_xoa=0 and svdkdt.ttdk_ma=\'yc\' and dt.dt_trangthai=\'dtgv\' and dt.ldt_ma=\'lv\'',[sv_ma], async function (error, results)  {
         var listDeTai = results.rows;
        // var listResult = results.rows;
        for (var i = 0; i < listDeTai.length; i++) {
            var deTai = listDeTai[i];
            var dt_ma = deTai.dt_ma;
            deTai.svdk = await getSinhVienDangKy(dt_ma);
			deTai.svcn= await getSinhVienChapNhan(dt_ma);
            listDeTai[i] = deTai;
        }
        callback(error, listDeTai);
    });
};

module.exports.getDeTaiListYeuCauTieuLuan = function ( sv_ma , callback) {
    pool.query('SELECT * FROM detai as dt , gianvien as gv , sinhvien_dk_detai as svdkdt WHERE dt.dt_ma = svdkdt.dt_ma and gv.gv_ma = dt.gv_ma and dt.dt_xoa = 0 and svdkdt.sv_ma=$1 and svdkdt.svdkdt_xoa=0 and gv.gv_xoa=0 and svdkdt.ttdk_ma=\'yc\' and dt.dt_trangthai=\'dtgv\' and dt.ldt_ma=\'tl\'',[sv_ma], async function (error, result)  {
        var listDeTai = result.rows;
        // var listResult = results.rows;
        for (var i = 0; i < listDeTai.length; i++) {
            var deTai = listDeTai[i];
            var dt_ma = deTai.dt_ma;
            deTai.svdk = await  getSinhVienDangKy(dt_ma);
			deTai.svcn= await getSinhVienChapNhan(dt_ma);
            listDeTai[i] = deTai;
        }
        callback(error, listDeTai);
    });
};

module.exports.getDeTaiListYeuCauNienLuan = function ( sv_ma , callback) {
    pool.query('SELECT * FROM detai as dt , gianvien as gv , sinhvien_dk_detai as svdkdt WHERE dt.dt_ma = svdkdt.dt_ma and gv.gv_ma = dt.gv_ma and dt.dt_xoa = 0 and svdkdt.sv_ma=$1 and svdkdt.svdkdt_xoa=0 and gv.gv_xoa=0 and svdkdt.ttdk_ma=\'yc\' and dt.dt_trangthai=\'dtgv\' and dt.ldt_ma=\'nl\'',[sv_ma], async function (error, result)  {
        var listDeTai = result.rows;
        // var listResult = results.rows;
        for (var i = 0; i < listDeTai.length; i++) {
            var deTai = listDeTai[i];
            var dt_ma = deTai.dt_ma;
            deTai.svdk = await getSinhVienDangKy(dt_ma);
			deTai.svcn= await getSinhVienChapNhan(dt_ma);
            listDeTai[i] = deTai;
        }
        callback(error, listDeTai);
    });
};

module.exports.getDeTaiListYeuCauNienLuanCoSo = function ( sv_ma , callback) {
    pool.query('SELECT * FROM detai as dt , gianvien as gv , sinhvien_dk_detai as svdkdt WHERE dt.dt_ma = svdkdt.dt_ma and gv.gv_ma = dt.gv_ma and dt.dt_xoa = 0 and svdkdt.sv_ma=$1 and svdkdt.svdkdt_xoa=0 and gv.gv_xoa=0 and svdkdt.ttdk_ma=\'yc\' and dt.dt_trangthai=\'dtgv\' and dt.ldt_ma=\'nlcs\'',[sv_ma], async function (error, result)  {
        var listDeTai = result.rows;
        // var listResult = results.rows;
        for (var i = 0; i < listDeTai.length; i++) {
            var deTai = listDeTai[i];
            var dt_ma = deTai.dt_ma;
            deTai.svdk = await getSinhVienDangKy(dt_ma);
			deTai.svcn= await getSinhVienChapNhan(dt_ma);
            listDeTai[i] = deTai;
        }
        callback(error, listDeTai);
    });
};

module.exports.getDeTaiListYeuCauLuanVanSVDX = function ( sv_ma , callback) {
    pool.query('SELECT * FROM detai as dt , gianvien as gv , sinhvien_dk_detai as svdkdt WHERE dt.dt_ma = svdkdt.dt_ma and gv.gv_ma = dt.gv_ma and dt.dt_xoa = 0 and svdkdt.sv_ma=$1 and svdkdt.svdkdt_xoa=0 and gv.gv_xoa=0 and svdkdt.ttdk_ma=\'yc\' and dt.dt_trangthai=\'svdx\' and dt.ldt_ma=\'lv\'',[sv_ma], async function (error, result)  {
        var listDeTai = result.rows;
        // var listResult = results.rows;
        for (var i = 0; i < listDeTai.length; i++) {
            var deTai = listDeTai[i];
            var dt_ma = deTai.dt_ma;
            deTai.svdk = await getSinhVienDangKy(dt_ma);
			deTai.svcn= await getSinhVienChapNhan(dt_ma);
            listDeTai[i] = deTai;
        }
        callback(error, listDeTai);
    });
};


module.exports.getDeTaiListYeuCauTieuLuanSVDX = function ( sv_ma , callback) {
    pool.query('SELECT * FROM detai as dt , gianvien as gv , sinhvien_dk_detai as svdkdt WHERE dt.dt_ma = svdkdt.dt_ma and gv.gv_ma = dt.gv_ma and dt.dt_xoa = 0 and svdkdt.sv_ma=$1 and svdkdt.svdkdt_xoa=0 and gv.gv_xoa=0 and svdkdt.ttdk_ma=\'yc\' and dt.dt_trangthai=\'svdx\' and dt.ldt_ma=\'tl\'',[sv_ma], async function (error, result)  {
        var listDeTai = result.rows;
        // var listResult = results.rows;
        for (var i = 0; i < listDeTai.length; i++) {
            var deTai = listDeTai[i];
            var dt_ma = deTai.dt_ma;
            deTai.svdk = await getSinhVienDangKy(dt_ma);
			deTai.svcn= await getSinhVienChapNhan(dt_ma);
            listDeTai[i] = deTai;
        }
        callback(error, listDeTai);
    });
};


module.exports.getDeTaiListYeuCauNienLuanSVDX = function ( sv_ma , callback) {
    pool.query('SELECT * FROM detai as dt , gianvien as gv , sinhvien_dk_detai as svdkdt WHERE dt.dt_ma = svdkdt.dt_ma and gv.gv_ma = dt.gv_ma and dt.dt_xoa = 0 and svdkdt.sv_ma=$1 and svdkdt.svdkdt_xoa=0 and gv.gv_xoa=0 and svdkdt.ttdk_ma=\'yc\' and dt.dt_trangthai=\'svdx\' and dt.ldt_ma=\'nl\'',[sv_ma], async function (error, result)  {
        var listDeTai = result.rows;
        // var listResult = results.rows;
        for (var i = 0; i < listDeTai.length; i++) {
            var deTai = listDeTai[i];
            var dt_ma = deTai.dt_ma;
            deTai.svdk = await  getSinhVienDangKy(dt_ma);
			deTai.svcn= await getSinhVienChapNhan(dt_ma);
            listDeTai[i] = deTai;
        }
        callback(error, listDeTai);
    });
};


module.exports.getDeTaiListYeuCauNienLuanCoSoSVDX = function ( sv_ma , callback) {
    pool.query('SELECT * FROM detai as dt , gianvien as gv , sinhvien_dk_detai as svdkdt WHERE dt.dt_ma = svdkdt.dt_ma and gv.gv_ma = dt.gv_ma and dt.dt_xoa = 0 and svdkdt.sv_ma=$1 and svdkdt.svdkdt_xoa=0 and gv.gv_xoa=0 and svdkdt.ttdk_ma=\'yc\' and dt.dt_trangthai=\'svdx\' and dt.ldt_ma=\'nlcs\'',[sv_ma], async function (error, result)  {
        var listDeTai = result.rows;
        // var listResult = results.rows;
        for (var i = 0; i < listDeTai.length; i++) {
            var deTai = listDeTai[i];
            var dt_ma = deTai.dt_ma;
            deTai.svdk = await getSinhVienDangKy(dt_ma);
			deTai.svcn= await getSinhVienChapNhan(dt_ma);
            listDeTai[i] = deTai;
        }
        callback(error, listDeTai);
    });
};

module.exports.createSinhVienDangKiDetai = function (svdangkidetaiInfo, callback) {
    const { sv_ma , dt_ma  } = svdangkidetaiInfo;

    pool.query('INSERT INTO sinhvien_dk_detai (svdkdt_xoa , ttdk_ma , sv_ma , dt_ma) VALUES (0,\'yc\',$1, $2)', [sv_ma , dt_ma], (error, result) => {
        callback(error, result);
    });
};


module.exports.createDeTaiChapNhanBaoCao = function (dt_ma,sv_ma, callback) {
    

    pool.query('UPDATE sinhvien_dk_detai  SET ttdk_ma=\'cnbc\'  WHERE dt_ma=$1 and sv_ma=$2', [dt_ma, sv_ma], (error, result) => {
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



module.exports.getDeTaiInfoSVChapNhan = function ( sv_ma , dt_ma, callback) {
    pool.query('SELECT * FROM detai as dt , sinhvien_dk_detai as svdkdt , gianvien as gv , trangthai_dangki as ttdk WHERE dt.gv_ma = gv.gv_ma and svdkdt.ttdk_ma = ttdk.ttdk_ma and gv.gv_xoa=0 and dt.dt_ma = svdkdt.dt_ma and dt.dt_xoa = 0 and svdkdt.sv_ma=$1 and svdkdt.svdkdt_xoa=0 and svdkdt.dt_ma=$2 ',[sv_ma,dt_ma], (error, result) => {
        callback(error, result.rows);
    });
};


module.exports.getDeTaiListChapNhanCheckIsRegister = function ( sv_ma , ldt_ma, callback) {
    pool.query('SELECT count(svdkdt.sv_ma) as soluong FROM detai as dt , sinhvien_dk_detai as svdkdt , gianvien as gv , trangthai_dangki as ttdk WHERE dt.gv_ma = gv.gv_ma and svdkdt.ttdk_ma = ttdk.ttdk_ma and ttdk.ttdk_xoa=0 and gv.gv_xoa=0 and dt.dt_ma = svdkdt.dt_ma and dt.dt_xoa = 0 and svdkdt.sv_ma=$1 and ( svdkdt.ttdk_ma=\'cn\' or svdkdt.ttdk_ma=\'cnbc\' or svdkdt.ttdk_ma=\'tcbc\') and svdkdt.svdkdt_xoa=0 and dt.ldt_ma=$2 ',[sv_ma, ldt_ma], (error, result) => {
        callback(error, result.rows);
    });
};



module.exports.getDeTaiListChapNhan = function ( sv_ma , callback) {
    pool.query('SELECT * FROM detai as dt , sinhvien_dk_detai as svdkdt , gianvien as gv , trangthai_dangki as ttdk WHERE dt.gv_ma = gv.gv_ma and svdkdt.ttdk_ma = ttdk.ttdk_ma and ttdk.ttdk_xoa=0 and gv.gv_xoa=0 and dt.dt_ma = svdkdt.dt_ma and dt.dt_xoa = 0 and svdkdt.sv_ma=$1 and ( svdkdt.ttdk_ma=\'cn\' or svdkdt.ttdk_ma=\'cnbc\' or svdkdt.ttdk_ma=\'tcbc\') and svdkdt.svdkdt_xoa=0 and dt.ldt_ma=\'lv\' ',[sv_ma], (error, result) => {
        callback(error, result.rows);
    });
};


module.exports.getDeTaiListTuChoi = function ( sv_ma , callback) {
    pool.query('SELECT * FROM loai_detai as ldt, detai as dt , sinhvien_dk_detai as svdkdt , gianvien as gv , trangthai_dangki as ttdk WHERE dt.ldt_ma=ldt.ldt_ma and dt.gv_ma = gv.gv_ma and svdkdt.ttdk_ma = ttdk.ttdk_ma and ttdk.ttdk_xoa=0 and gv.gv_xoa=0 and dt.dt_ma = svdkdt.dt_ma and dt.dt_xoa = 0 and svdkdt.sv_ma=$1 and svdkdt.ttdk_ma=\'tc\'',[sv_ma], (error, result) => {
        callback(error, result.rows);
    });
};

module.exports.getDeTaiListChapNhanTieuLuan = function ( sv_ma , callback) {
    pool.query('SELECT * FROM detai as dt , sinhvien_dk_detai as svdkdt , gianvien as gv , trangthai_dangki as ttdk WHERE dt.gv_ma = gv.gv_ma and svdkdt.ttdk_ma = ttdk.ttdk_ma and ttdk.ttdk_xoa=0 and gv.gv_xoa=0 and dt.dt_ma = svdkdt.dt_ma and dt.dt_xoa = 0 and svdkdt.sv_ma=$1 and ( svdkdt.ttdk_ma=\'cn\' or svdkdt.ttdk_ma=\'cnbc\' or svdkdt.ttdk_ma=\'tcbc\') and svdkdt.svdkdt_xoa=0 and dt.ldt_ma=\'tl\' ',[sv_ma], (error, result) => {
        callback(error, result.rows);
    });
};

module.exports.getDeTaiListChapNhanNienLuan = function ( sv_ma , callback) {
    pool.query('SELECT * FROM detai as dt , sinhvien_dk_detai as svdkdt , gianvien as gv , trangthai_dangki as ttdk WHERE dt.gv_ma = gv.gv_ma and svdkdt.ttdk_ma = ttdk.ttdk_ma and ttdk.ttdk_xoa=0 and gv.gv_xoa=0 and dt.dt_ma = svdkdt.dt_ma and dt.dt_xoa = 0 and svdkdt.sv_ma=$1 and ( svdkdt.ttdk_ma=\'cn\' or svdkdt.ttdk_ma=\'cnbc\' or svdkdt.ttdk_ma=\'tcbc\') and svdkdt.svdkdt_xoa=0 and dt.ldt_ma=\'nl\' ',[sv_ma], (error, result) => {
        callback(error, result.rows);
    });
};

module.exports.getDeTaiListChapNhanNienLuanCoSo = function ( sv_ma , callback) {
    pool.query('SELECT * FROM detai as dt , sinhvien_dk_detai as svdkdt , gianvien as gv , trangthai_dangki as ttdk WHERE dt.gv_ma = gv.gv_ma and svdkdt.ttdk_ma = ttdk.ttdk_ma and ttdk.ttdk_xoa=0 and gv.gv_xoa=0 and dt.dt_ma = svdkdt.dt_ma and dt.dt_xoa = 0 and svdkdt.sv_ma=$1 and ( svdkdt.ttdk_ma=\'cn\' or svdkdt.ttdk_ma=\'cnbc\' or svdkdt.ttdk_ma=\'tcbc\') and svdkdt.svdkdt_xoa=0 and dt.ldt_ma=\'nlcs\' ',[sv_ma], (error, result) => {
        callback(error, result.rows);
    });
};


module.exports.deleteDeTaiHuyYeuCau = function (dt_ma, sv_ma , callback) {
    pool.query('UPDATE sinhvien_dk_detai set svdkdt_xoa=1 , ttdk_ma=\'hdk\'  WHERE dt_ma=$1 and sv_ma=$2', [dt_ma, sv_ma], (error, result) => {
        callback(error, result);
    });
};



module.exports.createDeTaiTuChoiBaoCao = function (dt_ma, sv_ma , callback) {

    pool.query('UPDATE sinhvien_dk_detai set  ttdk_ma=\'tcbc\'  WHERE dt_ma=$1 and sv_ma=$2', [dt_ma, sv_ma], (error, result) => {
        callback(error, result);
    });
};