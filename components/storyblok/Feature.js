import { storyblokEditable } from "@storyblok/react";
 
const Feature = ({ blok }) => {
  return (
    <div className="column feature" {...storyblokEditable(blok)}>
      <div className="p-6 border">
          {blok.image ? <img className="object-cover object-center w-full mb-4 lg:h-48 md:h-36 rounded-xl" src={blok.image?.filename}/> : <div className="object-cover object-center w-full mb-8 lg:h-48 md:h-36 rounded-xl" ></div>}
          <h1 className="mx-auto mb-4 text-2xl font-semibold leading-none tracking-tighter text-neutral-600 lg:text-3xl">{blok.name}</h1>
      </div>
  </div>
  );
};
 
export default Feature;