var dbQuries = require('./modules/sinhvien/db_queries');

module.exports.createSinhVien = function (req, res, next) {
    var sinhvienInfo = req.body;
    dbQuries.createSinhVien(sinhvienInfo, function(error, result) {
        if (error) {
            res.status(501).json({
                message: "Error create new sinhvien!",
                error: error
            });
        }
        res.status(201).send("Sinhvien is added successfully!");
    });
};


module.exports.getSinhVienList = function (req, res, next) {
    var l_ma = req.query.l_ma;
    dbQuries.getSinhVienList(l_ma,function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get sinhvien list!",
                error: error
            });
        }
        res.status(200).json(results);
    });
};


module.exports.getSinhVienInfo = function (req, res, next) {
    var sv_ma = req.query.sv_ma;
    dbQuries.getSinhVienInfo(sv_ma, function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get sinhvien info!",
                error: error
            });
        }
        res.status(200).json(results);
    });
};

module.exports.updateSinhVienInfo = function (req, res, next) {
    var sv_ma = req.query.sv_ma;
    var sinhvienInfo = req.body;
    dbQuries.updateSinhVienInfo(sv_ma, sinhvienInfo, function(error, result) {
        if (error) {
            res.status(501).json({
                message: "Error update sinhvien " + sv_ma,
                error: error
            });
        }
        res.status(201).send("Sinhvien " + sv_ma + " is updated successfully!");
    });
};


module.exports.deleteSinhVien = function (req, res, next) {
    var sv_ma = req.query.sv_ma;
    dbQuries.deleteSinhVien(sv_ma, function(error, result) {
        if (error) {
            res.status(501).json({
                message: "Error delete sinhvien " + sv_ma,
                error: error
            });
        }
        res.status(200).json("delete Sinhvien " + sv_ma + " successfully");
    });
};


module.exports.getSinhVienDangKiList = function (req, res, next) {
    var dt_ma = req.query.dt_ma;
    dbQuries.getSinhVienDangKiList(dt_ma, function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get sinhvien dangki list!",
                error: error
            });
        }
        res.status(200).json(results);
    });
};


module.exports.getSinhVienThucHienList = function (req, res, next) {
    var gv_ma = req.query.gv_ma;
    dbQuries.getSinhVienThucHienList(gv_ma, function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get sinhvien thuchien list!",
                error: error
            });
        }
        res.status(200).json(results);
    });
};

module.exports.getSinhVienThucHienNienLuanList = function (req, res, next) {
    var gv_ma = req.query.gv_ma;
    dbQuries.getSinhVienThucHienNienLuanList(gv_ma, function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get sinhvien thuchien nien luan list!",
                error: error
            });
        }
        res.status(200).json(results);
    });
};

module.exports.getSinhVienThucHienNienLuanCoSoList = function (req, res, next) {
    var gv_ma = req.query.gv_ma;
    dbQuries.getSinhVienThucHienNienLuanCoSoList(gv_ma, function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get sinhvien thuchien nien luan co so list!",
                error: error
            });
        }
        res.status(200).json(results);
    });
};


module.exports.updateSinhVienDangKiAccept = function (req, res, next) {
    var dt_ma = req.query.dt_ma;
    var sv_ma = req.query.sv_ma;
    dbQuries.updateSinhVienDangKiAccept(dt_ma, sv_ma, function(error, result) {
        if (error) {
            res.status(501).json({
                message: "Error update sinhvien accept",
                error: error
            });
        }
        res.status(200).json("Update sinhvien accept successfully");
    });
};


module.exports.updateSinhVienDangKiDecline = function (req, res, next) {
    var dt_ma = req.query.dt_ma;
    var sv_ma = req.query.sv_ma;
    dbQuries.updateSinhVienDangKiDecline(dt_ma, sv_ma, function(error, result) {
        if (error) {
            res.status(501).json({
                message: "Error update sinhvien decline",
                error: error
            });
        }
        res.status(200).json("Update sinhvien decline successfully");
    });
};