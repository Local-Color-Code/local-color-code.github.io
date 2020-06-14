var colorCode = colorCode || { businesses: [] };

colorCode.htmlBasis = colorCode.htmlBasis || '<table>'
+ '  <thead>'
+ '    <tr>'
+ '      <th>Name</th>'
+ '      <th>Domain</th>'
+ '      <th>Address</th>'
+ '      <th>Contact</th>'
+ '      <th></th>'
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
      site: '',
      social: ''
    };
	
	var contains = function(text, search) {
	  return text.toLowerCase().indexOf(search.toLowerCase()) > -1;
	};
    
    var replaceWithProperty = function (text, key) {
      var value = instance[key];
      return text.replace('{' + key + '}', value);
    }
    
    instance.render = function () {
      var rowHtml = '<tr><td>{name}</td><td>{domain}</td><td>{address}</td><td>{contact}</td><td>{site}<br />{social}</td></tr>';
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
	  if (contains(site, "http")) {
	    social = '<a href="' + social + '" target="_blank">Website</a>';
	  }
      instance.site = site;
      return instance;

    };
    
    instance.social = function (social) {
	  if (contains(social,'fb.co') || contains(social,'facebook.co')) {
	    social = '<a href="' + social + '" target="_blank">Facebook</a>';
	  }
	  if (contains(social,'ig.co') || contains(social,'instagram.co')) {
	    social = '<a href="' + social + '" target="_blank">Instagram</a>';
	  }
      instance.social = social;
      return instance;
    };
	
    colorCode.businesses.push(instance);
    
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
