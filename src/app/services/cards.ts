import { NextResponse } from "next/server";
import { CardsRepository } from "../repositories/cards";

const index = async () => {
    try {
        const result = await CardsRepository.findAll();
        return new NextResponse(JSON.stringify({cards: result}), {status: 200});
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
        const card = await CardsRepository.findById(id); 
        return new NextResponse(JSON.stringify({card}), {status: 200});
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

        const findcard = await CardsRepository.findByName(body?.name);

        if (findcard) {
            return new NextResponse(
                JSON.stringify({
                  status: "internal_server_error",
                  message: `Este card já existe.`,
                }),
                { status: 500 }
            );
        }

        const result = await CardsRepository.create({name: body?.name});

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
        const result = await CardsRepository.update(body?.name, id);
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
        const card = await CardsRepository.destroy(id);

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

export const CardsService = {
    index,
    show,
    create, 
    update,
    destroy 
};