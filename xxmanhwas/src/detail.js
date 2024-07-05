load('config.js')
function execute(url) {
    const doc = fetch(url).html()
    return Response.success({
        name: doc.select("h1 a").text(),
        cover: doc.select("meta[property='og:image']").first().attr('content'),
        description: doc.select(".ql-editor").text(),
        author: "Unknown",
        detail: doc.select('.col-inner p:contains(lượt xem)').text(),
        host: BASE_URL
    });
}