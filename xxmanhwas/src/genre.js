load('config.js')
function execute() {
    let response = fetch(BASE_URL)
    if (response.ok){
        let el = response.html().select('.has-sub-menu ul li a')
        let data = []
        for (var i = 0; i < el.size(); i++) {
            var e = el.get(i);
            data.push({
            title: e.text(),
            input: BASE_URL+'/'+e.attr('href'),
            script: 'source.js'
            });
        }
        return Response.success(data)
    }
}