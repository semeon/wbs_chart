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

			conf.node = {};
				conf.node.height = 25;
				conf.node.width = 70;
				conf.node.spacing = 10;
				conf.node.padding = {};
				conf.node.padding.top = 17;

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
				return conf.node.spacing;
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


