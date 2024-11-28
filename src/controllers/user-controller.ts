import { Request, Response } from 'express';
import { getAllUsers, getSingleUser, createSingleUser, updateSingleUser, deleteSingleUser } from '../services/user-service';

export const getUsers = async (req: Request, res: Response) => {
    // #swagger.tags = ['Users']
    // #swagger.description = 'Endpoint para listar usuários.'
    // #swagger.parameters['filter'] = { description: 'Parâmetro de busca opcional.', required: false }
    // #swagger.responses[200] = { description: 'Usuários listados com sucesso.' }
    // #swagger.responses[400] = { description: 'Erro ao listar usuários.' }
    try {
        const { filter } = req.query as { filter: string };
        const users = await getAllUsers(filter);
        res.status(200).json(users);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

// Listar Usuário
export async function getUser(req: Request, res: Response) {
    // #swagger.tags = ['Users']
    // #swagger.description = 'Endpoint para buscar usuário pelo ID.'
    // #swagger.parameters['id'] = { description: 'ID do usuário.', required: true }
    // #swagger.responses[200] = { description: 'Usuário listado com sucesso.' }
    // #swagger.responses[400] = { description: 'Erro ao listar usuário.' }
    try {
        const { id } = req.params;
        const user = await getSingleUser(id);
        res.status(200).json(user);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
}

// Criar Usuário
export async function createUser(req: Request, res: Response) {
    // #swagger.tags = ['Users']
    // #swagger.description = 'Endpoint para criar usuário.'
    // #swagger.requestBody = { required: true, content: { "application/json": { schema: { $ref: '#/definitions/AddUser' } } }, description: 'Dados do usuário a ser criado.' } }
    // #swagger.responses[200] = { description: 'Usuários criado com sucesso.' }
    // #swagger.responses[400] = { description: 'Erro ao criar usuário.' }
    try {
        const { nome, email, senha, funcao }: any = req.body;
        const user = await createSingleUser(nome, email, senha, funcao);
        res.status(201).json(user);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
}

// Atualizar Perfil do Usuário
export async function updateUser(req: Request, res: Response) {
    // #swagger.tags = ['Users']
    // #swagger.description = 'Endpoint para atualizar usuário.'
    // #swagger.parameters['id'] = { description: 'ID do usuário.', required: true }
    // #swagger.requestBody = { required: true, content: { "application/json": { schema: { $ref: '#/definitions/UpdateUser' } } }, description: 'Dados do usuário a ser criado.' } }
    // #swagger.responses[200] = { description: 'Usuários atualizado com sucesso.' }
    // #swagger.responses[400] = { description: 'Erro ao atualizar usuário.' }
    try {
        const { id } = req.params;
        const { nome, email, funcao } = req.body;

        const user = await updateSingleUser(id, { nome, email, funcao });
        res.status(200).json(user);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
}

// Deletar Usuário
export async function deleteUser(req: Request, res: Response) {
    // #swagger.tags = ['Users']
    // #swagger.description = 'Endpoint para excluir usuário pelo ID.'
    // #swagger.parameters['id'] = { description: 'ID do usuário.', required: true }
    // #swagger.responses[200] = { description: 'Usuário excluído com sucesso.' }
    // #swagger.responses[400] = { description: 'Erro ao excluir usuário.' }
    try {
        const { id } = req.params;
        await deleteSingleUser(id);
        res.status(200).json({ message: 'Usuário deletado com sucesso!' });
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
}
