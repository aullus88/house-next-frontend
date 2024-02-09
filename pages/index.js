import Layout from "@/components/Layout";
import Head from "next/head"
import Layout2 from "@/components/storyblok/Layout2";

import { getStoryblokApi, StoryblokComponent, useStoryblokState } from "@storyblok/react"


export default function HomePage({story}) {
  story = useStoryblokState(story)
  return (
    <>
    <div >
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout2>
        <StoryblokComponent blok={story.content} />
      </Layout2>
 
      {/* <header>
        <h1 className="border border-red-400 text-white">
          { props.story ? props.story.name : 'My Site' }
        </h1>
      </header>

      <StoryblokComponent blok={props.story.content} /> */}
 
      <main>
        
      </main>
    </div>
    {/* <Layout>

    </Layout> */}
    
    </>
  );
}

export async function getStaticProps() {
  // home is the default slug for the homepage in Storyblok
  let slug = "home";
 
  // load the draft version
  let sbParams = {
    version: "draft", // or 'published'
  };
 
  const storyblokApi = getStoryblokApi();
  let { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);
 
  return {
    props: {
      story: data ? data.story : false,
      key: data ? data.story.id : false,
    },
    revalidate: 3600, // revalidate every hour
  };
}
