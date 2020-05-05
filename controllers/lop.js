var dbQuries = require('./modules/lop/db_queries');

module.exports.createLop = function (req, res, next) {
    var lopInfo = req.body;
    dbQuries.createLop(lopInfo, function(error, result) {
        if (error) {
            res.status(501).json({
                message: "Error create lop user!",
                error: error
            });
        }
        res.status(201).send("Lop is added successfully!");
    });
};


module.exports.getLopList = function (req, res, next) {
    var bmcn_ma = req.query.bmcn_ma;
    dbQuries.getLopList(bmcn_ma, function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get lop with k_ma " + bmcn_ma,
                error: error
            });
        }
        res.status(200).json(results);
    });
};

module.exports.getLopListAll = function (req, res, next) {

    dbQuries.getLopListAll( function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get lop all ",
                error: error
            });
        }
        res.status(200).json(results);
    });
};


module.exports.getLopLisKhoa = function (req, res, next) {
    var k_ma = req.query.k_ma;
    dbQuries.getLopLisKhoa(k_ma, function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get lop with k_ma " + k_ma,
                error: error
            });
        }
        res.status(200).json(results);
    });
};

module.exports.updateLopInfo = function (req, res, next) {
    var l_ma = req.query.l_ma;
    var lopInfo = req.body;
    dbQuries.updateLopInfo(l_ma, lopInfo, function(error, result) {
        if (error) {
            res.status(501).json({
                message: "Error update lop " + l_ma,
                error: error
            });
        }
        res.status(201).send("Lop " + l_ma + " is updated successfully!");
    });
};

module.exports.deleteLop = function (req, res, next) {
    var l_ma = req.query.l_ma;
    dbQuries.deleteLop(l_ma, function(error, result) {
        if (error) {
            res.status(501).json({
                message: "Error delete lop " + l_ma,
                error: error
            });
        }
        res.status(200).json("Lop " + l_ma + " successfully");
    });
};


module.exports.getLopInfo = function (req, res, next) {
    var l_ma = req.query.l_ma;
    dbQuries.getLopInfo(l_ma, function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get lop info!",
                error: error
            });
        }
        res.status(200).json(results);
    });
};