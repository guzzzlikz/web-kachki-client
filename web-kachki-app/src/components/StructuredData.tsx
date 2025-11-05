import { Helmet } from 'react-helmet-async';

interface StructuredDataProps {
  data: Record<string, unknown>;
}

export const StructuredData = ({ data }: StructuredDataProps) => {
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(data)}
      </script>
    </Helmet>
  );
};

// Helper functions for common structured data types
export const createOrganizationSchema = (data: {
  name: string;
  url: string;
  logo?: string;
  description?: string;
  contactPoint?: {
    telephone?: string;
    contactType?: string;
    email?: string;
  };
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: data.name,
  url: data.url,
  ...(data.logo && { logo: data.logo }),
  ...(data.description && { description: data.description }),
  ...(data.contactPoint && {
    contactPoint: {
      '@type': 'ContactPoint',
      ...data.contactPoint,
    },
  }),
});

export const createCourseSchema = (data: {
  name: string;
  description: string;
  image?: string;
  provider?: {
    name: string;
    url: string;
  };
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
  };
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: data.name,
  description: data.description,
  ...(data.image && { image: data.image }),
  ...(data.provider && {
    provider: {
      '@type': 'Organization',
      name: data.provider.name,
      url: data.provider.url,
    },
  }),
  ...(data.aggregateRating && {
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: data.aggregateRating.ratingValue,
      reviewCount: data.aggregateRating.reviewCount,
    },
  }),
});

export const createWebSiteSchema = (data: {
  name: string;
  url: string;
  description?: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: data.name,
  url: data.url,
  ...(data.description && { description: data.description }),
});

