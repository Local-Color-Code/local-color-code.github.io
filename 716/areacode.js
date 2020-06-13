areaCode = { 
  businesses: [],
  make: function (name) {
  	var instance = colorCode.make(name);
	businesses.add(instance);
	return instance;
  }
};

areaCode.make('Nakiea Cook, MBA').domain('Accountant').address('N/A').contact('info@nakieacook.com').site('https://www.nakieacook.com/').social('https://www.facebook.com/nakiea.adger');

colorCode.render();
