<h1>Fragments API</h1>
<p>A Node.js backend API for managing text and binary fragments with structured logging.</p>

<h2>Prerequisites</h2>
<ul>
  <li>Node.js (v16 or newer recommended)</li>
  <li>npm package manager</li>
</ul>

<h2>Installation</h2>
<p>Clone the repository:</p>
<pre><code>git clone https://github.com/YOUR_GITHUB_USERNAME/fragments.git
cd fragments
</code></pre>

<p>Install dependencies:</p>
<pre><code>npm install
</code></pre>

<h2>Scripts</h2>
<table>
  <thead>
    <tr>
      <th>Script</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>npm start</code></td>
      <td>Start the server normally on port 8080</td>
    </tr>
    <tr>
      <td><code>npm run dev</code></td>
      <td>Start server with auto-reload on changes</td>
    </tr>
    <tr>
      <td><code>npm run debug</code></td>
      <td>Start server with debugger attached</td>
    </tr>
    <tr>
      <td><code>npm run lint</code></td>
      <td>Run ESLint to check code style/errors</td>
    </tr>
  </tbody>
</table>

<h2>Running the Server</h2>
<p>Start the server with:</p>
<pre><code>npm start
</code></pre>
<p>Visit <a href="http://localhost:8080">http://localhost:8080</a> to verify the health check endpoint.</p>

<h2>Debugging</h2>
<p>To debug the server with breakpoints in VSCode:</p>
<ol>
  <li>Run:
    <pre><code>npm run debug
</code></pre>
  </li>
  <li>Open VSCode Debug panel and start the “Debug via npm run debug” configuration.</li>
</ol>

<h2>Testing</h2>
<p>Check health endpoint in browser or:</p>
<pre><code>curl http://localhost:8080
</code></pre>

<p>Run lint checks with:</p>
<pre><code>npm run lint
</code></pre>

<h2>Environment Variables</h2>
<ul>
  <li><code>LOG_LEVEL</code> — Controls logging verbosity (default: <code>info</code>). Set to <code>debug</code> in <code>debug.env</code> for verbose logs.</li>
</ul>

<h2>Notes</h2>
<ul>
  <li>Make sure to update the GitHub repository URL in the code and README.</li>
  <li>Adjust port number and other settings as needed.</li>
</ul>
