import fs from "fs";
import path from "path";

export default function getPath() {
  const pagesDir = path.join(process.cwd(), "pages");
  const pageNames = fs.readdirSync(pagesDir);
  const excluded = [
    "_app.tsx",
    "_document.tsx",
    "index.tsx",
    "api",
    "test-component.tsx",
    "jotai.tsx",
  ];

  const filteredPages = pageNames.filter((page) => {
    return !excluded.includes(page);
  });

  const titleCase = (str: string) => {
    return str
      .toLowerCase()
      .split(" ")
      .map(function (word) {
        return word.replace(word[0], word[0].toUpperCase());
      })
      .join(" ");
  };

  const pages = filteredPages.map((page) => {
    return {
      title: titleCase(page.split("-").join(" ")).split(".")[0],
      path: page.split(".")[0],
    };
  });

  return {
    pages,
    // pages: [
    //   {
    //     title: "3 Column Preview Card Component",
    //     path: "3-column-preview-card-component",
    //   },
    //   { title: "Advice Generator App", path: "advice-generator-app" },
    //   { title: "Age Calculator App", path: "age-calculator-app" },
    //   {
    //     title: "Article Preview Component",
    //     path: "article-preview-component",
    //   },
    //   {
    //     title: "Base Apparel Coming Soon",
    //     path: "base-apparel-coming-soon",
    //   },
    //   { title: "Blogr Landing Page", path: "blogr-landing-page" },
    //   { title: "Bookmark Landing Page", path: "bookmark-landing-page" },
    //   { title: "Calculator App", path: "calculator-app" },
    //   {
    //     title: "Chat App Css Illustration",
    //     path: "chat-app-css-illustration",
    //   },
    //   { title: "Clipboard Landing Page", path: "clipboard-landing-page" },
    //   {
    //     title: "Coding Bootcamp Testimonials Slider",
    //     path: "coding-bootcamp-testimonials-slider",
    //   },
    //   {
    //     title: "Crowdfunding Product Page",
    //     path: "crowdfunding-product-page",
    //   },
    //   { title: "Easybank Landing Page", path: "easybank-landing-page" },
    //   { title: "Ecommerce Product Page", path: "ecommerce-product-page" },
    //   {
    //     title: "Expenses Chart Component",
    //     path: "expenses-chart-component",
    //   },
    //   { title: "Faq Accordion Card", path: "faq-accordion-card" },
    //   {
    //     title: "Four Card Feature Section",
    //     path: "four-card-feature-section",
    //   },
    //   {
    //     title: "Fylo Dark Theme Landing Page",
    //     path: "fylo-dark-theme-landing-page",
    //   },
    //   {
    //     title: "Fylo Data Storage Component",
    //     path: "fylo-data-storage-component",
    //   },
    //   {
    //     title: "Fylo Landing Page With Two Column Layout",
    //     path: "fylo-landing-page-with-two-column-layout",
    //   },
    //   {
    //     title: "Huddle Landing Page With Alternating Feature Blocks",
    //     path: "huddle-landing-page-with-alternating-feature-blocks",
    //   },
    //   {
    //     title: "Huddle Landing Page With Curved Sections",
    //     path: "huddle-landing-page-with-curved-sections",
    //   },
    //   {
    //     title: "Huddle Landing Page With Single Introductory Section",
    //     path: "huddle-landing-page-with-single-introductory-section",
    //   },
    //   { title: "Insure Landing Page", path: "insure-landing-page" },
    //   {
    //     title: "Interactive Card Details Form",
    //     path: "interactive-card-details-form",
    //   },
    //   {
    //     title: "Interactive Comments Section",
    //     path: "interactive-comments-section",
    //   },
    //   {
    //     title: "Interactive Pricing Component",
    //     path: "interactive-pricing-component",
    //   },
    //   {
    //     title: "Interactive Rating Component",
    //     path: "interactive-rating-component",
    //   },
    //   {
    //     title: "Intro Component With Signup Form",
    //     path: "intro-component-with-signup-form",
    //   },
    //   {
    //     title: "Intro Section With Dropdown Navigation",
    //     path: "intro-section-with-dropdown-navigation",
    //   },
    //   { title: "Ip Address Tracker", path: "ip-address-tracker" },
    //   { title: "Launch Countdown Timer", path: "launch-countdown-timer" },
    //   {
    //     title: "Loopstudios Landing Page",
    //     path: "loopstudios-landing-page",
    //   },
    //   { title: "Manage Landing Page", path: "manage-landing-page" },
    //   { title: "Multi Step Form", path: "multi-step-form" },
    //   { title: "News Homepage", path: "news-homepage" },
    //   {
    //     title: "Newsletter Sign Up With Success Message",
    //     path: "newsletter-sign-up-with-success-message",
    //   },
    //   {
    //     title: "Nft Preview Card Component",
    //     path: "nft-preview-card-component",
    //   },
    //   { title: "Notifications Page", path: "notifications-page" },
    //   { title: "Order Summary Component", path: "order-summary-component" },
    //   { title: "Ping Coming Soon Page", path: "ping-coming-soon-page" },
    //   {
    //     title: "Pricing Component With Toggle",
    //     path: "pricing-component-with-toggle",
    //   },
    //   {
    //     title: "Product Preview Card Component",
    //     path: "product-preview-card-component",
    //   },
    //   { title: "Profile Card Component", path: "profile-card-component" },
    //   {
    //     title: "Project Tracking Intro Component",
    //     path: "project-tracking-intro-component",
    //   },
    //   { title: "Qr Code Component", path: "qr-code-component" },
    //   {
    //     title: "Rest Countries Api With Color Theme Switcher",
    //     path: "rest-countries-api-with-color-theme-switcher",
    //   },
    //   {
    //     title: "Results Summary Component",
    //     path: "results-summary-component",
    //   },
    //   {
    //     title: "Rock Paper Scissors Bonus",
    //     path: "rock-paper-scissors-bonus",
    //   },
    //   { title: "Rock Paper Scissors", path: "rock-paper-scissors" },
    //   { title: "Room Homepage", path: "room-homepage" },
    //   {
    //     title: "Single Price Grid Component",
    //     path: "single-price-grid-component",
    //   },
    //   {
    //     title: "Social Media Dashboard With Theme Switcher",
    //     path: "social-media-dashboard-with-theme-switcher",
    //   },
    //   { title: "Social Proof Section", path: "social-proof-section" },
    //   { title: "Space Tourism Website", path: "space-tourism-website" },
    //   { title: "Static Job Listings", path: "static-job-listings" },
    //   {
    //     title: "Stats Preview Card Component",
    //     path: "stats-preview-card-component",
    //   },
    //   {
    //     title: "Sunnyside Agency Landing Page",
    //     path: "sunnyside-agency-landing-page",
    //   },
    //   {
    //     title: "Testimonials Grid Section",
    //     path: "testimonials-grid-section",
    //   },
    //   { title: "Time Tracking Dashboard", path: "time-tracking-dashboard" },
    //   { title: "Tip Calculator App", path: "tip-calculator-app" },
    //   { title: "Todo App", path: "todo-app" },
    //   { title: "Url Shortening Api", path: "url-shortening-api" },
    // ],
  };
}
