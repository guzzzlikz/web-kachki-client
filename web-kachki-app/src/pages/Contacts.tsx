import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { SEO } from "@/components/SEO";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { useState } from "react";

const newsletterSchema = z.object({
  email: z.string().email("Невірний формат email"),
});

type NewsletterForm = z.infer<typeof newsletterSchema>;

const Contacts = () => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<NewsletterForm>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async (data: NewsletterForm) => {
    setIsSubmitting(true);
    try {
      // TODO: Integrate with newsletter API
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      toast.success(t('success.newsletter'));
      form.reset();
    } catch (error) {
      toast.error(t('errors.coursesLoad'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Contacts"
        description="Get in touch with ARES. Contact us for support, questions, or partnership opportunities. Join our newsletter for updates and new courses."
      />
      <Header />

      <main className="flex-1 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4 py-20">
          <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto items-center">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="flex items-center gap-4 mb-12">
                <Dumbbell className="h-16 w-16" />
                <h1 className="text-4xl font-bold">ARES</h1>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Contacts:</h3>
                  <p>+123-456-78-90</p>
                  <p>+123-456-78-90</p>
                  <p>email123@mail.mail</p>
                </div>

                <div>
                  <p>Inst: myinstforyou</p>
                  <p>tel: mytellforyou</p>
                  <p>twit: mytwittforyou</p>
                </div>
              </div>
            </div>

            {/* Newsletter Form */}
            <div>
              <h2 className="text-4xl font-bold mb-6">{t('contacts.newsletter.title')}</h2>
              <p className="mb-8 text-primary-foreground/90">
                {t('contacts.newsletter.description')}
              </p>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-primary-foreground">{t('contacts.newsletter.email')}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t('contacts.newsletter.placeholder')}
                            className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-primary-foreground/80" />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? t('contacts.newsletter.processing') : t('contacts.newsletter.button')}
                  </Button>

                  <p className="text-sm text-primary-foreground/70">
                    {t('contacts.newsletter.disclaimer')}
                  </p>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contacts;
