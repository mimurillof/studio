// src/ai/flows/generate-testimonials.ts
'use server';

/**
 * @fileOverview Generates testimonials for the landing page, showcasing the software's ability to assist with financial analysis and investment decisions.
 *
 * - generateTestimonials - A function that generates testimonials.
 * - GenerateTestimonialsInput - The input type for the generateTestimonials function.
 * - GenerateTestimonialsOutput - The return type for the generateTestimonials function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTestimonialsInputSchema = z.object({
  numberOfTestimonials: z
    .number()
    .default(3)
    .describe('The number of testimonials to generate.'),
});
export type GenerateTestimonialsInput = z.infer<typeof GenerateTestimonialsInputSchema>;

const GenerateTestimonialsOutputSchema = z.object({
  testimonials: z.array(
    z.object({
      author: z.string().describe('The name of the testimonial author.'),
      title: z.string().describe('The title of the testimonial author.'),
      text: z.string().describe('The text of the testimonial.'),
    })
  ),
});
export type GenerateTestimonialsOutput = z.infer<typeof GenerateTestimonialsOutputSchema>;

export async function generateTestimonials(input: GenerateTestimonialsInput): Promise<GenerateTestimonialsOutput> {
  return generateTestimonialsFlow(input);
}

const generateTestimonialsPrompt = ai.definePrompt({
  name: 'generateTestimonialsPrompt',
  input: {schema: GenerateTestimonialsInputSchema},
  output: {schema: GenerateTestimonialsOutputSchema},
  prompt: `You are an expert in generating compelling testimonials for a financial analysis and investment platform.

Generate {{numberOfTestimonials}} testimonials that highlight the platform's ability to assist with financial analysis and investment decisions. Each testimonial should include an author, their title, and the testimonial text. The testimonials should sound authentic and build trust in the platform's capabilities.

Format the testimonials as a JSON array of objects with the following structure:

[{
  "author": "Author Name",
  "title": "Author Title",
  "text": "Testimonial Text"
}]
`,
});

const generateTestimonialsFlow = ai.defineFlow(
  {
    name: 'generateTestimonialsFlow',
    inputSchema: GenerateTestimonialsInputSchema,
    outputSchema: GenerateTestimonialsOutputSchema,
  },
  async input => {
    const {output} = await generateTestimonialsPrompt(input);
    return output!;
  }
);
