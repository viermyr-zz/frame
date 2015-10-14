jQuery(document).ready(function($) {
    $.ajax({
        url : "http://content.guardianapis.com/world?from-date=2015-09-09&order-by=newest&api-key=yp8cm7mj37ub4v95pe74t29r",
        dataType : "jsonp",
        success : function(parsed_json) {

            var articles = [];
            var articleUrls = [];
            var numberOfArticles = 10;

            for(var i = 0; i < numberOfArticles; i++){
                var results = parsed_json["response"]["results"][i];

                var articleTitle = results["webTitle"];
                articles.push(articleTitle);

                var articleUrl = results["webUrl"];
                articleUrls.push(articleUrl);

                if(i == 9){
                    console.log(articles);
                    console.log(articleUrls);
                }
            }
            $("#id1").html(articles[0]).click(function(){
                window.location.href= articleUrls[0];
            });
            $("#id2").html(articles[1]).click(function(){
                window.location.href= articleUrls[1];
            });
            $("#id3").html(articles[2]).click(function(){
                window.location.href= articleUrls[2];
            });
            $("#id4").html(articles[3]).click(function(){
                window.location.href= articleUrls[3];
            });
            $("#id5").html(articles[4]).click(function(){
                window.location.href= articleUrls[4];
            });
        }
    });
});

