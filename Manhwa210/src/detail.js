load('config.js');
function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    let response = fetch(url)
    if(response.ok) {
        let doc = response.html()
        
        let genres = [];
        doc.select("a.bg-gray-500.inline-block").forEach(e => {
            genres.push({
                title: e.text(),
                input: BASE_URL + e.attr('href'),
                script: "cat.js"
            });
        });

        let style_cover = doc.select(".rounded-lg.cover").attr("style")
        let url_cover = style_cover.match(/url\('([^']+)'\)/)[1] || ''

        let infoElm = doc.select('.grow > div')
        let info = []
        // infoElm.forEach(elm => {
        //     let content = elm.text().replace(':', ': ')
        //     if (content.includes('Last updated')) {
        //         info.push(content.replace('. . .', elm.select('.timeago').attr('datetime')))
        //     } else if (!content.includes('Thể loại') && !content.includes('Nhân vật')) {
        //         info.push(content)
        //     }
        // })

        return Response.success({
            name: doc.select(".mb-4 span").first().text(),
            cover: url_cover,
            author: doc.select('a[href*="/artist/"]').text(),
            description: doc.select("div.py-4.border-t p").text(),
            detail: info.join('<br>'),
            ongoing: true,
            genres: genres,
            host: BASE_URL,
            suggests: [
                {
                    title: "Có thể bạn thích",
                    input: doc.select("div.gap-3.grid").last(),
                    script: "suggests.js"
                }
            ]
        });
    }
}