import { useEffect } from "react";
import Head from "next/head";
import initSentry from "../widget/sentryInite"
import Intro from "../components/Intro";
import FAQ from "../components/FAQ";
import Mint from "../components/Mint";
import Roadmap from "../components/Roadmap";
import Footer from "../components/Footer";
import About from "../components/About";
import Gallery from "../components/Gallery";

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
    <div style={{ 
      display: "flex", 
      width: '100%', 
      flexDirection: "column", 
      alignItems: "center",
      paddingBottom: '40px',
       }}>
      <Head>
        <title>TocaIsland - Enter metaverse </title>
        <meta charset="utf-8" />
        <meta name="description" content="TocaIsland is a Multi-Blockchain Metaverse island. The ecosystem in TocaIsland
         is mainly composed of TocaboNFT(Bigmouth bird), TocaTreeNFT and $TocaWorm Token." />
        <meta name="keywords" content="TocaIsland,Tocabo,TocaTree,TocaWorm,NFT,Metaverse" />
        <meta name="author" content="TocaIsland" />
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
      <Intro />
      <Mint />
      {/* <About />
      <Gallery />
      <Roadmap />
      <FAQ />
      <Footer /> */}
    </div>
  );
}
