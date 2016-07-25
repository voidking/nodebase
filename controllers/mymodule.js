exports.add = function (a, b) {
	return a+b;
}

var caculate = {
	delete: function(a, b){
		return a-b;
	},
	multiple: function(a, b){
		return a*b;
	}
};

module.exports = caculate;