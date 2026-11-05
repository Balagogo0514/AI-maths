const fs = require('fs');
const path = require('path');

const SRC = process.argv[2] || '/home/user/repo/docs/NP.md';
const OUT = process.argv[3] || '/tmp/claude-0/-home-user-ai-maths/5d7d3347-767b-507e-8c64-ea12b5cecdef/scratchpad/np.html';
const DOCTITLE = process.argv[4] || 'NP 問題筆記';
const KICKER = process.argv[5] || 'AI-maths';
const SHORTNAME = process.argv[6] || 'NP 問題';

let md = fs.readFileSync(SRC, 'utf8');
// Collect SVG figures and replace with unique placeholders.
// We inline the SVG content directly into the HTML after markdown-it renders,
// avoiding data: URI CSP issues and broken relative paths.
const srcDir = path.dirname(SRC);
const figures = [];
md = md.replace(/!\[([^\]]*)\]\((figures\/[^)]+\.svg)\)/g, function(match, alt, figPath) {
  const svgFile = path.join(srcDir, figPath);
  try {
    const svgContent = fs.readFileSync(svgFile, 'utf8');
    const idx = figures.length;
    figures.push({ alt, svgContent });
    return `SVGFIGURE${idx}`;
  } catch(e) {
    return match;
  }
});
// Guard against breaking the embedding <script> tag (none expected, but be safe).
md = md.replace(/<\/script>/gi, '<\\/script>');

const HEAD = `<title>${DOCTITLE}</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lora:wght@500;600;700&family=Newsreader:opsz,wght@6..72,400;6..72,500&display=swap">
<style>
/* Layout: single readable column, academic notes; cool-neutral palette with one blue accent */
:root{
  --bg:#fcfcfd; --surface:#f1f4f7; --fg:#1a1c1f; --muted:#5b6672;
  --accent:#2f6fed; --accent-soft:#e7eefc; --border:#e2e6ea;
  --font-display:"Lora",Georgia,"Songti TC","Noto Serif CJK TC",serif;
  --font-body:"Newsreader",Georgia,"PingFang TC","Microsoft JhengHei","Noto Sans CJK TC",system-ui,sans-serif;
  --font-mono:ui-monospace,"SF Mono",Menlo,Consolas,monospace;
}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){
  --bg:#0f1215; --surface:#171b20; --fg:#e6e9ec; --muted:#9aa4af;
  --accent:#6ea8fe; --accent-soft:#1b2740; --border:#262c33; color-scheme:dark;
}}
:root[data-theme="dark"]{
  --bg:#0f1215; --surface:#171b20; --fg:#e6e9ec; --muted:#9aa4af;
  --accent:#6ea8fe; --accent-soft:#1b2740; --border:#262c33; color-scheme:dark;
}
*{box-sizing:border-box}
body{background:var(--bg);color:var(--fg);font-family:var(--font-body);line-height:1.75;font-size:17px}
body::before{content:"";position:fixed;inset:0 0 auto;height:env(safe-area-inset-top,0px);z-index:10;background:var(--bg)}

header.top{position:sticky;top:env(safe-area-inset-top,0px);z-index:9;background:color-mix(in srgb,var(--bg) 88%,transparent);
  backdrop-filter:blur(8px);border-bottom:1px solid var(--border)}
.top .inner{max-width:780px;margin:0 auto;display:flex;align-items:baseline;gap:.6rem;
  padding-block:.7rem;padding-left:max(20px,env(safe-area-inset-left,0px));padding-right:max(20px,env(safe-area-inset-right,0px))}
.top .kicker{font-family:var(--font-mono);font-size:.7rem;letter-spacing:.14em;text-transform:uppercase;color:var(--accent)}
.top .name{font-family:var(--font-display);font-weight:600;font-size:1rem}

main{max-width:780px;margin:0 auto;padding-block:2.2rem 4rem;
  padding-left:max(20px,env(safe-area-inset-left,0px));padding-right:max(20px,env(safe-area-inset-right,0px))}

#doc h1{font-family:var(--font-display);font-weight:700;font-size:2.1rem;line-height:1.2;text-wrap:balance;margin:.2em 0 .6em}
#doc h2{font-family:var(--font-display);font-weight:600;font-size:1.5rem;line-height:1.25;text-wrap:balance;
  margin:2.4em 0 .7em;padding-top:1.1em;border-top:1px solid var(--border)}
#doc h3{font-family:var(--font-display);font-weight:600;font-size:1.18rem;margin:1.8em 0 .5em;color:var(--fg)}
#doc h4{font-weight:600;font-size:1rem;margin:1.4em 0 .4em;color:var(--accent)}
#doc p{margin:.8em 0}
#doc a{color:var(--accent);text-decoration:none;border-bottom:1px solid var(--accent-soft)}
#doc strong{font-weight:700}
#doc ul,#doc ol{margin:.7em 0;padding-left:1.4em}
#doc li{margin:.3em 0}
#doc li::marker{color:var(--muted)}

#doc blockquote{margin:1.2em 0;padding:.6em 1.1em;background:var(--accent-soft);
  border-left:3px solid var(--accent);border-radius:0 8px 8px 0;color:var(--fg)}
#doc blockquote p{margin:.3em 0}

.table-wrap{overflow-x:auto;margin:1.2em 0;border:1px solid var(--border);border-radius:10px}
#doc table{border-collapse:collapse;width:100%;font-size:.93rem;min-width:min(100%,460px)}
#doc th,#doc td{padding:.5em .8em;text-align:left;border-bottom:1px solid var(--border);vertical-align:top;
  font-variant-numeric:tabular-nums}
#doc thead th{background:var(--surface);font-weight:600;white-space:nowrap}
#doc tbody tr:last-child td{border-bottom:none}
#doc td:first-child,#doc th:first-child{white-space:nowrap}

#doc pre{background:var(--surface);border:1px solid var(--border);border-radius:10px;
  padding:1em 1.1em;overflow-x:auto;margin:1.2em 0}
#doc pre code{font-family:var(--font-mono);font-size:.86rem;line-height:1.5;white-space:pre;color:var(--fg)}
#doc :not(pre)>code{font-family:var(--font-mono);font-size:.88em;background:var(--surface);
  padding:.12em .4em;border-radius:5px}

mjx-container{color:var(--fg)}
mjx-container[display="true"]{overflow-x:auto;overflow-y:hidden;max-width:100%;padding:.2em 0}
#doc hr{border:none;border-top:1px solid var(--border);margin:2em 0}
#doc img{max-width:100%;height:auto;display:block;margin:1.2em auto;border-radius:8px}
.render-note{max-width:780px;margin:0 auto;color:var(--muted);font-size:.8rem;
  padding:0 max(20px,env(safe-area-inset-right,0px)) 2rem max(20px,env(safe-area-inset-left,0px))}
@media (max-width:480px){body{font-size:16px}#doc h1{font-size:1.7rem}#doc h2{font-size:1.3rem}}
</style>

<header class="top"><div class="inner"><span class="kicker">${KICKER}</span><span class="name">${SHORTNAME}</span></div></header>
<main><article id="doc"></article></main>
<p class="render-note">公式由 MathJax 即時排版 · 來源 ${SRC.replace(/^.*\//,'docs/')}</p>

<script type="text/markdown" id="src">
`;

const TAIL = `
</script>

<script>
window.MathJax = {
  tex:{ inlineMath:[['$','$']], displayMath:[['$$','$$']], processEscapes:true },
  svg:{ fontCache:'global' },
  options:{ skipHtmlTags:['script','noscript','style','textarea','pre','code'] },
  startup:{ typeset:false }
};
</script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/markdown-it/13.0.2/markdown-it.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.2.2/es5/tex-svg.js" id="mathjax"></script>
<script>
(function(){
  var raw = document.getElementById('src').textContent;
  // Protect code (fenced + inline) and math from markdown mangling of backslashes.
  var codes = [], maths = [];
  var s = raw;
  s = s.replace(/\`\`\`[\\s\\S]*?\`\`\`/g, function(m){ codes.push(m); return 'XCODEX'+(codes.length-1)+'X'; });
  s = s.replace(/\`[^\`\\n]+\`/g, function(m){ codes.push(m); return 'XCODEX'+(codes.length-1)+'X'; });
  s = s.replace(/\\$\\$[\\s\\S]*?\\$\\$/g, function(m){ maths.push(m); return 'XMATHX'+(maths.length-1)+'X'; });
  s = s.replace(/\\$[^\\$\\n]+?\\$/g, function(m){ maths.push(m); return 'XMATHX'+(maths.length-1)+'X'; });
  // restore code before markdown render so it becomes <pre>/<code>
  s = s.replace(/XCODEX(\\d+)X/g, function(_,i){ return codes[+i]; });
  var md = window.markdownit({ html:false, linkify:true, typographer:false, breaks:false });
  var html = md.render(s);
  // restore math as raw text for MathJax
  html = html.replace(/XMATHX(\\d+)X/g, function(_,i){
    return maths[+i].replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  });
  var doc = document.getElementById('doc');
  doc.innerHTML = html;
  // Replace SVGFIGURE placeholders with inline SVG (figures collected at build time).
  if (window._svgFigures && window._svgFigures.length) {
    doc.querySelectorAll('p').forEach(function(p) {
      var m = p.textContent.match(/^SVGFIGURE(\d+)$/);
      if (!m) return;
      var fig = window._svgFigures[+m[1]];
      if (!fig) return;
      var wrap = document.createElement('figure');
      wrap.style.cssText = 'margin:1.5em 0;text-align:center;overflow-x:auto';
      wrap.innerHTML = fig.svg;
      if (fig.alt) {
        var cap = document.createElement('figcaption');
        cap.style.cssText = 'font-size:.85em;color:var(--muted);margin-top:.4em';
        cap.textContent = fig.alt;
        wrap.appendChild(cap);
      }
      p.parentNode.replaceChild(wrap, p);
    });
  }
  // wrap tables for horizontal scroll on small screens
  doc.querySelectorAll('table').forEach(function(t){
    var w = document.createElement('div'); w.className='table-wrap';
    t.parentNode.insertBefore(w,t); w.appendChild(t);
  });
  function typeset(){ if(window.MathJax && MathJax.typesetPromise) MathJax.typesetPromise([doc]); }
  if(window.MathJax && MathJax.startup && MathJax.startup.promise){ MathJax.startup.promise.then(typeset); }
  else { document.getElementById('mathjax').addEventListener('load', typeset); }
})();
</script>
`;

// Inject SVG data as a JS variable so the browser-side code can inline them
// after markdown-it renders (markdown is rendered in the browser, not here).
const svgJson = JSON.stringify(figures.map(function(f) {
  return { alt: f.alt, svg: f.svgContent };
}));
const svgScript = '<script>window._svgFigures=' + svgJson + ';<\/script>\n';

fs.writeFileSync(OUT, HEAD + md + svgScript + TAIL, 'utf8');
console.log('wrote', OUT, 'bytes:', (HEAD + md + svgScript + TAIL).length);
