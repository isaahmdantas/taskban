import { prisma } from "../config/database";
import { ICreate } from "@/app/interfaces/priorities";

const findAll = async () => {
    const result = await prisma.priorities.findMany();
  
    return result;
};

const findByName = async (name: string) => {
    const result = await prisma.priorities.findMany({where: {name: name}});

    return result[0];
};

const findById = async (id: string) => {
    const result = await prisma.priorities.findUnique({where: {id: id}});

    return result;
};

const create = async ({name }: ICreate) => {
    const result = await prisma.priorities.create({data: {name}});

    return result;
};

const update = async (name: string, card_id: string) => {
    const result = await prisma.priorities.update({
        where: {
            id: card_id
        },
        data: {
            name
        }
    });

    return result;
};

const destroy = async (id: string) => {
    const result = await prisma.priorities.delete({where: {id: id}});

    return result;
}


export const PrioritiesRepository = {
    findAll,
    findByName,
    findById,
    create,
    update,
    destroy
};