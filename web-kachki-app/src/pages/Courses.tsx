import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Search, Filter, ChevronRight, Loader2, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { SEO } from "@/components/SEO";
import { ScrollReveal } from "@/components/ScrollReveal";
import { AnimatedButton } from "@/components/AnimatedButton";
import { useCourses } from "@/hooks/useCourses";
import { useDebounce } from "@/hooks/useDebounce";
import { CourseFilters } from "@/types";

const Courses = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [isFree, setIsFree] = useState(searchParams.get("isFree") === "true");
  const [isPaid, setIsPaid] = useState(searchParams.get("isPaid") === "true");

  const debouncedSearch = useDebounce(searchQuery, 300);

  const filters: CourseFilters = {
    search: debouncedSearch || undefined,
  };

  const { data: courses, isLoading, error } = useCourses(filters);

  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedSearch) params.set("search", debouncedSearch);
    if (isFree) params.set("isFree", "true");
    if (isPaid) params.set("isPaid", "true");
    setSearchParams(params, { replace: true });
  }, [debouncedSearch, isFree, isPaid, setSearchParams]);

  const handleFreeToggle = (checked: boolean) => {
    setIsFree(checked);
    if (checked) setIsPaid(false);
  };

  const handlePaidToggle = (checked: boolean) => {
    setIsPaid(checked);
    if (checked) setIsFree(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-secondary">
      <SEO
        title="Courses"
        description="Browse our comprehensive collection of fitness courses. Filter by level, type, and price to find the perfect program for your fitness journey."
      />
      <Header />

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="mb-8">
          <ScrollReveal>
            <h1 className="text-4xl font-bold mb-6">{t('courses.title')}</h1>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="bg-background p-6 rounded-lg shadow-sm mb-6">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium">{t('courses.filters')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="free"
                  checked={isFree}
                  onCheckedChange={(checked) => handleFreeToggle(checked as boolean)}
                />
                <label htmlFor="free" className="text-sm cursor-pointer">
                  {t('courses.free')}
                </label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="paid"
                  checked={isPaid}
                  onCheckedChange={(checked) => handlePaidToggle(checked as boolean)}
                />
                <label htmlFor="paid" className="text-sm cursor-pointer">
                  {t('courses.paid')}
                </label>
              </div>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder={t('courses.search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          </ScrollReveal>
        </div>

        <AnimatePresence mode="wait">
          {isLoading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid md:grid-cols-2 gap-8 mb-12"
            >
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-background rounded-lg p-6 flex gap-6 items-start"
                >
                  <Skeleton className="w-32 h-32 rounded-lg flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {error instanceof Error ? error.message : "Помилка завантаження курсів"}
                </AlertDescription>
              </Alert>
            </motion.div>
          )}

          {!isLoading && !error && courses && (
            <motion.div
              key="courses"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {courses.length === 0 ? (
                <ScrollReveal>
                  <div className="text-center py-12">
                    <p className="text-muted-foreground text-lg">{t('courses.notFound')}</p>
                    <p className="text-muted-foreground text-sm mt-2">
                      {t('courses.notFoundDescription')}
                    </p>
                  </div>
                </ScrollReveal>
              ) : (
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                  {courses.map((course, index) => (
                    <motion.div
                      key={course.courseId}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      whileHover={{ y: -8, scale: 1.02 }}
                      className="bg-background rounded-lg p-6 flex gap-6 items-start hover:shadow-xl transition-all duration-300"
                    >
                      <motion.img
                        src={course.pathToPreviewPhoto || '/placeholder.svg'}
                        alt={course.title}
                        className="w-32 h-32 rounded-lg object-cover flex-shrink-0"
                        whileHover={{ scale: 1.1, rotate: 2 }}
                        transition={{ duration: 0.3 }}
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                          {course.description}
                        </p>
                        <p className="text-primary font-semibold mb-2">
                          {t('courses.free')}
                        </p>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.1, x: 5 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Button size="icon" variant="ghost" asChild>
                          <Link to={`/course/${course.courseId}`}>
                            <ChevronRight className="h-6 w-6" />
                          </Link>
                        </Button>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
};

export default Courses;
