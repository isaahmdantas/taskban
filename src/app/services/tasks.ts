import { NextResponse } from "next/server";
import { TasksRepository } from "../repositories/tasks";

const index = async () => {
    try {
        const result = await TasksRepository.findAll();
        return new NextResponse(JSON.stringify({tasks: result}), {status: 200});
    } catch (err: any) {
        return new NextResponse(
            JSON.stringify({
              status: "internal_server_error",
              message: `Lamentamos pelo inconveniente. Parece que algo deu errado no sistema: ${err.response.data}`,
            }),
            { status: 500 }
        );
    }
}

const show = async (id: string, req: Request )=> {
    try {
        const task = await TasksRepository.findById(id); 
        return new NextResponse(JSON.stringify({task}), {status: 200});
    } catch (err: any) {
        return new NextResponse(
            JSON.stringify({
              status: "internal_server_error",
              message: `Lamentamos pelo inconveniente. Parece que algo deu errado no sistema: ${err.response.data}`,
            }),
            { status: 500 }
        );
    }
}

const create = async (req: Request) => {
    try {
        const body = await req.json();

        const findtask = await TasksRepository.findByTitle(body?.title);

        if (findtask) {
            return new NextResponse(
                JSON.stringify({
                  status: "internal_server_error",
                  message: `Esta task já existe.`,
                }),
                { status: 500 }
            );
        }

        const result = await TasksRepository.create({title: body?.title, description: body?.description, final_date: body?.final_date, user_id: body?.user_id, priority_id: body?.priority_id, card_id: body?.card_i });

        return new NextResponse(JSON.stringify({result}), {status: 200});
    } catch (err: any) {
        return new NextResponse(
            JSON.stringify({
              status: "internal_server_error",
              message: `Lamentamos pelo inconveniente. Parece que algo deu errado no sistema.`,
            }),
            { status: 500 }
        );
    }
}

const update = async (id: string, req: Request) => {
    try {       
        const body = await req.json();
        const result = await TasksRepository.update(body?.title, body?.description, body?.final_date, body?.priority_id, body?.card_id, id);
        return new NextResponse(JSON.stringify({result}), {status: 200});
    } catch (err: any) {
        return new NextResponse(
            JSON.stringify({
              status: "internal_server_error",
              message: `Lamentamos pelo inconveniente. Parece que algo deu errado no sistema.`,
            }),
            { status: 500 }
        );
    }
}

const destroy = async (id: string, req: Request) => {
    try {
        const task = await TasksRepository.destroy(id);

        return new NextResponse(null, { status: 204 });
    } catch (err: any) {
        return new NextResponse(
            JSON.stringify({
              status: "internal_server_error",
              message: `Lamentamos pelo inconveniente. Parece que algo deu errado no sistema: ${err.response.data}`,
            }),
            { status: 500 }
        );
    }
}

export const TasksService = {
    index,
    show,
    create, 
    update,
    destroy 
};