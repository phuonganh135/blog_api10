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


module.exports.getDeTaiNienLuanList = function (req, res, next) {
    var gv_ma = req.query.gv_ma;
    dbQuries.getDeTaiNienLuanList(gv_ma, function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get detai nienluan list!",
                error: error
            });
        }
        res.status(200).json(results);
    });
};


module.exports.getDeTaiTieuLuanList = function (req, res, next) {
    var gv_ma = req.query.gv_ma;
    dbQuries.getDeTaiTieuLuanList(gv_ma, function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get detai tieuluan list!",
                error: error
            });
        }
        res.status(200).json(results);
    });
};


module.exports.getDeTaiNienLuanCoSoList = function (req, res, next) {
    var gv_ma = req.query.gv_ma;
    dbQuries.getDeTaiNienLuanCoSoList(gv_ma, function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get detai nienluan list!",
                error: error
            });
        }
        res.status(200).json(results);
    });
};


module.exports.getDeTaiAndSinhVienInfo = function (req, res, next) {
    var sv_ma = req.query.sv_ma;
	var dt_ma = req.query.dt_ma;
    dbQuries.getDeTaiAndSinhVienInfo(sv_ma,dt_ma, function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get detai and sinhvien info !",
                error: error
            });
        }
        res.status(200).json(results);
    });
};

module.exports.getDeTaiLuanVanSVDXList = function (req, res, next) {
    var gv_ma = req.query.gv_ma;
    dbQuries.getDeTaiLuanVanSVDXList(gv_ma, function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get detai luanvan sinhvien dexuat list!",
                error: error
            });
        }
        res.status(200).json(results);
    });
};


module.exports.getDeTaiNienLuanSVDXList = function (req, res, next) {
    var gv_ma = req.query.gv_ma;
    dbQuries.getDeTaiNienLuanSVDXList(gv_ma, function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get detai luanvan sinhvien dexuat list!",
                error: error
            });
        }
        res.status(200).json(results);
    });
};


module.exports.getDeTaiTieuLuanSVDXList = function (req, res, next) {
    var gv_ma = req.query.gv_ma;
    dbQuries.getDeTaiTieuLuanSVDXList(gv_ma, function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get detai tieuvan sinhvien dexuat list!",
                error: error
            });
        }
        res.status(200).json(results);
    });
};

module.exports.getDeTaiNienLuanCoSoSVDXList = function (req, res, next) {
    var gv_ma = req.query.gv_ma;
    dbQuries.getDeTaiNienLuanCoSoSVDXList(gv_ma, function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get detai luanvan sinhvien dexuat list!",
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


module.exports.createDeTaiTuChoiBaoCao = function (req, res, next) {
    var dt_ma = req.query.dt_ma;
	var sv_ma = req.query.sv_ma;
    dbQuries.createDeTaiTuChoiBaoCao(dt_ma,sv_ma, function(error, result) {
        if (error) {
            res.status(501).json({
                message: "Error update tuchoi baocao detai " + dt_ma,
                error: error
            });
        }
        res.status(201).send("Detai " + dt_ma + " is tuchoi baocao successfully!");
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

module.exports.getDeTaiListOfAllGianVienTieuLuan = function (req, res, next) {
    var bmcn_ma = req.query.bmcn_ma;
    var hk_ma = req.query.hk_ma;
    var nh_ma = req.query.nh_ma;
    dbQuries.getDeTaiListOfAllGianVienTieuLuan(bmcn_ma, hk_ma , nh_ma,  function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get detai list of all gianvien tieu luan!",
                error: error
            });
        }
        res.status(200).json(results);
    });
};


module.exports.getDeTaiListOfAllGianVienNienLuan = function (req, res, next) {
    var bmcn_ma = req.query.bmcn_ma;
    var hk_ma = req.query.hk_ma;
    var nh_ma = req.query.nh_ma;
    dbQuries.getDeTaiListOfAllGianVienNienLuan(bmcn_ma, hk_ma , nh_ma,  function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get detai list of all gianvien nien luan!",
                error: error
            });
        }
        res.status(200).json(results);
    });
};

module.exports.getDeTaiListOfAllGianVienNienLuanCoSo = function (req, res, next) {
    var bmcn_ma = req.query.bmcn_ma;
    var hk_ma = req.query.hk_ma;
    var nh_ma = req.query.nh_ma;
    dbQuries.getDeTaiListOfAllGianVienNienLuanCoSo(bmcn_ma, hk_ma , nh_ma,  function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get detai list of all gianvien nien luan co so!",
                error: error
            });
        }
        res.status(200).json(results);
    });
};


module.exports.getDeTaiListOfOneGianVien = function (req, res, next) {
    var bmcn_ma = req.query.bmcn_ma;
    var hk_ma = req.query.hk_ma;
    var nh_ma = req.query.nh_ma;
	var gv_ma = req.query.gv_ma;
    dbQuries.getDeTaiListOfOneGianVien(bmcn_ma, hk_ma , nh_ma,gv_ma,  function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get detai list of one gianvien!",
                error: error
            });
        }
        res.status(200).json(results);
    });
};

module.exports.getDeTaiListOfOneGianVienTieuLuan = function (req, res, next) {
    var bmcn_ma = req.query.bmcn_ma;
    var hk_ma = req.query.hk_ma;
    var nh_ma = req.query.nh_ma;
	var gv_ma = req.query.gv_ma;
    dbQuries.getDeTaiListOfOneGianVienTieuLuan(bmcn_ma, hk_ma , nh_ma, gv_ma,  function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get detai list of one gianvien tieu luan!",
                error: error
            });
        }
        res.status(200).json(results);
    });
};


module.exports.getDeTaiListOfOneGianVienNienLuan = function (req, res, next) {
    var bmcn_ma = req.query.bmcn_ma;
    var hk_ma = req.query.hk_ma;
    var nh_ma = req.query.nh_ma;
	var gv_ma = req.query.gv_ma;

    dbQuries.getDeTaiListOfOneGianVienNienLuan(bmcn_ma, hk_ma , nh_ma, gv_ma,  function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get detai list of one gianvien nien luan!",
                error: error
            });
        }
        res.status(200).json(results);
    });
};

module.exports.getDeTaiListOfOneGianVienNienLuanCoSo = function (req, res, next) {
    var bmcn_ma = req.query.bmcn_ma;
    var hk_ma = req.query.hk_ma;
    var nh_ma = req.query.nh_ma;
	var gv_ma = req.query.gv_ma;
    dbQuries.getDeTaiListOfOneGianVienNienLuanCoSo(bmcn_ma, hk_ma , nh_ma,gv_ma,  function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get detai list of one gianvien nien luan co so!",
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

module.exports.getDeTaiListYeuCauTieuLuan = function (req, res, next) {
    var sv_ma = req.query.sv_ma;
    dbQuries.getDeTaiListYeuCauTieuLuan(sv_ma, function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get detai list yeu cau tieu luan!",
                error: error
            });
        }
        res.status(200).json(results);
    });
};

module.exports.getDeTaiListYeuCauNienLuan = function (req, res, next) {
    var sv_ma = req.query.sv_ma;
    dbQuries.getDeTaiListYeuCauNienLuan(sv_ma, function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get detai list yeu cau nien luan!",
                error: error
            });
        }
        res.status(200).json(results);
    });
};

module.exports.getDeTaiListYeuCauNienLuanCoSo = function (req, res, next) {
    var sv_ma = req.query.sv_ma;
    dbQuries.getDeTaiListYeuCauNienLuanCoSo(sv_ma, function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get detai list yeu cau nien luan co so!",
                error: error
            });
        }
        res.status(200).json(results);
    });
};


module.exports.getDeTaiListYeuCauLuanVanSVDX = function (req, res, next) {
    var sv_ma = req.query.sv_ma;
    dbQuries.getDeTaiListYeuCauLuanVanSVDX(sv_ma, function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get detai list yeu cau luan van svdx!",
                error: error
            });
        }
        res.status(200).json(results);
    });
};


module.exports.getDeTaiListYeuCauTieuLuanSVDX = function (req, res, next) {
    var sv_ma = req.query.sv_ma;
    dbQuries.getDeTaiListYeuCauTieuLuanSVDX(sv_ma, function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get detai list yeu cau tieu luan svdx!",
                error: error
            });
        }
        res.status(200).json(results);
    });
};


module.exports.getDeTaiListYeuCauNienLuanSVDX = function (req, res, next) {
    var sv_ma = req.query.sv_ma;
    dbQuries.getDeTaiListYeuCauNienLuanSVDX(sv_ma, function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get detai list yeu cau nien luan svdx!",
                error: error
            });
        }
        res.status(200).json(results);
    });
};


module.exports.getDeTaiListYeuCauNienLuanCoSoSVDX = function (req, res, next) {
    var sv_ma = req.query.sv_ma;
    dbQuries.getDeTaiListYeuCauNienLuanCoSoSVDX(sv_ma, function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get detai list yeu cau nien luan co so svdx!",
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


module.exports.createDeTaiChapNhanBaoCao = function (req, res, next) {
    var dt_ma = req.query.dt_ma;
    var sv_ma = req.query.sv_ma;
    dbQuries.createDeTaiChapNhanBaoCao(dt_ma,sv_ma, function(error, result) {
        if (error) {
            res.status(501).json({
                message: "Error create new sinh vien chap nhan bao cao detai!",
                error: error
            });
        }
        res.status(201).send("Sinh vien vien chap nhan bao cao detai is added successfully!");
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

module.exports.getDeTaiInfoSVChapNhan = function (req, res, next) {
    var sv_ma = req.query.sv_ma;
	var dt_ma = req.query.dt_ma;

    dbQuries.getDeTaiInfoSVChapNhan(sv_ma, dt_ma,  function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get detai info sinh vien chap nhan!",
                error: error
            });
        }
        res.status(200).json(results);
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


module.exports.getDeTaiListChapNhanTieuLuan = function (req, res, next) {
    var sv_ma = req.query.sv_ma;

    dbQuries.getDeTaiListChapNhanTieuLuan(sv_ma,  function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get detai tieu luan list sinh vien chap nhan!",
                error: error
            });
        }
        res.status(200).json(results);
    });
};



module.exports.getDeTaiListChapNhanNienLuan = function (req, res, next) {
    var sv_ma = req.query.sv_ma;

    dbQuries.getDeTaiListChapNhanNienLuan(sv_ma,  function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get detai nien luan list sinh vien chap nhan!",
                error: error
            });
        }
        res.status(200).json(results);
    });
};



module.exports.getDeTaiListChapNhanNienLuanCoSo = function (req, res, next) {
    var sv_ma = req.query.sv_ma;

    dbQuries.getDeTaiListChapNhanNienLuanCoSo(sv_ma,  function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get detai nien luan co so list sinh vien chap nhan!",
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