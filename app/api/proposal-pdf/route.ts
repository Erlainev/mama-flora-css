import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import React from "react";
import { ProposalDocument, type ProposalData } from "@/components/proposal-document";

export async function POST(req: NextRequest) {
  try {
    const data: ProposalData = await req.json();

    const buffer = await renderToBuffer(
      React.createElement(ProposalDocument, { data })
    );

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="proposta-${data.id}-mama-flora.pdf"`,
        "Content-Length": String(buffer.byteLength),
      },
    });
  } catch (err) {
    console.error("[PDF route]", err);
    return NextResponse.json(
      { error: "Falha ao gerar o PDF" },
      { status: 500 }
    );
  }
}
