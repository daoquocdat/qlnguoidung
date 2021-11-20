const User = require('../../../src/app/models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { multipleMongooseToObject } = require('../../../src/util/mongoose')
const { mongooseToObject } = require('../../../src/util/mongoose')

class UserController{

    index(req, res, next){
        res.render('home', {
            layouts: 'main'
        })
    }

    joinGet(req, res, next){
        res.render('formJoin')
    }

    async joinPost(req, res, next){
        console.log("req.body",req.body)
        const email = req.body.email
        let password = req.body.password
        const phone = req.body.phone
        const address = req.body.address
        const name = req.body.name

        try {
            const salt = await bcrypt.genSalt()
            password  = await bcrypt.hash(password, salt)
            console.log(password)
            const user = await new User({
                email: email,
                password: password,
                phone: phone,
                address: address,
                name: name,
            })
            .save()
            .then(() => {
                console.log('tạo tài khoản thành công')
                res.json({ message: 'thanh cong' })
            })
            .catch((err) => {
                console.log(err)
                console.log('tạo tài khoản thất bại')
                res.json({status: 'error', error: 'that bai'})
            })          
        }
        catch(err){
            console.log(err)
        }
    }

    loginGet(req, res, next){
        res.render('formLogin',{
            layouts: 'main'
        })
    }
    async loginPost(req, res, next){
        console.log(req.body)
        const email = req.body.email
        const password = req.body.password
        console.log("e",email)
        console.log("p",password)
        try{
            console.log('abc')
            const user = await User.login(email, password)
            if(user == true){
                res.json({message: 'dang nhap thanh cong'})
            }
            else{
                console.log("user controller",user)
                res.json({status: 'error',error: 'sai email hoac password'})
            }
            // const user = await User.findOne({ email, password })
            // console.log("user 1",user)
            // if(user){
            //     const auth = await bcrypt.compare(password, user.password)
            //     console.log(auth)
            // }
            
        }
        catch(err){
            console.log(err)
        }
    }
    userList(req, res, next){
        User.find({})
        .then((userList) =>{
            res.render('userList', {
                userList: multipleMongooseToObject(userList),
            })
        })
        .catch(next)
    }
    userDetail(req, res, next){
        User.findOne({_id: req.params.id})
        .then((user)=>{
            console.log(user)
            res.render('userDetail', {
                user: mongooseToObject(user)
            })
        })
    }
    updateUserGet(req, res, next){
        User.findOne({_id: req.params.id})
        .then((user)=>{
            console.log(user)
            res.render('formUpdate', {
                user: mongooseToObject(user)
            })
        })
        
    }
    updateUserPatch(req, res, next){
        console.log("req.body",req.body)
        console.log("file",req.file)
        if(req.file){
            User.updateOne({_id: req.params.id},{
                emoji: req.file.filename,
                name: req.body.name,
                address: req.body.address,
            })
            .then(() => {
                //res.json({message: 'update thanh cong'})
                res.redirect('/user-list')
            })
            .catch(() => {
                //res.json({status: 'error', error: 'update that bai'})
                res.redirect('/user-list')
            })
        }
        else{
            User.updateOne({_id: req.params.id},{
                name: req.body.name,
                address: req.body.address,
            })
            .then(() => {
                //res.json({message: 'update thanh cong'})
                res.redirect('/user-list')
            })
            .catch(() => {
                //res.json({status: 'error', error: 'update that bai'})
                res.redirect('/user-list')
            })
            
        }
    }
    deleteUser(req, res, next){
        User.deleteOne({_id: req.params.id})
        .then(() => {
            console.log('xóa thành công')
            res.json({ message: 'xoa thanh cong'  })
        })
        .catch(() => {
            console.log('xóa thất bại')
            res.json({ status: 'error', error: 'xoa that bai' })
        })
    }
}

module.exports = new UserController