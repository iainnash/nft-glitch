<script>
  import { Navigate } from "svelte-router-spa";

  let templates = [
    ["", "for a foundation gallery"],
    ["", "for a rarible gallery"],
    ["", "with opensea"],
    ["", "flatuance nft example"],
    ["", "a kitchen sink gallery"],
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
    bringing them back for the new internet rennisance
  </p>
  <p>
    this project brings back those vibes for web 3.0. make a gallery of your
    favorite NFT media super easily, and publish the gallery as an IPFS page.
    the page itself is saved where it can update if possible but will preserve
    the content of the page on IPFS indefinitely. if you want to take your
    archive to the next level, you can mint it on ZORA to preserve it as a
    NodeFilter.
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
    <div>
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
  </div>
</div>

<style>
  .examples {
    margin-left: 20px;
    padding: 2px;
  }
  .examples li {
      margin: 6px 0;
  }
  .button {
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
  .button {
    background: red;
    background: -webkit-linear-gradient(
      left,
      orange,
      yellow,
      green,
      cyan,
      blue,
      violet
    );
    background: -o-linear-gradient(
      right,
      orange,
      yellow,
      green,
      cyan,
      blue,
      violet
    );
    background: -moz-linear-gradient(
      right,
      orange,
      yellow,
      green,
      cyan,
      blue,
      violet
    );
    background: linear-gradient(
      to right,
      orange,
      yellow,
      green,
      cyan,
      blue,
      violet
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  h2 {
    font-size: 20vw;
  }
</style>
