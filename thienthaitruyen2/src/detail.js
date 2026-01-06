load('config.js');
function execute(url) {
    let response = fetch(url)
    if(response.ok) {
        let doc = response.html()
        
        let genres = [];
        doc.select("div[class*=md:block] div.flex-row.gap-3 a").forEach(e => {
            genres.push({
                title: e.text(),
                input: e.attr('href'),
                script: "cat.js"
            });
        });

        // let style_cover = doc.select(".cover-frame.bg-cover").attr("style")
        let url_cover = doc.select("img[alt='poster']").attr("src")

        let infoElm = doc.select('.grow > div')
        let info = []
        infoElm.forEach(elm => {
            let content = elm.text().replace(':', ': ')
            if (content.includes('Lần cuối')) {
                info.push(content.replace('. . .', elm.select('.timeago').attr('datetime')))
            } else if (!content.includes('Thể loại') && !content.includes('Nhân vật')) {
                info.push(content)
            }
        })

        return Response.success({
            name: doc.select("h1").text().trim(),
            cover: url_cover,
            author: doc.select('p:contains(Tác giả) + p').text().trim(),
            description: doc.select("p.comic-content").text().trim(),
            detail: info.join('<br>'),
            ongoing: doc.select(".grow a[href~=danh-sach] span").first().text() == 'Đang tiến hành',
            genres: genres,
            host: BASE_URL,
            suggests: [
                {
                    title: "Có thể bạn thích",
                    input: doc.select("body > div:nth-child(3) > div > div > div > div.w-\[100\%\].float-left.min-\[882px\]\:w-\[68\.5\%\].min-\[1030px\]\:w-\[70\%\].max-\[600px\]\:w-\[100\%\].relative.z-0 > div > div:nth-child(3) > div > div.flex-wrap.flex.bg-\[\#222222\].p-\[10px\]").last(),
                    script: "suggests.js"
                }
            ]
        });
    }
}