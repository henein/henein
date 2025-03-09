import { prisma } from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

type SqlReturnType = {
  character_id: string;
  created_at: Date;
  character_level: number;
  character_combat: number;
};

export type GroupedRecordType = Record<
  string,
  Array<
    {
      character_id: string;
      character_combat: number;
      character_level: number;
    }
  >
>;

export async function GET(request: NextRequest) {
  try {
    // DB 작업
    const logs: SqlReturnType[] = await prisma.$queryRaw`
      SELECT
      character_id,
      created_at,
      (basic->>'character_level')::INTEGER
        + (ROUND((basic->>'character_exp_rate')::NUMERIC / 100, 2)) AS character_level,
      (
        SELECT elem->>'stat_value'
        FROM jsonb_array_elements(stat->'final_stat') AS elem
        WHERE elem->>'stat_name' = '전투력'
        LIMIT 1
      ) AS character_combat
    FROM mamudae.logs
    ORDER BY created_at ASC
    `;

    // created_at을 기준으로 그룹화
    const groupedLogs = logs.reduce((acc, cur) => {
      const createdAtKey = cur.created_at.toISOString();

      if (!acc[createdAtKey]) {
        acc[createdAtKey] = [];
      }

      acc[createdAtKey].push({
        character_id: cur.character_id,
        character_combat: Number(cur.character_combat),
        character_level: Number(cur.character_level),
      });

      return acc;
    }, {} as GroupedRecordType);

    return NextResponse.json({ logs: groupedLogs }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
