import { PrioritiesService } from "@/app/services/priorities";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    return await PrioritiesService.show(params?.id, req);
}
  
export async function PUT(req: Request, { params }: { params: { id: string } }) {
    return await PrioritiesService.update(params?.id, req);
}

export async function DELETE(req: Request, { params }: { params: { id: string}}) {
    return await PrioritiesService.destroy(params?.id, req);
}