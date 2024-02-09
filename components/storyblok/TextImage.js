import { storyblokEditable } from "@storyblok/react";
 
const TextImage = ({ blok }) => {
  return (
    <div className="column text-image border m-2 rounded-3xl bg-[rgb(237,237,237)] h-60" {...storyblokEditable(blok)}>
      <div className="p-6">
          <h1 
          className="mx-auto mb-4 text-2xl font-semibold leading-none tracking-tighter text-neutral-600 lg:text-3xl"
          style={{
            background: 'linear-gradient(to right, black, #7B97AB)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent'
          }}
          >
            {blok.title}</h1>
          <p className=" text-sm tracking-normal font-light leading-4 text-neutral-400 text-[rgb(153, 153, 153)]">{blok.text}</p>
      </div>
  </div>
  );
};
 
export default TextImage;