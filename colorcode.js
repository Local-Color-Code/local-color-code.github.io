
var colorCode = colorCode || { businesses: [] };

colorCode.htmlBasis = colorCode.htmlBasis || '<table>'
+ '  <thead>'
+ '    <tr>'
+ '      <th>Name</th>'
+ '      <th>Domain</th>'
+ '      <th>Address</th>'
+ '      <th>Contact</th>'
+ '      <th>Site</th>'
+ '      <th>Social</th>'
+ '    </tr>'
+ '  </thead>'
+ '  <tbody>'
+ '  {list}'
+ '  </tbody>'
+ '</table>'

colorCode.make = colorCode.make || function (name) {
    var instance = {
      name: name,
      domain: 'N/A',
      address: 'N/A',
      contact: 'N/A',
      site: 'N/A',
      social: 'N/A'
    };
    
    var replaceWithProperty = function (text, key) {
      var value = instance[key];
      return text.replace('{' + key + '}', value);
    }
    
    instance.render = function () {
      var rowHtml = '<tr><td>{name}</td><td>{domain}</td><td>{address}</td><td>{contact}</td><td>{site}</td><td>{social}</td></tr>';
      rowHtml = replaceWithProperty(rowHtml, 'name'); 
      rowHtml = replaceWithProperty(rowHtml, 'domain'); 
      rowHtml = replaceWithProperty(rowHtml, 'address'); 
      rowHtml = replaceWithProperty(rowHtml, 'contact'); 
      rowHtml = replaceWithProperty(rowHtml, 'site'); 
      rowHtml = replaceWithProperty(rowHtml, 'social'); 
      return rowHtml;
    };
    
    instance.domain = function (domain) {
      instance.domain = domain;
      return instance;
    };
    
    instance.address = function (address) {
      instance.address = address;
      return instance;
    };
    
    instance.contact = function (contact) {
      instance.contact = contact;
      return instance;
    };
    
    instance.site = function (site) {
      instance.site = site;
      return instance;

    };
    
    instance.social = function (social) {
      instance.social = social;
      return instance;
    };
	
	colorCode.businesses.add(instance);
    
    return instance;
};

colorCode.render = colorCode.render || function () {
    var rowsHtml = '';
    for (var i = 0; i < colorCode.businesses.length; i++) {
      rowsHtml = rowsHtml.concat(colorCode.businesses[i].render());
    }
    
	html = colorCode.htmlBasis.replace('{list}', rowsHtml);
    var container = document.getElementById('ColorCode');
    container.innerHTML = html;
 };
