let busData = []; // เก็บข้อมูลใน memory

export async function GET() {
  return Response.json(busData);
}

export async function POST(req) {
  const body = await req.json();
  busData.push(body);
  return Response.json({ message: "เพิ่มข้อมูลสำเร็จ", data: body });
}
