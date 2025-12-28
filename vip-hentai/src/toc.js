load('config.js');
function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
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
    let el = doc.select("ul.overflow-y-auto a");

    const data = [];

    // 2. Sử dụng vòng lặp (với Jsoup/JavaScript)
    el.forEach((e) => {
        data.push({
            name: e.select(".text-ellipsis").first().text().trim(), // Lấy chữ "Chap X"
            url: BASE_URL + e.attr("href"),                         // Ghép link
            host: BASE_URL
        });
    });

    data.reverse();
    return Response.success(data);
}