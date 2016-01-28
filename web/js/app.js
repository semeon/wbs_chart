import * as textData from "data/defaultData.js";
import {Page} from "js/page/pageController.js";
import {Drawing} from "js/drawing/drawingController.js";
import {model} from "js/drawing/model/dataModel.js";

var drawing = new Drawing(model);
var page = new Page(drawing);
var defaultData = textData.text4;

page.render(defaultData);



