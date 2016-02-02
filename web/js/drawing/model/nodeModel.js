export function NodeModel() {

	var self = this;
	
	this.init = function (id, label, level, parentId, parentNode) {
		// Create node
		this.id = id;
		this.level = level;
		this.label = label;
		this.parentId = parentId;
		this.parentNode = parentNode;
		this.children = [];
	}

}