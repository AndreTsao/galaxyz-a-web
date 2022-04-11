import { useEffect } from "react";
import Head from "next/head";
import Intro from "../components/Intro";
import Gallery from "../components/Gallery";
import FAQ from "../components/FAQ";
import Mint from "../components/Mint";
import Roadmap from "../components/Roadmap";
import BottomPart from "../components/BottomPart";

export default function Home() {
  useEffect(() => {
    if (window.console) {
      console.log(
        "%c Hello,I am botty",
        "font-size: 20px;"
      );
    }
  }, []);

  return (
    <div style={{background: "black",display:"flex",flexDirection:"column",justifyContent:"center"}}>
      <Head>
        <title>Botty NFT - Enter metaverse </title>
        <meta name="description" content="The limit is 1000" />
        <link rel="icon" href="/favicon.png" />

        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
      </Head>
      <Intro/>
      <Mint/>
      <Gallery/>
      <Roadmap/>
      <FAQ/>
      <BottomPart/>
    </div>
  );
}
