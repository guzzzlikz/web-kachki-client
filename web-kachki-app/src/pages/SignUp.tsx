import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { SEO } from "@/components/SEO";
import { AnimatedButton } from "@/components/AnimatedButton";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const signUpSchema = z
  .object({
    username: z.string().min(3, "Ім'я користувача повинно містити мінімум 3 символи"),
    email: z.string().email("Невірний формат email"),
    password: z.string().min(6, "Пароль повинен містити мінімум 6 символів"),
    confirmPassword: z.string(),
    userType: z.enum(["user", "trainer"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Паролі не співпадають",
    path: ["confirmPassword"],
  });

type SignUpForm = z.infer<typeof signUpSchema>;

const SignUp = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      userType: "user",
    },
  });

  const onSubmit = async (data: SignUpForm) => {
    setIsLoading(true);
    try {
      await register({
        email: data.email,
        name: data.username,
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
      <SEO title="Sign Up" description="Create your ARES account to start your fitness journey. Join our community of dedicated athletes." />
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
                <CardTitle className="text-3xl font-bold text-center">{t('auth.signUp.title')}</CardTitle>
              </motion.div>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {[
                    { name: 'username', labelKey: 'auth.signUp.name', placeholder: 'Example', delay: 0.2 },
                    { name: 'email', labelKey: 'auth.signUp.email', placeholder: 'Example@mail.example', delay: 0.3 },
                    { name: 'password', labelKey: 'auth.signUp.password', placeholder: '••••••••••••••••', delay: 0.4, type: 'password' },
                    { name: 'confirmPassword', labelKey: 'auth.signUp.confirmPassword', placeholder: '••••••••••••••••', delay: 0.5, type: 'password' },
                  ].map(({ name, labelKey, placeholder, delay, type }) => (
                    <motion.div
                      key={name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay }}
                    >
                      <FormField
                        control={form.control}
                        name={name as any}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t(labelKey as any)}</FormLabel>
                            <FormControl>
                              <motion.div
                                whileFocus={{ scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                              >
                                <Input type={type || 'text'} placeholder={placeholder} {...field} />
                              </motion.div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                  ))}

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <FormField
                      control={form.control}
                      name="userType"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              value={field.value}
                              className="flex gap-4"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="user" id="user" />
                                <FormLabel htmlFor="user" className="cursor-pointer">
                                  {t('auth.signUp.user')}
                                </FormLabel>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="trainer" id="trainer" />
                                <FormLabel htmlFor="trainer" className="cursor-pointer">
                                  {t('auth.signUp.trainer')}
                                </FormLabel>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <AnimatedButton type="submit" className="w-full" size="lg" disabled={isLoading}>
                      {isLoading ? t('auth.signUp.processing') : t('auth.signUp.button')}
                    </AnimatedButton>
                  </motion.div>

                  <motion.p
                    className="text-center text-sm text-muted-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    {t('auth.signUp.hasAccount')}{" "}
                    <motion.span whileHover={{ scale: 1.05 }} className="inline-block">
                      <Link to="/sign-in" className="text-primary hover:underline font-medium">
                        {t('auth.signUp.signIn')}
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

export default SignUp;
