import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache'; // Import this from next/cache

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get('secret');

  // Check the revalidation secret token
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  try {
    // Revalidate the specific path
    revalidatePath('/Api/User/Admin');
    return NextResponse.json({ revalidated: true });
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidating', err }, { status: 500 });
  }
}
