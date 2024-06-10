<div align="center">

# <strong><em>Songs Please | Remastered </em></strong>

</div>

Find new songs in seconds, by providing one of the genres, artists or tracks you love.

<br>

# Technologies

-   Frontend & Backend
    -   React.js
    -   Next.js
-   Additional
    -   Spotify API
    -   Google Credentials

<br>

# Features

<li>Find new songs in your taste, by providing one of the genres, artists or tracks you love.</li>
<li>Add Favorites (user only)</li>

<br>

# See Live

This app is live on: https://songs-please.vercel.app/

<br>

# Running the app on local machine

<h2><strong>1. Install dependencies</strong></h2>
<pre class="notranslate">
  <code>
    $ git clone https://github.com/Gneissy/songs-please-remastered
    $ cd songs-please-remastered
    $ npm install --legacy-peer-deps
  </code>
</pre>

<br>

<h2><strong>2. Environment variables</strong></h2>
You will need 7 environment variables for <strong><em>"./.env"</em></strong>:
<br>
<br>
<li><strong>SPOTIFY_CLIENT_ID</strong>: Spotify API Credentials </li>
<li><strong>SPOTIFY_CLIENT_SECRET</strong>: Spotify API Credentials </li>
<li><strong>AUTH_SECRET</strong>: Your random auth secret </li>
<li><strong>GOOGLE_CLIENT_ID</strong>: Google Credentials for Google OAuth </li>
<li><strong>GOOGLE_CLIENT_SECRET</strong>: Google Credentials for Google OAuth</li>
<li><strong>POSTGRES_URL</strong>: Your Postgres connection string </li>
<li><strong>AUTH_TRUST_HOST</strong>: http://localhost:3000 </li>

<br>

<h2><strong>3. Start the app</strong></h2>
<h5>In the terminal:</h5>
<pre class="notranslate">
  <code>
    $ cd songs-please-remastered
    $ npm run dev
  </code>
</pre>
