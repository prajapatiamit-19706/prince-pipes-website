const url = 'https://maps.app.goo.gl/CA2GwNNFdt3dNQqH7?g_st=ac';
fetch(url)
  .then(res => res.text())
  .then(html => {
    console.log(html.substring(0, 500));
    const titleMatch = html.match(/<title>(.*?)<\/title>/);
    console.log("Title:", titleMatch ? titleMatch[1] : "not found");
    const pbMatch = html.match(/pb=!1m.*?/g);
    console.log("PB matches:", pbMatch ? pbMatch.slice(0,2) : "not found");
  })
  .catch(console.error);
