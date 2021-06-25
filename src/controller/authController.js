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
            let correo = req.body.correo;
            let password = req.body.password;
            //se valida que exista el usuario y contraseña sino emite un mensaje con estado de error
            if(!correo) throw { msj: 'Usuario inválido', status: 400};
            if(!password) throw { msj: 'Contraseña inválida', status: 400};
            let login = await userService.login(correo,password);;
            console.log('controler', login)

            //status = 1 es error y retornara un mensaje de error enviado desde la bd
            if(login.status == 1){
                let obj = {
                    status: login.status,
                    msj   : login.msj
                }
                console.log('24');
                return res.send(obj);
            } else{ // si el status no es 1 entonces la funcion se ejecuto correctamente y ahora si se puede generar un token
                console.log('30');
                login.metadata.id_persona = _encryptor.encrypt(login.metadata.id_persona);
                const token = jwt.sign(login.metadata, 'my_secret_key', {expiresIn: 60 * 60 * 24 });
                // console.log(token)
                let obj = {
                    token: token,
                    status: login.status,
                    metadata: login.metadata
                }
                console.log(obj)
                return res.status(200).send(obj);
            }


        } catch(err){
            console.log(err);
        }
    };


    register = async (req, res) => {
        try{
            let name = req.body.name;
            let type_document = req.body.type_document;
            let num_document = req.body.num_document;
            let email = req.body.email;
            let password = req.body.password;
            let c_username = req.body.c_username;

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

            if(register.status == 1){
                let obj = {
                    status: register.status,
                    msj   : register.msj
                }
                return res.send(obj);
            } else{ // si el status no es 1 entonces la funcion se ejecuto correctamente y ahora si se puede generar un token
                let response = {
                    status: 'Registrado',
                    body: {
                        name: obj.name,
                        type_document: obj.type_document,
                        num_document: obj.num_document,
                        email:obj.email,
                        c_username:obj.c_username,
                    }
                }

                return res.status(200).send(response);
            }

        }catch(err){
            console.log(err);
        }
    }

}


module.exports = {
    AuthController
};
