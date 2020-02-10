var dbQuries = require('./modules/detai/db_queries');

module.exports.createDeTai = function (req, res, next) {
    var detaiInfo = req.body;
    dbQuries.createDeTai(detaiInfo, function(error, result) {
        if (error) {
            res.status(501).json({
                message: "Error create new detai!",
                error: error
            });
        }
        res.status(201).send("Detai is added successfully!");
    });
};


module.exports.getDeTaiList = function (req, res, next) {
    var gv_ma = req.query.gv_ma;
    dbQuries.getDeTaiList(gv_ma, function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get detai list!",
                error: error
            });
        }
        res.status(200).json(results);
    });
};


module.exports.getDeTaiInfo = function (req, res, next) {
    var dt_ma = req.query.dt_ma;
    dbQuries.getDeTaiInfo(dt_ma, function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get detai info!",
                error: error
            });
        }
        res.status(200).json(results);
    });
};


module.exports.updateDeTai = function (req, res, next) {
    var dt_ma = req.query.dt_ma;
    var detaiInfo = req.body;
    dbQuries.updateDeTai(dt_ma, detaiInfo, function(error, result) {
        if (error) {
            res.status(501).json({
                message: "Error update detai " + dt_ma,
                error: error
            });
        }
        res.status(201).send("Detai " + dt_ma + " is updated successfully!");
    });
};


module.exports.deleteDeTai = function (req, res, next) {
    var dt_ma = req.query.dt_ma;
    dbQuries.deleteDeTai(dt_ma, function(error, result) {
        if (error) {
            res.status(501).json({
                message: "Error delete detai " + dt_ma,
                error: error
            });
        }
        res.status(200).json("Delete detai " + dt_ma + " successfully");
    });
};


// SinhVien Form

module.exports.getDeTaiListOfAllGianVien = function (req, res, next) {
    var bmcn_ma = req.query.bmcn_ma;
    var hk_ma = req.query.hk_ma;
    var nh_ma = req.query.nh_ma;
    dbQuries.getDeTaiListOfAllGianVien(bmcn_ma, hk_ma , nh_ma,  function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get detai list of all gianvien!",
                error: error
            });
        }
        res.status(200).json(results);
    });
};

module.exports.getDeTaiListYeuCau = function (req, res, next) {
    var sv_ma = req.query.sv_ma;
    dbQuries.getDeTaiListYeuCau(sv_ma, function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get detai list yeu cau!",
                error: error
            });
        }
        res.status(200).json(results);
    });
};


module.exports.createSinhVienDangKiDetai = function (req, res, next) {
    var svdangkidetaiInfo = req.body;
    dbQuries.createSinhVienDangKiDetai(svdangkidetaiInfo, function(error, result) {
        if (error) {
            res.status(501).json({
                message: "Error create new sinh vien dang ki de tai detai!",
                error: error
            });
        }
        res.status(201).send("Sinh vien dang ki de tai detai is added successfully!");
    });
};


module.exports.createSinhVienDeXuatDetai = function (req, res, next) {
    var svdexuatdetaiInfo = req.body;
    dbQuries.createSinhVienDeXuatDetai(svdexuatdetaiInfo, function(error, result) {
        if (error) {
            res.status(501).json({
                message: "Error create new sinh vien de xuat de tai detai!",
                error: error
            });
        }
        res.status(201).send("Sinh vien de xuat de tai detai is added successfully!");
    });
};


module.exports.getDeTaiListChapNhan = function (req, res, next) {
    var sv_ma = req.query.sv_ma;

    dbQuries.getDeTaiListChapNhan(sv_ma,  function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get detai list sinh vien chap nhan!",
                error: error
            });
        }
        res.status(200).json(results);
    });
};


module.exports.deleteDeTaiHuyYeuCau = function (req, res, next) {
    var dt_ma = req.query.dt_ma;
    var sv_ma = req.query.sv_ma;
    dbQuries.deleteDeTaiHuyYeuCau(dt_ma, sv_ma, function(error, result) {
        if (error) {
            res.status(501).json({
                message: "Error Huy yeu cau dang ki detai " + dt_ma,
                error: error
            });
        }
        res.status(200).json("Delete huy yeu cau dang ki " + dt_ma + " successfully");
    });
};