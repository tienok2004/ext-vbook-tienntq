load('config.js');

function execute(url) {
    // Chuẩn hóa URL để sử dụng BASE_URL từ config
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);

    let browser = Engine.newBrowser();
    browser.launch(url, 5000);
    let doc = browser.html();
    browser.close();
    
    // Sử dụng ID cụ thể để tránh lấy nhầm ảnh quảng cáo hoặc icon
    var els = doc.select("#chapter-content img");
    var imgs = [];
    
    els.forEach(el => {
        // Ưu tiên lấy data-src, nếu không có mới lấy src
        let link = el.attr('data-src') || el.attr('src');
        
        // Kiểm tra để đảm bảo không lấy nhầm ảnh trống hoặc ảnh loading
        if (link && link.indexOf('loading.gif') === -1) {
            imgs.push(link); // Trả về mảng string trực tiếp nếu extension yêu cầu đơn giản
        }
    });

    return Response.success(imgs);
}