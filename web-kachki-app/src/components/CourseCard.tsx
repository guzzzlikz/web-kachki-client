import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface CourseCardProps {
  id?: string;
  courseId?: number;
  title: string;
  description: string;
  image?: string;
  pathToPreviewPhoto?: string;
  linkTo?: string;
  index?: number;
}

const CourseCard = ({ id, courseId, title, description, image, pathToPreviewPhoto, linkTo, index = 0 }: CourseCardProps) => {
  const courseIdentifier = courseId?.toString() || id || '';
  const imageUrl = pathToPreviewPhoto || image || '/placeholder.svg';
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -8 }}
      className="h-full"
    >
      <Card className="overflow-hidden h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
        <motion.div
          className="aspect-video overflow-hidden"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        </motion.div>
        <CardContent className="p-6">
          <motion.h3
            className="text-xl font-semibold mb-2 text-accent"
            whileHover={{ color: "hsl(var(--accent))" }}
            transition={{ duration: 0.2 }}
          >
            {title}
          </motion.h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
        </CardContent>
        <CardFooter className="p-6 pt-0">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full"
          >
            <Button asChild variant="outline" className="w-full">
              <Link to={linkTo || `/course/${courseIdentifier}`}>{t('courses.learnMore')}</Link>
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default CourseCard;
