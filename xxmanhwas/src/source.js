load('config.js');
function execute(url, page) {
    if (!page) page = '1';
    let response = fetch(`${url}/page/${page}`);
    if (response.ok) {
        let doc = response.html();
        
        let data = [];
        doc.select("#main div[data-type='story']").forEach(e => {
            data.push({
                name: e.select("a").first().attr('title'),
                link: e.select("a").first().attr("href"),
                cover: `${BASE_URL}/${e.select("div.posts-list-avt").attr("data-large-img")}`,
                description: e.select(".posts-list-chapter a").first().text(),
                host: BASE_URL
            });
        });

        return Response.success(data, (parseInt(page) + 1) + "");
    }
    return null;
}