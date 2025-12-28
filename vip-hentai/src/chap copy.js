var allLists = doc.select("ul.overflow-y-auto");
console.log("Số lượng danh sách ul tìm thấy: " + allLists.size()); // Kiểm tra xem có đúng là có > 1 danh sách không

if (allLists.size() >= 2) {
    var els = allLists.get(1).select("a");
    console.log("Số lượng thẻ <a> tìm thấy trong danh sách chương: " + els.size());

    var data = [];
    els.forEach(el => {
        let name = el.select(".text-ellipsis").text();
        let link = el.attr('href');

        // Dòng lệnh in ra console để kiểm tra
        console.log("Đang lấy: " + name + " | Link: " + link);

        data.push({
            name: name,
            url: BASE_URL + link,
            host: BASE_URL
        });
    });
    
    return Response.success(data);
}