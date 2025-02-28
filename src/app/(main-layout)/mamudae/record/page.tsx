import { PrismaClient } from '@prisma/client';
import React from 'react'

const page = async () => {
    const prisma = new PrismaClient();

    const logs = await prisma.logs.findMany();

    return (
        <div>
            {logs.map(log => (
                <div key={log.id}>
                    {log.created_at.toISOString()} - {log.basic.character_name} - {log.basic.character_level}
                </div>
            ))}
        </div>
    );
}

export default page
