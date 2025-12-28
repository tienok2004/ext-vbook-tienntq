load('config.js');
function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    let response = fetch(url)
    if(response.ok) {
        let doc = response.html()

        // 1. Lấy danh sách thể loại từ cấu trúc mới
        let genres = [];
        doc.select(".genres-content a").forEach(e => {
            genres.push({
                title: e.text().replace(',', '').trim(), // Xóa dấu phẩy nếu có
                input: e.attr('href'),
                script: "cat.js"
            });
        });

        // 2. Cập nhật lấy Cover từ .summary_image (Ưu tiên noscript để tránh Lazy Load)
        let url_cover = "";
        let noscriptImg = doc.select(".summary_image noscript img");
        
        if (noscriptImg.size() > 0) {
            url_cover = noscriptImg.attr("src");
        } else {
            // Dự phòng nếu không có noscript, lấy từ srcset hoặc src của thẻ img chính
            let imgEl = doc.select(".summary_image img");
            let srcset = imgEl.attr("srcset");
            url_cover = srcset ? srcset.split(',')[0].split(' ')[0] : imgEl.attr("src");
        }


        // let infoElm = doc.select('.grow > div')
        // let info = []
        // infoElm.forEach(elm => {
        //     let content = elm.text().replace(':', ': ')
        //     if (content.includes('Lần cuối')) {
        //         info.push(content.replace('. . .', elm.select('.timeago').attr('datetime')))
        //     } else if (!content.includes('Thể loại') && !content.includes('Nhân vật')) {
        //         info.push(content)
        //     }
        // })


        return Response.success({
            name: doc.select(".post-title").first().text(),
            cover: url_cover,
            // author: doc.select(".grow a[href~=tac-gia]").first().text(),
            description: doc.select(".description-summary .summary__content").text().trim(),
            // detail: info.join('<br>'),
            ongoing: true,
            genres: genres,
            host: BASE_URL,
            suggests: [
                {
                    title: "Có thể bạn thích",
                    input: doc.select(".related-manga").last(),
                    script: "suggests.js"
                }
            ]
        });
    }
}