"use client";

interface OrganizationData {
    name: string;
    url: string;
    logo: string;
    description: string;
    address?: {
        streetAddress: string;
        addressLocality: string;
        addressRegion: string;
        postalCode: string;
        addressCountry: string;
    };
    contactPoint?: {
        telephone: string;
        contactType: string;
        email: string;
    };
    sameAs?: string[];
}

interface CourseData {
    name: string;
    description: string;
    provider: string;
    url: string;
    image?: string;
    price?: number;
    currency?: string;
    availability?: string;
    instructor?: {
        name: string;
        url: string;
    };
}

interface TutorData {
    name: string;
    description: string;
    url: string;
    image?: string;
    jobTitle: string;
    worksFor: string;
    knowsAbout: string[];
    sameAs?: string[];
}

interface ReviewData {
    author: string;
    reviewBody: string;
    reviewRating: {
        ratingValue: number;
        bestRating: number;
    };
    datePublished: string;
}

export const generateOrganizationSchema = (data: OrganizationData) => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: data.name,
    url: data.url,
    logo: data.logo,
    description: data.description,
    ...(data.address && {
        address: {
            "@type": "PostalAddress",
            ...data.address,
        },
    }),
    ...(data.contactPoint && {
        contactPoint: {
            "@type": "ContactPoint",
            ...data.contactPoint,
        },
    }),
    ...(data.sameAs && { sameAs: data.sameAs }),
});

export const generateCourseSchema = (data: CourseData) => ({
    "@context": "https://schema.org",
    "@type": "Course",
    name: data.name,
    description: data.description,
    provider: {
        "@type": "Organization",
        name: data.provider,
    },
    url: data.url,
    ...(data.image && { image: data.image }),
    ...(data.price && {
        offers: {
            "@type": "Offer",
            price: data.price,
            priceCurrency: data.currency || "VND",
            availability: data.availability || "https://schema.org/InStock",
        },
    }),
    ...(data.instructor && {
        instructor: {
            "@type": "Person",
            name: data.instructor.name,
            url: data.instructor.url,
        },
    }),
});

export const generateTutorSchema = (data: TutorData) => ({
    "@context": "https://schema.org",
    "@type": "Person",
    name: data.name,
    description: data.description,
    url: data.url,
    ...(data.image && { image: data.image }),
    jobTitle: data.jobTitle,
    worksFor: {
        "@type": "Organization",
        name: data.worksFor,
    },
    knowsAbout: data.knowsAbout,
    ...(data.sameAs && { sameAs: data.sameAs }),
});

export const generateReviewSchema = (reviews: ReviewData[]) => ({
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    ratingValue: reviews.reduce((sum, review) => sum + review.reviewRating.ratingValue, 0) / reviews.length,
    reviewCount: reviews.length,
    bestRating: 5,
    worstRating: 1,
});

export const generateBreadcrumbSchema = (items: { name: string; url: string }[]) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url,
    })),
});

export const generateFAQSchema = (faqs: { question: string; answer: string }[]) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
        },
    })),
});
