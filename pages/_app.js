import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "next-themes";
import "@/styles/globals.css";
import { storyblokInit, apiPlugin } from "@storyblok/react";
import Feature from "@/components/storyblok/Feature";
import Grid from "@/components/storyblok/Grid";
import Page from "@/components/storyblok/Page";
import Teaser from "@/components/storyblok/Teaser";
import HeroSection from "@/components/storyblok/HeroSection";
import TextImage from "@/components/storyblok/TextImage";
import ImageOnly from "@/components/storyblok/ImageOnly";

const components = {
  feature: Feature,
  grid: Grid,
  teaser: Teaser,
  page: Page,
  "hero-section": HeroSection,
  "text-image": TextImage,
  "image-only": ImageOnly,
};
 
storyblokInit({
  accessToken: "ORL6lMnDrsB8kQZ6dmQSgAtt",
  use: [apiPlugin],
  components,
});

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      {/* <AuthProvider> */}
        <Component {...pageProps} />
      {/* </AuthProvider> */}
    </ThemeProvider>
  );
}
