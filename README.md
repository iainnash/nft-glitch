## NFTGlitch

Make web 1.0 webpages in web 3.0 style – integrate the decentralized NFT ecosystems into your own style. Fetch NFTs from platforms, call organized external APIs, and animate the webpage too for more fun.

see nft-glitch at https://nftglitch.vercel.app/

nftglitch harkens back to the days when the web was yours to mash up and to play with.

This tool helps build IPFS-backed decentralized NFT galleries. Unlike decentraland or many NFT platforms currently it just provides a common JSON object with platform-level specific fields for more information that lets you slice and dice your NFTs as you see fit.

The project renders a static HTML page with a javascript file that loads once the page is loaded: even is external APIs do not exist anymore, their state is rendered and preserved in the document uploaded to IPFS. It includes the source code for the render at the bottom of the webpage allowing for decentralized forking and editing of projects.

The tool supports forking any existing pages by simply navigating to it IPFS URL.

After you publish a project to IPFS, you can then mint the page as a Zora NFT using the built-in minter tool.



This project integrates many helpers and urls to standardize NFTs across many platforms into a simple to use format and exposes many helper functions.

These tools utilize APIs and decentralized portals such as the ability to resolve the platform and bid information along with generic NFT information.

Based off pre-existing templates, users can show of their NFTs simply by publishing a copy of an existing page and updating their address or ENS name that resolves to their records.

