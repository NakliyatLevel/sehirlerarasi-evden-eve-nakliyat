import { getSiteSettings } from '@/lib/settings'

export async function generateLocalBusinessSchema() {
  const settings = await getSiteSettings()

  return {
    '@context': 'https://schema.org',
    '@type': 'MovingCompany',
    name: settings.company_name || settings.site_title,
    description: settings.seo_description,
    url: settings.domain || process.env.NEXT_PUBLIC_SITE_URL,
    telephone: settings.phone,
    email: settings.email,
    address: settings.address ? {
      '@type': 'PostalAddress',
      streetAddress: settings.address,
    } : undefined,
    priceRange: '$$',
    areaServed: {
      '@type': 'Country',
      name: 'Turkey',
    },
  }
}

export function generateReviewSchema(reviews: any[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: reviews.map((review, index) => ({
      '@type': 'Review',
      position: index + 1,
      author: {
        '@type': 'Person',
        name: review.name,
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating,
        bestRating: 5,
        worstRating: 1,
      },
      reviewBody: review.comment,
      datePublished: review.createdAt,
    })),
  }
}

export function generateFAQSchema(faqs: any[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function generateBlogPostSchema(post: any, settings: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt || post.seoDesc,
    image: post.image,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Organization',
      name: settings.company_name || settings.site_title,
    },
    publisher: {
      '@type': 'Organization',
      name: settings.company_name || settings.site_title,
      logo: {
        '@type': 'ImageObject',
        url: settings.logo_url,
      },
    },
  }
}
