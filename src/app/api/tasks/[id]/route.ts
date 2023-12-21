import { TasksService } from "@/app/services/tasks";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    return await TasksService.show(params?.id, req);
}
  
export async function PUT(req: Request, { params }: { params: { id: string } }) {
    return await TasksService.update(params?.id, req);
}

export async function DELETE(req: Request, { params }: { params: { id: string}}) {
    return await TasksService.destroy(params?.id, req);
}