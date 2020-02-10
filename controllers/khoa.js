var dbQuries = require('./modules/khoa/db_queries');

module.exports.createKhoa = function (req, res, next) {
    var khoaInfo = req.body;
    dbQuries.createKhoa(khoaInfo, function(error, result) {
        if (error) {
            res.status(501).json({
                message: "Error create new khoa!",
                error: error
            });
        }
        res.status(201).send("Khoa is added successfully!");
    });
};

module.exports.getKhoaList = function (req, res, next) {
    dbQuries.getKhoaList(function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get khoa list!",
                error: error
            });
        }
        res.status(200).json(results);
    });
};

module.exports.updateKhoaInfo = function (req, res, next) {
    var k_ma = req.query.k_ma;
    var khoaInfo = req.body;
    dbQuries.updateKhoaInfo(k_ma, khoaInfo, function(error, result) {
        if (error) {
            res.status(501).json({
                message: "Error update khoa " + k_ma,
                error: error
            });
        }
        res.status(201).send("Khoa " + k_ma + " is updated successfully!");
    });
};


module.exports.deleteKhoa = function (req, res, next) {
    var k_ma = req.query.k_ma;
    dbQuries.deleteKhoa(k_ma, function(error, result) {
        if (error) {
            res.status(501).json({
                message: "Error delete khoa " + k_ma,
                error: error
            });
        }
        res.status(200).json("Delete khoa " + k_ma + " successfully");
    });
};


module.exports.getKhoaInfo = function (req, res, next) {
    var k_ma = req.query.k_ma;
    dbQuries.getKhoaInfo(k_ma, function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get khoa info!",
                error: error
            });
        }
        res.status(200).json(results);
    });
};