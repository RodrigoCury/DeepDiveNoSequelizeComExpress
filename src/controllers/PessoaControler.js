const database = require('../models')
const { transaction } = require('sequelize')

// DAO
class PessoaControler {
    static async getAllActive() {
        return await database.Pessoas.findAll({})
    }

    static async getAll() {
        return await database.Pessoas.scope("todas").findAll({})
    }

    static async getOne(id) {
        return await database.Pessoas.findOne({
            where: { id },
            raw: true
        })
    }

    static async createOne(pessoa) {
        await database.Pessoas.create({
            nome: pessoa.nome,
            ativo: pessoa.ativo,
            email: pessoa.email,
            role: pessoa.role,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        })
    }

    static async updateOne(id, pessoa) {
        return await database.Pessoas.update(
            pessoa
            , {
                where: {
                    id: id
                }
            })
    }

    static async deleteOne(id) {
        await database.Pessoas.destroy({
            where: {
                id: id
            }
        })
    }

    static async restoreOne(id) {
        await database.Pessoas.restore({
            where: { id }
        })
    }

    // Find All registrations for a single Person
    static async getRegistrations(id) {
        const pessoa = await database.Pessoas.findOne({
            where: { id }
        })
        const matriculas = await pessoa.getAulasMatriculadas()

        return Object.assign(pessoa.dataValues, { matriculas: matriculas })
    }

    // Find One registration for a Person
    static async getRegistration(estudanteId, matriculaId) {
        return await database.Matriculas.findOne({
            where: {
                id: matriculaId,
                estudante_id: estudanteId,
            }
        })
    }

    // Create registration for a Person
    static async createRegistration(estudanteId, matricula) {
        return await database.Matriculas.create(
            Object.assign({}, { estudante_id: estudanteId }, matricula)
        )
    }

    // Update Registration for a Person
    static async updateRegistration(estudanteId, matriculaId, matricula) {
        return await database.Matriculas.update(
            matricula,
            {
                where: {
                    id: matriculaId,
                    estudante_id: estudanteId
                }
            })
    }

    // Delete a Registration
    static async deleteRegistration(estudanteId, matriculaId) {
        await database.Matriculas.destroy({
            where: {
                id: matriculaId,
                estudante_id: estudanteId
            }
        })
    }

    static async cancelPerson(estudanteId) {

        database.sequelize.transaction(async transaction => {
            await database.Pessoas.update({ ativo: false }, { where: { id: Number(estudanteId) } }, { transaction })
            await database.Matriculas.update({ status: "cancelado" }, { where: { estudante_id: Number(estudanteId) } }, { transaction })
        })
    }

}

module.exports = PessoaControler