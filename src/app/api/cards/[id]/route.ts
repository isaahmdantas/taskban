import { CardsService } from "@/app/services/cards";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    return await CardsService.show(params?.id, req);
}
  
export async function PUT(req: Request, { params }: { params: { id: string } }) {
    return await CardsService.update(params?.id, req);
}

export async function DELETE(req: Request, { params }: { params: { id: string}}) {
    return await CardsService.destroy(params?.id, req);
}