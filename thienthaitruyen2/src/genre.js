load('config.js');

function execute() {
    const doc = Http.get(BASE_URL + 'the-loai').html();
    // Selector cơ bản để lấy tất cả thẻ a trong các nút thể loại
    const el = doc.select(".genre-grid-lg .genre-button a");
    
    const data = [];
    const addedLinks = []; // Mảng dùng để kiểm tra trùng lặp

    for (var i = 0; i < el.size(); i++) {
        var e = el.get(i);
        var link = e.attr('href');

        // Kiểm tra nếu link chưa tồn tại trong danh sách đã thêm
        if (addedLinks.indexOf(link) === -1) {
            addedLinks.push(link);

            // Sử dụng .text() thay cho .ownText() để tránh lỗi
            // Sau đó xóa chữ "HOT" (nhãn đỏ) nếu có
            var title = e.text().replace("HOT", "").trim();

            data.push({
                title: title,
                input: link,
                script: 'cat.js'
            });
        }
    }
    
    return Response.success(data);
}