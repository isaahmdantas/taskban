import { prisma } from "../config/database";
import { ICreate } from "@/app/interfaces/users";

const findAll = async () => {
    const result = await prisma.users.findMany();
  
    return result;
};

const findByEmail = async (email: string) => {
    const result = await prisma.users.findUnique({where: {email: email}});

    return result;
};

const findById = async (id: string) => {
    const result = await prisma.users.findUnique({where: {id: id}});

    return result;
};

const create = async ({name, email, password}: ICreate) => {
    const result = await prisma.users.create({data: {name, email, password}});

    return result;
};

const update = async (name: string, avatar_url: string, user_id: string) => {
    const result = await prisma.users.update({
        where: {
            id: user_id
        },
        data: {
            name,
            avatar_url
        }
    });

    return result;
};

const update_password = async (new_password: string, user_id: string) => {
    const result = await prisma.users.update({
        where: {
            id: user_id
        },
        data: {
            password: new_password
        }
    });

    return result;
};

const destroy = async (id: string) => {
    const result = await prisma.users.delete({where: {id: id}});

    return result;
}


export const UsersRepository = {
    findAll,
    findByEmail,
    findById,
    create,
    update,
    update_password,
    destroy
};