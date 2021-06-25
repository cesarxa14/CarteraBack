const{ connectDB } = require('../db/index-bd');

class UsersService {
    constructor() {
        this.table = 'usuario';
    }
    // TO DO findUserByUsername
    login(correo, contraseña) {
        return new Promise(async (resolve, reject)=>{
            let sql = 'SELECT public.__dates_1_login($1, $2) res'; //crear funcion de crear noticia en pgadmin
            sql = await global.pgp.as.format(sql,[correo, contraseña]);
            console.log('sql->>>', sql);
            global.dbp.one(sql).then(data=>{
                return resolve(data.res);
            }).catch(err => {
                err.detalle = new Error().stack;
                console.log(err)
                return reject(err);
            });
        })
    }

    register(obj) {
        return new Promise(async (resolve, reject)=>{
            let sql = 'INSERT INTO public.users(name, type_document, num_document, email, password, c_username) VALUES ($1, $2, $3, $4, $5, $6)';
            sql = await global.pgp.as.format(sql,[obj.name, obj.type_document, obj.num_document, obj.email, obj.password, obj.c_username]);
            console.log('sql->>>', sql);
            const createdUser = global.dbp.any(sql).then(
                value => resolve(value)
            ).catch(
                err => reject(err)
            );
        })
    }





    confirmarEmail(id_persona) {
        return new Promise(async (resolve, reject)=>{
            let sql = 'UPDATE persona SET flag_verificado = TRUE WHERE id_persona = $1;'; //crear funcion de crear noticia en pgadmin
            sql = await global.pgp.as.format(sql,[id_persona]);
            console.log('sql->>>', sql);
            global.dbp.any(sql).then(data=>{
                return resolve(data);
            }).catch(err => {
                err.detalle = new Error().stack;
                console.log(err)
                return reject(err);
            });
        })
    }


}

// export {UsersService}
module.exports = {
    UsersService
}

