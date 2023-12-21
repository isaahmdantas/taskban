import { PrioritiesService } from "@/app/services/priorities";

export async function GET(req: Request) {
  return await PrioritiesService.index();
}

export async function POST(req: Request) {
  return await PrioritiesService.create(req);
}