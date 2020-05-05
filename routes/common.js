var express = require('express');
var router = express();

var userController = require('../controllers/user');
var postController = require('../controllers/post');
var khoaController = require('../controllers/khoa');
var bomon_chuyennganhController = require('../controllers/bomon_chuyennganh');
var giangvienController = require('../controllers/giangvien');
var lopController = require('../controllers/lop');
var sinhvienController = require('../controllers/sinhvien');
var gvhuongdanController = require('../controllers/giangvien_huongdan');
var detaiController = require('../controllers/detai');
var svdangkidtController = require('../controllers/sv_dangki_dt');
var congviecController = require('../controllers/congviec');
var namhocController = require('../controllers/namhoc');
var hockiController = require('../controllers/hocki');
var thoigianController = require('../controllers/thoigian');
var binhluanController = require('../controllers/binhluan');
var thongbaodtController = require('../controllers/thongbao_detai');
var databaseController = require('../controllers/database_query');



/* GET home page. */
router.route('/api')
    .get(function(req, res, next) {
        res.send('Welcome to blog API!');
    })

/* KHOA ROUTES */
router.route('/api/dangnhap')
    .get(khoaController.getKhoaList)
	
router.route('/api/database_query')
    .get(databaseController.getDatabaseQuery)
	.put(databaseController.updateDatabaseQuery)
	.post(databaseController.craeteDatabaseQuery)
	

router.route('/api/khoa')
    .post(khoaController.createKhoa)
    .get(khoaController.getKhoaList)
    .put(khoaController.updateKhoaInfo)
    .delete(khoaController.deleteKhoa)

router.route('/api/khoa_info')
    .get(khoaController.getKhoaInfo)

router.route('/api/namhoc')
    .get(namhocController.getNamHocList)

router.route('/api/hocki')
    .get(hockiController.getHocKiList)

router.route('/api/thoigian')
    .get(thoigianController.getThoiGianList)
	.post(thoigianController.createThoiGian)
	.put(thoigianController.updateThoiGianInfo)
	.delete(thoigianController.deleteThoiGian)
	
router.route('/api/thoigian_info')
	.get(thoigianController.getThoiGianInfo)

router.route('/api/bomon_chuyennganh')
    .post(bomon_chuyennganhController.createBoMonChuyenNganh)
    .get(bomon_chuyennganhController.getBoMonChuyenNganhList)
    .put(bomon_chuyennganhController.updateBoMonChuyenNganhInfo)
    .delete(bomon_chuyennganhController.deleteBoMonChuyenNganh)
	
router.route('/api/bomon_chuyennganh_all')
	.get(bomon_chuyennganhController.getBoMonChuyenNganhListAll)
	
router.route('/api/bomon_chuyennganh_info')
    .get(bomon_chuyennganhController.getBoMonChuyenNganhInfo)

// router.route('/api/bomon_chuyennganh')
//     .get(bomon_chuyennganhController.getBoMonChuyenNganhByMaKhoa)
    // .put(userController.updateUserById)
    // .delete(userController.deleteUserById)

router.route('/api/giangvien')
    .post(giangvienController.createGiangVien)
    .get(giangvienController.getGiangVienList)
    .delete(giangvienController.deleteGiangVien)
	
	


router.route('/api/giangvien_all')
	.get(giangvienController.getGiangVienListAll)
	
	
	
router.route('/api/giangvien_khoa')
	.get(giangvienController.getGiangVienListKhoa)

router.route('/api/giangvien_info')
    .get(giangvienController.getGiangVienInfo)
    .put(giangvienController.updateGiangVienInfo)

router.route('/api/lop')
    .post(lopController.createLop)
    .get(lopController.getLopList)
    .put(lopController.updateLopInfo)
    .delete(lopController.deleteLop)
	

router.route('/api/lop_all')
	.get(lopController.getLopListAll)
	
router.route('/api/lop_khoa')
	.get(lopController.getLopLisKhoa)

router.route('/api/lop_info')
    .get(lopController.getLopInfo)

router.route('/api/sinhvien')
    .post(sinhvienController.createSinhVien)
    .get(sinhvienController.getSinhVienList)
    .delete(sinhvienController.deleteSinhVien)

router.route('/api/sinhvien_dangki')
    .get(sinhvienController.getSinhVienDangKiList)
    .put(sinhvienController.updateSinhVienDangKiAccept)
    .delete(sinhvienController.updateSinhVienDangKiDecline)

router.route('/api/sinhvien_thuchien')
    .get(sinhvienController.getSinhVienThucHienList)
	
router.route('/api/sinhvien_thuchien_nienluan')
    .get(sinhvienController.getSinhVienThucHienNienLuanList)
	
router.route('/api/sinhvien_thuchien_tieuluan')
    .get(sinhvienController.getSinhVienThucHienTieuLuanList)
	
router.route('/api/sinhvien_thuchien_nienluan_coso')
    .get(sinhvienController.getSinhVienThucHienNienLuanCoSoList)
	
router.route('/api/sinhvien_thuchien_all')
    .get(sinhvienController.getSinhVienThucHienListAll)
	
router.route('/api/sinhvien_thuchien_nienluan_all')
    .get(sinhvienController.getSinhVienThucHienNienLuanListAll)
	
router.route('/api/sinhvien_thuchien_tieuluan_all')
    .get(sinhvienController.getSinhVienThucHienTieuLuanListAll)
	
router.route('/api/sinhvien_thuchien_nienluan_coso_all')
    .get(sinhvienController.getSinhVienThucHienNienLuanCoSoListAll)
	
	
router.route('/api/sinhvien_baocao')
    .get(sinhvienController.getSinhVienBaoCaoList)
	
router.route('/api/sinhvien_baocao_nienluan')
    .get(sinhvienController.getSinhVienBaoCaoNienLuanList)
	
router.route('/api/sinhvien_baocao_tieuluan')
    .get(sinhvienController.getSinhVienBaoCaoTieuLuanList)
	
router.route('/api/sinhvien_baocao_nienluan_coso')
    .get(sinhvienController.getSinhVienBaoCaoNienLuanCoSoList)
	
	
router.route('/api/sinhvien_tuchoi_baocao')
    .get(sinhvienController.getSinhVienTuChoiBaoCaoList)
	
router.route('/api/sinhvien_tuchoi_baocao_nienluan')
    .get(sinhvienController.getSinhVienTuChoiBaoCaoNienLuanList)
	
router.route('/api/sinhvien_tuchoi_baocao_tieuluan')
    .get(sinhvienController.getSinhVienTuChoiBaoCaoTieuLuanList)
	
router.route('/api/sinhvien_tuchoi_baocao_nienluan_coso')
    .get(sinhvienController.getSinhVienTuChoiBaoCaoNienLuanCoSoList)
	
	
	


router.route('/api/sinhvien_info')
    .get(sinhvienController.getSinhVienInfo)
    .put(sinhvienController.updateSinhVienInfo)

router.route('/api/giangvien_huongdan')
    .post(gvhuongdanController.createGiangVienHuongDan)
    .get(gvhuongdanController.getGiangVienHuongDanList)
	.put(gvhuongdanController.updateGiangVienHuongDanInfo)
	.delete(gvhuongdanController.deleteGiangVienHuongDan)
	
router.route('/api/giangvien_huongdan_info')
	.get(gvhuongdanController.getGiangVienHuongDanInfo)

router.route('/api/detai')
    .post(detaiController.createDeTai)
    .get(detaiController.getDeTaiList)
	
router.route('/api/detai_nienluan')
    .get(detaiController.getDeTaiNienLuanList)
	
router.route('/api/detai_tieuluan')
    .get(detaiController.getDeTaiTieuLuanList)
	
router.route('/api/detai_nienluancoso')
    .get(detaiController.getDeTaiNienLuanCoSoList)
	
router.route('/api/detai_and_sv_info')
    .get(detaiController.getDeTaiAndSinhVienInfo)
	
router.route('/api/detai_luanvan_svdx')
	.get(detaiController.getDeTaiLuanVanSVDXList)
	
router.route('/api/detai_nienluan_svdx')
	.get(detaiController.getDeTaiNienLuanSVDXList)
	
	
router.route('/api/detai_tieuluan_svdx')
	.get(detaiController.getDeTaiTieuLuanSVDXList)
	
router.route('/api/detai_nienluancoso_svdx')
	.get(detaiController.getDeTaiNienLuanCoSoSVDXList)

router.route('/api/detai_sinhvien')
    .get(detaiController.getDeTaiListOfAllGianVien)
    .post(detaiController.createSinhVienDangKiDetai)
	
router.route('/api/detai_sinhvien_update')
    .get(detaiController.getDeTaiListOfAllGianVienUpdate)
	
router.route('/api/detai_sinhvien_tieuluan')
    .get(detaiController.getDeTaiListOfAllGianVienTieuLuan)
	
router.route('/api/detai_sinhvien_nienluan')
    .get(detaiController.getDeTaiListOfAllGianVienNienLuan)
	
router.route('/api/detai_sinhvien_nienluancoso')
    .get(detaiController.getDeTaiListOfAllGianVienNienLuanCoSo)
	
router.route('/api/detai_sinhvien_gvma_update')
    .get(detaiController.getDeTaiListOfOneGianVienUpdate)
	
router.route('/api/detai_sinhvien_gvma')
    .get(detaiController.getDeTaiListOfOneGianVien)
	
router.route('/api/detai_sinhvien_tieuluan_gvma')
    .get(detaiController.getDeTaiListOfOneGianVienTieuLuan)
	
router.route('/api/detai_sinhvien_nienluan_gvma')
    .get(detaiController.getDeTaiListOfOneGianVienNienLuan)
	
router.route('/api/detai_sinhvien_nienluancoso_gvma')
    .get(detaiController.getDeTaiListOfOneGianVienNienLuanCoSo)

router.route('/api/detai_sinhvien_dadangki')
    .get(detaiController.getDeTaiListYeuCau)
	.post(detaiController.createDeTaiChapNhanBaoCao)
	.put(detaiController.createDeTaiTuChoiBaoCao)
    .delete(detaiController.deleteDeTaiHuyYeuCau)
	
router.route('/api/detai_sinhvien_dadangki_tieuluan')
    .get(detaiController.getDeTaiListYeuCauTieuLuan)
	
router.route('/api/detai_sinhvien_dadangki_nienluan')
    .get(detaiController.getDeTaiListYeuCauNienLuan)
	
router.route('/api/detai_sinhvien_dadangki_nienluancoso')
    .get(detaiController.getDeTaiListYeuCauNienLuanCoSo)
	
router.route('/api/detai_sinhvien_dadangki_luanvan_svdx')
    .get(detaiController.getDeTaiListYeuCauLuanVanSVDX)


router.route('/api/detai_sinhvien_dadangki_tieuluan_svdx')
    .get(detaiController.getDeTaiListYeuCauTieuLuanSVDX)
	
router.route('/api/detai_sinhvien_dadangki_nienluan_svdx')
    .get(detaiController.getDeTaiListYeuCauNienLuanSVDX)
	
router.route('/api/detai_sinhvien_dadangki_nienluancoso_svdx')
    .get(detaiController.getDeTaiListYeuCauNienLuanCoSoSVDX)
	
router.route('/api/detai_info_sinhvien')
    .get(detaiController.getDeTaiInfoSVChapNhan)

router.route('/api/detai_sinhvien_chapnhan')
    .get(detaiController.getDeTaiListChapNhan)
	
router.route('/api/detai_sinhvien_chapnhan_tieuluan')
    .get(detaiController.getDeTaiListChapNhanTieuLuan)
	
router.route('/api/detai_sinhvien_chapnhan_nienluan')
    .get(detaiController.getDeTaiListChapNhanNienLuan)
	
	
router.route('/api/detai_sinhvien_chapnhan_nienluancoso')
    .get(detaiController.getDeTaiListChapNhanNienLuanCoSo)

router.route('/api/detai_sinhvien_dexuat')
    .post(detaiController.createSinhVienDeXuatDetai)

router.route('/api/detai_info')
    .get(detaiController.getDeTaiInfo)
    .put(detaiController.updateDeTai)
    .delete(detaiController.deleteDeTai)

router.route('/api/sv_dangki_dt')
    .post(svdangkidtController.createSVDangKiDT)
    .get(svdangkidtController.getSVDangKiDTList)
    

router.route('/api/congviec')
    .post(congviecController.createCongViec)
    .get(congviecController.getCongViecList)
    .put(congviecController.moveCongViec)
    .delete(congviecController.deleteCongViec)

router.route('/api/congviec_info')
    //.post(congviecController.createCongViec)
    .get(congviecController.getCongViecInfoList)
    .put(congviecController.updateCongViecInfo)

router.route('/api/binhluan')
    .post(binhluanController.createBinhLuan)
    .get(binhluanController.getBinhLuanList)
    .delete(binhluanController.deleteBinhLuan)


router.route('/api/thongbao_detai')
    .post(thongbaodtController.createThongBaoDeTai)
    .get(thongbaodtController.getThongBaoDeTaiList)
    .put(thongbaodtController.updateThongBaoDeTai)

router.route('/api/thongbao_detai_sinhvien')
	.get(thongbaodtController.getThongBaoDeTaiListSinhVien)

/* SINHVIEN ROUTES*/
// router.route('/api/sinhvien')
//     .get(userController.getUserList)
//     .post(userController.createUser)

/* USER ROUTES */
// router.route('/api/users')
//     .get(userController.getUserList)
//     .post(userController.createUser)

// router.route('/api/user/:id')
//     .get(userController.getUserById)
//     .put(userController.updateUserById)
//     .delete(userController.deleteUserById)

/* END USER ROUTES */

/* POST ROUTES */
// router.route('/api/posts')
//     .get(postController.getPostList)
//     .post(postController.createPost)

// router.route('/api/post/:id')
//     .get(postController.getPostById)
//     .put(postController.updatePostById)
//     .delete(postController.deletePostById)

/* END POST ROUTES */

/* RESOURCE ROUTES */
/* END RESOURCE ROUTES */

/* SINH VIEN */
// router.route('/api/users')
//     .get(userController.getUserList)
//     .post(userController.createUser)

// router.route('/api/user/:id')
//     .get(userController.getUserById)
//     .put(userController.updateUserById)
//     .delete(userController.deleteUserById)


module.exports = router;
