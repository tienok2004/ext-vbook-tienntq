load('config.js');

function execute(url) {
    // Chuyển đổi URL về BASE_URL hệ thống nếu cần
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        // Selector tìm tất cả các thẻ 'a' bên trong danh sách chương 'row-content-chapter'
        let el = doc.select(".row-content-chapter li a");

        const data = [];

        el.forEach((e) => {
            data.push({
                name: e.text().trim(),          // Lấy tên chương (ví dụ: "Chapter 38")
                url: BASE_URL + e.attr("href"), // Ghép link chương với BASE_URL
                host: BASE_URL
            });
        });

        // Đảo ngược danh sách để chương cũ nhất lên đầu (nếu web đang để mới nhất ở đầu)
        data.reverse();
        
        return Response.success(data);
    }
    
    return null;
}