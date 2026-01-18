load('config.js');

function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    let response = fetch(url);
    
    if (response.ok) {
        let doc = response.html();
        
        // 1. Lấy Thể loại (Genres)
        let genres = [];
        doc.select(".genres-content a").forEach(e => {
            genres.push({
                title: e.text().trim(),
                input: e.attr('href'),
                script: "cat.js"
            });
        });

        // 2. Lấy Ảnh bìa (Cover) - Ưu tiên data-src do trang dùng lazy load
        let imgElement = doc.select(".summary_image img").first();
        let url_cover = imgElement.attr("data-src") || imgElement.attr("src") || '';

        // 3. Lấy Thông tin chi tiết (Alternative, Author, Artist, Status...)
        let info = [];
        doc.select(".post-content_item").forEach(elm => {
            let heading = elm.select(".summary-heading").text().trim();
            let content = elm.select(".summary-content").text().trim();
            if (heading && content) {
                // Gom nhóm thông tin để hiển thị ở phần Detail
                info.push("<b>" + heading + "</b>: " + content);
            }
        });

        // 4. Kiểm tra trạng thái hoàn thành
        let status = doc.select(".post-status .summary-content").text().toLowerCase();
        let ongoing = status.includes("ongoing");

        return Response.success({
            name: doc.select(".post-title h1").text().trim(), // Tên truyện
            cover: url_cover,
            author: doc.select(".author-content a").text().trim(), // Tác giả
            description: doc.select(".panel-story-description .dsct").text().trim(), // Mô tả/Tóm tắt
            detail: info.join('<br>'), // Hiển thị các thông tin Alternative, Type...
            ongoing: ongoing,
            genres: genres,
            host: BASE_URL,
            suggests: [
                {
                    title: "YOU MAY ALSO LIKE",
                    input: doc.select(".related-items").html(), // Truyền cụm HTML gợi ý
                    script: "suggests.js"
                }
            ]
        });
    }
    return null;
}