import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "public", "data", "bus.json");

async function readData() {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeData(data) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

export async function GET() {
  const busData = await readData();
  return Response.json(busData);
}

export async function POST(req) {
  const body = await req.json();
  const busData = await readData();

  busData.push(body);
  await writeData(busData);

  return Response.json({ message: "เพิ่มข้อมูลสำเร็จ", data: body });
}

export async function PUT(req) {
  const { index, updatedData } = await req.json();
  const busData = await readData();

  if (index < 0 || index >= busData.length) {
    return Response.json({ error: "ไม่พบข้อมูล" }, { status: 404 });
  }

  busData[index] = updatedData;
  await writeData(busData);

  return Response.json({ message: "แก้ไขข้อมูลสำเร็จ", data: updatedData });
}

export async function DELETE(req) {
  const { index } = await req.json();
  const busData = await readData();

  if (index < 0 || index >= busData.length) {
    return Response.json({ error: "ไม่พบข้อมูล" }, { status: 404 });
  }

  busData.splice(index, 1);
  await writeData(busData);

  return Response.json({ message: "ลบข้อมูลสำเร็จ" });
}
