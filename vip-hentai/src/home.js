function execute() {
    return Response.success([
        {title: "Cập Nhật", input: "-updated_at", script: "gen.js"},
        {title: "Manhwa", input: "https://vi-hentai.pro/the-loai/manhwa", script: "cat.js"},
    ]);
}