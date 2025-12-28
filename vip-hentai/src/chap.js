load('config.js');
function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);

    let browser = Engine.newBrowser();
    browser.launch(url, 5000);
    let doc = browser.html();
    browser.close();
    
    var els = doc.select("ul.overflow-y-auto a");
    var imgs = [];
    els.forEach(el => {
        imgs.push({
            link: el.attr('src'),
            referer: BASE_URL + '/'
        })
    })
    return Response.success(imgs);
}