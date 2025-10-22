"use client";

import { ReactNode } from "react";
import SEOHead from "./SEOHead";

interface SEOPageProps {
    children: ReactNode;
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

const SEOPage: React.FC<SEOPageProps> = ({
    children,
    ...seoProps
}) => {
    return (
        <>
            <SEOHead {...seoProps} />
            {children}
        </>
    );
};

export default SEOPage;
