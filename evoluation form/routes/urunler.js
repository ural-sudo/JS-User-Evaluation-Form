/* const path = require('path'); */
const express = require('express');
const router = express.Router();
/* const isAuth = require('../middleware/is-auth');
const {check} = require('express-validator/check'); */

const urunController = require('../controllers/urun-controller');

/* router.get('/urun-ekle',isAuth,urunController.getUrunEkleme);

router.post('/urun-ekle',
check('title').trim().isLength({min:3}),
check('category').trim().isLength({min:1}),
check('price').trim().isFloat(),
check('description').trim().isLength({min:5}),
isAuth,urunController.postUrunEkleme);

router.get('/urun-duzenle/:id',isAuth,urunController.getUrunDuzenle);
router.post('/urun-duzenle',
check('title').trim().isLength({min:3}).withMessage('Title cant be empty'),
check('category').trim().isLength({min:1}).withMessage('Category cant be empty'),
check('price').trim().isFloat().withMessage('Price cant be empty'),
check('description').trim().isLength({min:5}),
isAuth,urunController.postUrunDuzenle);
router.post('/urun-sil',isAuth,urunController.postUrunSil);
router.get('/urunlerim',isAuth, urunController.getUrunlerim);
router.get('/urun-detay/:id',urunController.getUrunWithId);

router.post('/comment',urunController.postComment); */


//******************************************************************************************************* */
router.get('/evaluation/:id',urunController.getUrunDegerlendir);

router.post('/urun-degerlendir',urunController.postDegerlendir)
/********************************************************************************************************* */
module.exports = router;