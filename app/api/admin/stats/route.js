import { NextResponse } from 'next/server';
import { adminService } from '@/lib/admin-service';

export async function GET() {
    try {
        const stats = await adminService.getStats();
        return NextResponse.json(stats);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
