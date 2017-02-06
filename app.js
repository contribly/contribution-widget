var contriblyjQuery = $.noConflict();
var contriblyUnderscore = _.noConflict();

function contriblyInitContribution(span, artifactFormat) {

    var overrideContriblyApi = span.attr('data-api');
    var contriblyApi = (overrideContriblyApi) ? overrideContriblyApi : "https://api.contribly.com/1";
    var requestedContribution = span.attr('data-contribution');

     contriblyjQuery.ajax({
        type: 'GET',
        url: contriblyApi + "/contributions/" + encodeURIComponent(requestedContribution),
        success: function(contribution) {
            span.append('<h1>' + contribution.headline + '</h1>');

            var mediaUsage = contribution.mediaUsages.length > 0 ? contribution.mediaUsages[0] : null;
            var artifact = mediaUsage != undefined ? contriblyUnderscore.find(mediaUsage.artifacts, function(artifact) {
                return artifact.label == artifactFormat && artifact.url != undefined;
            }) : null;
            var thumbnail = artifact ? '<p><img src="' + artifact.url + '" /></p>' : "";
	    span.append(thumbnail);
	 
	    var attributesBar = contriblyjQuery("<div>");
	    var username = contribution.via.authority.user ? contribution.via.authority.user.displayName : "Anonymous";
            attributesBar.append(username);
	    attributesBar.append(" | " + contribution.created);
            if (contribution.place && contribution.place.name) {
		attributesBar.append(" | " + contribution.place.name);
	    }
	    span.append(attributesBar);
		
	    if(contribution.body) {
	    	span.append('<p>' + contribution.body + '</p>');
	    }
        },
        error: function(data) {
        }
    });

}

contriblyjQuery.ajax({
    url: "https://s3-eu-west-1.amazonaws.com/contribly-widgets/contribution/contribution2017012201.css",
    success:function(css) {
        contriblyjQuery("head").append("<style>" + css + "</style>");

        contriblyjQuery('.contribly-contribution').each(function(i, v) {
            contriblyInitContribution(contriblyjQuery(v), "mediumoriginalaspectdouble");
        });
    }
});
