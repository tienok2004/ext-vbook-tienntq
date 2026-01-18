load('config.js');

function execute(url, page) {
    if (!page) page = 1;
    let response = fetch(url, {
        method: "GET",
        queries: {
            page: page
        }
    });

    if (response.ok) {
        let doc = response.html();
        // Selector chính cho danh sách các item truyện
        let el = doc.select(".listupd .page-item");
        let data = [];

        el.forEach(e => {
            // Lấy ảnh từ data-src (ưu tiên) hoặc src
            let cover = e.select(".thumb-manga img").attr("data-src");
            if (!cover) cover = e.select(".thumb-manga img").attr("src");

            // Lấy tên truyện và link từ thẻ h3
            let titleElement = e.select(".bigor-manga h3.tt a");
            
            // Lấy chương mới nhất để làm mô tả (description)
            let latestChapter = e.select(".list-chapter .chapter-item").first().select(".chapter a").text().trim();

            data.push({
                name: titleElement.text().trim(),
                link: BASE_URL + titleElement.attr("href"),
                cover: cover,
                description: latestChapter || 'No chapter',
                host: BASE_URL
            });
        });

        // Kiểm tra xem có trang tiếp theo không (dựa vào pager) để trả về giá trị next page
        let next = doc.select(".pagination li.active + li:not(.next)").text();
        if (next) {
            return Response.success(data, next);
        } else {
            return Response.success(data, null);
        }
    }
    return null;
}