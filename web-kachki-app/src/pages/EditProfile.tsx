import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { SEO } from "@/components/SEO";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { 
  changeName, 
  changeDescription, 
  changeInstagram, 
  changeFacebook, 
  changeLinkedIn, 
  changeTelegram 
} from "@/api/account";
import { uploadPhoto } from "@/api/photo";
import { Camera, X, Loader2, Save, ArrowLeft } from "lucide-react";

const profileSchema = z.object({
  name: z.string().min(2, "Ім'я повинно містити мінімум 2 символи").max(50, "Ім'я занадто довге"),
  description: z.string().max(500, "Опис занадто довгий").optional(),
  instagram: z.string().url("Невірний URL").or(z.literal("")).optional(),
  facebook: z.string().url("Невірний URL").or(z.literal("")).optional(),
  linkedin: z.string().url("Невірний URL").or(z.literal("")).optional(),
  telegram: z.string().url("Невірний URL").or(z.literal("")).optional(),
});

type ProfileForm = z.infer<typeof profileSchema>;

const EditProfile = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, refreshUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      description: user?.description || "",
      instagram: user?.contacts?.instUrl || "",
      facebook: user?.contacts?.facebookUrl || "",
      linkedin: user?.contacts?.linkedInUrl || "",
      telegram: user?.contacts?.telegramUrl || "",
    },
  });

  // Оновлюємо форму коли user змінюється
  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name || "",
        description: user.description || "",
        instagram: user.contacts?.instUrl || "",
        facebook: user.contacts?.facebookUrl || "",
        linkedin: user.contacts?.linkedInUrl || "",
        telegram: user.contacts?.telegramUrl || "",
      });
      setAvatarPreview(user.pathToPhoto || null);
    }
  }, [user, form]);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user?.id) return;

    // Перевірка типу файлу
    if (!file.type.startsWith('image/')) {
      toast.error('Будь ласка, виберіть зображення');
      return;
    }

    // Перевірка розміру файлу (макс 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Розмір файлу не повинен перевищувати 5MB');
      return;
    }

    // Створюємо preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Завантажуємо на сервер
    setIsUploadingPhoto(true);
    try {
      const updatedUser = await uploadPhoto(user.id, file);
      await refreshUser();
      toast.success('Аватар успішно оновлено!');
    } catch (error: any) {
      toast.error(error.message || 'Помилка завантаження аватара');
      setAvatarPreview(user.pathToPhoto || null);
    } finally {
      setIsUploadingPhoto(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const onSubmit = async (data: ProfileForm) => {
    if (!user?.id) return;

    setIsLoading(true);
    try {
      // Оновлюємо ім'я
      if (data.name !== user.name) {
        await changeName(user.id, data.name);
      }

      // Оновлюємо опис
      if (data.description !== (user.description || "")) {
        await changeDescription(user.id, data.description || "");
      }

      // Оновлюємо соціальні мережі
      if (data.instagram !== (user.contacts?.instUrl || "")) {
        await changeInstagram(user.id, data.instagram || "");
      }

      if (data.facebook !== (user.contacts?.facebookUrl || "")) {
        await changeFacebook(user.id, data.facebook || "");
      }

      if (data.linkedin !== (user.contacts?.linkedInUrl || "")) {
        await changeLinkedIn(user.id, data.linkedin || "");
      }

      if (data.telegram !== (user.contacts?.telegramUrl || "")) {
        await changeTelegram(user.id, data.telegram || "");
      }

      // Оновлюємо дані користувача
      await refreshUser();
      toast.success('Профіль успішно оновлено!');
      navigate('/account');
    } catch (error: any) {
      toast.error(error.message || 'Помилка оновлення профілю');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p>Завантаження...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Edit Profile" 
        description="Edit your ARES profile information, avatar, and social media links."
      />
      <Header />

      <main className="flex-1 bg-gradient-to-br from-primary/20 to-primary/10 py-12 px-4">
        <div className="container max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/account')}
                className="rounded-full"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold">Редагування профілю</h1>
                <p className="text-muted-foreground">Оновіть інформацію про себе</p>
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Avatar Section */}
                <Card>
                  <CardHeader>
                    <CardTitle>Аватар</CardTitle>
                    <CardDescription>
                      Завантажте зображення профілю. Рекомендований розмір: 400x400px, макс. 5MB
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-6">
                      <div className="relative">
                        <Avatar className="w-32 h-32">
                          <AvatarImage 
                            src={avatarPreview || user.pathToPhoto} 
                            alt={user.name} 
                          />
                          <AvatarFallback className="text-3xl">
                            {user.name?.charAt(0).toUpperCase() || "U"}
                          </AvatarFallback>
                        </Avatar>
                        {isUploadingPhoto && (
                          <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                            <Loader2 className="h-8 w-8 animate-spin text-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 space-y-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleAvatarClick}
                          disabled={isUploadingPhoto}
                          className="w-full sm:w-auto"
                        >
                          <Camera className="h-4 w-4 mr-2" />
                          {isUploadingPhoto ? 'Завантаження...' : 'Змінити аватар'}
                        </Button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarChange}
                          className="hidden"
                        />
                        <p className="text-sm text-muted-foreground">
                          JPG, PNG або GIF. Максимальний розмір: 5MB
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Basic Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Основна інформація</CardTitle>
                    <CardDescription>
                      Ваше ім'я та опис профілю
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ім'я</FormLabel>
                          <FormControl>
                            <Input placeholder="Ваше ім'я" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Опис</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Розкажіть про себе..."
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Максимум 500 символів
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Social Media */}
                <Card>
                  <CardHeader>
                    <CardTitle>Соціальні мережі</CardTitle>
                    <CardDescription>
                      Додайте посилання на ваші профілі в соціальних мережах
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="instagram"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Instagram</FormLabel>
                          <FormControl>
                            <Input 
                              type="url"
                              placeholder="https://instagram.com/yourprofile" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="facebook"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Facebook</FormLabel>
                          <FormControl>
                            <Input 
                              type="url"
                              placeholder="https://facebook.com/yourprofile" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="linkedin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>LinkedIn</FormLabel>
                          <FormControl>
                            <Input 
                              type="url"
                              placeholder="https://linkedin.com/in/yourprofile" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="telegram"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telegram</FormLabel>
                          <FormControl>
                            <Input 
                              type="url"
                              placeholder="https://t.me/yourprofile" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Actions */}
                <div className="flex gap-4 justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/account')}
                    disabled={isLoading}
                  >
                    Скасувати
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading || isUploadingPhoto}
                    className="min-w-[120px]"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Збереження...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Зберегти
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EditProfile;

