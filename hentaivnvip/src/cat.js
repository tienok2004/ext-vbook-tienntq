load('config.js');
function execute(url, page) {
    if (!page) page = 1;
    let response = fetch(url,{
        method: "GET",
        queries: {
            page : page
        }
    })
    if(response.ok){
        let doc = response.html();
        let el = doc.select(".page-item-detail.manga")
        let data = [];
        el.forEach(e => {
            // const imgElement = e.select(".item-thumb img");
            // const url_cover = imgElement.attr("src") || "";
            const imgInsideNoscript = e.select(".item-thumb noscript img");
            const url_cover = imgInsideNoscript.attr("src");
            data.push({
                name: e.select("a[title]").attr("title"),
                link: e.select("a").attr("href"),
                cover: url_cover,
                description:  e.select(".chapter.font-meta a").first().text() || 'No chapter',
                host: BASE_URL
            })
        })
        return Response.success(data,(++page).toString())
    }
    return null;
}