import { prisma } from "../config/database";
import { ICreate } from "@/app/interfaces/tasks";

const findAll = async () => {
    const result = await prisma.tasks.findMany();
  
    return result;
};

const findByTitle = async (title: string) => {
    const result = await prisma.tasks.findMany({where: {title: title}});

    return result[0];
};

const findById = async (id: string) => {
    const result = await prisma.tasks.findUnique({where: {id: id}});

    return result;
};


const create = async ({title, description, final_date, user_id, priority_id, card_id }: ICreate) => {
    const result = await prisma.tasks.create({data: {title, description, final_date, user_id, priority_id, card_id }});

    return result;
};

const update = async (title: string, description: string, final_date: Date, priority_id: string, card_id: string, task_id: string) => {
    const result = await prisma.tasks.update({
        where: {
            id: task_id
        },
        data: {
            title, description, final_date, priority_id, card_id 
        }
    });

    return result;
};

const destroy = async (id: string) => {
    const result = await prisma.tasks.delete({where: {id: id}});

    return result;
}


export const TasksRepository = {
    findAll,
    findByTitle,
    findById,
    create,
    update,
    destroy
};