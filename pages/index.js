import { useEffect } from "react";
import Head from "next/head";
import Intro from "../components/Intro";
import FAQ from "../components/FAQ";
import Mint from "../components/Mint";
import Roadmap from "../components/Roadmap";
import Footer from "../components/Footer";
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
    <div style={{ display: "flex",width: '100%', flexDirection: "column", alignItems: "center", paddingBottom: '40px' }}>
      <Head>
        <title>TocaIsland - Enter metaverse </title>
        <meta name="description" content="TocaIsland is an Multi-Blockchain Metaverse island. The ecosystem in TocaIsland
         is mainly composed of TocaboNFT(Bigmouth bird)🐧, TocaTreeNFT🌴 and $TocaWorm Token🪱.
        A Tocabo will get a piece of TocaIsland land for free in Q4 2022! The stronger a Tocabo,the more territory it has in TocaIsland.
        TocaTree produces $TocaWorm Token.The more $TocaWorm a Tocabo eats, the stronger it will become.
        TocaboNFT is an exclusive NFT collection of 5666 toucans NFT and it is the PASSCARD into TocaIsland.
        TocaTreeNFT is an exclusive NFT collection of 5666 many kinds of trees NFT.
        The total supply of $TocaWorm Token is 1,000,000,000.
        TocaIsland covers 50,000 acres." />
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
      <About />
      <Roadmap />
      <FAQ />
      <Footer />
    </div>
  );
}
