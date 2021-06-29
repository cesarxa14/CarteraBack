const jwt = require('jsonwebtoken');
const _encryptor = require('simple-encryptor')('secret_server_key');
const {UsersService} = require('../services/usersService');
const userService = new UsersService();
var axios = require('axios');

class AuthController {
    constructor(){}

    login = async (req, res) => {
        try{

            // return res.send({msj:'Ingresaste'});
            console.log('fdsfds',req.body)
            let username = req.body.username;
            let password = req.body.password;
            //se valida que exista el usuario y contraseña sino emite un mensaje con estado de error
            if(!username) throw { msj: 'Usuario inválido', status: 400};
            if(!password) throw { msj: 'Contraseña inválida', status: 400};
            let login = await userService.login(username,password);

            console.log('controler', login[0])

            if(login.length > 0) {

                const token = jwt.sign(login[0], 'my_secret_key', {expiresIn: 60 * 60 * 24 });
                console.log('token',token)
                let obj = {
                    metadata: login,
                    token: token
                }
                return res.status(200).send(obj);

            } else{
                let obj = {
                    status: 404,
                    msj: 'Usuario y/o contraseña incorrectos'
                }
                return res.send(obj)

            }


        } catch(err){
            console.log(err);
        }
    };


    register = async (req, res) => {
        try{

            let name = req.body.nombres;
            let type_document = req.body.typeDocument;
            let num_document = req.body.numDocument;
            let email = req.body.email;
            let password = req.body.password;
            let c_username = req.body.username;

            if(!name) throw { msj: 'Usuario inválido', status: 400};
            if(!type_document) throw { msj: 'Usuario inválido', status: 400};
            if(!num_document) throw { msj: 'Usuario inválido', status: 400};
            if(!email) throw { msj: 'Usuario inválido', status: 400};
            if(!password) throw { msj: 'Usuario inválido', status: 400};
            if(!c_username) throw { msj: 'Usuario inválido', status: 400};


            let obj = {
                name,
                type_document,
                num_document,
                email,
                password,
                c_username,
            };
            let register = await userService.register(obj);
            if(register) {
                const token = jwt.sign(register, 'my_secret_key', {expiresIn: 60 * 60 * 24 });
                let obj = {
                    metadata: register,
                    token: token
                }

                return res.status(200).send(obj)
            } else{
                let obj = {
                    status: 403,
                    msj: 'No se pudo registrar'
                }

                return res.status(403).send(obj)
            }

        }catch(err){
            console.log(err);
        }
    }

    tipoCambio = async (req,res)=> {
        console.log('entró')
        var config = {
            method: 'get',
            url: 'https://api.apis.net.pe/v1/tipo-cambio-sunat',
            headers: {
                'Authorization': 'Bearer bsOzCDXPQZxOi5rhGbMuraa1vaL2w2lPjaFm6iYcM5DFle3hmRmbfZSZGdzA',
                'Accept': 'application/json'
                // ...data.getHeaders()
            },
        }

        axios(config)
            .then(function (response) {
                // console.log(JSON.stringify(response.data));
                console.log(response.data)
                return res.status(200).send(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    getUserByUsername = async (req, res, next) => {
        const { username } = req.params;
        const user = userService.getUserByUsername(username)
            .then(row => {
                res.status(200).json({
                    message: row.length >= 1 ? "User gets successfully":`User with username: ${username} not found` ,
                    data: row,
                })
            })
            .catch(err => next(err));
    }

    deleteUserById = async(req,res,next) =>{
        const { userId } = req.params;
        const userDeleted = userService.deleteUser(userId)
            .then(row => {
                res.status(200).json({
                    message: 'Deleted user' ,
                    data: row,
                })
            }).catch(err => next(err));
    }

    updateUser = async (req,res,next) => {
        const { userId } = req.params;
        const { user } = req.body;
        const updateUser = userService.updateUser(userId,user)
            .then(row => {
                res.status(200).json({
                    message: 'Updated User' ,
                    data: row,
                })
            }).catch(err => next(err));
    }

}


module.exports = {
    AuthController
};
