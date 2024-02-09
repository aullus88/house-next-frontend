import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
 
const Page = ({ blok }) => (
  <main className="text-center mt-4 bg-white"{...storyblokEditable(blok)}>
    {blok.body.map((nestedBlok) => (
      <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
    ))}
    {/* <p>oi</p> */}
  </main>
);
 
export default Page;