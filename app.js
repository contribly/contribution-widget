var contriblyjQuery = $.noConflict();
var contriblyUnderscore = _.noConflict();

function contriblyInitContribution(span, artifactFormat) {

    var overrideContriblyApi = span.attr('data-api');
    var contriblyApi = (overrideContriblyApi) ? overrideContriblyApi : "https://contriblyapi.global.ssl.fastly.net/1";
    var requestedContribution = span.attr('data-contribution');

     contriblyjQuery.ajax({
        type: 'GET',
        url: contriblyApi + "/contributions/" + encodeURIComponent(requestedContribution),
        success: function(contribution) {

            var widget = contriblyjQuery('<div>', {class: "contribution"});

            widget.append('<h1>' + contribution.headline + '</h1>');

            var mediaUsage = contribution.mediaUsages.length > 0 ? contribution.mediaUsages[0] : null;
            var artifact = mediaUsage != undefined ? contriblyUnderscore.find(mediaUsage.artifacts, function(artifact) {
                return artifact.label == artifactFormat && artifact.url != undefined;
            }) : null;
            var thumbnail = artifact ? '<img class="mediaUsage" src="' + artifact.url + '" />' : "";
	        widget.append(thumbnail);

            var attributesBar = contriblyjQuery('<ul>', {class: "attributes"});
            var attribution = contribution.attribution ? contribution.attribution : "Anonymous";
            attributesBar.append(contriblyjQuery("<li>", {class: "attribution"}).text(attribution));

            var formattedCreatedDate = contriblyjQuery.format.date(contribution.created, "d MMMM yyyy")
            attributesBar.append(contriblyjQuery("<li>", {class: "created"}).text(formattedCreatedDate));

            if (contribution.place && contribution.place.name) {
                attributesBar.append(contriblyjQuery("<li>", {class: "place"}).text(contribution.place.name));
            }
            widget.append(attributesBar);

            if(contribution.body) {
                widget.append(contriblyjQuery("<div>", {class: "body"}).text(contribution.body));
            }

            var wrapper = contriblyjQuery('<div>', {class: "contribly"});
            wrapper.append(widget);
            span.append(wrapper);
        },
        error: function(data) {
        }
    });

}

contriblyjQuery.ajax({
    url: "https://s3-eu-west-1.amazonaws.com/contribly-widgets/contribution/contribution2017012801-SNAPSHOT.css",
    success:function(css) {
        contriblyjQuery("head").append("<style>" + css + "</style>");

        contriblyjQuery('.contribly-contribution').each(function(i, v) {
            contriblyInitContribution(contriblyjQuery(v), "mediumoriginalaspectdouble");
        });
    }
});
