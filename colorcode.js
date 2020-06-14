var colorCode = colorCode || { businesses: [] };

colorCode.htmlBasis = colorCode.htmlBasis || '<table>'
+ '  <thead>'
+ '    <tr>'
+ '      <th>Name</th>'
+ '      <th></th>'
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
      domain: '',
      address: '',
      contact: '',
      site: '',
      social: ''
    };
	
	var contains = function(text, search) {
	  return text.toLowerCase().indexOf(search.toLowerCase()) > -1;
	};
    
    var replaceWithProperty = function (text, key) {
      var value = instance[key];
      return text.replace('{' + key + '}', value);
    };
	
	var checkEmpty = function (text) {
		if (contains(text, "n/a")) {
			return '';
		}
		
		return text;
	};
    
    instance.render = function () {
      var rowHtml = '<tr><td>{name}</td><td>{secondColumn}</td><td>{thirdColumn}</td></tr>';
	  var secondColumn = '';
	  
	  if (instance.domain.length > 0) {
		  secondColumn = secondColumn.concat(instance.domain, '<br />');
	  }
	  if (instance.address.length > 0) {
		  secondColumn = secondColumn.concat(instance.address, '<br />');
	  }
	  if (instance.contact.length > 0) {
		  secondColumn = secondColumn.concat(instance.contact);
	  }
	  
	  var thirdColumn = '';

	  if (instance.site.length > 0) {
		  thirdColumn = thirdColumn.concat(instance.site, '<br />');
	  }
	  if (instance.social.length > 0) {
		  thirdColumn = thirdColumn.concat(instance.social);
	  }
	  
      rowHtml = replaceWithProperty(rowHtml, 'name'); 
      rowHtml = rowHtml.replace('{secondColumn}', secondColumn); 
      rowHtml = rowHtml.replace('{thirdColumn}', thirdColumn); 
	  
      return rowHtml;
    };
    
    instance.domain = function (domain) {
	  domain = checkEmpty(domain);
      instance.domain = domain;
      return instance;
    };
    
    instance.address = function (address) {
	  address = checkEmpty(address);
      instance.address = address;
      return instance;
    };
    
    instance.contact = function (contact) {
	  contact = checkEmpty(contact);
      instance.contact = contact;
      return instance;
    };
    
    instance.site = function (site) {
	  site = checkEmpty(site);
	  if (contains(site, "http")) {
	    site = '<a href="' + site + '" target="_blank">Website</a>';
	  }
      instance.site = site;
      return instance;
    };
    
    instance.social = function (social) 
	  social = checkEmpty(social);
	  if (contains(social,'fb.co') || contains(social, 'facebook.co')) {
	    social = '<a href="' + social + '" target="_blank">Facebook</a>';
	  }
	  if (contains(social,'ig.co') || contains(social, 'instagram.co')) {
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
