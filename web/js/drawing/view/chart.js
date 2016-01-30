export function Chart() {

		var chart = this;
		var conf = {};

	// PUBLIC
	// -----------------------
		this.init = function() {
			conf.paddingLeft = 10;
			conf.paddingRight = conf.paddingLeft;
			conf.paddingTop = 20;
			conf.paddingBottom = 20;
			conf.nodeSpacing = 10;

			conf.levelRow = {};
				conf.levelRow.height = 60;
				conf.levelRow.paddingTop = 10;
				conf.levelRow.paddingBottom = 10;
		}

		// chart

			this.getPaddingLeft = function() {
				return conf.paddingLeft;
			}

			this.getPaddingRight = function() {
				return conf.paddingRight;
			}


		// Node 
			this.nodeHeight = function() {
				return conf.node.height;
			}

			this.nodeWidth = function() {
				return conf.node.width;
			}

			this.nodeSpacing = function() {
				return conf.nodeSpacing;
			}

			this.nodePaddingTop = function() {
				return conf.node.padding.top;
			}

		// Level
			this.levelHeight = function() {
				return conf.levelRow.height;
			}

			this.levelTop = function(level) {
				return chart.levelHeight() * level + conf.paddingTop;
			}

			this.levelBottom = function(level) {
				return chart.levelTop(level) + chart.levelHeight();
			}
}


