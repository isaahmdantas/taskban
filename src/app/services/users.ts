import { NextResponse } from "next/server";
import { UsersRepository } from "../repositories/users";
import { compare, hash } from "bcrypt";

const index = async () => {
    try {
        const result = await UsersRepository.findAll();
        return new NextResponse(JSON.stringify({users: result}), {status: 200});
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
        const user = await UsersRepository.findById(id); 
        return new NextResponse(JSON.stringify({user}), {status: 200});
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

        const findUser = await UsersRepository.findByEmail(body?.email);

        if (findUser) {
            return new NextResponse(
                JSON.stringify({
                  status: "internal_server_error",
                  message: `Este usuário já existe.`,
                }),
                { status: 500 }
            );
        }

        const hashPassword = await hash(body?.password, 12);

        const result = await UsersRepository.create({name: body?.name, email: body?.email, password: hashPassword});

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

        if (body?.old_password && body?.new_password) {
            const findById = await UsersRepository.findById(id); 

            if (!findById) {
                return new NextResponse(
                    JSON.stringify({
                    status: "internal_server_error",
                    message: `Este usuário não foi encontrado.`,
                    }),
                    { status: 404 }
                );
            }

            const passwordMatch = compare(body?.old_password, body?.new_password);

            if (!passwordMatch) {
                return new NextResponse(
                    JSON.stringify({
                    status: "internal_server_error",
                    message: `Senha não confere.`,
                    }),
                    { status: 404 }
                );
            }

            const password = await hash(body?.new_password, 10);

            await UsersRepository.update_password(password, id);
        }

        const result = await UsersRepository.update(body?.name, "", id);

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
        const user = await UsersRepository.destroy(id);

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

export const UsersService = {
    index,
    show,
    create, 
    update,
    destroy 
};