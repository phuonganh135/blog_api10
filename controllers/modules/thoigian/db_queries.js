const Pool = require('pg').Pool;
var commonModule = require('../common.js');
var dbConfig = require('../../db_config.json');
const pool = new Pool(dbConfig);


module.exports.getThoiGianList = function (nh_ma, hk_ma, k_ma, callback) {
    pool.query('SELECT * FROM thoigian_dk_bc as tgdkbc, loai_thoigian as ltg WHERE tgdkbc.ltg_ma = ltg.ltg_ma and tgdkbc.nh_ma = $1 and tgdkbc.hk_ma = $2 and tgdkbc.k_ma = $3', [nh_ma, hk_ma , k_ma ], (error, results) => {
        callback(error, results.rows);
    });
};

module.exports.createThoiGian = function (thoigianInfo, callback) {
    const { tg_batdau, tg_ketthuc,  nh_ma, hk_ma , k_ma , ltg_ma , tg_xoa   } = thoigianInfo;

    pool.query('INSERT INTO thoigian_dk_bc (tg_batdau, tg_ketthuc, nh_ma, hk_ma , k_ma , ltg_ma , tg_xoa) VALUES ($1, $2, $3, $4, $5, $6, $7)', [tg_batdau, tg_ketthuc, nh_ma, hk_ma , k_ma , ltg_ma , tg_xoa], (error, result) => {
        callback(error, result);
    });
};