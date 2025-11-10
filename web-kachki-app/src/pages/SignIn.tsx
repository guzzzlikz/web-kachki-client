import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { SEO } from "@/components/SEO";
import { AnimatedButton } from "@/components/AnimatedButton";
import { useAuth } from "@/contexts/AuthContext";
import { LoginData } from "@/types";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const signInSchema = z.object({
  email: z.string().email("Невірний формат email"),
  password: z.string().min(6, "Пароль повинен містити мінімум 6 символів"),
});

type SignInForm = z.infer<typeof signInSchema>;

const SignIn = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInForm) => {
    setIsLoading(true);
    try {
      await login({
        email: data.email,
        password: data.password,
      });
      navigate("/");
    } catch (error) {
      // Error is handled by AuthContext
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO title="Sign In" description="Sign in to your ARES account to access your courses and continue your fitness journey." />
      <Header />

      <main className="flex-1 bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md"
        >
          <Card className="w-full">
            <CardHeader>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <CardTitle className="text-3xl font-bold text-center">{t('auth.signIn.title')}</CardTitle>
              </motion.div>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('auth.signIn.login')}</FormLabel>
                          <FormControl>
                            <motion.div
                              whileFocus={{ scale: 1.02 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Input 
                                type="email"
                                placeholder="Example@mail.example" 
                                autoComplete="email"
                                {...field} 
                              />
                            </motion.div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('auth.signIn.password')}</FormLabel>
                          <FormControl>
                            <motion.div
                              whileFocus={{ scale: 1.02 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Input 
                                type="password" 
                                placeholder="••••••••••••••••" 
                                autoComplete="current-password"
                                {...field} 
                              />
                            </motion.div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <AnimatedButton type="submit" className="w-full" size="lg" disabled={isLoading}>
                      {isLoading ? t('auth.signIn.processing') : t('auth.signIn.button')}
                    </AnimatedButton>
                  </motion.div>

                  <motion.p
                    className="text-center text-sm text-muted-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {t('auth.signIn.noAccount')}{" "}
                    <motion.span whileHover={{ scale: 1.05 }} className="inline-block">
                      <Link to="/sign-up" className="text-primary hover:underline font-medium">
                        {t('auth.signIn.signUp')}
                      </Link>
                    </motion.span>
                  </motion.p>
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default SignIn;
