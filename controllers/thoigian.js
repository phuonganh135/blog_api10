var dbQuries = require('./modules/thoigian/db_queries');

module.exports.getThoiGianList = function (req, res, next) {
    var nh_ma = req.query.nh_ma;
    var hk_ma = req.query.hk_ma;
    var k_ma = req.query.k_ma;
    dbQuries.getThoiGianList(nh_ma, hk_ma , k_ma, function(error, results) {
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