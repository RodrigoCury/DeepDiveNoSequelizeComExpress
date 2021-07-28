const database = require('../models')

// DAO
class NivelControler {
    static async getAll() {
        return await database.Niveis.findAll()
    }

    static async getOne(id) {
        return await database.Niveis.findOne({
            where: { id },
            raw: true
        })
    }

    static async deleteOne(id) {
        await database.Niveis.destroy({
            where: {
                id: id
            }
        })
    }
}

module.exports = NivelControler