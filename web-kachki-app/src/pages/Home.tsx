import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { ChevronRight, ChevronLeft, Star } from "lucide-react";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import CourseCard from "@/components/CourseCard";
import { SEO } from "@/components/SEO";
import { StructuredData, createWebSiteSchema, createOrganizationSchema } from "@/components/StructuredData";
import { ScrollReveal } from "@/components/ScrollReveal";
import { AnimatedButton } from "@/components/AnimatedButton";
import { useCourses } from "@/hooks/useCourses";
import { toast } from "sonner";
import { useState } from "react";
import heroRunner from "@/assets/hero-runner.jpg";
import gymTraining from "@/assets/gym-training.jpg";
import trainerPortrait from "@/assets/trainer-portrait.jpg";

const newsletterSchema = z.object({
  email: z.string().email("Невірний формат email"),
});

type NewsletterForm = z.infer<typeof newsletterSchema>;

const Home = () => {
  const { t } = useTranslation();
  const { data: courses, isLoading: coursesLoading } = useCourses();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<NewsletterForm>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleNewsletterSubmit = async (data: NewsletterForm) => {
    setIsSubmitting(true);
    try {
      // TODO: Integrate with newsletter API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success(t('success.newsletter'));
      form.reset();
    } catch (error) {
      toast.error(t('errors.coursesLoad'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const coaches = [
    { id: "1", name: "Human anatomy", description: "Advanced biomechanics analysis. Optimized movement patterns for peak performance.", image: trainerPortrait },
    { id: "2", name: "Human anatomy", description: "Advanced biomechanics analysis. Optimized movement patterns for peak performance.", image: trainerPortrait },
    { id: "3", name: "Human anatomy", description: "Advanced biomechanics analysis. Optimized movement patterns for peak performance.", image: trainerPortrait },
    { id: "4", name: "Human anatomy", description: "Advanced biomechanics analysis. Optimized movement patterns for peak performance.", image: trainerPortrait },
  ];

  const websiteSchema = createWebSiteSchema({
    name: 'ARES',
    url: typeof window !== 'undefined' ? window.location.origin : '',
    description: 'Premier destination for fitness excellence. World-class trainers, innovative workout programs.',
  });

  const organizationSchema = createOrganizationSchema({
    name: 'ARES',
    url: typeof window !== 'undefined' ? window.location.origin : '',
    description: 'Movement is LIFE - Your fitness journey starts here',
    logo: typeof window !== 'undefined' ? `${window.location.origin}/logo.png` : undefined,
  });

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="ARES - Movement is LIFE"
        description="Discover our most popular fitness programs designed by expert trainers. Join our community of dedicated athletes and transform your fitness journey."
      />
      <StructuredData data={websiteSchema} />
      <StructuredData data={organizationSchema} />
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-20 px-4 overflow-hidden">
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <motion.h1
              className="text-5xl md:text-6xl font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Movement is
              <br />
              <motion.span
                className="text-accent"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                LIFE
              </motion.span>
            </motion.h1>
            <motion.div
              className="flex gap-4 flex-wrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <AnimatedButton variant="hero" size="lg" asChild>
                <Link to="/courses">{t('home.heroButton1')}</Link>
              </AnimatedButton>
              <AnimatedButton variant="hero-outline" size="lg" asChild>
                <Link to="/courses">{t('home.heroButton2')}</Link>
              </AnimatedButton>
            </motion.div>
          </motion.div>
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.img
              src={heroRunner}
              alt="Athlete running"
              id="woman-running"
              className="rounded-2xl shadow-2xl w-full h-auto"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-20 px-4 bg-secondary">
        <div className="container mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">{t('home.featuredCourses.title')}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t('home.featuredCourses.description')}
              </p>
            </div>
          </ScrollReveal>

          {coursesLoading ? (
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="aspect-video w-full" />
                  <CardContent className="p-6 space-y-2">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : courses && courses.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {courses.slice(0, 3).map((course, index) => (
                <CourseCard key={course.courseId} {...course} index={index} />
              ))}
            </div>
          ) : (
            <ScrollReveal>
              <div className="text-center py-12">
                <p className="text-muted-foreground">{t('courses.notFound')}</p>
              </div>
            </ScrollReveal>
          )}

            <ScrollReveal delay={0.3}>
            <div className="text-center">
              <AnimatedButton size="lg" asChild>
                <Link to="/courses">
                  {t('home.coaches.seeMore')} <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </AnimatedButton>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto">
          <ScrollReveal>
            <h2 className="text-4xl font-bold text-center mb-16">{t('home.whyUs.title')}</h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <ScrollReveal delay={0.1}>
              <motion.div whileHover={{ y: -5, scale: 1.02 }} transition={{ duration: 0.2 }}>
                <Card className="bg-card h-full">
                  <CardContent className="p-8 flex gap-6">
                    <motion.img
                      src={gymTraining}
                      alt="Training"
                      className="w-32 h-32 object-cover rounded-lg flex-shrink-0"
                      whileHover={{ scale: 1.1, rotate: 2 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-accent">{t('home.whyUs.feature1.title')}</h3>
                      <p className="text-muted-foreground text-sm">
                        {t('home.whyUs.feature1.description')}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <motion.div whileHover={{ y: -5, scale: 1.02 }} transition={{ duration: 0.2 }}>
                <Card className="bg-card h-full">
                  <CardContent className="p-8 flex gap-6">
                    <motion.img
                      src={gymTraining}
                      alt="Training"
                      className="w-32 h-32 object-cover rounded-lg flex-shrink-0"
                      whileHover={{ scale: 1.1, rotate: 2 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-accent">{t('home.whyUs.feature2.title')}</h3>
                      <p className="text-muted-foreground text-sm">
                        {t('home.whyUs.feature2.description')}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <motion.div whileHover={{ y: -5, scale: 1.02 }} transition={{ duration: 0.2 }} className="md:col-span-2 md:max-w-2xl md:mx-auto">
                <Card className="bg-card h-full">
                  <CardContent className="p-8 flex gap-6">
                    <motion.img
                      src={gymTraining}
                      alt="Training"
                      className="w-32 h-32 object-cover rounded-lg flex-shrink-0"
                      whileHover={{ scale: 1.1, rotate: 2 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-accent">{t('home.whyUs.feature3.title')}</h3>
                      <p className="text-muted-foreground text-sm">
                        {t('home.whyUs.feature3.description')}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Coaches Section */}
      <section className="py-20 px-4 bg-secondary">
        <div className="container mx-auto">
          <ScrollReveal>
            <h2 className="text-4xl font-bold text-center mb-12">{t('home.coaches.title')}</h2>
          </ScrollReveal>

          <div className="relative">
            <div className="grid md:grid-cols-4 gap-6">
              {coaches.map((coach, index) => (
                <ScrollReveal key={coach.id} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer h-full">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4 mb-4">
                          <motion.img
                            src={coach.image}
                            alt={coach.name}
                            className="w-16 h-16 rounded-lg object-cover"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ duration: 0.3 }}
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold">{coach.name}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-2">{coach.description}</p>
                          </div>
                        </div>
                        <motion.div
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronRight className="ml-auto text-primary" />
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>

            <motion.button
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-background rounded-full p-2 shadow-lg hover:bg-secondary transition-colors hidden md:block"
              whileHover={{ scale: 1.1, x: -2 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="h-6 w-6" />
            </motion.button>
            <motion.button
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-background rounded-full p-2 shadow-lg hover:bg-secondary transition-colors hidden md:block"
              whileHover={{ scale: 1.1, x: 2 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="h-6 w-6" />
            </motion.button>
          </div>

          <ScrollReveal delay={0.4}>
            <div className="text-center mt-12">
              <AnimatedButton size="lg" asChild>
                <Link to="/courses">
                  {t('home.coaches.seeMore')} <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </AnimatedButton>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto max-w-2xl text-center">
          <ScrollReveal>
            <h2 className="text-4xl font-bold mb-6">{t('home.newsletter.title')}</h2>
            <p className="mb-8 text-primary-foreground/90">
              {t('home.newsletter.description')}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleNewsletterSubmit)}
                className="flex gap-4 max-w-md mx-auto"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <motion.div
                          whileFocus={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Input
                            type="email"
                            placeholder={t('home.newsletter.placeholder')}
                            className="flex-1 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
                            {...field}
                          />
                        </motion.div>
                      </FormControl>
                      <FormMessage className="text-primary-foreground/80 text-sm" />
                    </FormItem>
                  )}
                />
                <AnimatedButton type="submit" variant="hero" disabled={isSubmitting}>
                  {isSubmitting ? "..." : t('home.newsletter.button')}
                </AnimatedButton>
              </form>
            </Form>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <p className="mt-4 text-sm text-primary-foreground/70">
              {t('home.newsletter.disclaimer')}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
