import { storyblokEditable } from "@storyblok/react";
 
const ImageOnly = ({ blok }) => {
  return (
    <div className="column  m-2 rounded-3xl bg-neutral-200" {...storyblokEditable(blok)}>
      <img className="object-cover  w-full  md:h-60 rounded-3xl " src={blok.image?.filename}/>
  </div>
  );
};
 
export default ImageOnly;