import { useEffect } from "react";
import Head from "next/head";
import Intro from "../components/Intro";
import FAQ from "../components/FAQ";
import Mint from "../components/Mint";
import Roadmap from "../components/Roadmap";
import BottomPart from "../components/Footer";
import About from "../components/About";

export default function Home() {
  useEffect(() => {
    if (window.console) {
      console.log(
        "%c Hello,I am Tocabo",
        "font-size: 20px;"
      );
    }
  }, []);

  return (
    <div style={{background: "black",display:"flex",flexDirection:"column",alignItems:"center",paddingBottom:'42px'}}>
      <Head>
        <title>TocaIsland - Enter metaverse </title>
        <meta name="description" content="Tocabo is an exclusive NFT collection of 5555 toucans NFT living on the Ethereum blockchain. Each Tocabo NFT is 1 of 1 based on a combination of multiple random attributes." />
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
      <About/>
      <Roadmap/>
      <FAQ/>
      <BottomPart/>
    </div>
  );
}
