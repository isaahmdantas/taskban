import { prisma } from "../config/database";
import { ICreate } from "@/app/interfaces/cards";

const findAll = async () => {
    const result = await prisma.cards.findMany();
  
    return result;
};

const findByName = async (name: string) => {
    const result = await prisma.cards.findMany({where: {name: name}});

    return result[0];
};

const findById = async (id: string) => {
    const result = await prisma.cards.findUnique({where: {id: id}});

    return result;
};

const create = async ({name }: ICreate) => {
    const result = await prisma.cards.create({data: {name}});

    return result;
};

const update = async (name: string, card_id: string) => {
    const result = await prisma.cards.update({
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
    const result = await prisma.cards.delete({where: {id: id}});

    return result;
}


export const CardsRepository = {
    findAll,
    findByName,
    findById,
    create,
    update,
    destroy
};