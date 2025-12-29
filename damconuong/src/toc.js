load('config.js');

function execute(url) {
    // Chuẩn hóa URL sử dụng BASE_URL từ hệ thống
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        // Chọn tất cả các thẻ <a> trực tiếp bên trong danh sách chương #chapterList
        let el = doc.select("#chapterList a");

        const data = [];

        el.forEach((e) => {
            // Lấy văn bản hiển thị của chương (ví dụ: "Chapter 48")
            let name = e.select("span.text-ellipsis").first().text().trim();
            
            if (name) {
                data.push({
                    name: name,
                    url: BASE_URL + e.attr("href"),
                    host: BASE_URL
                });
            }
        });

        // Đảo ngược danh sách nếu bạn muốn hiển thị từ Chapter 1 đến mới nhất
        // (Xóa dòng dưới nếu muốn giữ thứ tự mới nhất lên đầu như HTML gốc)
        data.reverse();
        
        return Response.success(data);
    }
    
    return null;
}