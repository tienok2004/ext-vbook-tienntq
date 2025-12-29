load('config.js');
function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    let response = fetch(url)
    if(response.ok) {
        let doc = response.html()
        
        let genres = [];
        // Tìm tất cả thẻ <a> là anh em (siblings) đứng sau thẻ span "Thể loại:"
        doc.select("span:contains(Thể loại:) ~ a").forEach(e => {
            genres.push({
                title: e.text().trim(),
                input: BASE_URL + e.attr('href'),
                script: "cat.js"
            });
        });

        // Lấy thẻ img bên trong .cover-frame
        let imgEl = doc.select(".cover-frame img").first();
        
        // Lấy link ảnh từ src (hoặc data-src nếu trang dùng lazyload ở trang chi tiết)
        let url_cover = imgEl.attr("data-src") || imgEl.attr("src") || '';

        let info = [];
        // Lấy tất cả các dòng thông tin (Tình trạng, Lần cuối, Lượt xem...)
        let infoRows = doc.select("div.mt-3");
        
        infoRows.forEach(row => {
            let text = row.text().trim();
            
            // Loại bỏ dòng Thể loại vì đã có mục genres riêng
            if (!text.includes("Thể loại:")) {
                // Định dạng lại nội dung: thêm khoảng trắng sau dấu hai chấm để dễ nhìn
                let formattedContent = text.replace(":", ": ");
                info.push(formattedContent);
            }
        });

        // Cập nhật giá trị ongoing dựa trên text của Tình trạng
        let statusText = doc.select("div:has(span:contains(Tình trạng:))").text();
        let isOngoing = statusText.includes("Đang tiến hành");

        return Response.success({
            name: doc.select(".text-xl.ml-1").first().text(),
            cover: url_cover,
            author: doc.select("a[href*=tac-gia]").first().text() || "Đang cập nhật",
            description: doc.select("#pilot-content").text().trim(),
            detail: info.join('<br>'),
            ongoing: isOngoing,
            genres: genres,
            host: BASE_URL,
            suggests: [
                {
                    title: "Có thể bạn thích",
                    input: doc.select(".gap-3.grid").last(),
                    script: "suggests.js"
                }
            ]
        });
    }
}