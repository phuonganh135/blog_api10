var dbQuries = require('./modules/bomon_chuyennganh/db_queries');

module.exports.createBoMonChuyenNganh = function (req, res, next) {
    var bomon_chuyennganhInfo = req.body;
    dbQuries.createBoMonChuyenNganh(bomon_chuyennganhInfo, function(error, result) {
        if (error) {
            res.status(501).json({
                message: "Error create new bomon_chuyennganh!",
                error: error
            });
        }
        res.status(201).send("bomon_chuyennganh is added successfully!");
    });
};



module.exports.getBoMonChuyenNganhList = function (req, res, next) {
    var k_ma = req.query.k_ma;
    dbQuries.getBoMonChuyenNganhList(k_ma, function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get bomon_chuyennganh with k_ma " + k_ma,
                error: error
            });
        }
        res.status(200).json(results);
    });
};

module.exports.getBoMonChuyenNganhListAll = function (req, res, next) {
    dbQuries.getBoMonChuyenNganhListAll( function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get bomon_chuyennganh with all ",
                error: error
            });
        }
        res.status(200).json(results);
    });
};



module.exports.updateBoMonChuyenNganhInfo = function (req, res, next) {
    var bmcn_ma = req.query.bmcn_ma;
    var bomon_chuyennganhInfo = req.body;
    dbQuries.updateBoMonChuyenNganhInfo(bmcn_ma, bomon_chuyennganhInfo, function(error, result) {
        if (error) {
            res.status(501).json({
                message: "Error update bomon_chuyennganh " + bmcn_ma,
                error: error
            });
        }
        res.status(201).send("Debomon_chuyennganhtai " + bmcn_ma + " is updated successfully!");
    });
};


module.exports.deleteBoMonChuyenNganh = function (req, res, next) {
    var bmcn_ma = req.query.bmcn_ma;
    dbQuries.deleteBoMonChuyenNganh(bmcn_ma, function(error, result) {
        if (error) {
            res.status(501).json({
                message: "Error delete bomon_chuyennganh " + bmcn_ma,
                error: error
            });
        }
        res.status(200).json("Delete bomon_chuyennganh " + bmcn_ma + " successfully");
    });
};


module.exports.getBoMonChuyenNganhInfo = function (req, res, next) {
    var bmcn_ma = req.query.bmcn_ma;
    dbQuries.getBoMonChuyenNganhInfo(bmcn_ma, function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get bomon_chuyennganh info!",
                error: error
            });
        }
        res.status(200).json(results);
    });
};