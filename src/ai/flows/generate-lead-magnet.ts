// src/ai/flows/generate-lead-magnet.ts
'use server';
/**
 * @fileOverview Generates a lead magnet whitepaper about how AI agents and humans can collaborate for financial analysis.
 *
 * - generateLeadMagnet - A function that generates the lead magnet.
 * - GenerateLeadMagnetInput - The input type for the generateLeadMagnet function.
 * - GenerateLeadMagnetOutput - The return type for the generateLeadMagnet function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateLeadMagnetInputSchema = z.object({
  topic: z
    .string()
    .default(
      'The collaboration of AI agents and humans in financial analysis'
    )
    .describe('The topic of the lead magnet whitepaper.'),
  audience: z
    .string()
    .default('Financial investors and analysts')
    .describe('The intended audience for the lead magnet whitepaper.'),
  length: z
    .string()
    .default('short')
    .describe(
      'The desired length of the lead magnet whitepaper (short, medium, long)'
    ),
});

export type GenerateLeadMagnetInput = z.infer<typeof GenerateLeadMagnetInputSchema>;

const GenerateLeadMagnetOutputSchema = z.object({
  title: z.string().describe('The title of the lead magnet whitepaper.'),
  content: z.string().describe('The content of the lead magnet whitepaper.'),
});

export type GenerateLeadMagnetOutput = z.infer<typeof GenerateLeadMagnetOutputSchema>;

export async function generateLeadMagnet(input: GenerateLeadMagnetInput): Promise<GenerateLeadMagnetOutput> {
  return generateLeadMagnetFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateLeadMagnetPrompt',
  input: {schema: GenerateLeadMagnetInputSchema},
  output: {schema: GenerateLeadMagnetOutputSchema},
  prompt: `You are an expert content creator specializing in generating lead magnets for the financial industry.

  Your task is to create a whitepaper on the following topic:
  {{topic}}

  The intended audience is:
  {{audience}}

  The desired length is:
  {{length}}

  The whitepaper should be informative, engaging, and provide valuable insights to the reader.

  Please provide a title and the content for the whitepaper.
  `,
});

const generateLeadMagnetFlow = ai.defineFlow(
  {
    name: 'generateLeadMagnetFlow',
    inputSchema: GenerateLeadMagnetInputSchema,
    outputSchema: GenerateLeadMagnetOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
