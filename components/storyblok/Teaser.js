import { storyblokEditable } from "@storyblok/react";
 
const Teaser = ({ blok }) => {
  return (
    <div className="w-full">
      <h2 
        className="text-2xl text-right w-1/3 mr-4 pr-4 ml-auto"
        style={{
          background: 'linear-gradient(to right, black, #7B97AB)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent'
        }}
        {...storyblokEditable(blok)}>{blok.headline}</h2>
    </div>
  )
};
 
export default Teaser;