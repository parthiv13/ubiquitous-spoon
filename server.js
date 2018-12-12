const cheerio = require('cheerio'),
    csvWriter = require('csv-write-stream'),
    fs = require('fs'),
    path = require('path'),
    writer = csvWriter({ sendHeaders: false });

var $ = cheerio.load(fs.readFileSync(path.join(__dirname, '/html.html')), {
    normalizeWhitespace: true,
    xmlMode: true
});

writer.pipe(fs.createWriteStream(path.join(__dirname, 'leads.csv'), { flags: 'a'}));
writer.write({ name: 'Name', designation: 'Designation', company: "Company" });
$('li.pv5.ph2').each(function (i, elem) {
    let cs = cheerio.load(elem);

    name = cs("dt.result-lockup__name").text().trim();
    designation = cs("dd.result-lockup__highlight-keyword > span:nth-child(1)").text().trim();
    company = cs("span.result-lockup__position-company a span:nth-child(1)").text().trim();

    writer.write({ name: name, designation: designation, company: company })
    //console.log(leads);

});

writer.end();