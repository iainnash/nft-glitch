<script>
  import { Navigate } from "svelte-router-spa";

  let templates = [
    [
      "Qmedce7YGoULTfyx6WLZN6D1DbGVUogPGR3FrcsNiYYRbJ",
      "foundation page as jstn hires theme",
    ],
    [
      "Qmcup1ADQmBF5bVe9kejsAuGMq98q9xDLevjkEJyk2JWpw",
      "rarible bois and gurls morphing gallery",
    ],
    [
      "bafkreifb2trdatysz2ppnaob6zevvjkul453tic3xgqbu735v6k6h6cwvi",
      "flatuance opensea nft example",
    ],
    [
      "bafkreibzenjj2htnfr2drromgbojeshf6n3z4744zhkyvqwzb4rpyw7aly",
      "a kitchen sink gallery",
    ],
    [
      "bafybeiehtzdihujzw746ffz7ykgl6e62bxpjsiy3um5q4o4tjqhgqxvfp4",
      "zora stylized gallery",
    ],
    [
      "QmVVBMkFiW1M57vUhdTVHx8izzDMAGDkPv7Wj6i2vAsY9s",
      "superrare homepage interface",
    ],
    [
      "QmVVBMkFiW1M57vUhdTVHx8izzDMAGDkPv7Wj6i2vAsY9s",
      "rarible homepage interface",
    ],
    [
      "QmRVBtbrq9p9Hs1P4NXPpGbTa3rqgEXJAUkVDUk9DinKPp",
      "video player gallery",
    ],
  ];

</script>

<div class="home">
  <h2>nftglitch</h2>
  <p>hypercustomizable archival builder for your own NFT galleries</p>

  <div class="link">
    <span class="button">
      <Navigate styles="launch" to="/editor">launch the editor!</Navigate>
    </span>
  </div>
  <br />

  <h3>what is this ~~</h3>
  <p>
    tumblr, myspace, and geocities pioneered freewheeling galleries, we're
    bringing them back for web 3.0
  </p>
  <p>
    this project brings back those vibes for web 3.0. write some html(ish) and
    styles to show off your works in your own style. the platform is <sup>f</sup
    >re<sub>e</sub> and outputs decentralized webpages that live on IPFS. want to
    take your gallery to the next level? you can put it on zora! (such as <a href="https://zora.co/zzz/2387">zora on zora</a>).
  </p>
  <p>
    we currently support either purchased or created media from foundation,
    rarible, opensea, and zora. client-side async fetch() is supported for
    adding your own data sources.
  </p>

  <h3>how do i get started!</h3>
  <div>
    <p>
      this uses svelte for templating <a
        target="_blank"
        href="https://svelte.dev/docs#if">(docs)</a
      > and uses standardizedish objects for showing media
    </p>

    <div class="content">
      start with some templates (mix & match):
      <ul class="examples">
        {#each templates as template}
          <li>
            <a href="/editor/{template[0]}" target="_blank">{template[1]}</a>
          </li>
        {/each}
      </ul>
    </div>
    <div class="desc">
      <h4>media description object</h4>
      <pre
        class="block">{`
        {
            "info": {(direct data from platform, can use {JSON.stringify(info)} to inspect)},
            "media": {
                description: "metadata description",
                name: "metadata name",
                type: "mime type for media (image/png video/mp4 text/plain etc)",
                url: "url for media type",
            },
            "common": {
                platform: (zora/opensea/rarible/foundation),
                contractAddress: string (contract id),
                mediaId: string (id of media in NFT contract),
            },
        }
    `}
      </pre>
    </div>
    <footer>
      made by <a href="https://twitter.com/isiain">iain</a> // a nfthack project
      :)
    </footer>
  </div>
</div>

<style>
  .desc {
    font-size: 1.35em;
  }
  .examples {
    margin-left: 20px;
    padding: 2px;
  }
  .examples li {
    margin: 6px 0;
  }
  :global(.button a) {
    font-size: 3vw;
    text-decoration: none;
  }
  p,
  .content {
    font-size: 1.3em;
  }
  .home {
    font-size: 1em;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  h3 {
    font-size: 1.6em;
  }
  h2,
  :global(.button a) {
    background: red;
    background: -webkit-linear-gradient(
      left,
      rgb(184, 120, 2),
      rgb(105, 105, 59),
      green,
      cyan,
      blue,
      violet
    );
    background: -o-linear-gradient(
      right,
      rgb(184, 120, 2),
      rgb(105, 105, 59),
      green,
      cyan,
      blue,
      violet
    );
    background: -moz-linear-gradient(
      right,
      rgb(184, 120, 2),
      rgb(105, 105, 59),
      green,
      cyan,
      blue,
      violet
    );
    background: linear-gradient(
      to right,
      rgb(184, 120, 2),
      rgb(105, 105, 59),
      green,
      cyan,
      blue,
      violet
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  h2 {
    font-size: 16vw;
  }
</style>
