import { UsersService } from "@/app/services/users";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    return await UsersService.show(params?.id, req);
}
  
export async function PUT(req: Request, { params }: { params: { id: string } }) {
    return await UsersService.update(params?.id, req);
}

export async function DELETE(req: Request, { params }: { params: { id: string}}) {
    return await UsersService.destroy(params?.id, req);
}