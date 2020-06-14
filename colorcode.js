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
      nameText: name,
      domainText: '',
      addressText: '',
      contactText: '',
      siteText: '',
      socialText: ''
    };
	
	var contains = function(stuff, search) {
	  return stuff.toLowerCase().indexOf(search.toLowerCase()) > -1;
	};
    
    var replaceWithProperty = function (stuff, key) {
      var value = instance[key];
      return stuff.replace('{' + key + '}', value);
    };
	
	var checkEmpty = function (stuff) {
		if (contains(stuff, "n/a")) {
			return '';
		}
		
		return stuff;
	};
    
    instance.render = function () {
      var rowHtml = '<tr><td>{nameText}</td><td>{secondColumn}</td><td>{thirdColumn}</td></tr>';
	  var secondColumn = '';
	  
	  if (instance.domain.length > 0) {
		  secondColumn = secondColumn.concat(instance.domainText, '<br />');
	  }
	  if (instance.address.length > 0) {
		  secondColumn = secondColumn.concat(instance.addressText, '<br />');
	  }
	  if (instance.contact.length > 0) {
		  secondColumn = secondColumn.concat(instance.contactText);
	  }
	  
	  var thirdColumn = '';

	  if (instance.site.length > 0) {
		  thirdColumn = thirdColumn.concat(instance.siteText, '<br />');
	  }
	  if (instance.social.length > 0) {
		  thirdColumn = thirdColumn.concat(instance.socialText);
	  }
	  
      rowHtml = replaceWithProperty(rowHtml, 'nameText'); 
      rowHtml = rowHtml.replace('{secondColumn}', secondColumn); 
      rowHtml = rowHtml.replace('{thirdColumn}', thirdColumn); 
	  
      return rowHtml;
    };
    
    instance.domain = function (domainText) {
	  domainText = checkEmpty(domainText);
      instance.domainText = domainText;
      return instance;
    };
    
    instance.address = function (addressText) {
	  addressText = checkEmpty(addressText);
      instance.addressText = addressText;
      return instance;
    };
    
    instance.contact = function (contactText) {
	  contactText = checkEmpty(contactText);
      instance.contactText = contactText;
      return instance;
    };
    
    instance.site = function (siteText) {
	  siteText = checkEmpty(siteText);
	  if (contains(siteText, "http")) {
	    siteText = '<a href="' + siteText + '" target="_blank">Website</a>';
	  }
      instance.siteText = siteText;
      return instance;
    };
    
    instance.social = function (socialText) {
	  socialText = checkEmpty(socialText);
	  if (contains(socialText,'fb.co') || contains(socialText, 'facebook.co')) {
	    socialText = '<a href="' + socialText + '" target="_blank">Facebook</a>';
	  }
	  if (contains(socialText,'ig.co') || contains(socialText, 'instagram.co')) {
	    socialText = '<a href="' + socialText + '" target="_blank">Instagram</a>';
	  }
      instance.socialText = socialText;
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
