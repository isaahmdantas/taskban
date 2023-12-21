import { TasksService } from "@/app/services/tasks";

export async function GET(req: Request) {
  return await TasksService.index();
}

export async function POST(req: Request) {
  return await TasksService.create(req);
}