
'use server';

import { generateLeadMagnet, type GenerateLeadMagnetInput, type GenerateLeadMagnetOutput } from '@/ai/flows/generate-lead-magnet';

export async function handleGenerateLeadMagnetAction(input: GenerateLeadMagnetInput): Promise<GenerateLeadMagnetOutput> {
  try {
    // The AI flow expects English for length. Ensure mapping if input is in Spanish.
    const mappedInput = {
      ...input,
      length: input.length === 'corta' ? 'short' : input.length === 'media' ? 'medium' : input.length === 'larga' ? 'long' : input.length,
    };
    const result = await generateLeadMagnet(mappedInput);
    return result;
  } catch (error) {
    console.error("Error generating lead magnet:", error);
    // Consider more specific error messages or logging
    if (error instanceof Error) {
      throw new Error(`Failed to generate lead magnet content: ${error.message}`);
    }
    throw new Error("An unknown error occurred while generating the lead magnet.");
  }
}
