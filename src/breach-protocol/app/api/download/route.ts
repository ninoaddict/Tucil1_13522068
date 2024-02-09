import { convertDataToString } from "@/app/lib/util";

type GetParams = {
  params: {
    filename: string;
  };
};

export async function POST(req: Request, { params }: GetParams) {
  const res = await req.json();
  const fileContent = convertDataToString(
    res.maxPoint,
    res.coordinates,
    res.matrix,
    res.runTime
  );
  const buffer = Buffer.from(fileContent, "utf-8");

  const headers = new Headers();
  headers.append("Content-Disposition", 'attachment; filename="filename.txt"');
  headers.append("Content-Type", "application/text");

  return new Response(buffer, {
    headers,
  });
}
