var dbQuries = require('./modules/thongbao_detai/db_queries');



module.exports.createThongBaoDeTai = function (req, res, next) {
    var thongbaoInfo = req.body;
    dbQuries.createThongBaoDeTai(thongbaoInfo, function(error, result) {
        if (error) {
            res.status(501).json({
                message: "Error create new thongbao!",
                error: error
            });
        }
        res.status(201).send("Thognbao is added successfully!");
    });
};


module.exports.getThongBaoDeTaiList = function (req, res, next) {
    var gv_ma = req.query.gv_ma;
    dbQuries.getThongBaoDeTaiList(gv_ma, function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get thongbao list!",
                error: error
            });
        }
        res.status(200).json(results);
    });
};


module.exports.updateThongBaoDeTai = function (req, res, next) {
    var tbdt_stt = req.query.tbdt_stt;
    var sv_ma = req.query.sv_ma;
    var bl_ma = req.query.bl_ma;
    var dt_ma = req.query.dt_ma;
    dbQuries.updateThongBaoDeTai(tbdt_stt, sv_ma, bl_ma, dt_ma , function(error, result) {
        if (error) {
            res.status(501).json({
                message: "Error update thongbao accept",
                error: error
            });
        }
        res.status(200).json("Update thongbao accept successfully");
    });
};