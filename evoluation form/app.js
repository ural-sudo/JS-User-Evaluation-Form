
const express = require('express');
//Body-parser gelen istekleri pars etmek için gereken bir modüldür.
const bodyParser = require('body-parser'); 
/* const csrf = require('csurf'); */
const path = require('path');
/* const session = require('express-session'); */
/* const MSSQLStore = require('connect-mssql-v2'); */
const sequelize = require('./Util/database');
/* const config = require('./Util/config'); */
/* const multer = require('multer'); // Bu modül text olmayan inputları pars etmek için kullanılır. Body parser ın tak aksine.. */

const platformRoutes = require('./Routes/platform');
const authRoutes = require('./Routes/auth');
const urunlerRoutes = require('./Routes/urunler');

/* const errorController = require('./controllers/error-controller');

const flash = require('connect-flash');

const Urun = require('./models/urunler');
const User = require('./models/user');
const Comment = require('./models/comment'); */

const app = express();
// set değeri bir golabal konfigurasyon değeridir.Golabal olarak ayarlama yapar.

const csrfProtection = csrf();

/* aşağıda tanımlanmış olan fonksiyon File formatında yüklenen inputların nereye depolanacağını ve isimlerini hedefler
Bu fonksiyon aynı zamanda <<Multer>> middleware ına storage key inin değeri olarak verilir.
Şuanda Anlamsız şekilde storage objesi çalışmadığı için bu fonksiyonu kullanmıyorum..
*/
/* const fileStorage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, 'images/');
    },
    filename:(req, file, cb) => {
        cb(null, new Date().toISOString() + '-' +  file.originalname);
    }
}); */
/* aşağıda kullanılan fonksiyon yüklenecek olan file'ların formatını filtrelemek için kullanılır.
İstenilen formatlar doğruysa true, değilse false döndürür ve store etmez.
Aynı zamanda <<Multer>> middleware'i içerisine bu fonksiyon bir objenin değeri olarak verilir.
 */
/* const fileFilter = (req, file, cb) => {

    if(
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' || 
        file.mimetype === 'image/jpeg'
    ){
        cb(null, true);
    }else{
        cb(null,false);
    }
}; */

app.set('view engine','ejs');
app.set('Views', 'views');


app.use(bodyParser.urlencoded({extended:false}));// Bu middleware body de bulunan text ifadeleri pars etmek için kullanılır.
app.use(multer({ dest:'images', fileFilter:fileFilter}).single('image')); // Bu middleware  <<image>> isimli inputu parse etmek için kullanılır.
/*aşağıdaki middleware public dosyasını serve etmek için kullanılır.Eğer kullanılmazsa public dosyasının içersindeki 
css dosyalarını aplikasyon okuyamaz.
*/
app.use(express.static(path.join(__dirname, 'public')));

/* app.use('/images',express.static(path.join(__dirname, 'images'))); */
/* app.use(session({store: new MSSQLStore(config), secret:'supersecret'})); */

/* app.use(csrfProtection);
app.use(flash()); */


app.use((req, res, next)=> {

    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
   
    next();
}); 


/* app.use('/', platformRoutes);
app.use('/auth', authRoutes); */
app.use('/urun',urunlerRoutes);
/* app.get('/500',errorController.get500page); */



/* app.use(errorController.get404page); */

// Hataların ele alındığı middleware
/* app.use((error, req, res, next) => {
    res.redirect('/500');
}) */

sequelize.sync().then( result => {
    
    app.listen(3000);
})
.catch(err => {
    console.log(err);
})

