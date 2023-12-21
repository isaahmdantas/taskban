import { NextResponse } from "next/server";
import { PrioritiesRepository } from "../repositories/priorities";

const index = async () => {
    try {
        const result = await PrioritiesRepository.findAll();
        return new NextResponse(JSON.stringify({priorities: result}), {status: 200});
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
        const priority = await PrioritiesRepository.findById(id); 
        return new NextResponse(JSON.stringify({priority}), {status: 200});
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

        const findpriority = await PrioritiesRepository.findByName(body?.name);

        if (findpriority) {
            return new NextResponse(
                JSON.stringify({
                  status: "internal_server_error",
                  message: `Este card já existe.`,
                }),
                { status: 500 }
            );
        }

        const result = await PrioritiesRepository.create({name: body?.name});

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
        const result = await PrioritiesRepository.update(body?.name, id);
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
        const priority = await PrioritiesRepository.destroy(id);

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

export const PrioritiesService = {
    index,
    show,
    create, 
    update,
    destroy 
};