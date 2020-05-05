var dbQuries = require('./modules/giangvien/db_queries');

module.exports.createGiangVien = function (req, res, next) {
    var giangvienInfo = req.body;
    dbQuries.createGiangVien(giangvienInfo, function(error, result) {
        if (error) {
            res.status(501).json({
                message: "Error create new giangvien!",
                error: error
            });
        }
        res.status(201).send("giangvien is added successfully!");
    });
};

module.exports.getGiangVienList = function (req, res, next) {
    var bmcn_ma = req.query.bmcn_ma;
    dbQuries.getGiangVienList(bmcn_ma ,function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get GiangVien list!",
                error: error
            });
        }
        res.status(200).json(results);
    });
};

module.exports.getGiangVienListAll = function (req, res, next) {
    dbQuries.getGiangVienListAll(function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get GiangVien list all !",
                error: error
            });
        }
        res.status(200).json(results);
    });
};


module.exports.getGiangVienListKhoa = function (req, res, next) {
    var k_ma = req.query.k_ma;
    dbQuries.getGiangVienListKhoa(k_ma ,function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get GiangVien list!",
                error: error
            });
        }
        res.status(200).json(results);
    });
};

module.exports.getGiangVienInfo = function (req, res, next) {
    var gv_ma = req.query.gv_ma;
    dbQuries.getGiangVienInfo(gv_ma,function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get GiangVien info!",
                error: error
            });
        }
        res.status(200).json(results);
    });
};


module.exports.updateGiangVienInfo = function (req, res, next) {
    var gv_ma = req.query.gv_ma;
    var giangvienInfo = req.body;
    dbQuries.updateGiangVienInfo(gv_ma, giangvienInfo, function(error, result) {
        if (error) {
            res.status(501).json({
                message: "Error update GiangVien info " + gv_ma,
                error: error
            });
        }
        res.status(201).send("GiangVien info " + gv_ma + " is updated successfully!");
    });
};


module.exports.deleteGiangVien = function (req, res, next) {
    var gv_ma = req.query.gv_ma;
    dbQuries.deleteGiangVien(gv_ma, function(error, result) {
        if (error) {
            res.status(501).json({
                message: "Error delete GiangVien " + gv_ma,
                error: error
            });
        }
        res.status(200).json("GiangVien " + gv_ma + " successfully");
    });
};