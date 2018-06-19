'use strict';

var gProjs = [];
var gProjID = 1;

function addProject(name, title, desc, url, publishedAt = new Date(), labels) {
    var proj = {
        id: gProjID++,
        name: name,
        title: title,
        desc: desc,
        url: url,
        publishedAt: publishedAt,
        labels: labels
    };
    gProjs.push(proj);
    return proj;
}

function getProjByID(id) {
    for (var i = 0; i < gProjs.length; i++) {
        if (gProjs[i].id === id) return gProjs[i];
    }
}