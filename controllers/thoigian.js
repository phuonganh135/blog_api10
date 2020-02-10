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