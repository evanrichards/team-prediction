import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

const SITE_TITLE = 'Team Prediction';
export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className={'macchiato'}>
        <Head>
          <meta
            name="description"
            content="A prediction market tool for teams"
          />
          <link rel="icon" href="/favicon.ico" />
          <meta
            property="og:image"
            content={`https://og-image.vercel.app/${encodeURI(
              SITE_TITLE,
            )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
          />
          <meta name="og:title" content={SITE_TITLE} />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
