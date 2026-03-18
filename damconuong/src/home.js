load('config.js');
function execute() {
    return Response.success([
        {title: "Cập Nhật", input: BASE_URL + "danh-sach", script: "cat.js"},
        {title: "Manhwa", input: BASE_URL + "the-loai/manhwa", script: "cat.js"},
    ]);
}