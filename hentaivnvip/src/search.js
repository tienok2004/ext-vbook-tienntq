function execute(key, page) {
    load('config.js');
    
    // Gửi request search (BASE_URL phải được định nghĩa trong config.js)
    let doc = fetch(BASE_URL + '/?s=' + key + '&post_type=wp-manga').html();
    
    // Selector cho từng item truyện
    let el = doc.select(".row.c-tabs-item__content");
    
    let data = [];
    el.forEach(e => {
        data.push({
            name: e.select(".post-title h3 a").text(),
            link: e.select(".post-title h3 a").attr("href"),
            cover: e.select(".tab-thumb noscript img").attr("src"),
            description: "Chương mới: " + e.select(".latest-chap .chapter a").text(),
            host: BASE_URL
        });
    });
    
    return Response.success(data);
}