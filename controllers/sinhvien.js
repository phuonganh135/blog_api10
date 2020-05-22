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

module.exports.getSinhVienListAll = function (req, res, next) {
    
    dbQuries.getSinhVienListAll(function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get sinhvien list!",
                error: error
            });
        }
        res.status(200).json(results);
    });
};


module.exports.getSinhVienListKhoa = function (req, res, next) {
    var k_ma = req.query.k_ma;
    dbQuries.getSinhVienListKhoa(k_ma,function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get sinhvien list!",
                error: error
            });
        }
        res.status(200).json(results);
    });
};


module.exports.getSinhVienListBMCN = function (req, res, next) {
    var bmcn_ma = req.query.bmcn_ma;
    dbQuries.getSinhVienListBMCN(bmcn_ma,function(error, results) {
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

module.exports.getSinhVienThucHienTieuLuanList = function (req, res, next) {
    var gv_ma = req.query.gv_ma;
    dbQuries.getSinhVienThucHienTieuLuanList(gv_ma, function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get sinhvien thuchien tieu luan list!",
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



module.exports.getSinhVienThucHienListAll = function (req, res, next) {
    var gv_ma = req.query.gv_ma;
    dbQuries.getSinhVienThucHienListAll(gv_ma, function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get sinhvien thuchien list!",
                error: error
            });
        }
        res.status(200).json(results);
    });
};

module.exports.getSinhVienThucHienNienLuanListAll = function (req, res, next) {
    var gv_ma = req.query.gv_ma;
    dbQuries.getSinhVienThucHienNienLuanListAll(gv_ma, function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get sinhvien thuchien nien luan list!",
                error: error
            });
        }
        res.status(200).json(results);
    });
};

module.exports.getSinhVienThucHienTieuLuanListAll = function (req, res, next) {
    var gv_ma = req.query.gv_ma;
    dbQuries.getSinhVienThucHienTieuLuanListAll(gv_ma, function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get sinhvien thuchien tieu luan list!",
                error: error
            });
        }
        res.status(200).json(results);
    });
};

module.exports.getSinhVienThucHienNienLuanCoSoListAll = function (req, res, next) {
    var gv_ma = req.query.gv_ma;
    dbQuries.getSinhVienThucHienNienLuanCoSoListAll(gv_ma, function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get sinhvien thuchien nien luan co so list!",
                error: error
            });
        }
        res.status(200).json(results);
    });
};


module.exports.getSinhVienBaoCaoList = function (req, res, next) {
    var gv_ma = req.query.gv_ma;
    dbQuries.getSinhVienBaoCaoList(gv_ma, function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get sinhvien baocao list!",
                error: error
            });
        }
        res.status(200).json(results);
    });
};


module.exports.getSinhVienThongKeListNamHocHocKi = function (req, res, next) {
    var nh_ma = req.query.nh_ma;
	var hk_ma = req.query.hk_ma;
	var ldt_ma = req.query.ldt_ma;
    dbQuries.getSinhVienThongKeListNamHocHocKi(nh_ma, hk_ma,ldt_ma, function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get sinhvien thong ke nam hoc hoc ki list!",
                error: error
            });
        }
        res.status(200).json(results);
    });
};

module.exports.getSinhVienThongKeListNamHocHocKiKhoa = function (req, res, next) {
    var nh_ma = req.query.nh_ma;
	var hk_ma = req.query.hk_ma;
	var ldt_ma = req.query.ldt_ma;
	var k_ma = req.query.k_ma;
    dbQuries.getSinhVienThongKeListNamHocHocKiKhoa(nh_ma, hk_ma,ldt_ma, k_ma, function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get sinhvien thong ke nam hoc hoc ki list!",
                error: error
            });
        }
        res.status(200).json(results);
    });
};

module.exports.getSinhVienThongKeListNamHocHocKiBMCN = function (req, res, next) {
    var nh_ma = req.query.nh_ma;
	var hk_ma = req.query.hk_ma;
	var ldt_ma = req.query.ldt_ma;
	var bmcn_ma = req.query.bmcn_ma;
    dbQuries.getSinhVienThongKeListNamHocHocKiBMCN(nh_ma, hk_ma,ldt_ma,bmcn_ma, function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get sinhvien thong ke nam hoc hoc ki list!",
                error: error
            });
        }
        res.status(200).json(results);
    });
};

module.exports.getSinhVienThongKeListNamHocHocKiLop = function (req, res, next) {
    var nh_ma = req.query.nh_ma;
	var hk_ma = req.query.hk_ma;
	var ldt_ma = req.query.ldt_ma;
	var l_ma = req.query.l_ma;
    dbQuries.getSinhVienThongKeListNamHocHocKiLop(nh_ma, hk_ma,ldt_ma, l_ma, function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get sinhvien thong ke nam hoc hoc ki list!",
                error: error
            });
        }
        res.status(200).json(results);
    });
};

module.exports.getSinhVienThongKeListNamHocHocKiGianVien = function (req, res, next) {
    var nh_ma = req.query.nh_ma;
	var hk_ma = req.query.hk_ma;
	var ldt_ma = req.query.ldt_ma;
	var gv_ma = req.query.gv_ma;
    dbQuries.getSinhVienThongKeListNamHocHocKiGianVien(nh_ma, hk_ma,ldt_ma, gv_ma, function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get sinhvien thong ke nam hoc hoc ki list!",
                error: error
            });
        }
        res.status(200).json(results);
    });
};




module.exports.getSinhVienThongKeListNamHocHocKiKhoaTTDK = function (req, res, next) {
    var nh_ma = req.query.nh_ma;
	var hk_ma = req.query.hk_ma;
	var ldt_ma = req.query.ldt_ma;
	var k_ma = req.query.k_ma;
	var ttdk_ma = req.query.ttdk_ma;
    dbQuries.getSinhVienThongKeListNamHocHocKiKhoaTTDK(nh_ma, hk_ma,ldt_ma, k_ma,ttdk_ma, function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get sinhvien thong ke nam hoc hoc ki list!",
                error: error
            });
        }
        res.status(200).json(results);
    });
};

module.exports.getSinhVienThongKeListNamHocHocKiBMCNTTDK = function (req, res, next) {
    var nh_ma = req.query.nh_ma;
	var hk_ma = req.query.hk_ma;
	var ldt_ma = req.query.ldt_ma;
	var bmcn_ma = req.query.bmcn_ma;
	var ttdk_ma = req.query.ttdk_ma;
    dbQuries.getSinhVienThongKeListNamHocHocKiBMCNTTDK(nh_ma, hk_ma,ldt_ma,bmcn_ma, ttdk_ma, function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get sinhvien thong ke nam hoc hoc ki list!",
                error: error
            });
        }
        res.status(200).json(results);
    });
};

module.exports.getSinhVienThongKeListNamHocHocKiLopTTDK = function (req, res, next) {
    var nh_ma = req.query.nh_ma;
	var hk_ma = req.query.hk_ma;
	var ldt_ma = req.query.ldt_ma;
	var l_ma = req.query.l_ma;
	var ttdk_ma = req.query.ttdk_ma;
    dbQuries.getSinhVienThongKeListNamHocHocKiLopTTDK(nh_ma, hk_ma,ldt_ma, l_ma, ttdk_ma, function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get sinhvien thong ke nam hoc hoc ki list!",
                error: error
            });
        }
        res.status(200).json(results);
    });
};

module.exports.getSinhVienThongKeListNamHocHocKiGianVienTTDK = function (req, res, next) {
    var nh_ma = req.query.nh_ma;
	var hk_ma = req.query.hk_ma;
	var ldt_ma = req.query.ldt_ma;
	var gv_ma = req.query.gv_ma;
	var ttdk_ma = req.query.ttdk_ma;
    dbQuries.getSinhVienThongKeListNamHocHocKiGianVienTTDK(nh_ma, hk_ma,ldt_ma, gv_ma,ttdk_ma, function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get sinhvien thong ke nam hoc hoc ki list!",
                error: error
            });
        }
        res.status(200).json(results);
    });
};

module.exports.getSinhVienThongKeListNamHocHocKiTrangThaiDangKi = function (req, res, next) {
    var nh_ma = req.query.nh_ma;
	var hk_ma = req.query.hk_ma;
	var ldt_ma = req.query.ldt_ma;
	var ttdk_ma = req.query.ttdk_ma;
    dbQuries.getSinhVienThongKeListNamHocHocKiTrangThaiDangKi(nh_ma, hk_ma,ldt_ma,ttdk_ma, function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get sinhvien thong ke nam hoc hoc ki list!",
                error: error
            });
        }
        res.status(200).json(results);
    });
};

module.exports.getSinhVienBaoCaoNienLuanList = function (req, res, next) {
    var gv_ma = req.query.gv_ma;
    dbQuries.getSinhVienBaoCaoNienLuanList(gv_ma, function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get sinhvien baocao nien luan list!",
                error: error
            });
        }
        res.status(200).json(results);
    });
};

module.exports.getSinhVienBaoCaoTieuLuanList = function (req, res, next) {
    var gv_ma = req.query.gv_ma;
    dbQuries.getSinhVienBaoCaoTieuLuanList(gv_ma, function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get sinhvien baocao tieu luan list!",
                error: error
            });
        }
        res.status(200).json(results);
    });
};

module.exports.getSinhVienBaoCaoNienLuanCoSoList = function (req, res, next) {
    var gv_ma = req.query.gv_ma;
    dbQuries.getSinhVienBaoCaoNienLuanCoSoList(gv_ma, function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get sinhvien baocao nien luan co so list!",
                error: error
            });
        }
        res.status(200).json(results);
    });
};



module.exports.getSinhVienTuChoiBaoCaoList = function (req, res, next) {
    var gv_ma = req.query.gv_ma;
    dbQuries.getSinhVienTuChoiBaoCaoList(gv_ma, function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get tuchoi baocao thuchien list!",
                error: error
            });
        }
        res.status(200).json(results);
    });
};

module.exports.getSinhVienTuChoiBaoCaoNienLuanList = function (req, res, next) {
    var gv_ma = req.query.gv_ma;
    dbQuries.getSinhVienTuChoiBaoCaoNienLuanList(gv_ma, function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get sinhvien tuchoi baocao nien luan list!",
                error: error
            });
        }
        res.status(200).json(results);
    });
};

module.exports.getSinhVienTuChoiBaoCaoTieuLuanList = function (req, res, next) {
    var gv_ma = req.query.gv_ma;
    dbQuries.getSinhVienTuChoiBaoCaoTieuLuanList(gv_ma, function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get sinhvien tuchoi baocao tieu luan list!",
                error: error
            });
        }
        res.status(200).json(results);
    });
};

module.exports.getSinhVienTuChoiBaoCaoNienLuanCoSoList = function (req, res, next) {
    var gv_ma = req.query.gv_ma;
    dbQuries.getSinhVienTuChoiBaoCaoNienLuanCoSoList(gv_ma, function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get sinhvien tuchoi baocao nien luan co so list!",
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