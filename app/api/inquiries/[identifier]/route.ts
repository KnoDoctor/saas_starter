export const dynamic = 'force-dynamic'; // defaults to auto
import prisma from '../../../../prisma/prismaClientInstance';

export async function GET(
  request: Request,
  { params }: { params: { identifier: string } },
) {
  try {
    const inquiry = await prisma.inquiries.findUnique({
      where: {
        id: params.identifier,
      },
    });

    return Response.json({
      success: true,
      data: inquiry,
    });
  } catch (error) {
    console.log(error);
    return Response.json({
      success: false,
      error: error,
    });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { identifier: string } },
) {
  try {
    const { subject }: { subject: string } = await request.json();

    const updatedInquiry = await prisma.inquiries.update({
      where: {
        id: params.identifier,
      },
      data: {
        subject,
      },
    });

    return Response.json({
      success: true,
      data: updatedInquiry,
    });
  } catch (error) {
    console.log(error);
    return new Response(`Error: ${error}`, {
      status: 400,
    });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { identifier: string } },
) {
  try {
    const deletedInquiry = await prisma.inquiries.delete({
      where: {
        id: params.identifier,
      },
    });

    return Response.json({
      success: true,
      data: deletedInquiry,
    });
  } catch (error) {
    console.log(error);
    return new Response(`Error: ${error}`, {
      status: 400,
    });
  }
}
