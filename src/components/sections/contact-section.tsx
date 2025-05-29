
"use client"

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const contactFormSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
  email: z.string().email("Por favor, introduce un email válido."),
  company: z.string().optional(),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres.").max(500, "El mensaje no puede exceder los 500 caracteres."),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function ContactSection() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
    },
  });

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Contact form data:", data);
    toast({
      title: "Mensaje Enviado",
      description: "Gracias por contactarnos. Nos pondremos en contacto contigo pronto.",
      variant: "default" 
    });
    form.reset();
    setIsSubmitting(false);
  };

  return (
    <section id="contacto" className="py-16 sm:py-24 bg-card text-card-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Ponte en Contacto
          </h2>
          <p className="mt-4 text-xl text-muted-foreground">
            ¿Interesado en una demo o tienes alguna pregunta? ¡Nos encantaría escucharte!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-primary mb-2 flex items-center"><Mail className="mr-3 h-6 w-6"/>Email</h3>
              <p className="text-muted-foreground">
                <a href="mailto:contacto@finaivisor.com" className="hover:underline">contacto@finaivisor.com</a>
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-primary mb-2 flex items-center"><Phone className="mr-3 h-6 w-6"/>Teléfono</h3>
              <p className="text-muted-foreground">+34 900 123 456</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-primary mb-2 flex items-center"><MapPin className="mr-3 h-6 w-6"/>Oficina</h3>
              <p className="text-muted-foreground">Calle Innovación 123, Parque Tecnológico, Valencia, España</p>
            </div>
            <div className="pt-4">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3080.090442280704!2d-0.3762891846320994!3d39.46990747948608!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd604f4cfdd97953%3A0xDEADBEEFDEADBEEF!2sValencia%2C%20Spain!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus" 
                width="100%" 
                height="250" 
                style={{border:0}} 
                allowFullScreen={false} 
                loading="lazy"
                title="Ubicación de Horizont"
                className="rounded-md shadow-md"
                data-ai-hint="city map"
              ></iframe>
            </div>
          </div>

          <Card className="bg-background border-border shadow-xl p-6 sm:p-8">
            <CardHeader className="p-0 mb-6">
              <CardTitle className="text-2xl font-semibold text-primary">Envíanos un Mensaje</CardTitle>
              <CardDescription className="text-muted-foreground">Completa el formulario y te responderemos a la brevedad.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Nombre Completo</FormLabel>
                        <FormControl><Input className="bg-input text-foreground placeholder:text-muted-foreground" placeholder="Tu nombre" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Email</FormLabel>
                        <FormControl><Input className="bg-input text-foreground placeholder:text-muted-foreground" type="email" placeholder="tu@email.com" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Empresa (Opcional)</FormLabel>
                        <FormControl><Input className="bg-input text-foreground placeholder:text-muted-foreground" placeholder="Nombre de tu empresa" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Mensaje</FormLabel>
                        <FormControl><Textarea className="bg-input text-foreground placeholder:text-muted-foreground" placeholder="Escribe tu consulta aquí..." rows={5} {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Enviando...
                      </>
                    ) : "Enviar Mensaje"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
