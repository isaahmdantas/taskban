import { CardsService } from "@/app/services/cards";

export async function GET(req: Request) {
  return await CardsService.index();
}

export async function POST(req: Request) {
  return await CardsService.create(req);
}