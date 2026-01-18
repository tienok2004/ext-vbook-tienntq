load('config.js');
function execute() {
    return Response.success([
        {title: "Cập Nhật", input: BASE_URL, script: "cat.js"},
        {title: "Adult", input: BASE_URL + "/manga-genre/adult", script: "cat.js"},
    ]);
}