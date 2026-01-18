load('config.js');

function execute(url) {
    // Chuyển đổi URL về BASE_URL hệ thống nếu cần
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);

    let browser = Engine.newBrowser();
    // Trang web này có nội dung người lớn và cơ chế kiểm tra adblock, 
    // sử dụng browser giúp render đầy đủ các thẻ ảnh lazy-load.
    browser.launch(url, 5000); 
    let doc = browser.html();
    browser.close();
    
    // Selector tìm tất cả các thẻ img nằm trong div.page-break
    var els = doc.select(".read-content .page-break img");
    var imgs = [];
    
    els.forEach(el => {
        // Ưu tiên lấy link từ data-src (vì trang dùng lazy load), nếu không có mới lấy src
        let link = el.attr('data-src') || el.attr('src');
        
        if (link) {
            imgs.push({
                link: link.trim(),
                referer: BASE_URL + '/'
            });
        }
    });

    return Response.success(imgs);
}