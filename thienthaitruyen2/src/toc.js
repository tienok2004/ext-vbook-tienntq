load('config.js');
function execute(url) {
    // url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    let doc = fetch(url).html();
    // let el = doc.select(".mb-4 > ul > a")
    // const data = [];
    // for (var i = el.size() - 1; i >= 0; i--) {
    //     var e = el.get(i);
    //     data.push({
    //         name: e.select(".text-ellipsis").text(),
    //         url: BASE_URL + e.attr("href"),
    //         host: BASE_URL
    //     })
    // }
    let el = doc.select("div.chapter-items a");

    const data = [];

    // 2. Sử dụng vòng lặp (với Jsoup/JavaScript)
    el.forEach((e) => {
        // Lấy thẻ <a> bên trong item
        let aTag = e.select("a").first();
        
        // 2. Lấy link chương
        let chapterUrl = aTag.attr("href");
        if (chapterUrl && !chapterUrl.startsWith("http")) {
            chapterUrl = BASE_URL + chapterUrl;
        }

        // 3. Lấy tên chương (nằm trong thẻ p có class text-sm)
        let chapterName = aTag.select("p.text-sm").text().trim();

        data.push({
            name: chapterName, // Ví dụ: "Chương 22"
            url: chapterUrl,
            host: BASE_URL
        });
    });

    data.reverse();
    return Response.success(data);
}