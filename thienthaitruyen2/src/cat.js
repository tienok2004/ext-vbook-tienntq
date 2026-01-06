load('config.js');
function execute(url, page) {
    if (!page) page = 1;
    let response = fetch(url,{
        method: "GET",
        queries: {
            page : page
        }
    })
    if (response.ok) {
    let doc = response.html();
    // Selector lấy danh sách các thẻ <a> chứa truyện
    let el = doc.select("div.grid > a"); 
    let data = [];

    el.forEach(e => {
        // 1. Lấy link ảnh từ thuộc tính src của thẻ img
        const url_cover = e.select("img").attr("src");

        // 2. Lấy tên truyện từ span có class line-clamp-2
        const name = e.select("span.line-clamp-2").text().trim();

        // 3. Lấy link truyện (HTML đã có sẵn URL tuyệt đối, nếu cần nối với BASE_URL thì xử lý lại)
        let link = e.attr("href");
        // Nếu link là link relative (vd: /truyen/abc) thì mới cần cộng BASE_URL
        if (link && !link.startsWith("http")) {
            link = BASE_URL + link;
        }

        // 4. Lấy chương mới nhất từ span có class truncate
        const last_chapter = e.select("span.truncate").text().trim() || 'Chưa rõ';

        data.push({
            name: name,
            link: link,
            cover: url_cover,
            description: last_chapter,
            host: BASE_URL
        });
    });

    return Response.success(data, (++page).toString());

}
    return null;
}