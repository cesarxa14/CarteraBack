const jwt = require('jsonwebtoken');
const _encryptor = require('simple-encryptor')('secret_server_key');
const {UsersService} = require('../services/usersService');
const userService = new UsersService();

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

            console.log('controler', login)

            if(login) {

                const token = jwt.sign(login, 'my_secret_key', {expiresIn: 60 * 60 * 24 });
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

}


module.exports = {
    AuthController
};
