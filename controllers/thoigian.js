var dbQuries = require('./modules/thoigian/db_queries');

module.exports.getThoiGianList = function (req, res, next) {
    var nh_ma = req.query.nh_ma;
    var hk_ma = req.query.hk_ma;
    var k_ma = req.query.k_ma;
	var ltg_loaidetai = req.query.ltg_loaidetai;
    dbQuries.getThoiGianList(nh_ma, hk_ma , k_ma, ltg_loaidetai , function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get thoigian!",
                error: error
            });
        }
        res.status(200).json(results);
    });
};


module.exports.createThoiGian = function (req, res, next) {
    var thoigianInfo = req.body;
    dbQuries.createThoiGian(thoigianInfo, function(error, result) {
        if (error) {
            res.status(501).json({
                message: "Error create new thoigian!",
                error: error
            });
        }
        res.status(201).send("Thoigian is added successfully!");
    });
};

module.exports.getThoiGianInfo = function (req, res, next) {
    var tg_ma = req.query.tg_ma;
    dbQuries.getThoiGianInfo(tg_ma, function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get thoigian info!",
                error: error
            });
        }
        res.status(200).json(results);
    });
};


module.exports.updateThoiGianInfo = function (req, res, next) {
    var tg_ma = req.query.tg_ma;
    var thoigianInfo = req.body;
    dbQuries.updateThoiGianInfo(tg_ma, thoigianInfo, function(error, result) {
        if (error) {
            res.status(501).json({
                message: "Error update thoigian " + tg_ma,
                error: error
            });
        }
        res.status(201).send("Thoigian " + tg_ma + " is updated successfully!");
    });
};


module.exports.deleteThoiGian = function (req, res, next) {
    var tg_ma = req.query.tg_ma;
    dbQuries.deleteThoiGian(tg_ma, function(error, result) {
        if (error) {
            res.status(501).json({
                message: "Error delete thoigian " + tg_ma,
                error: error
            });
        }
        res.status(200).json("Thoigian " + tg_ma + " delete successfully");
    });
};