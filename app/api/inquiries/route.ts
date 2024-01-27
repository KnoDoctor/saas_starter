export const dynamic = 'force-dynamic'; // defaults to auto
import prisma from '../../../prisma/prismaClientInstance';

export async function GET() {
  try {
    const allInquiries = await prisma.inquiries.findMany();

    return Response.json({
      success: true,
      data: allInquiries,
    });
  } catch (error) {
    console.log(error);
    return Response.json({
      success: false,
      error: error,
    });
  }
}

export async function POST(request: Request) {
  try {
    const { subject }: { subject: string } = await request.json();

    if (!subject) {
      return new Response(`Webhook error: customer_id property is missing.`, {
        status: 400,
      });
    }

    const createdInquiry = await prisma.inquiries.create({
      data: {
        subject,
      },
    });

    return Response.json({
      success: true,
      data: createdInquiry,
    });
  } catch (error) {
    console.log(error);
    return new Response(`Error: ${error}`, {
      status: 400,
    });
  }
}
