import { NextRequest, NextResponse } from 'next/server';
import { standaloneAIService } from '@/lib/bis-ai-service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const documentText = body.documentText || body.text || '';
    const filename = body.filename || 'uploaded_spec.pdf';

    const complianceResult = await standaloneAIService.checkCompliance({
      material: documentText.includes('304') ? 'SS 304' : 'Stainless steel',
      thermalPerformance: documentText.includes('vacuum') ? 'Double wall vacuum insulated' : 'Insulated',
      leakProof: true
    });

    return NextResponse.json({
      filename,
      extractedParameters: {
        productType: 'Stainless Steel Insulated Container',
        detectedMaterial: 'Austenitic Stainless Steel (Food Contact Grade)',
        thermalRating: 'Vacuum retention > 60°C'
      },
      matchedStandard: complianceResult.applicableStandard,
      complianceAssessment: complianceResult
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || 'Error analyzing document' }, { status: 500 });
  }
}
