load('config.js');

function execute(key, page) {
    if (!page) page = 1;

    // Cập nhật cấu trúc queries để khớp với URL: filter[name] và filter[status]
    let response = fetch(BASE_URL + '/tim-kiem', {
        method: "GET",
        headers: {
            Referer: BASE_URL,
        },
        queries: {
            'sort': '-updated_at',
            'page': page,
            'filter[name]': key,
            'filter[status]': '2,1'
        }
    });

    if (response.ok) {
        let doc = response.html();
        // Selector cho từng khung truyện
        let el = doc.select(".manga-vertical");
        let data = [];

        el.forEach(e => {
            // Lấy ảnh từ thuộc tính data-src hoặc src của thẻ img
            let imgTag = e.select(".cover-frame img");
            let url_cover = imgTag.attr("data-src") || imgTag.attr("src") || '';

            // Lấy tên và link từ thẻ h3 > a
            let titleAnchor = e.select("h3 a");
            
            // Lấy chương mới nhất từ h4 > a
            let lastChapter = e.select("h4 a").text().trim();

            data.push({
                name: titleAnchor.text().trim(),
                link: BASE_URL + titleAnchor.attr("href"),
                cover: url_cover,
                description: lastChapter || 'No chapter',
                host: BASE_URL
            });
        });

        return Response.success(data, (++page).toString());
    }
    return null;
}