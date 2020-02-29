var dbQuries = require('./modules/giangvien_huongdan/db_queries');

module.exports.createGiangVienHuongDan = function (req, res, next) {
    var gvhuongdanInfo = req.body;
    dbQuries.createGiangVienHuongDan(gvhuongdanInfo, function(error, result) {
        if (error) {
            res.status(501).json({
                message: "Error create new giangvien_huongdan!",
                error: error
            });
        }
        res.status(201).send("giangvien_huongdan is added successfully!");
    });
};

module.exports.getGiangVienHuongDanList = function (req, res, next) {
	var bmcn_ma = req.query.bmcn_ma;
	var nh_ma = req.query.nh_ma;
	var hk_ma = req.query.hk_ma;
    dbQuries.getGiangVienHuongDanList(bmcn_ma , nh_ma,hk_ma, function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get giangvien_huongdan list!",
                error: error
            });
        }
        res.status(200).json(results);
    });
};

module.exports.getGiangVienHuongDanInfo = function (req, res, next) {
    var gv_ma = req.query.gv_ma
	var nh_ma = req.query.nh_ma;
	var hk_ma = req.query.hk_ma;
	
    dbQuries.getGiangVienHuongDanInfo(gv_ma, nh_ma, hk_ma, function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get giangvien_huongdan info!",
                error: error
            });
        }
        res.status(200).json(results);
    });
};



module.exports.updateGiangVienHuongDanInfo = function (req, res, next) {
    var gv_ma = req.query.gv_ma;
	var nh_ma = req.query.nh_ma;
	var hk_ma = req.query.hk_ma;
    var gvhuongdanInfo = req.body;
    dbQuries.updateGiangVienHuongDanInfo(gv_ma, nh_ma,hk_ma,  gvhuongdanInfo, function(error, result) {
        if (error) {
            res.status(501).json({
                message: "Error update giangvien_huongdan info " + gv_ma,
                error: error
            });
        }
        res.status(201).send("Giangvien_huongdan info " + gv_ma + " is updated successfully!");
    });
};




module.exports.deleteGiangVienHuongDan = function (req, res, next) {
    var gv_ma = req.query.gv_ma;
	var nh_ma = req.query.nh_ma;
	var hk_ma = req.query.hk_ma;
    dbQuries.deleteGiangVienHuongDan(gv_ma, nh_ma,hk_ma, function(error, result) {
        if (error) {
            res.status(501).json({
                message: "Error delete giangvien_huongdan " + gv_ma,
                error: error
            });
        }
        res.status(200).json("Giangvien_huongdan " + gv_ma + " successfully");
    });
};




















