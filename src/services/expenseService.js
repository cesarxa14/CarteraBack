class ExpenseService {
    constructor(){}
    async getExpenseById(expenseId) {
        const query = `SELECT * FROM public.expenses where id=${expenseId}`;
        const expense = global.dbp.any(query);
        console.log("---> " + query)

        return expense
    }
    async getExpensesByConditionAndLetterId(condition,letterId) {
        const query = `SELECT * FROM public.expenses where condition=${condition} and id_letter=${letterId}`;
        const expense = global.dbp.any(query);

        return expense
    }

    async createExpense({expense}){
        const query = `INSERT INTO public.expenses( name, description, value, condition, id_letter) VALUES ( '${expense.name}', '${expense.description}', ${expense.value}, '${expense.condition}', ${expense.idLetter});`
        const createdExpense = global.dbp.any(query);
        return createdExpense;
    }

    async updateExpense({expense}, expenseId){
        const query = `UPDATE public.expenses SET ${expense.name != undefined ?  `name=${expense.name},`: ''  } ${expense.description != undefined ?  `description=${expense.description},`: ''  } ${expense.value != undefined ?  `value=${expense.value},`: ''  } ${expense.condition != undefined ?  `condition=${expense.condition},`: ''  } ${expense.idLetter != undefined ?  `id_letter=${expense.idLetter},`: ''  }  where id=${expenseId}`;
        const updateExpense = global.dbp.any(query);
        return updateExpense;
    }

    async deletedExpense(expenseId) {
        const query = `DELETE FROM public.expenses WHERE id=${expenseId};`;
        const deletedExpense = global.dbp.any(query);
        return deletedExpense;
    }
    getEspecialidad() {
        return new Promise(async (resolve, reject)=>{
            let sql = 'SELECT * FROM especialidad'; //crear funcion de crear noticia en pgadmin
            sql = await global.pgp.as.format(sql);
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

    switchedAsesorStatus(id_user, flag_online) {
        return new Promise(async (resolve, reject)=>{
            let sql = 'UPDATE asesor SET flag_online = $2 where _id_persona = $1;'; //crear funcion de crear noticia en pgadmin
            sql = await global.pgp.as.format(sql,[id_user,flag_online]);
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

module.exports = {
    ExpenseService: ExpenseService
}
