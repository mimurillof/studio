
"use client";

import { useState, useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea'; 
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { handleGenerateLeadMagnetAction } from './actions';
import Link from 'next/link';
import { ArrowLeft, Loader2, AlertTriangle, FileText, Download } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const leadMagnetFormSchema = z.object({
  topic: z.string().min(10, "El tema debe tener al menos 10 caracteres.").default("La colaboración de agentes de IA y humanos en el análisis financiero"),
  audience: z.string().min(5, "La audiencia debe tener al menos 5 caracteres.").default("Inversores y analistas financieros"),
  length: z.enum(['corta', 'media', 'larga'], { errorMap: () => ({ message: "Seleccione una longitud válida." }) }).default('corta'),
});

type LeadMagnetFormValues = z.infer<typeof leadMagnetFormSchema>;
type GeneratedContent = { title: string; content: string } | null;

export default function LeadMagnetPage() {
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);


  const form = useForm<LeadMagnetFormValues>({
    resolver: zodResolver(leadMagnetFormSchema),
    defaultValues: {
      topic: "La colaboración de agentes de IA y humanos en el análisis financiero",
      audience: "Inversores y analistas financieros",
      length: "corta",
    },
  });

  const onSubmit: SubmitHandler<LeadMagnetFormValues> = async (data) => {
    setIsLoading(true);
    setError(null);
    setGeneratedContent(null);
    try {
      const result = await handleGenerateLeadMagnetAction(data);
      setGeneratedContent(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocurrió un error desconocido al generar el whitepaper.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!generatedContent) return;
    const element = document.createElement("a");
    const fileContent = `Título: ${generatedContent.title}\n\n${"=".repeat(generatedContent.title.length)}\n\nContenido:\n\n${generatedContent.content}`;
    const file = new Blob([fileContent], {type: 'text/plain;charset=utf-8'});
    element.href = URL.createObjectURL(file);
    const safeFileName = generatedContent.title.replace(/[^\w\s.-]/gi, '').replace(/\s+/g, '_');
    element.download = `${safeFileName || 'whitepaper'}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    URL.revokeObjectURL(element.href);
  };
  
  if (!isMounted) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Cargando...</p>
      </div>
    );
  }


  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Button variant="outline" asChild className="mb-8">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al Inicio
          </Link>
        </Button>

        <Card className="max-w-3xl mx-auto shadow-xl bg-card border-border">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-primary flex items-center">
              <FileText className="mr-3 h-7 w-7" />
              Generador de Whitepaper sobre Inversión con IA
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Completa los campos para generar un whitepaper personalizado sobre el análisis financiero asistido por IA.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="topic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-card-foreground">Tema del Whitepaper</FormLabel>
                      <FormControl>
                        <Input className="bg-input text-foreground placeholder:text-muted-foreground" placeholder="Ej: El futuro de las inversiones con IA" {...field} />
                      </FormControl>
                      <FormDescription className="text-muted-foreground">
                        Describe el tema principal que abordará el whitepaper.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="audience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-card-foreground">Audiencia Objetivo</FormLabel>
                      <FormControl>
                        <Input className="bg-input text-foreground placeholder:text-muted-foreground" placeholder="Ej: Inversores principiantes, analistas expertos" {...field} />
                      </FormControl>
                      <FormDescription className="text-muted-foreground">
                        ¿A quién va dirigido este whitepaper?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="length"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-card-foreground">Longitud Deseada</FormLabel>
                       <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-input text-foreground">
                            <SelectValue placeholder="Selecciona una longitud" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-popover text-popover-foreground">
                          <SelectItem value="corta">Corta (Resumen ejecutivo)</SelectItem>
                          <SelectItem value="media">Media (Análisis detallado)</SelectItem>
                          <SelectItem value="larga">Larga (Investigación profunda)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription className="text-muted-foreground">
                        Elige la extensión aproximada del whitepaper.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generando...
                    </>
                  ) : (
                    "Generar Whitepaper"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {error && (
          <Card className="mt-8 max-w-3xl mx-auto bg-destructive/10 border-destructive">
            <CardHeader>
              <CardTitle className="flex items-center text-destructive">
                <AlertTriangle className="mr-2 h-5 w-5" />
                Error al Generar Contenido
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-destructive-foreground">{error}</p>
            </CardContent>
          </Card>
        )}

        {generatedContent && (
          <Card className="mt-8 max-w-3xl mx-auto shadow-lg bg-card border-border">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-primary">{generatedContent.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                readOnly
                value={generatedContent.content}
                className="min-h-[300px] text-sm bg-input border-border resize-none text-foreground"
                aria-label="Contenido del whitepaper generado"
              />
            </CardContent>
            <CardFooter>
                <Button onClick={handleDownload} variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Descargar .txt
                </Button>
            </CardFooter>
          </Card>
        )}
      </main>
      <Footer />
    </div>
  );
}
