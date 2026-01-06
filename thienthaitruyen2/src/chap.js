load('config.js');

function execute(url) {
    let browser = Engine.newBrowser();
    // Tăng thời gian chờ lên một chút nếu trang có nhiều ảnh hoặc lazy load
    browser.launch(url, 5000); 
    let doc = browser.html();
    browser.close();
    
    // 1. Selector lấy tất cả ảnh nội dung truyện
    // Chúng ta nhắm vào các thẻ img nằm trong div có class "center"
    var els = doc.select("div.center img");
    var imgs = [];
    
    els.forEach(el => {
        let link = el.attr('src');
        
        // 2. Loại bỏ ảnh banner quảng cáo (thường chứa link breaktheice.live hoặc thienthaitruyen-truyen-tranh-hentai.png)
        if (link && !link.includes("breaktheice.live") && !link.includes("banner")) {
            imgs.push(link);
        }
    });

    // Trả về danh sách link ảnh
    return Response.success(imgs);
}