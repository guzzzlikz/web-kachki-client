import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { SEO } from "@/components/SEO";
import { StructuredData, createCourseSchema } from "@/components/StructuredData";
import { ScrollReveal } from "@/components/ScrollReveal";
import { AnimatedButton } from "@/components/AnimatedButton";
import { useCourse } from "@/hooks/useCourses";
import { buyCourse } from "@/api/courses";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { useState } from "react";

const CourseDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { user } = useAuth();
  const { data: course, isLoading, error } = useCourse(id, user?.id);
  const { isAuthenticated } = useAuth();
  const [isPurchasing, setIsPurchasing] = useState(false);

  const handlePurchase = async () => {
    if (!isAuthenticated || !user?.id) {
      toast.error(t('errors.purchaseFailed'));
      return;
    }

    if (!id) return;

    setIsPurchasing(true);
    try {
      const courseId = parseInt(id);
      await buyCourse(user.id, courseId);
      toast.success(t('success.purchase'));
    } catch (error: any) {
      toast.error(error.message || t('errors.purchaseFailed'));
    } finally {
      setIsPurchasing(false);
    }
  };

  const courseSchema = course
    ? createCourseSchema({
        name: course.title,
        description: course.description,
        image: course.pathToPreviewPhoto || '/placeholder.svg',
        provider: {
          name: 'ARES',
          url: typeof window !== 'undefined' ? window.location.origin : '',
        },
        ...(course.rating && {
          aggregateRating: {
            ratingValue: course.rating,
            reviewCount: course.rates || 0,
          },
        }),
      })
    : null;

  return (
    <div className="min-h-screen flex flex-col">
      {course && (
        <>
          <SEO
            title={course.title}
            description={course.description}
            image={course.image}
            type="article"
          />
          {courseSchema && <StructuredData data={courseSchema} />}
        </>
      )}
      <Header />

      <main className="flex-1 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4 py-16">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <Skeleton className="h-12 w-64 mx-auto mb-12" />
              </motion.div>
            ) : error ? (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <Alert variant="destructive" className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    {error instanceof Error ? error.message : t('errors.courseLoad')}
                  </AlertDescription>
                </Alert>
              </motion.div>
            ) : course ? (
              <motion.div
                key="course"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ScrollReveal>
                  <h1 className="text-5xl font-bold text-center mb-12">{course.title}</h1>
                </ScrollReveal>

                <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                  {/* Course Info Card */}
                  <ScrollReveal delay={0.1}>
                    <motion.div
                      whileHover={{ scale: 1.02, y: -5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card className="bg-card">
                        <CardContent className="p-8">
                          <div className="mb-6">
                            <motion.img
                              src={course.pathToPreviewPhoto || '/placeholder.svg'}
                              alt={course.title}
                              className="w-full h-64 object-cover rounded-lg mb-4"
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.3 }}
                            />
                            {course.creatorName && (
                              <p className="text-sm text-muted-foreground text-center">
                                {t('courseDetail.trainer')}: {course.creatorName}
                              </p>
                            )}
                          </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{t('courseDetail.videos')}</p>
                      <p className="text-2xl font-bold">{course.lessons?.length || 0}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{t('courseDetail.duration')}</p>
                      <p className="text-2xl font-bold">N/A</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Rating</p>
                      <div className="flex items-center gap-1">
                        <p className="text-2xl font-bold">
                          {course.rating ? `${course.rating.toFixed(1)}/5` : "N/A"}
                        </p>
                        {course.rating && (
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-4 w-4 ${
                                  star <= Math.round(course.rating!)
                                    ? "fill-accent text-accent"
                                    : "text-muted-foreground"
                                }`}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{t('courseDetail.level')}</p>
                      <p className="text-2xl font-bold">{course.tagsList?.join(', ') || "N/A"}</p>
                    </div>
                  </div>

                          <div className="pt-4">
                            <p className="text-2xl font-bold text-accent mb-4">
                              {t('courseDetail.free')}
                            </p>
                            <AnimatedButton
                              className="w-full"
                              size="lg"
                              variant="default"
                              onClick={handlePurchase}
                              disabled={isPurchasing}
                            >
                              {isPurchasing ? t('courseDetail.processing') : course.isFree ? t('courseDetail.enroll') : t('courseDetail.buy')}
                            </AnimatedButton>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                  </ScrollReveal>

                  {/* Video Player Card */}
                  <ScrollReveal delay={0.2}>
                    <motion.div
                      whileHover={{ scale: 1.02, y: -5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card className="bg-card">
                        <CardContent className="p-8">
                          <motion.div
                            className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4 cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <div className="text-center">
                              <motion.div
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              >
                                <Play className="h-16 w-16 mx-auto mb-2 text-primary" />
                              </motion.div>
                              <p className="text-muted-foreground">{t('courseDetail.videoPlayer')}</p>
                              <p className="text-sm text-muted-foreground">{t('courseDetail.videoDescription')}</p>
                            </div>
                          </motion.div>

                          <div className="mt-6">
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {course.description}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </ScrollReveal>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CourseDetail;
