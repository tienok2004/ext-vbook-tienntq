load('config.js');
function execute() {
    return Response.success([
        {title: "Cập Nhật", input: BASE_URL + "tim-kiem-nang-cao", script: "cat.js"},
        {title: "Manhwa", input: BASE_URL + "the-loai/manhwa", script: "cat.js"},
    ]);
}