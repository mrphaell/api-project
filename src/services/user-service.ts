import bcrypt from 'bcrypt';
import { Op } from 'sequelize';
import User from '../models/user';

export async function getAllUsers(search: string) {
    if (search) {
        return User.findAll({
            where: {
                [Op.or]: [
                    { nome: { [Op.iLike]: `%${search}%` } },
                    { email: { [Op.iLike]: `%${search}%` } },
                ],
            },
        });
    }
    return User.findAll();
}

export async function getSingleUser(id: string) {
    return User.findByPk(id, { attributes: { exclude: ['senha'] } });
}

export async function createSingleUser(nome: string, email: string, senha: string, funcao: 'admin' | 'cliente') {
    const salt: string = bcrypt.genSaltSync(7);
    const hashedPassword = await bcrypt.hash(senha, salt);
    return User.create({ nome, email, senha: hashedPassword, funcao });
}

export async function updateSingleUser(id: string, updates: Partial<{ nome: string; email: string; funcao: 'admin' | 'cliente' }>) {
    await User.update(updates, { where: { id } });
    return User.findOne({ where: { id }, attributes: { exclude: ['senha'] } });
}

export async function deleteSingleUser(id: string) {
    return User.destroy({ where: { id } });
}

