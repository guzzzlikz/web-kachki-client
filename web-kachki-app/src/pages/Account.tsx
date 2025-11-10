import { Link } from "react-router-dom";
import { ChevronRight, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { SEO } from "@/components/SEO";
import { useAuth } from "@/contexts/AuthContext";
import { useUserCourses } from "@/hooks/useCourses";
import { deleteUser } from "@/api/users";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { data: userCourses, isLoading } = useUserCourses();

  const handleDeleteProfile = async () => {
    if (window.confirm(t('account.deleteConfirm'))) {
      try {
        await deleteUser();
        await logout();
        toast.success(t('success.delete'));
        navigate("/");
      } catch (error: any) {
        toast.error(error.message || t('errors.profileDelete'));
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title={user ? `${user.name}'s Account` : "Account"} 
        description="Manage your ARES account, view your courses, and update your profile settings."
      />
      <Header />

      <main className="flex-1 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Profile Section */}
            <Card className="bg-card md:col-span-1">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <Avatar className="w-32 h-32">
                    <AvatarImage src={user?.pathToPhoto} alt={user?.name} />
                    <AvatarFallback className="text-2xl">
                      {user?.name?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <Button 
                    size="icon" 
                    variant="ghost"
                    asChild
                  >
                    <Link to="/account/edit">
                      <Edit className="h-5 w-5" />
                    </Link>
                  </Button>
                </div>

                <h2 className="text-2xl font-bold mb-1">{user?.name || "User"}</h2>
                <p className="text-xl mb-4 text-muted-foreground">
                  {user?.email}
                </p>
                {user?.description && (
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">{user.description}</p>
                )}

                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{t('account.contacts')}</p>
                    {user?.email && <p className="text-sm">{user.email}</p>}
                  </div>
                  {(user?.contacts?.instUrl || user?.contacts?.telegramUrl || user?.contacts?.facebookUrl || user?.contacts?.linkedInUrl) && (
                    <div>
                      {user.contacts.instUrl && <p className="text-sm">Inst: {user.contacts.instUrl}</p>}
                      {user.contacts.telegramUrl && <p className="text-sm">Tel: {user.contacts.telegramUrl}</p>}
                      {user.contacts.facebookUrl && <p className="text-sm">FB: {user.contacts.facebookUrl}</p>}
                      {user.contacts.linkedInUrl && <p className="text-sm">LI: {user.contacts.linkedInUrl}</p>}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Courses Section */}
            <div className="md:col-span-2">
              <Tabs defaultValue="contacts" className="w-full">
                <TabsList className="bg-card/50 mb-6">
                  <TabsTrigger value="contacts">{t('account.contacts')}</TabsTrigger>
                  <TabsTrigger value="courses">{t('account.myCourses')}</TabsTrigger>
                </TabsList>

                <TabsContent value="contacts" className="space-y-4">
                  <Card className="bg-card">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-2">Email</p>
                          <p className="text-sm">{user?.email || 'Не вказано'}</p>
                        </div>
                        {(user?.contacts?.instUrl || user?.contacts?.telegramUrl || user?.contacts?.facebookUrl || user?.contacts?.linkedInUrl) ? (
                          <div className="space-y-3">
                            <p className="text-sm font-medium text-muted-foreground mb-2">Соціальні мережі</p>
                            {user.contacts.instUrl && (
                              <div>
                                <p className="text-xs text-muted-foreground mb-1">Instagram</p>
                                <a 
                                  href={user.contacts.instUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-sm text-primary hover:underline break-all"
                                >
                                  {user.contacts.instUrl}
                                </a>
                              </div>
                            )}
                            {user.contacts.facebookUrl && (
                              <div>
                                <p className="text-xs text-muted-foreground mb-1">Facebook</p>
                                <a 
                                  href={user.contacts.facebookUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-sm text-primary hover:underline break-all"
                                >
                                  {user.contacts.facebookUrl}
                                </a>
                              </div>
                            )}
                            {user.contacts.linkedInUrl && (
                              <div>
                                <p className="text-xs text-muted-foreground mb-1">LinkedIn</p>
                                <a 
                                  href={user.contacts.linkedInUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-sm text-primary hover:underline break-all"
                                >
                                  {user.contacts.linkedInUrl}
                                </a>
                              </div>
                            )}
                            {user.contacts.telegramUrl && (
                              <div>
                                <p className="text-xs text-muted-foreground mb-1">Telegram</p>
                                <a 
                                  href={user.contacts.telegramUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-sm text-primary hover:underline break-all"
                                >
                                  {user.contacts.telegramUrl}
                                </a>
                              </div>
                            )}
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground">
                            Соціальні мережі не додані. 
                            <Link to="/account/edit" className="text-primary hover:underline ml-1">
                              Додати
                            </Link>
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="courses" className="space-y-4">
                  {isLoading ? (
                    <div className="space-y-4">
                      {[...Array(3)].map((_, i) => (
                        <Card key={i} className="bg-card">
                          <CardContent className="p-6 flex gap-6 items-start">
                            <Skeleton className="w-24 h-24 rounded-lg flex-shrink-0" />
                            <div className="flex-1 space-y-2">
                              <Skeleton className="h-6 w-3/4" />
                              <Skeleton className="h-4 w-full" />
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : userCourses && userCourses.length > 0 ? (
                    userCourses.map((course) => (
                      <Card key={course.courseId} className="bg-card hover:shadow-lg transition-shadow">
                        <CardContent className="p-6 flex gap-6 items-start">
                          <img
                            src={course.pathToPreviewPhoto || '/placeholder.svg'}
                            alt={course.title}
                            className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
                          />
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                            <p className="text-muted-foreground text-sm">{course.description}</p>
                          </div>
                          <Button size="icon" variant="ghost" asChild>
                            <Link to={`/course/${course.courseId}`}>
                              <ChevronRight className="h-6 w-6" />
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <Card className="bg-card">
                      <CardContent className="p-6">
                        <p className="text-muted-foreground">{t('account.noCourses')}</p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
              </Tabs>

              <div className="mt-8 flex gap-4">
                <Button variant="hero" size="lg">
                  Create new course
                </Button>
                <Button variant="destructive" size="lg" onClick={handleDeleteProfile}>
                  {t('account.deleteAccount')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Account;
