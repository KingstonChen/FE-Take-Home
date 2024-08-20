import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://www.fruityvice.com/api/fruit/all');
    if (!response.ok) {
      throw new Error(`Failed to fetch data, status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
