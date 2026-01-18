load('config.js');

function execute(key, page) {
    if (!page) page = '1';
    
    // Thực hiện truy vấn tìm kiếm với tham số q và page
    let response = fetch(BASE_URL + "/search", {
        method: "GET",
        queries: {
            q: key,
            page: page
        }
    });

    if (response.ok) {
        let doc = response.html();
        
        // Selector cho danh sách các item truyện trong trang tìm kiếm
        let el = doc.select(".listupd .page-item");
        let data = [];

        el.forEach(e => {
            // Lấy link ảnh từ data-src (ưu tiên) hoặc src
            let imgElement = e.select(".thumb-manga img");
            let cover = imgElement.attr("data-src") || imgElement.attr("src");

            // Lấy tên truyện và link từ thẻ h3 bên trong .bigor-manga
            let titleElement = e.select(".bigor-manga h3.tt a");
            
            // Lấy chương mới nhất để làm mô tả
            let latestChapter = e.select(".list-chapter .chapter-item").first().select(".chapter a").text().trim();

            data.push({
                name: titleElement.text().trim(),
                link: titleElement.attr("href"),
                cover: cover,
                description: latestChapter || 'No chapter',
                host: BASE_URL
            });
        });

        // Xử lý phân trang: Tìm trang tiếp theo dựa trên thanh pagination
        let next = doc.select(".pagination li.active + li:not(.next)").text();
        
        return Response.success(data, next || null);
    }
    
    return null;
}