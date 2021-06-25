const{ connectDB } = require('../db/index-bd');

class LettersService {
    constructor() {
        this.table = 'letters';
    }
    async getLettersByUserId(userId) {
        const query = `SELECT * FROM public.letters where user_id= ${userId}`;
        const letters = global.dbp.any(query);

        return letters;
    }

    async getLetterById(letterId) {
        const query = `SELECT * FROM public.letters where id=${letterId}`;
        const letter = global.dbp.any(query);

        return letter;
    }

     async createLetter({ letter },userId) {
         const query = `INSERT INTO public.letters(name, day_of_year, date_start, date_end, discount, currency, retention, type_rate, rate, rate_term, value_nominal, value_delivered, value_received, value_net, tcea, condition, user_id, capitalization, rate_discount, date_discount) VALUES ('${letter.name}', ${letter.dayOfYear}, '${letter.dateStart}', '${letter.dateEnd}', ${letter.discount}, '${letter.currency}', ${letter.retention}, '${letter.typeRate}', ${letter.rate}, '${letter.rateTerm}', ${letter.valueNominal}, ${letter.valueDelivered}, ${letter.valueReceived}, ${letter.valueNet},${letter.tcea}, '${letter.condition}', ${userId}, '${letter.capitalization}', ${letter.rateDiscount}, '${letter.dateDiscount}');`;
         const createdLetter = global.dbp.any(query);
         console.log("-------> Query: "+query);
         return createdLetter;
     }

    async updateLetter(letterId, { letter }) {
        const query = `UPDATE public.letters SET ${letter.name != undefined ?  `name=${letter.name},`: ''  } ${letter.dayOfYear != undefined ?  `day_of_year='${letter.dayOfYear}',`: ''  } ${letter.dateStart != undefined ?  `date_start='${letter.dateStart}',`: ''  } ${letter.dateEnd!= undefined ?  `date_end=${letter.dateEnd},`: ''  } ${letter.discount != undefined ?  `discount='${letter.discount}',`: ''  } ${letter.currency!= undefined ?  `currency=${letter.currency}`: ''  } ${letter.retention!= undefined ?  `retention=${letter.retention}`: ''  } ${letter.typeRate!= undefined ?  `type_rate=${letter.typeRate}`: ''  } ${letter.rate!= undefined ?  `rate=${letter.rate}`: ''  } ${letter.rateTerm!= undefined ?  `rate_term=${letter.rateTerm}`: ''  } ${letter.valueNominal!= undefined ?  `value_nominal=${letter.valueNominal}`: ''  } ${letter.valueDelivered!= undefined ?  `value_delivered=${letter.valueDelivered}`: ''  } ${letter.valueReceived!= undefined ?  `value_received=${letter.valueReceived}`: ''  } ${letter.valueNet!= undefined ?  `value_net=${letter.valueNet}`: ''  } ${letter.tcea!= undefined ?  `tcea=${letter.tcea}`: ''  } ${letter.condition!= undefined ?  `condition=${letter.condition}`: ''  } ${letter.userId!= undefined ?  `user_id=${letter.userId}`: ''  } ${letter.capitalization!= undefined ?  `capitalization=${letter.capitalization}`: ''  } ${letter.rateDiscount!= undefined ?  `rate_discount=${letter.rateDiscount}`: ''  } ${letter.dateDiscount!= undefined ?  `date_discount=${letter.dateDiscount}`: ''  }  WHERE id=${letterId};`;
        const updatedLetter = global.dbp.any(query);

        return updatedLetter;
    }

    async deleteLetter(letterId) {
        const query = `DELETE FROM public.letters WHERE id=${letterId};`;
        const deletedLetter = this.getLetterById(letterId)
            .then( row => new Promise(
                    (resolve, reject) => row.length > 0 ?
                        resolve(global.dbp.any(query)) :
                        reject(`Id:  ${letterId} does not exist`)))


        return deletedLetter;
    }
}

module.exports = {
    LetterService: LettersService
}
