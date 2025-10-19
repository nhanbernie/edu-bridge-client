"use client";

import Head from "next/head";

interface SEOHeadProps {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
    type?: "website" | "article" | "profile";
    author?: string;
    publishedTime?: string;
    modifiedTime?: string;
    section?: string;
    tags?: string[];
    locale?: string;
    alternateLocales?: { locale: string; url: string }[];
    noindex?: boolean;
    nofollow?: boolean;
    canonical?: string;
    structuredData?: any;
}

const SEOHead: React.FC<SEOHeadProps> = ({
    title = "EduBridge - Kết nối học viên và gia sư chất lượng",
    description = "Nền tảng kết nối học viên với gia sư chất lượng cao. Học tập hiệu quả với các khóa học được thiết kế riêng cho từng học viên.",
    keywords = "gia sư, học viên, giáo dục, học tập, khóa học, trực tuyến, online learning, tutor, student",
    image = "/images/edubridge-og-image.jpg",
    url,
    type = "website",
    author = "EduBridge",
    publishedTime,
    modifiedTime,
    section,
    tags = [],
    locale = "vi_VN",
    alternateLocales = [],
    noindex = false,
    nofollow = false,
    canonical,
    structuredData,
}) => {
    const fullTitle = title.includes("EduBridge") ? title : `${title} | EduBridge`;
    const fullUrl = url ? `https://edubridge.com${url}` : "https://edubridge.com";
    const fullImage = image.startsWith("http") ? image : `https://edubridge.com${image}`;

    return (
        <Head>
            {/* Basic Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content={author} />
            <meta name="robots" content={`${noindex ? "noindex" : "index"},${nofollow ? "nofollow" : "follow"}`} />

            {/* Canonical URL */}
            {canonical && <link rel="canonical" href={canonical} />}

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={fullImage} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:site_name" content="EduBridge" />
            <meta property="og:locale" content={locale} />

            {/* Article specific */}
            {type === "article" && (
                <>
                    {publishedTime && <meta property="article:published_time" content={publishedTime} />}
                    {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
                    {author && <meta property="article:author" content={author} />}
                    {section && <meta property="article:section" content={section} />}
                    {tags.map((tag, index) => (
                        <meta key={index} property="article:tag" content={tag} />
                    ))}
                </>
            )}

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={fullImage} />
            <meta name="twitter:site" content="@edubridge" />
            <meta name="twitter:creator" content="@edubridge" />

            {/* Additional Meta Tags */}
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="theme-color" content="#1EB5E5" />
            <meta name="msapplication-TileColor" content="#1EB5E5" />

            {/* Language and Locale */}
            <meta httpEquiv="content-language" content={locale.split("_")[0]} />
            {alternateLocales.map((alt) => (
                <link key={alt.locale} rel="alternate" hrefLang={alt.locale} href={alt.url} />
            ))}

            {/* Structured Data */}
            {structuredData && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(structuredData),
                    }}
                />
            )}
        </Head>
    );
};

export default SEOHead;
