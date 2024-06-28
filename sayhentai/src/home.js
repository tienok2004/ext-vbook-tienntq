function execute() {
    return Response.success([
        { title: "Cập Nhật", input: "https://sayhentai.life", script: "gen.js" },
        { title: "Manhwa", input: "https://sayhentai.life/genre/manhwa", script: "gen.js" },
        { title: "Manga", input: "https://sayhentai.life/genre/manga", script: "gen.js" },
        { title: "Manhua", input: "https://sayhentai.life/genre/manhua", script: "gen.js" },
    ]);
}