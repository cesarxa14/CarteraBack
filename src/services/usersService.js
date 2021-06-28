const{ connectDB } = require('../db/index-bd');

class UsersService {
    constructor() {
        this.table = 'usuario';
    }
    // TO DO findUserByUsername

    async getUserByUsername(username){
        const query = `SELECT * FROM public.users where c_username= ${username}`;
        const user = await global.dbp.any(query);

        return user;
    }
    async deleteUser(userId){
        const query = `DELETE FROM public.users WHERE id=${userId};`;
        const userDeleted = await global.dbp.any(query);

        return userDeleted;
    }
    async updateUser(userId,{user}){
        const query = `UPDATE public.users SET ${user.name != undefined ?  `name=${user.name},`: ''  } ${user.type_document != undefined ?  `type_document='${user.type_document}',`: ''  } ${user.num_document != undefined ?  `num_document='${user.num_document}',`: ''  } ${user.email!= undefined ?  `email=${user.email},`: ''  } ${user.password != undefined ?  `password='${user.password}',`: ''  } ${user.c_username!= undefined ?  `c_username=${user.c_username}`: ''  }   WHERE id=${userId};`;
        const updatedUser = global.dbp.any(query);

        return updatedUser;
    }

    login(username, password) {
        return new Promise(async (resolve, reject)=>{
            let sql = 'SELECT * FROM users WHERE c_username = $1 AND password = $2'; //crear funcion de crear noticia en pgadmin
            sql = await global.pgp.as.format(sql,[username, password]);
            console.log('sql->>>', sql);
            global.dbp.one(sql).then(data=>{
                return resolve(data);
            }).catch(err => {
                err.detalle = new Error().stack;
                console.log(err)
                return reject(err);
            });
        })
    }

    register(obj) {
        return new Promise(async (resolve, reject)=>{
            let sql = `INSERT INTO 
                        public.users(name, type_document, num_document, email, password, c_username) 
                        VALUES ($1, $2, $3, $4, $5, $6)
                        RETURNING *`;
            sql = await global.pgp.as.format(sql,[obj.name, obj.type_document, obj.num_document, obj.email, obj.password, obj.c_username]);
            console.log('sql->>>', sql);
            const createdUser = global.dbp.one(sql).then(
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

