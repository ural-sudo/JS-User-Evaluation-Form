
const Comment = require('../models/comment');
const Urun = require('../models/urunler');


const path = require('path');

const User = require('../models/user');

exports.getUrunDegerlendir = (req, res, next) => {
    const auth = req.session.isLoggedIn;
    const urunId = req.params.id;
    if(auth){
        Urun.findByPk(urunId)
        .then( urun => {
            
            res.render('urunler/urun-degerlendir', {
                pageTitle:'Evoluation',
                user:req.session.user,
                urun:urun
            });
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
    }else{
        res.redirect('/giris-yap');
    }
};

exports.postDegerlendir = (req, res, next) => {
    
    const userId = req.body.ogrenciNo;
    const updatedPoint  = req.body.point;
    User.findByPk(userId)
    .then(user =>  {
        if(!user){
            res.redirect('/');
        }
        let count = Number(user.evoluationCount)
        let point  = Number(user.point)*count;
        count++;
        point = (Number(point) + Number(updatedPoint)) / count;
        user.point = point;
        user.evoluationCount = count;
    
        return user.save();
    })
    .then(result => {
        res.redirect('/');
    })
    .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    });
};
