import { prisma } from "@/utils/prisma";
import { JsonValue } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";

type GroupedRecordType = Record<
  string,
  Array<
    {
      character_id: string;
      stat: JsonValue | null;
      basic: JsonValue | null;
    }
  >
>;

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const characterIds = url.searchParams.get("characterIds");

    if (!characterIds) {
      return NextResponse.json({ logs: [] }, { status: 200 });
    }

    const characterIdsArray = characterIds.split(",");

    // DB 작업
    const logs = await prisma.logs.findMany({
      where: {
        character_id: {
          in: characterIdsArray,
        },
      },
    });

    // return 값 핸들링
    const serializedLogs = logs.map((log) => ({
      ...log,
      id: Number(log.id),
    }));

    const groupedLogs = serializedLogs.reduce(
      (acc, log) => {
        const createdAt = log.created_at.toISOString();

        if (!acc[createdAt]) acc[createdAt] = [];

        acc[createdAt].push({
          character_id: log.character_id,
          stat: log.stat,
          basic: log.basic,
        });

        return acc;
      },
      {} as GroupedRecordType,
    );

    return NextResponse.json({ logs: groupedLogs }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
