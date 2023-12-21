import { UsersService } from "@/app/services/users";

export async function GET(req: Request) {
  return await UsersService.index();
}

export async function POST(req: Request) {
  return await UsersService.create(req);
}