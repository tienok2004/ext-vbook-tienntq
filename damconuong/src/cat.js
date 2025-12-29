load('config.js');

function execute(url, page) {
    if (!page) page = 1;
    let response = fetch(url,{
        method: "GET",
        queries: {
            page : page
        }
    })
    // Giả định response được lấy từ fetch(url) như trong code gốc của bạn
    if (response.ok) {
        let doc = response.html();
        // Selector chính cho từng item truyện
        let el = doc.select(".manga-vertical");
        let data = [];

        el.forEach(e => {
            // 1. Lấy ảnh bìa: HTML mới dùng thẻ <img> với thuộc tính 'data-src' hoặc 'src'
            // Ưu tiên lấy 'data-src' vì trang web này sử dụng lazyload
            let imgTag = e.select(".cover-frame img");
            let url_cover = imgTag.attr("data-src") || imgTag.attr("src") || '';

            // 2. Lấy tên và link truyện: nằm trong thẻ h3 > a
            let titleAnchor = e.select("h3 a");

            // 3. Lấy chương mới nhất (description): nằm trong h4 > a
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